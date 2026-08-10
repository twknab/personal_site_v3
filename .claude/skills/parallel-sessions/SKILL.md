---
name: parallel-sessions
description: >-
  Run more than one agent session on this repo at once without sessions overwriting
  each other, using a dedicated git worktree per session. Use when starting work while
  another session may be active, when the user asks to parallelize or run agents side
  by side, or when unexplained edits appear in the working tree.
---

# Parallel agent sessions

> Mirrors `.cursor/skills/parallel-sessions/SKILL.md` — keep both files in sync (see the `skills-sync` skill).

This repo gets worked on from several places at once — multiple Claude Code threads, Cursor, and a checkout that lives in **iCloud Drive**. A single shared working directory cannot support that: two sessions on one tree will stage each other's files, switch each other's branches, and stash each other's work.

**One session per working tree. Always.**

## Why the shared checkout fails

Everything in a git checkout is global to that directory — the current branch, the index, the working tree. So when a second session starts:

- `git add -A` sweeps up the other session's in-progress files and commits them into an unrelated PR.
- `git checkout <branch>` yanks the branch out from under the other session mid-edit.
- `git stash` makes the other session's files **vanish from disk** while it is actively editing them.

None of these produce an error. The other session simply sees its work disappear or land somewhere it never intended.

## The setup: one worktree per session

`git worktree` gives each session its own directory and its own checked-out branch, backed by the same repository and sharing all history and branches.

```bash
# From the main checkout, create a worktree for the branch you're about to work on
git worktree add ~/Development/tkv3-worktrees/<branch-nickname> -b tk/<your-branch>

# Or check out a branch that already exists
git worktree add ~/Development/tkv3-worktrees/<branch-nickname> tk/<existing-branch>

git worktree list        # see who is where
```

**Put worktrees outside iCloud Drive.** The main checkout lives under `~/Library/Mobile Documents/…`, where iCloud can sync files mid-write and race with git. `~/Development/tkv3-worktrees/` is local-only and avoids that entirely.

**Convention for this repo:** the iCloud checkout is the *shared/primary* tree — treat whatever is already there as someone else's. New agent work gets a fresh worktree.

### Each worktree needs its own dependencies

Worktrees share git history but **not** `node_modules`, `.next`, or `.env` files. After creating one:

```bash
cd ~/Development/tkv3-worktrees/<nickname>
npm ci
```

Two dev servers cannot both bind port 3000 — use `npm run dev -- -p 3001` in the second worktree.

### Cleaning up

```bash
git worktree remove ~/Development/tkv3-worktrees/<nickname>   # after the branch merges
git worktree prune                                            # tidy stale entries
```

`git worktree remove` refuses to delete a tree with uncommitted changes, which is the safety behavior you want.

## Before touching a shared tree

If you must work in the main checkout, check whether someone else is already there:

```bash
git status --short        # unexplained modified/untracked files = another session
git branch --show-current # not the branch you expect = another session
```

**Unfamiliar files are a stop sign, not noise to clear.** Do not stash, reset, checkout, or `add -A` past them. Find out whose they are first.

## Staging discipline (applies everywhere)

Stage explicit paths. Never `git add -A` or `git commit -a` in a repo that another session might touch:

```bash
git add package.json package-lock.json .github/dependabot.yml   # yes
git add -A                                                      # no
```

## Recovering when work gets crossed

All of these are non-destructive — do them before anything drastic.

**You committed someone else's files:**

```bash
git reset --soft HEAD~1                       # undo the commit, keep everything staged
git restore --staged <their/paths>            # unstage theirs; content stays on disk
git commit -m "…"                             # recommit only your paths
git push --force-with-lease                   # safe force: refuses if remote moved
```

**You stashed someone else's work:** it is not lost. `git stash list` finds it, `git stash show --stat "stash@{0}"` shows tracked files, and `git show --stat "stash@{0}^3"` shows the untracked ones captured by `-u`. Return the tree to the branch they were on, then `git stash pop`.

**You switched their branch:** switch it back. Uncommitted changes follow the working tree, not the branch, so they are still there.

Say what happened when it happens. A crossed session that gets fixed quietly still costs the other session its trust in the tree.

## Splitting work across sessions

Give each session a branch whose file surface barely overlaps — a feature, a dependency pass, a docs change. Overlapping edits to the same components turn into merge conflicts, which is the *good* failure mode, but it is still cheaper to avoid.

Each session opens its own PR and rebases on `main` as others merge.

## Related

- `skills-sync` — the mirrored `.claude` / `.cursor` skills convention.
- `dependency-pr-triage` — where the `git add -A` incident that motivated this skill is also recorded.
