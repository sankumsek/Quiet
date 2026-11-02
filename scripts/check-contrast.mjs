// Checks the colour pairings Quiet relies on, in every theme. Exits 1 on any failure.
// Usage: node scripts/check-contrast.mjs   (run after changing tokens/tokens.json)
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const t = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const themes = t.color.themes.map((x) => x.id);
const byName = Object.fromEntries(t.color.tokens.map((x) => [x.name, x]));
const hex = (name, th) => {
  const tok = byName[name];
  const v = typeof tok.value === 'string' ? tok.value : (tok.value[th] ?? tok.value[themes[0]]);
  const m = /^\{(.+)\}$/.exec(v);
  return m ? hex(m[1], th) : v;
};
const lum = (h) => {
  const c = h.replace('#', '').match(/../g).map((x) => parseInt(x, 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort(); return (y + 0.05) / (x + 0.05); };

// [foreground, background, minimum] — 4.5 for text, 3 for control boundaries.
const text = ['ink', 'ink-secondary', 'ink-tertiary'];
const grounds = ['bg', 'surface', 'surface-sunken'];
const pairs = [
  ...text.flatMap((f) => grounds.map((g) => [f, g, 4.5])),
  ['accent', 'bg', 4.5], ['accent', 'surface', 4.5], ['accent', 'surface-sunken', 4.5], ['accent', 'accent-soft', 4.5],
  ['on-accent', 'accent', 4.5],
  ['success', 'surface', 4.5], ['success', 'surface-sunken', 4.5],
  ['warning', 'surface', 4.5], ['warning', 'surface-sunken', 4.5],
  ['danger', 'surface', 4.5], ['danger', 'bg', 4.5],
  ['control-border', 'bg', 3], ['control-border', 'surface', 3],
];

let failed = 0;
for (const th of themes) {
  for (const [f, b, min] of pairs) {
    const r = ratio(hex(f, th), hex(b, th));
    const ok = r >= min;
    if (!ok) failed++;
    console.log(`${ok ? 'pass' : 'FAIL'}  ${th.padEnd(5)}  ${f} on ${b}: ${r.toFixed(2)}:1 (needs ${min})`);
  }
}
console.log(failed ? `\n${failed} pairing(s) fail.` : '\nAll pairings pass.');
process.exit(failed ? 1 : 0);
