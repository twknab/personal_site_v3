// Fetch book-cover art into the repo so the site never hotlinks covers.
//
//   node scripts/fetch-covers.mjs          # download missing covers, then regenerate
//   node scripts/fetch-covers.mjs --regen  # only regenerate localCovers.js from disk
//
// Why this exists: the Reading section used to hotlink covers.openlibrary.org
// and archive.org at page load. Those hosts are slow enough to watch, we don't
// control them, and hotlinking leans on someone else's bandwidth. Covers are
// site content — they belong in the repo like every other image.
//
// This script is the ONLY place remote cover URLs live. The client bundle
// resolves covers exclusively through src/components/main/reading/localCovers.js,
// which this script regenerates from whatever files exist in
// src/assets/images/book-covers/. Books with no committed file show the
// placeholder until this script runs and its output is committed.
//
// The `.github/workflows/fetch-covers.yml` workflow runs this on a GitHub
// runner and commits the results — useful when your environment can't reach
// the cover hosts.

import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const COVERS_DIR = "src/assets/images/book-covers";
const GENERATED_MODULE = "src/components/main/reading/localCovers.js";

const olCoverById = (id) =>
  `https://covers.openlibrary.org/b/id/${id}-L.jpg?default=false`;
const olCoverByIsbn = (isbn) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
const olCoverByOlid = (olid) =>
  `https://covers.openlibrary.org/b/olid/${olid}-L.jpg?default=false`;
const archiveThumb = (item) => `https://archive.org/services/img/${item}`;

// slug -> ordered candidate URLs. Slugs match the book `slug` fields in
// readingList.js; the first candidate that returns a real image wins.
const REMOTE_SOURCES = {
  // Currently reading
  "clean-craftsmanship": [
    olCoverByOlid("OL34733095M"),
    olCoverByIsbn("9780136915713"),
  ],
  "navigation-sea-state-weather": [
    olCoverByIsbn("9780986561313"),
    archiveThumb("navigationseasta0000unse"),
  ],
  // 2026
  "beachcombers-guide": [
    olCoverByIsbn("9781550178371"),
    olCoverByIsbn("9781550174533"),
    olCoverByIsbn("9781550172041"),
    archiveThumb("beachcombersguid0000sept"),
  ],
  "careless-people": [olCoverByIsbn("9781250391230")],
  // 2025
  "clean-coder": [olCoverById(7318893)],
  taoism: [olCoverById(865042)],
  "native-wisdom": [olCoverById(864946)],
  "mountain-is-you": [olCoverById(13838236)],
  "qigong-healing-meditations": [olCoverById(208344)],
  "wisdom-of-mike-mentzer": [olCoverById(1079977)],
  "emotional-intelligence-habits": [olCoverById(15100928)],
  // 2024
  "art-of-thinking": [olCoverById(762085)],
  "courage-to-be-disliked": [olCoverById(10873626)],
  "extreme-ownership": [olCoverById(12835042)],
  "speed-reading": [olCoverById(10839827)],
  "designing-data-intensive-applications": [olCoverById(8434671)],
  "high-intensity-training": [olCoverById(57750)],
  "twenty-four-hours-a-day": [olCoverById(13215555)],
  "code-that-fits-in-your-head": [olCoverById(12848531)],
};

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

// Open Library serves a tiny blank stand-in for some misses even with
// default=false; anything this small is not a book cover.
const MIN_IMAGE_BYTES = 2000;

async function existingCoverFiles() {
  const entries = await readdir(COVERS_DIR);
  return entries
    .filter((name) => IMAGE_EXTENSIONS.includes(path.extname(name)))
    .sort();
}

function slugOf(fileName) {
  return path.basename(fileName, path.extname(fileName));
}

async function downloadMissing() {
  const have = new Set((await existingCoverFiles()).map(slugOf));
  const missing = Object.entries(REMOTE_SOURCES).filter(
    ([slug]) => !have.has(slug)
  );

  if (missing.length === 0) {
    console.log("All covers already present — nothing to download.");
    return [];
  }

  const failed = [];
  for (const [slug, candidates] of missing) {
    let saved = false;
    for (const url of candidates) {
      try {
        const res = await fetch(url, { redirect: "follow" });
        if (!res.ok) continue;
        const type = res.headers.get("content-type") ?? "";
        if (!type.startsWith("image/")) continue;
        const bytes = Buffer.from(await res.arrayBuffer());
        if (bytes.byteLength < MIN_IMAGE_BYTES) continue;
        const ext = type.includes("png") ? ".png" : ".jpg";
        await writeFile(path.join(COVERS_DIR, `${slug}${ext}`), bytes);
        console.log(`✓ ${slug}${ext}  (${bytes.byteLength} bytes, ${url})`);
        saved = true;
        break;
      } catch (error) {
        console.warn(`  ${slug}: ${url} failed (${error.message})`);
      }
    }
    if (!saved) {
      failed.push(slug);
      console.warn(`✗ ${slug}: no candidate produced a usable image`);
    }
  }
  return failed;
}

function identifierFor(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

async function regenerateModule() {
  const files = await existingCoverFiles();
  const lines = [
    "// GENERATED FILE — do not edit by hand.",
    "// Regenerate with: npm run covers:fetch (or node scripts/fetch-covers.mjs --regen)",
    "//",
    "// One import per file in src/assets/images/book-covers/, keyed by slug.",
    "// This module is the only way the Reading section resolves cover art:",
    "// a book whose slug is missing here renders the local placeholder, and",
    "// nothing in the client bundle ever references a remote cover host.",
    "",
    ...files.map(
      (file) =>
        `import ${identifierFor(slugOf(file))} from "../../../assets/images/book-covers/${file}";`
    ),
    "",
    "const localCovers = {",
    ...files.map((file) => `  "${slugOf(file)}": ${identifierFor(slugOf(file))},`),
    "};",
    "",
    "export default localCovers;",
    "",
  ];
  await writeFile(GENERATED_MODULE, lines.join("\n"));
  console.log(`Regenerated ${GENERATED_MODULE} with ${files.length} covers.`);
}

async function main() {
  await mkdir(COVERS_DIR, { recursive: true });
  const regenOnly = process.argv.includes("--regen");
  const failed = regenOnly ? [] : await downloadMissing();
  await regenerateModule();

  if (failed.length > 0) {
    console.error(
      `\n${failed.length} cover(s) could not be fetched: ${failed.join(", ")}\n` +
        "Those books will show the placeholder. Re-run later, or add the file by hand."
    );
    process.exitCode = 1;
  }
}

main();
