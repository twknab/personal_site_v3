// Server-side GitHub activity feed for the "Recently Shipped" strip (#78).
//
// Fetched only from server components with Next.js ISR caching, so visitors
// never hit the GitHub API and the site calls it at most once per revalidation
// window. Every failure path resolves to [] — the section hides itself rather
// than ever showing an error or empty skeleton.

const GITHUB_USER = "twknab";
const API_ROOT = "https://api.github.com";
const MAX_ITEMS = 6;
export const REVALIDATE_SECONDS = 3600;

// The public events API ships slim payloads: pushes carry no commit list and
// merged PRs no title, so the top items get one enrichment lookup each
// (head-commit message / PR title). One more request lists public repos to
// backfill the strip. Budget stays ≤ 8 requests per window.
//
// Each repo gets at most one card (its newest activity). Without that cap the
// site's own busy repo filled every slot and hid everything else.
const KIND_LABELS = {
  push: "pushed to",
  merge: "merged a PR in",
  release: "cut a release of",
  create: "started a new repo",
  public: "open-sourced",
  repo: "updated",
};

function repoShortName(fullName) {
  return fullName.includes("/") ? fullName.split("/")[1] : fullName;
}

function branchFromRef(ref) {
  return typeof ref === "string" ? ref.replace(/^refs\/heads\//, "") : null;
}

function isBotActor(event) {
  const login = event?.actor?.login || "";
  return login.endsWith("[bot]") || login.endsWith("-bot");
}

export function formatRelativeTime(isoTime, nowMs = Date.now()) {
  const then = Date.parse(isoTime);
  if (Number.isNaN(then)) return "";
  const seconds = Math.max(0, Math.floor((nowMs - then) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60)
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 14) return days === 1 ? "yesterday" : `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (days < 60) return `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

// Maps one raw event to a strip item, or null when it's noise (issue triage,
// branch create/delete, comments, unmerged PRs, bot actors, fork events).
function classifyEvent(event) {
  if (!event || !event.repo || isBotActor(event)) return null;
  const repo = event.repo.name;
  const payload = event.payload || {};
  const base = {
    id: event.id,
    repo,
    repoName: repoShortName(repo),
    isoTime: event.created_at,
    detail: null,
    count: 1,
  };

  switch (event.type) {
    case "PushEvent": {
      const branch = branchFromRef(payload.ref);
      return {
        ...base,
        kind: "push",
        branch,
        headSha: payload.head || null,
        url: payload.head
          ? `https://github.com/${repo}/commit/${payload.head}`
          : `https://github.com/${repo}`,
      };
    }
    case "PullRequestEvent": {
      // The slim events API reports action "merged" directly; the classic
      // shape is action "closed" with pull_request.merged === true.
      const merged =
        payload.action === "merged" ||
        (payload.action === "closed" && payload.pull_request?.merged === true);
      const number = payload.number ?? payload.pull_request?.number;
      if (!merged || !number) return null;
      return {
        ...base,
        kind: "merge",
        prNumber: number,
        url:
          payload.pull_request?.html_url ||
          `https://github.com/${repo}/pull/${number}`,
      };
    }
    case "ReleaseEvent": {
      if (payload.action && payload.action !== "published") return null;
      const release = payload.release || {};
      return {
        ...base,
        kind: "release",
        detail: release.name || release.tag_name || null,
        url: release.html_url || `https://github.com/${repo}/releases`,
      };
    }
    case "PublicEvent":
      return {
        ...base,
        kind: "public",
        url: `https://github.com/${repo}`,
      };
    case "CreateEvent": {
      if (payload.ref_type !== "repository") return null;
      return {
        ...base,
        kind: "create",
        detail: payload.description || null,
        url: `https://github.com/${repo}`,
      };
    }
    default:
      return null;
  }
}

function labelItem(item, nowMs) {
  return {
    ...item,
    label:
      item.kind === "push"
        ? `${item.count > 1 ? `${item.count} pushes` : "pushed"} to ${item.branch || "a branch"}`
        : item.kind === "merge"
          ? `merged PR #${item.prNumber}`
          : KIND_LABELS[item.kind],
    timeAgo: formatRelativeTime(item.isoTime, nowMs),
  };
}

// Turns the raw (newest-first) event list into at most MAX_ITEMS display
// items: classify, keep only each repo's newest item (a push counts every push
// to that repo in the feed), then label.
export function buildActivityItems(events, nowMs = Date.now()) {
  if (!Array.isArray(events)) return [];
  const byRepo = new Map();
  const items = [];
  for (const event of events) {
    const item = classifyEvent(event);
    if (!item) continue;
    const existing = byRepo.get(item.repo);
    if (existing) {
      if (existing.kind === "push" && item.kind === "push") existing.count += 1;
      continue;
    }
    byRepo.set(item.repo, item);
    items.push(item);
  }
  return items.slice(0, MAX_ITEMS).map((item) => labelItem(item, nowMs));
}

// Fills the strip up to MAX_ITEMS with recently pushed public repos the event
// feed doesn't already show — work done while a repo was still private never
// reaches the public feed. Forks and archived repos are skipped.
export function backfillWithRepos(items, repos, nowMs = Date.now()) {
  if (!Array.isArray(items)) items = [];
  if (!Array.isArray(repos) || items.length >= MAX_ITEMS)
    return items.slice(0, MAX_ITEMS);
  const shown = new Set(items.map((item) => item.repo));
  const extra = repos
    .filter(
      (repo) =>
        repo &&
        repo.full_name &&
        !repo.fork &&
        !repo.archived &&
        !repo.private &&
        repo.pushed_at,
    )
    .filter((repo) => !shown.has(repo.full_name))
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, MAX_ITEMS - items.length)
    .map((repo) =>
      labelItem(
        {
          id: `repo-${repo.id ?? repo.full_name}`,
          kind: "repo",
          repo: repo.full_name,
          repoName: repo.name || repoShortName(repo.full_name),
          isoTime: repo.pushed_at,
          detail: repo.description || null,
          count: 1,
          url: repo.html_url || `https://github.com/${repo.full_name}`,
        },
        nowMs,
      ),
    );
  return [...items, ...extra];
}

function githubFetch(url) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "timknab.dev",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return fetch(url, { headers, next: { revalidate: REVALIDATE_SECONDS } });
}

// Adds the human line each card leads with: the head-commit message for a
// push, the PR title for a merge. Best-effort — any failure leaves the item
// with its label only.
async function enrichItem(item) {
  try {
    if (item.kind === "push" && item.headSha) {
      const res = await githubFetch(
        `${API_ROOT}/repos/${item.repo}/commits/${item.headSha}`,
      );
      if (!res.ok) return;
      const commit = await res.json();
      const message = commit?.commit?.message;
      if (typeof message === "string" && message.length > 0) {
        item.detail = message.split("\n")[0];
      }
    } else if (item.kind === "merge" && item.prNumber) {
      const res = await githubFetch(
        `${API_ROOT}/repos/${item.repo}/pulls/${item.prNumber}`,
      );
      if (!res.ok) return;
      const pr = await res.json();
      if (typeof pr?.title === "string" && pr.title.length > 0) {
        item.detail = pr.title;
      }
    }
  } catch {
    // Leave item.detail as-is; the card still renders with its label.
  }
}

async function fetchPublicRepos() {
  try {
    const res = await githubFetch(
      `${API_ROOT}/users/${GITHUB_USER}/repos?type=owner&sort=pushed&per_page=20`,
    );
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

export async function fetchRecentActivity() {
  try {
    const [eventsRes, repos] = await Promise.all([
      githubFetch(
        `${API_ROOT}/users/${GITHUB_USER}/events/public?per_page=100`,
      ),
      fetchPublicRepos(),
    ]);
    const events = eventsRes.ok ? await eventsRes.json() : [];
    const items = buildActivityItems(events);
    await Promise.allSettled(items.map(enrichItem));
    return backfillWithRepos(items, repos);
  } catch {
    return [];
  }
}

// The footer's "last commit" stamp. Same server-side, ISR-cached path as the
// activity strip, so visitors never call GitHub and the site asks at most once
// per revalidation window.
//
// Returns null on any failure. The footer then renders nothing rather than a
// broken stamp — a site claiming to be live should not advertise a dead fetch.
export async function fetchLastCommit(
  repo = `${GITHUB_USER}/personal_site_v3`,
) {
  try {
    const res = await githubFetch(`${API_ROOT}/repos/${repo}/commits/main`);
    if (!res.ok) return null;
    const data = await res.json();
    const sha = data?.sha;
    const isoTime = data?.commit?.committer?.date || data?.commit?.author?.date;
    if (!sha || !isoTime) return null;

    return {
      sha,
      shortSha: sha.slice(0, 7),
      isoTime,
      url: data?.html_url || `https://github.com/${repo}/commit/${sha}`,
    };
  } catch {
    return null;
  }
}
