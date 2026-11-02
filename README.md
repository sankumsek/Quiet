# Quiet

A calm, Apple-inspired design system for personal sites and blogs. Content first, one accent for action, nothing that shouts.

- **Tokens** for colour (light + dark), type, spacing, radius, shadow, blur and layout, kept in one JSON file.
- **21 plain-CSS components**: controls (button, field, toggle, segmented control, grouped list) and a full blog kit (header, article, prose, code, figures, tags, post cards, author, newsletter, footer).
- **Light and dark** that follow the OS by default, with an opt-in `data-theme` override. Every text pairing meets WCAG AA in both.
- **No framework, no dependencies.** Works with Astro, Next, Eleventy, Hugo or a single HTML file.

## Use it

### Option 1: link the CSS

Pin a tag so a later change can't break your site:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sankumsek/Quiet@v1.0.0/dist/quiet.css">
```

### Option 2: install from GitHub

```sh
npm install github:sankumsek/Quiet#v1.0.0
```

```js
import 'quiet-design-system/quiet.css';          // everything
// or pick: tokens.css, type.css, components.css
import tokens from 'quiet-design-system';         // raw values in JS/TS
tokens.color.accent.dark;                         // "#5b8ef0"
```

### Then write markup

```html
<button class="q-btn q-btn--primary">Save</button>

<article class="q-measure">
  <header class="q-article-header">
    <h1>Post title</h1>
    <p class="q-dek">One-sentence summary.</p>
  </header>
  <div class="q-prose"><!-- your rendered Markdown --></div>
</article>
```

Use the tokens in your own CSS: `background: var(--surface); border-radius: var(--radius-md);`.

## Theming

| You want | Do this |
| --- | --- |
| Follow the OS | Nothing. This is the default. |
| Force a theme | `<html data-theme="light">` or `"dark"` |
| A themed section | `data-theme="dark"` on any element; it re-scopes everything inside |

## What's in the box

| File | What |
| --- | --- |
| `dist/quiet.css` | Tokens + type classes + base + components. Most projects need only this. |
| `dist/tokens.css` | CSS custom properties only |
| `dist/type.css` | `.q-large-title`, `.q-body`, `.q-article-body`… one class per type style |
| `dist/components.css` | Component classes only (needs tokens.css) |
| `dist/tokens.js`, `.d.ts` | Token values for JS and TypeScript |
| `tokens/tokens.json` | **Source of truth.** Every token with light/dark values and a usage note |
| `docs/guidelines.md` | The brand book: principles, colour, type, materials, blog layouts, voice |
| `docs/components/*.md` | One page per component: when to use it, which tokens, what you provide |
| `examples/index.html` | Gallery of every component with a theme switcher |
| `examples/post.html` | A complete blog post page |

To preview the examples locally: `npm run preview`, then open `/examples/`.

## Changing the system

1. Edit `tokens/tokens.json` (or `src/*.css` for components).
2. `npm run build` regenerates `dist/`.
3. `npm run check` verifies 45 contrast pairings across both themes and fails if any drop below AA.
4. Bump the version in `package.json`, note it in `CHANGELOG.md`, commit, and tag (`git tag v1.1.0`).

`dist/` is committed on purpose, so CDN links and GitHub installs work without a build step.

## Principles

1. **Content is the interface.** Whitespace and grouping before borders and boxes.
2. **One accent for action.** `accent` means "you can act on this". The twelve system colours are for identity (tags, icons, charts), never buttons.
3. **Depth is earned.** Flat by default; materials and shadows only for things that float.
4. **Soft, not round.** Corners come from the radius scale.
5. **Both themes are first-class.**

Full guidance lives in [docs/guidelines.md](docs/guidelines.md).

## License

BSD 3-Clause. See [LICENSE](LICENSE).
