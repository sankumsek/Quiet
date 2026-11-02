// Builds dist/ from tokens/tokens.json and src/*.css. No dependencies.
// Usage: node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const write = (p, s) => { mkdirSync(dirname(join(root, p)), { recursive: true }); writeFileSync(join(root, p), s); };

const t = JSON.parse(read('tokens/tokens.json'));
const { version } = JSON.parse(read('package.json'));
const banner = `/*! Quiet design system v${version} — generated from tokens/tokens.json. Do not edit by hand. */\n`;

const themes = t.color.themes.map((th) => th.id);
const [first, ...rest] = themes;
const themed = [...t.color.tokens, ...(t.shadow?.tokens ?? [])];
const valueFor = (tok, th) => {
  const v = typeof tok.value === 'string' ? tok.value : (tok.value[th] ?? tok.value[first]);
  return typeof v === 'string' ? v.replace(/^\{(.+)\}$/, 'var(--$1)') : v;
};
const decls = (th) => themed.map((tok) => `  --${tok.name}: ${valueFor(tok, th)};`).join('\n');
const flatFamilies = Object.entries(t).filter(([k, v]) => !['color', 'shadow', 'type'].includes(k) && v && Array.isArray(v.tokens));
const len = (v) => (typeof v === 'number' ? `${v}px` : v);

let css = banner;
css += `\n:root,\n[data-theme="${first}"] {\n  color-scheme: ${first};\n${decls(first)}\n}\n`;
for (const th of rest) {
  css += `\n[data-theme="${th}"] {\n  color-scheme: ${th};\n${decls(th)}\n}\n`;
  if (th === 'dark') {
    css += `\n/* Follow the OS setting unless a data-theme is set. */\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="${first}"]) {\n    color-scheme: dark;\n${decls(th).replace(/^/gm, '  ')}\n  }\n}\n`;
  }
}
css += `\n:root {\n`;
for (const [, fam] of flatFamilies) for (const tok of fam.tokens) css += `  --${tok.name}: ${len(tok.value)};\n`;
for (const [k, v] of Object.entries(t.type.families)) css += `  --font-${k}: ${v};\n`;
css += `}\n`;

let type = '';
for (const g of t.type.groups) {
  type += `\n/* ${g.name} */\n`;
  for (const s of g.styles) {
    const fam = s.family ?? g.family;
    const parts = [`font-family: var(--font-${fam})`, `font-size: ${len(s.fontSize)}`, `line-height: ${len(s.lineHeight)}`, `font-weight: ${s.fontWeight}`];
    if (s.letterSpacing) parts.push(`letter-spacing: ${s.letterSpacing}`);
    type += `.q-${s.name} { ${parts.join('; ')}; }\n`;
  }
}
const typeCss = banner + '/* One class per type style: <h1 class="q-large-title">… */\n' + type;

write('dist/tokens.css', css);
write('dist/type.css', typeCss);
write('dist/components.css', banner + read('src/components.css'));
write('dist/quiet.css', [css, typeCss.replace(banner, ''), '\n/* Base */\n' + read('src/base.css'), '\n' + read('src/components.css')].join(''));

// JS / TS access to raw values
const out = { name: t.name, themes, color: {}, type: t.type };
for (const tok of themed) out.color[tok.name] = Object.fromEntries(themes.map((th) => [th, valueFor(tok, th)]));
for (const [k, fam] of flatFamilies) out[k] = Object.fromEntries(fam.tokens.map((tok) => [tok.name, len(tok.value)]));
write('dist/tokens.js', `${banner.replace('/*!', '/**')}export default ${JSON.stringify(out, null, 2)};\n`);
write('dist/tokens.d.ts', `${banner.replace('/*!', '/**')}declare const tokens: {\n  name: string;\n  themes: ${JSON.stringify(themes)}[number][];\n  color: Record<${themed.map((x) => JSON.stringify(x.name)).join(' | ')}, Record<${themes.map((x) => JSON.stringify(x)).join(' | ')}, string>>;\n${flatFamilies.map(([k, fam]) => `  ${k}: Record<${fam.tokens.map((x) => JSON.stringify(x.name)).join(' | ')}, string>;`).join('\n')}\n  type: unknown;\n};\nexport default tokens;\n`);

console.log(`Built dist/ — ${themed.length} themed tokens, ${flatFamilies.reduce((n, [, f]) => n + f.tokens.length, 0)} scale tokens, ${t.type.groups.reduce((n, g) => n + g.styles.length, 0)} type styles.`);
