> Mirrors `.cursor/rules/site-versioning.mdc` — keep both files in sync (see the `skills-sync` skill). Description: When and how to bump the site's version, which is displayed to visitors in the footer

# Site versioning

The version in `package.json` is not internal bookkeeping. It is rendered to visitors as a badge in the footer, generated from that file by `src/lib/techStack.js`, so it is a public claim about how current the site is. A version that never moves while the site visibly changes reads worse than showing none at all.

## When to bump

Decide from what a **visitor** would notice, not from the size of the diff.

| Bump | When | Examples |
|------|------|----------|
| **Major** (`6.0.0`) | The platform or the design language changes. A visitor would say the site was rebuilt. | Create React App → Next.js. A full visual redesign. Moving off Bootstrap. |
| **Minor** (`5.1.0`) | A new section, page, or capability a visitor can find and use. | The "How I build" section. The Recently Shipped strip. A blog. |
| **Patch** (`5.0.1`) | Fixes, copy edits, styling, content, dependencies. Nothing new to find. | Tightening copy. Fixing an anchor. Adding books to the reading list. Dependency bumps. |

The common mistake is reaching for patch because the work *felt* small, or major because it *felt* big. Neither is the question. **Ask what changed for someone visiting the site.**

## Rules

1. **Bump in the pull request that ships the change**, not in a separate tidy-up commit later. A version that lands afterwards was wrong for however long the gap lasted.
2. **One bump per pull request.** Several features in one PR still move the minor once.
3. **Take the highest applicable level.** A PR adding a section *and* fixing three bugs is a minor, not a patch.
4. **Dependency-only PRs are patches**, even for a framework major — the visitor sees nothing. The exception is when the upgrade is the reason for a visible change, and then it is that change being versioned, not the dependency.
5. **Do not bump for repo-only work.** Rules, skills, specs, CI config and documentation change nothing a visitor can see. This rule's own file does not warrant a bump.

## How

```bash
# package.json is the only source; the footer badge follows automatically.
npm version 5.1.0 --no-git-tag-version
```

Never hand-edit the footer badge. It is derived, and a hand-edited copy will silently disagree with `package.json` the next time either moves.

## Related

- The versioning scheme was agreed in [#84](https://github.com/twknab/personal_site_v3/issues/84) alongside the repository rename.
- `full-bleed-layout` — the other standing constraint in this repo.
