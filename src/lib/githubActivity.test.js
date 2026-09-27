import {
  backfillWithRepos,
  buildActivityItems,
  formatRelativeTime,
} from "./githubActivity";

const NOW = Date.parse("2026-08-10T12:00:00Z");

const pushEvent = (overrides = {}) => ({
  id: overrides.id || "push-1",
  type: "PushEvent",
  actor: { login: "twknab" },
  repo: { name: "twknab/zen-frog-todo" },
  created_at: "2026-08-09T05:00:00Z",
  payload: { ref: "refs/heads/main", head: "abc123" },
  ...overrides,
});

describe("buildActivityItems", () => {
  it("maps the slim merged-PR event shape (action: 'merged')", () => {
    const items = buildActivityItems(
      [
        {
          id: "pr-1",
          type: "PullRequestEvent",
          actor: { login: "twknab" },
          repo: { name: "twknab/zen-frog-todo" },
          created_at: "2026-08-09T05:14:49Z",
          payload: {
            action: "merged",
            number: 45,
            pull_request: { number: 45 },
          },
        },
      ],
      NOW,
    );
    expect(items).toHaveLength(1);
    expect(items[0].kind).toBe("merge");
    expect(items[0].label).toBe("merged PR #45");
    expect(items[0].url).toBe(
      "https://github.com/twknab/zen-frog-todo/pull/45",
    );
  });

  it("maps the classic merged-PR shape (closed + merged: true) and drops unmerged PRs", () => {
    const classic = {
      id: "pr-2",
      type: "PullRequestEvent",
      actor: { login: "twknab" },
      repo: { name: "twknab/site" },
      created_at: "2026-08-09T05:14:49Z",
      payload: {
        action: "closed",
        number: 7,
        pull_request: {
          number: 7,
          merged: true,
          html_url: "https://github.com/twknab/site/pull/7",
        },
      },
    };
    const opened = {
      ...classic,
      id: "pr-3",
      payload: { action: "opened", number: 8, pull_request: { number: 8 } },
    };
    const items = buildActivityItems([classic, opened], NOW);
    expect(items).toHaveLength(1);
    expect(items[0].url).toBe("https://github.com/twknab/site/pull/7");
  });

  it("collapses consecutive pushes to the same repo, keeping the newest link", () => {
    const items = buildActivityItems(
      [
        pushEvent({ id: "p1", created_at: "2026-08-09T05:00:00Z" }),
        pushEvent({
          id: "p2",
          created_at: "2026-08-09T04:00:00Z",
          payload: { ref: "refs/heads/main", head: "older" },
        }),
        pushEvent({
          id: "p3",
          repo: { name: "twknab/other" },
          payload: { ref: "refs/heads/main", head: "zzz" },
        }),
      ],
      NOW,
    );
    expect(items).toHaveLength(2);
    expect(items[0].count).toBe(2);
    expect(items[0].label).toBe("2 pushes to main");
    expect(items[0].url).toBe(
      "https://github.com/twknab/zen-frog-todo/commit/abc123",
    );
    expect(items[1].repoName).toBe("other");
    expect(items[1].label).toBe("pushed to main");
  });

  it("filters triage noise, bot actors, and branch-create events", () => {
    const noise = [
      {
        id: "n1",
        type: "IssuesEvent",
        actor: { login: "twknab" },
        repo: { name: "twknab/a" },
        created_at: "2026-08-09T05:00:00Z",
        payload: { action: "labeled" },
      },
      {
        id: "n2",
        type: "IssueCommentEvent",
        actor: { login: "twknab" },
        repo: { name: "twknab/a" },
        created_at: "2026-08-09T05:00:00Z",
        payload: {},
      },
      {
        id: "n3",
        type: "DeleteEvent",
        actor: { login: "twknab" },
        repo: { name: "twknab/a" },
        created_at: "2026-08-09T05:00:00Z",
        payload: { ref_type: "branch" },
      },
      {
        id: "n4",
        type: "CreateEvent",
        actor: { login: "twknab" },
        repo: { name: "twknab/a" },
        created_at: "2026-08-09T05:00:00Z",
        payload: { ref_type: "branch" },
      },
      pushEvent({ id: "n5", actor: { login: "renovate[bot]" } }),
      {
        id: "n6",
        type: "ForkEvent",
        actor: { login: "twknab" },
        repo: { name: "twknab/a" },
        created_at: "2026-08-09T05:00:00Z",
        payload: {},
      },
    ];
    expect(buildActivityItems(noise, NOW)).toHaveLength(0);
  });

  it("keeps repo creations and releases with friendly labels", () => {
    const items = buildActivityItems(
      [
        {
          id: "c1",
          type: "CreateEvent",
          actor: { login: "twknab" },
          repo: { name: "twknab/new-thing" },
          created_at: "2026-08-01T05:00:00Z",
          payload: { ref_type: "repository", description: "A new thing" },
        },
        {
          id: "r1",
          type: "ReleaseEvent",
          actor: { login: "twknab" },
          repo: { name: "twknab/zen-frog-todo" },
          created_at: "2026-07-01T05:00:00Z",
          payload: {
            action: "published",
            release: {
              tag_name: "v1.2.0",
              html_url:
                "https://github.com/twknab/zen-frog-todo/releases/tag/v1.2.0",
            },
          },
        },
      ],
      NOW,
    );
    expect(items.map((i) => i.kind)).toEqual(["create", "release"]);
    expect(items[0].detail).toBe("A new thing");
    expect(items[1].detail).toBe("v1.2.0");
    expect(items[1].url).toContain("/releases/tag/v1.2.0");
  });

  it("gives each repo one card, so a busy repo can't crowd out the rest", () => {
    const site = (
      id,
      type = "PushEvent",
      payload = { ref: "refs/heads/main", head: id },
    ) =>
      pushEvent({
        id,
        type,
        repo: { name: "twknab/personal_site_v3" },
        payload,
      });
    const items = buildActivityItems(
      [
        site("s1"),
        site("s2", "PullRequestEvent", { action: "merged", number: 9 }),
        site("s3"),
        pushEvent({ id: "g1", repo: { name: "twknab/plumber-wars" } }),
        site("s4"),
        pushEvent({ id: "m1", repo: { name: "twknab/mail-digest" } }),
      ],
      NOW,
    );
    expect(items.map((i) => i.repoName)).toEqual([
      "personal_site_v3",
      "plumber-wars",
      "mail-digest",
    ]);
    expect(items[0].label).toBe("3 pushes to main");
  });

  it("shows a repo going public as open-sourced", () => {
    const items = buildActivityItems(
      [
        {
          id: "pub1",
          type: "PublicEvent",
          actor: { login: "twknab" },
          repo: { name: "twknab/plumber-wars" },
          created_at: "2026-08-09T05:00:00Z",
          payload: {},
        },
      ],
      NOW,
    );
    expect(items).toHaveLength(1);
    expect(items[0].kind).toBe("public");
    expect(items[0].label).toBe("open-sourced");
    expect(items[0].url).toBe("https://github.com/twknab/plumber-wars");
  });

  it("caps the strip at six items", () => {
    const events = Array.from({ length: 10 }, (_, i) =>
      pushEvent({
        id: `p${i}`,
        repo: { name: `twknab/repo-${i}` },
      }),
    );
    expect(buildActivityItems(events, NOW)).toHaveLength(6);
  });

  it("returns [] for junk input", () => {
    expect(buildActivityItems(null, NOW)).toEqual([]);
    expect(buildActivityItems(undefined, NOW)).toEqual([]);
    expect(buildActivityItems([{}, { type: "PushEvent" }], NOW)).toEqual([]);
  });
});

describe("backfillWithRepos", () => {
  const repo = (name, pushed, extra = {}) => ({
    id: name,
    name,
    full_name: `twknab/${name}`,
    html_url: `https://github.com/twknab/${name}`,
    pushed_at: pushed,
    description: `${name} desc`,
    fork: false,
    archived: false,
    private: false,
    ...extra,
  });

  it("fills empty slots with recently pushed public repos not already shown", () => {
    const shown = buildActivityItems(
      [pushEvent({ id: "p1", repo: { name: "twknab/personal_site_v3" } })],
      NOW,
    );
    const items = backfillWithRepos(
      shown,
      [
        repo("personal_site_v3", "2026-08-09T00:00:00Z"),
        repo("old-thing", "2025-01-01T00:00:00Z"),
        repo("plumber-wars", "2026-08-08T00:00:00Z"),
        repo("a-fork", "2026-08-09T01:00:00Z", { fork: true }),
        repo("dusty", "2026-08-09T02:00:00Z", { archived: true }),
      ],
      NOW,
    );
    expect(items.map((i) => i.repoName)).toEqual([
      "personal_site_v3",
      "plumber-wars",
      "old-thing",
    ]);
    expect(items[1]).toMatchObject({
      kind: "repo",
      label: "updated",
      detail: "plumber-wars desc",
      url: "https://github.com/twknab/plumber-wars",
      timeAgo: "2 days ago",
    });
  });

  it("never exceeds six items and tolerates junk", () => {
    const many = Array.from({ length: 10 }, (_, i) =>
      repo(`r${i}`, "2026-08-01T00:00:00Z"),
    );
    expect(backfillWithRepos([], many, NOW)).toHaveLength(6);
    expect(backfillWithRepos([], null, NOW)).toEqual([]);
    expect(backfillWithRepos(null, [{}, { full_name: "x" }], NOW)).toEqual([]);
  });
});

describe("formatRelativeTime", () => {
  it.each([
    ["2026-08-10T11:59:40Z", "just now"],
    ["2026-08-10T11:35:00Z", "25 minutes ago"],
    ["2026-08-10T09:00:00Z", "3 hours ago"],
    ["2026-08-09T09:00:00Z", "yesterday"],
    ["2026-08-07T09:00:00Z", "3 days ago"],
    ["2026-07-20T09:00:00Z", "3 weeks ago"],
    ["2026-05-01T09:00:00Z", "3 months ago"],
    ["2024-08-01T09:00:00Z", "2 years ago"],
  ])("formats %s as %s", (iso, expected) => {
    expect(formatRelativeTime(iso, NOW)).toBe(expected);
  });

  it("returns an empty string for unparseable input", () => {
    expect(formatRelativeTime("not-a-date", NOW)).toBe("");
  });
});
