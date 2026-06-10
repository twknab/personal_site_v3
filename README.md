# Tim Knab — Personal Site

A handcrafted React portfolio for **Tim Knab**, full-stack software engineer. Every color, gradient, texture, animation, and illustration was hand-picked, coded, or created to give the site an artisanal, expressive feel while showcasing skills, projects, experience, and personal interests.

## Live Deployment

🌐 **[https://timknab.dev](https://timknab.dev)**

Continuously deployed from `main` via Netlify, with deploy previews on every pull request.

## Tech Stack

| Area | Tools |
| --- | --- |
| Framework | [React](https://react.dev/) 16 (functional components + hooks) |
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
- **Psychedelic & golden gradients** — animated, flowing gradients across the nav, footer, photo ring, and section backgrounds.
- **Glassmorphism** — frosted, layered surfaces throughout the theme.
- **Scroll-reveal animations** — sections fade/slide in on scroll via an `IntersectionObserver` hook (`hooks/useScrollReveal.js`).
- **Lottie animations** — lazy-loaded vector animations that stay test-safe in `jsdom` (`components/fun/LottieFigure.js`).
- **Smooth-scroll navigation** — animated jumps to any section from the navbar.
- **Accessibility** — honors `prefers-reduced-motion`, plus ARIA labels and keyboard-operable controls.

## Project Structure

```
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
npm start        # run the dev server at http://localhost:3000
npm test         # run the Jest test suite
npm run build    # production build into /build
```

## Continuous Integration

Every pull request runs:

- **Netlify deploy preview** — a live preview URL for the branch.
- **Codacy Security Scan** — static analysis (reports to the Codacy dashboard).
- **npm audit** — dependency vulnerability scan, private-repo friendly.
- **Dependency Review** — GitHub supply-chain check.

> ℹ️ The security scans currently run as **informational** (non-blocking). The Codacy/Dependency Review SARIF uploads require GitHub Advanced Security (unavailable on a private repo), and `npm audit` is non-blocking because this Create React App project ships build-time tooling as production dependencies. These can be turned into hard gates after a dependency/CRA modernization.

## Roadmap & Ideas

**Next up**
- [ ] "Book a call" — a toggleable [Calendly](https://calendly.com/) scheduling widget that can be switched on/off.
- [ ] Tie in creative projects — feature the **Adventures with TK** YouTube channel (latest videos / embed).

**Future work**
- [ ] Blog section — articles on coding challenges and the dev soft-skills journey.
- [ ] Animated intro / loading screen.
- [ ] Interactive widgets or small JS games.
- [ ] Hand-drawn illustrations as section accents and an end-of-page flourish.
- [ ] Modernize the build (e.g. CRA → Vite) to enable blocking security gates.

---

Crafted with 💚 by Tim Knab.
