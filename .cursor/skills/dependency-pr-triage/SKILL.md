---
name: dependency-pr-triage
description: >-
  Triage the open dependency-bump PRs (Dependabot or otherwise): decide which are
  still real, which are obsolete, and clear the backlog in one pass. Use when the
  user asks to handle/clean up/knock out dependency PRs, asks whether dependency
  bumps are still relevant, or when a stack migration has left old bump PRs behind.
---

# Dependency PR triage

> Mirrors `.claude/skills/dependency-pr-triage/SKILL.md` — keep both files in sync (see the `skills-sync` skill).

Dependency PRs pile up faster than anyone reviews them, and after a stack change most of them are lying: they claim to fix something in a tree that no longer exists. The job here is **not** to rebase and merge everything. It is to find out which PRs still describe reality, and to close the rest with a reason a human can audit later.

## The core principle

**Check the bump against the current lockfile before touching the PR.** A dependency PR is a claim about the dependency tree. Verify the claim first; the PR's title, age, and CI status tell you nothing about whether the tree still contains that package.

Three outcomes, in the order you should test for them:

1. **Package is gone from the tree** — usually a transitive dep of a build tool that was removed. Nothing to merge, nothing to rebase. Close.
2. **Installed version already meets or exceeds the request** — the tree was regenerated at some point and the fix rode along. Close.
3. **Package is present and genuinely behind** — now decide: routine bump (merge) or breaking change (file an issue, close the PR).

## 1. Inventory

```bash
gh pr list --repo <owner>/<repo> --state open \
  --json number,title,headRefName,mergeStateStatus \
  --jq '.[] | "\(.number)\t\(.mergeStateStatus)\t\(.title)"'
```

Then check what the PRs actually edit. **A PR that edits a lockfile the repo no longer has cannot be rebased** — it will conflict on a deleted file, and even resolved it patches a tree that is gone. This one check often disqualifies an entire backlog at once:

```bash
gh pr view <n> --repo <owner>/<repo> --json files --jq '.files[].path'
```

## 2. Test every bumped package against the real lockfile

Extract the package names from the PR titles, then query the committed lockfile directly — do not trust `node_modules`, and do not assume:

```bash
for p in <pkg1> <pkg2> <pkg3>; do
  v=$(python3 -c "
import json
d=json.load(open('package-lock.json'))
ks=[k for k in d.get('packages',{}) if k.endswith('node_modules/$p')]
print(', '.join(sorted(set(d['packages'][k].get('version','?') for k in ks))) if ks else 'ABSENT')
")
  printf '%-24s %s\n' "$p" "$v"
done
```

`ABSENT` → outcome 1. A version at or above the requested one → outcome 2. Anything else → outcome 3.

## 3. Close with a specific reason, not a generic one

Write the comment to a file and pass `--body-file`. **Multi-line strings passed inline to `gh pr close --comment` break silently in zsh** — the PR stays open and you get no error:

```bash
gh pr comment <n> --repo <owner>/<repo> --body-file /tmp/close-reason.md
gh pr close <n> --repo <owner>/<repo>
```

Always re-list open PRs afterward to confirm the closes actually landed.

Each comment should say which of the three outcomes applies and what was verified, so a reader in six months can tell this was a judgment call and not a mass-close. Group the reasons — "package no longer in the tree" and "already satisfied" deserve different text.

## 4. Breaking changes become issues, not merges

A major version bump that changes rendered output, renames APIs, or requires a peer major is **a project, not a bump**. Close the PR and open a properly scoped issue with acceptance criteria and a visual-regression plan. Then teach the bot to stop offering it, via `ignore` in `.github/dependabot.yml`.

Peer-gated majors are a common trap: framework and runtime majors usually have to move together (e.g. Next 15+ requires React 19), so a PR bumping one alone can never merge. Group them in dependabot config instead.

## 5. What's actually upgradeable

```bash
npm outdated
npm audit
```

If `Wanted == Current` for everything, there is **no patch refresh to make** — the tree is already at the newest in-range versions and every remaining upgrade is a major. Say so plainly rather than opening an empty "refresh" PR.

Take the majors that are *not* gated on a peer major (dev-only tooling is usually safe). Leave the gated ones to their tracking issue.

## 6. Verify majors in the DOM, not just the build

A green `next build` only proves imports resolved. For anything that renders — icon packs especially — confirm it actually draws:

```bash
npm run build && npm run start   # then drive the page
```

Count SVGs and check none are empty or zero-size. Icon libraries rename exports across majors (Font Awesome 5 → 6 renamed `FaGithubSquare` → `FaSquareGithub`), and a missing icon can render as an empty element rather than an error. Check both desktop and mobile widths — elements hidden at one breakpoint report zero size and will look "broken" when they are merely collapsed.

## 7. Prevent the next pile-up

If there is no `.github/dependabot.yml`, add one. Defaults produce one PR per advisory with no grouping, which is how a backlog reaches fifteen. Group related packages, cap `open-pull-requests-limit`, add labels, and `ignore` majors that have tracking issues.

## Working-tree safety

**Never `git add -A` in a repo you might be sharing.** These repos sync via iCloud and get edited from Cursor and other sessions, so unrelated in-progress work can appear mid-task and land in your commit. Stage explicit paths:

```bash
git add package.json package-lock.json .github/dependabot.yml
```

If you do sweep up foreign files, recover without destroying them: `git reset --soft HEAD~1`, `git restore --staged <foreign paths>` (content stays on disk), recommit your paths, then `git push --force-with-lease`.

## Report honestly

State what you closed and why, in categories. If advisories remain that you cannot fix, say which ones and what they are blocked on — an unfixable `npm audit` finding that is gated on a framework major is useful information, not a failure to hide.
