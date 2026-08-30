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
    // Only the major. Semantic versioning communicates compatibility to
    // people who depend on your code, and nothing depends on this site --
    // there is no API and no package. What the major *does* mean here is
    // real: which generation of the site this is. v5 is the Next.js rebuild.
    // Recency is already covered, precisely, by the last-commit stamp
    // beside this badge, so the minor and patch had nothing left to say.
    siteVersion: String(pkg.version).split(".")[0],
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
