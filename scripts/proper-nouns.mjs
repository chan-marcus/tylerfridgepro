// Place names and other proper nouns that must never break across lines.
// scripts/typeset.mjs wraps every match on every page in <span class="pn">,
// which is white-space: nowrap. This rule outranks line fill and balance.
//
// Add the market's multi-word names here as the copy mentions them: towns,
// neighborhoods, landmarks, rivers, parks, institutions, and two-word plant or
// product names. Single words need no entry unless they contain a hyphen.
// Longest wins, so list a longer form ("Prescott Valley") alongside any
// shorter one it contains.
export const NAMES = [
  'Tyler Fridge Pro', 'Smith County', 'Henderson County', 'Cherokee County',
  'East Texas', 'Piney Woods', 'Lake Palestine', 'Lake Tyler', 'South Broadway',
  'Garden Valley', 'Mount Sylvan', 'Emerald Bay', 'Coker Springs', 'Azalea District',
  'Cannery District', 'Mill Creek', 'Red Springs', 'New London', 'Callender Lake',
  'Cedar Creek', 'Travel Plaza', 'UT Tyler', 'Google Maps'
];

const STREET = '(?:Road|Lane|Avenue|Boulevard|Street|Parkway|Way|Drive|Highway|Freeway|Bypass|Trail)';
const CAP = "[A-Z][A-Za-z'-]*";

export const PATTERNS = [
  // Highway 89, Highway 89A, State Route 4, Interstate 17, I-80, CA 99, SR 69
  /\b(?:Highway|Interstate|State Route|Route|SR|CA)[  ]\d+[A-Z]?\b/,
  /\bI-\d+\b/,
  // Two or three capitalized words ending in a street type: Iron Springs Road
  new RegExp(`\\b(?:${CAP}[ \\u00a0]){1,3}${STREET}\\b`),
  // Phone numbers: (707) 356-ROAD, (707) 356-7623
  /\(\d{3}\)[  ]\d{3}-[0-9A-Z]{4}\b/,
  // Dates: October 9, 2026
  /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)[  ]\d{1,2}(?:,[  ]\d{4})?\b/,
  // Measurements that read as one unit: 5,400 feet, 100 feet
  /\b\d{1,3}(?:,\d{3})?[  ](?:feet|ft|inches|miles)\b/,
  // ZIP 95202
  /\bZIP[  ]\d{5}\b/
];

// Leading words a street-name match must not swallow (sentence starts and
// prepositions that happen to be capitalized at the start of a sentence).
export const NOT_PART_OF_NAME = new Set([
  'The', 'A', 'An', 'On', 'In', 'At', 'From', 'To', 'Off', 'Near', 'Past', 'Via',
  'And', 'Or', 'Add', 'Covering', 'Inside', 'North', 'South', 'East', 'West',
  'Take', 'Use', 'Avoid', 'Many', 'Most', 'Downtown', 'Along', 'Up', 'Down', 'Above', 'Below'
]);
