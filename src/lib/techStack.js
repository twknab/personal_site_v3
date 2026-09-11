// Footer tech-stack badges, derived from package.json at build/revalidation
// time so they stay current with zero upkeep: bumping a dependency (or the
// site version) updates the badges on the next deploy automatically.

import pkg from "../../package.json";

const DOCS = {
  next: { name: "Next.js", url: "https://nextjs.org" },
  react: { name: "React", url: "https://react.dev" },
  bootstrap: { name: "Bootstrap", url: "https://getbootstrap.com" },
  sass: { name: "Sass", url: "https://sass-lang.com" },
};

export function cleanVersion(range) {
  return typeof range === "string" ? range.replace(/^[\^~>=<\s]+/, "") : null;
}

export function getTechStack() {
  const deps = pkg.dependencies || {};
  return {
    // Major only: the footer chip names a site generation ("v5"), not a
    // library release — minor/patch stay in package.json for the changelog.
    siteMajor: pkg.version.split(".")[0],
    // Build-machine Node major (Netlify's build image), e.g. "22".
    nodeMajor: process.version.replace(/^v/, "").split(".")[0],
    badges: Object.entries(DOCS)
      .filter(([dep]) => deps[dep])
      .map(([dep, meta]) => ({
        name: meta.name,
        version: cleanVersion(deps[dep]),
        url: meta.url,
      })),
  };
}
