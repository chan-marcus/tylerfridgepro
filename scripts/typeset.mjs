// Post-build typesetting for running text in dist/*.html.
//
// House rule: no lone straggler word at the end of a block, and no sentence
// that starts in the last word or two of a line or ends in the first word or
// two of the next. CSS (text-wrap: pretty) only guards the last line and
// Firefox ignores it, so this joins words with non-breaking spaces:
//   - the last two words of every paragraph, list item and caption
//   - the three words either side of each sentence break, so a line breaks
//     either exactly at the boundary or at least three words away from it
// Only text inside <p>, <li>, <figcaption> and <dd> is touched. Markup is left
// alone apart from nowrap spans around hyphenated words in a joined run.
//
// Before any of that, and outranking it: place names and other proper nouns
// (scripts/proper-nouns.mjs) are wrapped in <span class="pn"> everywhere in the
// page body, headings and labels included, so "Smith County" never
// breaks across lines.
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { NAMES, PATTERNS, NOT_PART_OF_NAME } from './proper-nouns.mjs';

const NBSP = '\u00a0';
const ENDS = /[.?!](&#39;|&quot;|["')\u201d])?$/;
const STARTS = /^(&quot;|["'(\u201c])?[A-Z0-9]/;
const MAX_RUN = 36; // characters; longer joined runs risk overflowing a phone line

const HYPHEN = /[-\u2013]/;

// Characters of text a run of words occupies, with entities counted as one.
function visibleLength(str) {
  return str.replace(/&#?\w+;/g, 'x').length;
}

// Works on the block's text as one stream, so a sentence break that crosses a
// tag ("<strong>Call first.</strong> Then step back") is still seen. Joins are made
// by turning the whitespace between two words into a no-break space, wherever
// that whitespace sits. Hyphenated words inside a joined run are wrapped in a
// nowrap span, because browsers also break lines after a hyphen or en dash.
function typesetBlock(inner) {
  const parts = inner.split(/(<[^>]+>)/);
  // Words: maximal runs of non-space text across text parts (tags are ignored).
  const words = []; // { text, segs: [{ part, start, end }] }
  const gaps = [];  // gaps[i]: whitespace locations between word i and i + 1
  let cur = null, pendingGap = [];
  parts.forEach((p, pi) => {
    if (p.startsWith('<')) return;
    const re = /(\s+)|([^\s]+)/g; let m;
    while ((m = re.exec(p))) {
      if (m[1]) {
        if (cur) { words.push(cur); cur = null; pendingGap = []; }
        pendingGap.push({ part: pi, start: m.index, end: m.index + m[1].length });
      } else {
        if (!cur) {
          if (words.length) gaps[words.length - 1] = pendingGap;
          pendingGap = [];
          cur = { text: '', segs: [] };
        }
        cur.text += m[2];
        cur.segs.push({ part: pi, start: m.index, end: m.index + m[2].length });
      }
    }
  });
  if (cur) words.push(cur);
  if (words.length < 3) return inner;

  const n = words.length;
  const join = new Array(n).fill(false);
  const boundary = new Array(n).fill(false);
  for (let i = 0; i < n - 1; i++) boundary[i] = ENDS.test(words[i].text) && STARTS.test(words[i + 1].text);
  // A line may break exactly at a sentence boundary (the ideal case), so that
  // gap stays open. The last three words before it and the first three after it
  // are joined, so any other break lands at least three words from the boundary.
  for (let i = 0; i < n - 1; i++) {
    if (!boundary[i]) continue;
    for (const k of [i - 2, i - 1, i + 1, i + 2]) {
      if (k >= 0 && k < n - 1 && !boundary[k]) join[k] = true;
    }
  }
  if (!boundary[n - 2]) join[n - 2] = true;
  // Safety: split any joined run too long for a phone line at its middle.
  const runLen = (a, b) => words.slice(a, b + 1).reduce((t, w) => t + visibleLength(w.text) + 1, -1);
  for (let a = 0; a < n; ) {
    let b = a;
    while (b < n - 1 && join[b]) b++;
    if (b > a && runLen(a, b) > MAX_RUN) join[Math.floor((a + b - 1) / 2)] = false;
    else a = b + 1;
  }

  // Collect edits per part, then apply them from the end so offsets hold.
  const edits = parts.map(() => []);
  for (let i = 0; i < n - 1; i++) {
    if (!join[i] || !gaps[i] || !gaps[i].length) continue;
    gaps[i].forEach((g, gi) => edits[g.part].push({ start: g.start, end: g.end, text: gi === 0 ? NBSP : '' }));
  }
  words.forEach((w, i) => {
    const glued = join[i] || (i > 0 && join[i - 1]);
    if (!glued || !HYPHEN.test(w.text) || w.segs.length !== 1) return;
    const sg = w.segs[0];
    edits[sg.part].push({ start: sg.start, end: sg.start, text: '<span class="nw">' });
    edits[sg.part].push({ start: sg.end, end: sg.end, text: '</span>' });
  });
  return parts.map((p, pi) => {
    if (!edits[pi].length) return p;
    let out = p;
    edits[pi].sort((x, y) => y.start - x.start || (y.end - x.end));
    for (const e of edits[pi]) out = out.slice(0, e.start) + e.text + out.slice(e.end);
    return out;
  }).join('');
}

// ---------- proper nouns ----------

const escapeRe = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const NAME_RE = new RegExp(
  [...NAMES].sort((x, y) => y.length - x.length)
    .map((n) => '\\b' + escapeRe(n).replace(/ /g, '[ \\u00a0]') + '\\b')
    .concat(PATTERNS.map((r) => r.source))
    .join('|'),
  'g'
);
const SKIP_TAGS = new Set(['script', 'style', 'svg', 'title', 'textarea', 'head']);

function trimLeading(match) {
  const words = match.split(/[  ]/);
  let i = 0;
  while (i < words.length - 2 && NOT_PART_OF_NAME.has(words[i])) i++;
  return { skip: words.slice(0, i).join(' ') + (i ? ' ' : ''), name: words.slice(i).join(' ') };
}

function bindText(text) {
  return text.replace(NAME_RE, (m) => {
    const { skip, name } = trimLeading(m);
    // A single word needs no binding unless it can break at a hyphen (I-5).
    if (!/[  ]/.test(name) && !/-/.test(name)) return m;
    return skip + '<span class="pn">' + name + '</span>';
  });
}

export function bindProperNouns(html) {
  const bodyAt = html.indexOf('<body');
  if (bodyAt < 0) return html;
  const parts = html.slice(bodyAt).split(/(<[^>]+>)/);
  const stack = [];
  const out = parts.map((p) => {
    if (p.startsWith('<')) {
      const m = p.match(/^<(\/?)([a-zA-Z0-9-]+)/);
      if (m) {
        const tag = m[2].toLowerCase();
        if (SKIP_TAGS.has(tag) && !p.endsWith('/>')) {
          if (m[1]) { if (stack[stack.length - 1] === tag) stack.pop(); } else stack.push(tag);
        }
      }
      return p;
    }
    return stack.length ? p : bindText(p);
  });
  return html.slice(0, bodyAt) + out.join('');
}

// Headings are balanced by CSS, not joined, but a hyphenated word in one
// ("cleaned-up") must not split at its hyphen.
function bindHeadingHyphens(html) {
  return html.replace(/(<(h1|h2|h3)(\s[^>]*)?>)([\s\S]*?)(<\/\2>)/g, (_, open, _t, _a, inner, close) =>
    open + inner.split(/(<[^>]+>)/).map((p) => p.startsWith('<') ? p
      : p.replace(/[^\s\u00a0<>]*[A-Za-z][-\u2013][A-Za-z][^\s\u00a0<>]*/g, (w) => '<span class="nw">' + w + '</span>')).join('') + close);
}

function processHtml(html) {
  html = bindHeadingHyphens(html);
  return html.replace(/(<(p|li|figcaption|dd)(\s[^>]*)?>)([\s\S]*?)(<\/\2>)/g,
    (_, open, _tag, _attrs, inner, close) => open + typesetBlock(inner) + close);
}

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (p.endsWith('.html')) yield p;
  }
}

export function typesetDist(dir) {
  let n = 0;
  for (const file of walk(dir)) {
    const html = readFileSync(file, 'utf8');
    const out = processHtml(bindProperNouns(html));
    if (out !== html) { writeFileSync(file, out); n++; }
  }
  return n;
}
