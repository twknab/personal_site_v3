# Tim Knab — Personal Site

A custom portfolio site for **Tim Knab**, full-stack software engineer — built with an artisanal, expressive feel while showcasing skills, projects, experience, and personal interests.

## Live Deployment

🌐 **[https://timknab.dev](https://timknab.dev)**

Continuously deployed from `main` via Netlify, with deploy previews on every pull request.

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) 14 (App Router) + [React](https://react.dev/) 18 (functional components + hooks) |
| UI | [React-Bootstrap](https://react-bootstrap.netlify.app/) / [Bootstrap](https://getbootstrap.com/) 4 |
| Styling | [SASS](https://sass-lang.com/) (custom theme, gradients, glassmorphism, keyframe animations) |
| Animation | [lottie-react](https://www.npmjs.com/package/lottie-react), canvas particle effects, CSS animations |
| Navigation | [react-scroll](https://www.npmjs.com/package/react-scroll) (smooth in-page scrolling) |
| Icons | [react-icons](https://react-icons.github.io/react-icons/) |
| Testing | [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) |
| Hosting / CI | [Netlify](https://www.netlify.com/), GitHub Actions |

## Site Sections

The single-page experience flows through the following sections (see `src/components/MainContent.js`):

1. **Professional Summary** — hero intro with a golden, animated photo ring and Lottie accents.
2. **About Me** — short personal narrative.
3. **Skills** — categorized, data-driven skill list (`skills/skillsList.js`).
4. **Stacks** — featured technology stack logos.
5. **Projects** — RoamGuru, SockIt, Hiking Tool, Gear List, and Fitness Tracker, each with a custom icon.
6. **Experience** — professional work history (`experience/experienceList.js`).
7. **Education History** — academic background.
8. **Awards** — recognitions and achievements.
9. **Reading** — currently reading plus year-by-year completed books, with cover art, multi-column layout, collapsible accordions, and per-section copy-link buttons (`reading/readingList.js`).

## Visual & Interactive Features

- **Confetti overlay** — full-page confetti rains down on initial load (`components/fun/ConfettiOverlay.js`).
- **Cursor trail** — playful desktop-only particle trail that follows the mouse (`components/fun/CursorTrail.js`).
- **Flowing golden gradients** — animated gradients across the nav, footer, photo ring, and section backgrounds.
- **Glassmorphism** — frosted, layered surfaces throughout the theme.
- **Scroll-reveal animations** — sections fade/slide in on scroll via an `IntersectionObserver` hook (`hooks/useScrollReveal.js`).
- **Lottie animations** — lazy-loaded vector animations that stay test-safe in `jsdom` (`components/fun/LottieFigure.js`).
- **Smooth-scroll navigation** — animated jumps to any section from the navbar.
- **Accessibility** — honors `prefers-reduced-motion`, plus ARIA labels and keyboard-operable controls.

## Project Structure

```
app/
├── layout.js              # Root layout: metadata, global styles (Bootstrap + theme)
└── page.js                # Single route, renders the App shell

src/
├── App.js                 # App shell: nav, confetti, cursor trail, content, footer
├── twkTheme.scss          # Central theme: variables, gradients, animations
├── components/
│   ├── MainContent.js     # Section order + scroll-reveal wiring
│   ├── fun/               # ConfettiOverlay, CursorTrail, LottieFigure
│   ├── main/              # Section components + their data lists
│   └── nav/               # PrimaryNavigation, PrimaryFooter
├── hooks/
│   └── useScrollReveal.js # IntersectionObserver-based reveal hook
└── views/
    └── Homepage.js        # Page composition
```

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # run the dev server at http://localhost:3000
npm test         # run the Jest test suite
npm run build    # production build into /.next
npm run start    # serve the production build locally
npm run lint     # ESLint (next/core-web-vitals)
```

## Continuous Integration

**Pre-merge — every pull request:**

- **App CI** *(blocking)* — ESLint (`next/core-web-vitals`), the Jest test suite, and a production `next build`. A failure in any step blocks the merge.
- **Netlify deploy preview** — a live preview URL for the branch (the visual check).
- **npm audit** *(blocking)* — fails on any high-severity advisory in the dependency tree.
- **Dependency Review** *(blocking)* — fails a PR that introduces a known-vulnerable dependency.
- **Codacy Security Scan** *(blocking)* — static security analysis; findings upload to the GitHub Security tab and annotate the PR.

**Post-merge — every push to `main`:**

- **App CI** re-runs on the merged tree, catching bad merges or direct pushes even though Netlify deploys them.
- **Lighthouse** audits the live https://timknab.dev after the Netlify deploy settles (3 runs, artifacts + shareable report links) — performance, accessibility, best practices, SEO. Also runs monthly on a schedule to catch drift between merges.

> ℹ️ These were all informational until the repo went public and the Next 16 + React 19 upgrade ([#95](https://github.com/twknab/personal_site_v3/pull/95)) cleared the last unfixable advisories. GitHub Advanced Security is free on public repos, so SARIF upload and Dependency Review now work, and `npm audit` reports 0 — a permanently-green check hides regressions, so all three fail the build now.

## Agent Skills (Claude Code + Cursor)

This repo is worked from both **Claude Code** and **Cursor**, which don't share a skills format. Rather than making one tool authoritative, the repo keeps a **mirrored pair** so either assistant behaves identically:

```
.claude/skills/<name>/SKILL.md    # Claude Code
.cursor/skills/<name>/SKILL.md    # Cursor
```

| Skill | What it does |
| --- | --- |
| `dependency-pr-triage` | Decide which dependency-bump PRs are still real, clear the backlog, and keep it from rebuilding. |
| `skills-sync` | Keeps the two skill directories mirrored; run whenever a skill is added, edited, or removed. |
| `parallel-sessions` | One git worktree per agent session, so concurrent Claude/Cursor sessions don't overwrite each other. |

**Running more than one session at once:** this repo is often worked from several agent threads plus Cursor, against a checkout that lives in iCloud Drive. A single shared working directory cannot support that — sessions stage each other's files and stash each other's work. Give every session its own `git worktree` outside iCloud (`~/Development/tkv3-worktrees/<branch>`); see the `parallel-sessions` skill.

Standing constraints live alongside them as **rules**, mirrored the same way:

```
.claude/rules/<name>.md    /    .cursor/rules/<name>.mdc
```

| Rule | Constraint |
| --- | --- |
| `full-bleed-layout` | Only the header and footer run full width; every content section is capped at 2000px and centerd. |

**The convention:** any change to a skill or rule updates *both* copies in the same commit. Only the wrapper differs — a `> Mirrors …` blockquote on the Claude side, YAML frontmatter on the Cursor side. Parity checks for both live in the `skills-sync` skill.

## Roadmap & Ideas

**Next up** (in planned order — see the linked issues for full specs)
- [x] Migrate to Next.js 14 + React 18 ([#76](https://github.com/twknab/personal_site_v3/issues/76)) — the foundation for everything below.
- [ ] **Recently shipped** — a live GitHub activity strip, server-fetched with ISR caching ([#78](https://github.com/twknab/personal_site_v3/issues/78)).
- [ ] **Reading list upgrade** — per-book takeaways, topic filter chips, and a stats line ([#79](https://github.com/twknab/personal_site_v3/issues/79)).
- [ ] **Ask Tim** — an AI chat agent grounded exclusively in this site's content, powered by Vertex AI (Gemini) behind a server route ([#77](https://github.com/twknab/personal_site_v3/issues/77)).
- [ ] Bump Next.js 14 → 15/16 and React 19 once `lottie-react` / `react-scroll` peer ranges allow, clearing the remaining npm audit advisories ([#80](https://github.com/twknab/personal_site_v3/issues/80)).

**Future work**
- [ ] **Adventure map** — an interactive Washington trail map (Leaflet/MapLibre) of hikes and paddles, merging the engineering + environmental-science identities.
- [ ] "Book a call" — a toggleable [Calendly](https://calendly.com/) scheduling widget that can be switched on/off.
- [ ] Tie in creative projects — feature the **Adventures with TK** YouTube channel (latest videos / embed).
- [ ] Blog section — articles on coding challenges and the dev soft-skills journey.
- [ ] Animated intro / loading screen.
- [ ] Interactive widgets or small JS games.
- [ ] Hand-drawn illustrations as section accents and an end-of-page flourish.

---

Crafted with 💚 by Tim Knab.
