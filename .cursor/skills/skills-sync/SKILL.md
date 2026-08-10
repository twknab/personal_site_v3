---
name: skills-sync
description: >-
  Keep .claude/skills and .cursor/skills mirrored so Claude Code and Cursor behave
  identically. Use whenever you add, edit, rename, or delete a skill in this repo,
  or when the user asks to sync/check the agent skills.
---

# Skills sync

> Mirrors `.claude/skills/skills-sync/SKILL.md` — keep both files in sync (this skill is subject to its own rule).

This repo is worked from **both Claude Code and Cursor**, and the two don't share a skills format. Rather than picking one tool as authoritative, the repo keeps a deliberate mirrored pair so either assistant behaves the same way.

```
.claude/skills/<name>/SKILL.md    # Claude Code
.cursor/skills/<name>/SKILL.md    # Cursor
```

## Required behavior

1. **Whenever you add, edit, or remove a skill, make the equivalent change in both directories in the same turn.** Never leave one side stale.
2. **Directory names match exactly** — `.claude/skills/foo/SKILL.md` ↔ `.cursor/skills/foo/SKILL.md`.
3. **Content parity**: the body — the actual guidance, commands, examples — must be identical in substance. Only the mirror pointer line differs:
   - In `.claude/…`: `> Mirrors \`.cursor/skills/<name>/SKILL.md\` — keep both files in sync (see the \`skills-sync\` skill).`
   - In `.cursor/…`: `> Mirrors \`.claude/skills/<name>/SKILL.md\` — keep both files in sync (see the \`skills-sync\` skill).`
4. **Frontmatter is identical** on both sides (`name`, `description`). The `name` must match the directory name.
5. **New skills**: create both files together, never just one.
6. **Deletions**: remove both directories together.
7. **This skill is subject to its own rule** — if you change how syncing works, update both copies.

## Checking sync

Compare the file lists and then the bodies, ignoring only the mirror pointer line:

```bash
diff <(ls .claude/skills) <(ls .cursor/skills)

for d in .claude/skills/*/; do
  n=$(basename "$d")
  if [ -f ".cursor/skills/$n/SKILL.md" ]; then
    if diff -q <(grep -v '^> Mirrors' ".claude/skills/$n/SKILL.md") \
               <(grep -v '^> Mirrors' ".cursor/skills/$n/SKILL.md") >/dev/null; then
      echo "in sync:  $n"
    else
      echo "DRIFTED:  $n"
    fi
  else
    echo "MISSING in .cursor: $n"
  fi
done
```

Run this before finishing any task that touched a skill.

## Writing a good skill

A skill is a procedure someone will follow months from now without today's context:

- **Lead with the principle**, not the commands. The reader needs to know *why* a step exists to adapt it when reality differs.
- **Record the traps you actually hit** — the silent failure, the quoting bug, the flag that lies. That hard-won detail is most of a skill's value; a list of obvious commands is not worth loading.
- **Be honest about when the skill doesn't apply.** A skill that claims to handle every case sends the reader down the wrong path.
- **Keep commands copy-pasteable** with placeholders (`<owner>/<repo>`) rather than hardcoded values that go stale.

## Related

- `dependency-pr-triage` — triaging dependency-bump PRs.
- The mirrored-pair convention here matches how the roam-guru repo mirrors `.cursor/rules/*.mdc` ↔ `.claude/rules/*.md`.
