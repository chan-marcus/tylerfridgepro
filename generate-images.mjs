// generate-images.mjs
//
// Reads your Astro market-variable files (site.ts, services.ts, cities.ts) and
// writes one themed SVG hero backdrop per service (fallback) and per service+city
// combo into /public/generated/. Pure local generation: no API key, no network,
// no cost, instant, and deterministic (a given combo always renders the same art).
// Skips anything already on disk; --force regenerates all.
//
// Usage:
//   node generate-images.mjs
//   node generate-images.mjs --force
//
// Requires: Node 18+.

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ----- config ---------------------------------------------------------------

const SRC_DIR = resolve(__dirname, "src"); // site.ts is in config/, services.ts + cities.ts in data/
const OUT_DIR = resolve(__dirname, "public/generated");

const args = process.argv.slice(2);
const FORCE = args.includes("--force");

const W = 1280;
const H = 720;

// ----- tiny .ts extractors ---------------------------------------------------

function readFile(name) {
  const p = resolve(SRC_DIR, name);
  if (!existsSync(p)) {
    console.error(`Cannot find ${name} at ${p}. Edit SRC_DIR at top of script.`);
    process.exit(1);
  }
  return readFileSync(p, "utf8");
}

// Grab the first array literal [...] assigned to a given export (tolerates `: Type[] =`).
function extractArray(src, exportName) {
  const re = new RegExp(`export\\s+const\\s+${exportName}\\s*(?::[^=]*)?=\\s*(\\[[\\s\\S]*?\\n\\])`, "m");
  const m = src.match(re);
  if (!m) return null;
  return looseJsonParse(m[1]);
}

// Grab the first object literal {...} assigned to a given export.
function extractObject(src, exportName) {
  const re = new RegExp(`export\\s+const\\s+${exportName}\\s*(?::[^=]*)?=\\s*(\\{[\\s\\S]*?\\n\\})`, "m");
  const m = src.match(re);
  if (!m) return null;
  return looseJsonParse(m[1]);
}

// Turn a TS/JS object-or-array literal into JSON we can parse.
function looseJsonParse(text) {
  let t = text
    .replace(/(?<!:)\/\/.*$/gm, "") // line comments (skip :// inside URLs)
    .replace(/\/\*[\s\S]*?\*\//g, "") // block comments
    .replace(/,(\s*[}\]])/g, "$1") // trailing commas
    .replace(/([{\[,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":') // unquoted keys
    .replace(/'/g, '"'); // single -> double quotes
  try {
    return JSON.parse(t);
  } catch (e) {
    console.error("Failed to parse a config literal. Raw was:\n", text.slice(0, 400));
    throw e;
  }
}

// ----- load market config ----------------------------------------------------

const siteSrc = readFile("config/site.ts");
const servicesSrc = readFile("data/services.ts");
const citiesSrc = readFile("data/cities.ts");

const site = extractObject(siteSrc, "SITE") || {};
const services = extractArray(servicesSrc, "SERVICES") || [];
const cities = extractArray(citiesSrc, "CITIES") || [];

const region = site.region || site.state || "";

if (!services.length) {
  console.error("No services parsed from services.ts. Check the export name/shape.");
  process.exit(1);
}
if (!cities.length) {
  console.error("No cities parsed from cities.ts. Check the export name/shape.");
  process.exit(1);
}

// ----- SVG art ---------------------------------------------------------------
// Dark, on-brand refrigeration backdrop meant to sit BEHIND hero text. Cold navy
// base, a cyan glow, a scatter of snowflakes, a faint cooler silhouette, and a
// bottom vignette for text contrast. Deterministic per key so re-runs are stable.

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFrom(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function snowflake(cx, cy, r, op) {
  const a = r;
  const b = r * 0.5;
  return (
    `<g stroke="#7FE3F2" stroke-opacity="${op}" stroke-width="2" stroke-linecap="round" transform="translate(${cx} ${cy})">` +
    `<line x1="0" y1="${-a}" x2="0" y2="${a}"/>` +
    `<line x1="${(-a * 0.87).toFixed(1)}" y1="${(-a * 0.5).toFixed(1)}" x2="${(a * 0.87).toFixed(1)}" y2="${(a * 0.5).toFixed(1)}"/>` +
    `<line x1="${(-a * 0.87).toFixed(1)}" y1="${(a * 0.5).toFixed(1)}" x2="${(a * 0.87).toFixed(1)}" y2="${(-a * 0.5).toFixed(1)}"/>` +
    `<line x1="0" y1="${-a}" x2="${(-b * 0.5).toFixed(1)}" y2="${(-a + b * 0.5).toFixed(1)}"/>` +
    `<line x1="0" y1="${-a}" x2="${(b * 0.5).toFixed(1)}" y2="${(-a + b * 0.5).toFixed(1)}"/>` +
    `</g>`
  );
}

function coolerSilhouette() {
  return (
    `<g fill="none" stroke="#4FD1E9" stroke-opacity="0.1" stroke-width="3">` +
    `<rect x="835" y="150" width="300" height="440" rx="16"/>` +
    `<line x1="985" y1="150" x2="985" y2="590"/>` +
    `<line x1="835" y1="214" x2="1135" y2="214"/>` +
    `<rect x="915" y="320" width="9" height="76" rx="4.5" fill="#4FD1E9" fill-opacity="0.1" stroke="none"/>` +
    `<rect x="1046" y="320" width="9" height="76" rx="4.5" fill="#4FD1E9" fill-opacity="0.1" stroke="none"/>` +
    `</g>`
  );
}

function buildHeroSvg(key, label) {
  const rnd = mulberry32(seedFrom(key));
  let flakes = "";
  const count = 16;
  for (let i = 0; i < count; i++) {
    const cx = Math.round(rnd() * W);
    const cy = Math.round(rnd() * H);
    const r = 6 + Math.round(rnd() * 24);
    const op = (0.05 + rnd() * 0.12).toFixed(3);
    flakes += snowflake(cx, cy, r, op);
  }
  const glowX = Math.round(W * (0.58 + rnd() * 0.34));
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(label)}">` +
    `<defs>` +
    `<radialGradient id="glow" cx="${glowX}" cy="-40" r="760" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0" stop-color="#2FBDDA" stop-opacity="0.30"/>` +
    `<stop offset="0.55" stop-color="#0B1520" stop-opacity="0"/>` +
    `</radialGradient>` +
    `<linearGradient id="vig" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0.45" stop-color="#0B1520" stop-opacity="0"/>` +
    `<stop offset="1" stop-color="#070E15" stop-opacity="0.85"/>` +
    `</linearGradient>` +
    `</defs>` +
    `<rect width="${W}" height="${H}" fill="#0B1520"/>` +
    `<rect width="${W}" height="${H}" fill="url(#glow)"/>` +
    coolerSilhouette() +
    flakes +
    `<rect width="${W}" height="${H}" fill="url(#vig)"/>` +
    `</svg>`
  );
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ----- build the job list ----------------------------------------------------

const jobs = [];
for (const service of services) {
  const serviceName = service.name || service.title || service.slug;
  const serviceSlug = service.slug || slugify(serviceName);

  // Per-service fallback (city-agnostic).
  jobs.push({ file: `${serviceSlug}.svg`, key: serviceSlug, label: serviceName });

  for (const city of cities) {
    const cityName = city.name || city.title || city.slug;
    const citySlug = city.slug || slugify(cityName);
    jobs.push({
      file: `${serviceSlug}-${citySlug}.svg`,
      key: `${serviceSlug}-${citySlug}`,
      label: `${serviceName} in ${cityName}${site.state ? `, ${site.state}` : ""}`,
    });
  }
}

// Per-city backdrops (city pages).
for (const city of cities) {
  const cityName = city.name || city.title || city.slug;
  const citySlug = city.slug || slugify(cityName);
  jobs.push({ file: `${citySlug}.svg`, key: `city-${citySlug}`, label: `Commercial refrigeration in ${cityName}` });
}

// Named backdrops for the home page and the section/index pages.
for (const page of ["home", "services", "areas", "about", "contact", "blog"]) {
  jobs.push({ file: `page-${page}.svg`, key: `page-${page}`, label: "Commercial refrigeration" });
}

// ----- run -------------------------------------------------------------------

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

let made = 0;
let skipped = 0;

console.log(`Jobs: ${jobs.length} SVGs -> ${OUT_DIR}`);
console.log(FORCE ? "Mode: force (regenerate all)\n" : "Mode: skip existing\n");

for (const job of jobs) {
  const outPath = resolve(OUT_DIR, job.file);
  if (!FORCE && existsSync(outPath)) {
    skipped++;
    continue;
  }
  writeFileSync(outPath, buildHeroSvg(job.key, job.label), "utf8");
  made++;
}

console.log(`Done. made=${made} skipped=${skipped}`);
console.log(`Reference as: /generated/<service-slug>-<city-slug>.svg  (per-service fallback: /generated/<service-slug>.svg)`);
