# Quiet

A calm, native-feeling design system for personal projects. Content first, one accent for action, nothing that shouts.

Quiet follows Apple's platform conventions closely — the system colour palette, translucent materials, the eleven-step type scale, soft grouped surfaces — while keeping its own neutrals, accent and component styling, and fewer variants to choose between.

## Principles

1. **Content is the interface.** Chrome recedes. Prefer whitespace and grouping over borders, boxes and dividers.
2. **One accent for action.** `accent` marks what you can act on and what is selected. The twelve system colours give content identity (tags, icons, charts) but never mean "tap here". One primary button per view.
3. **Depth is earned.** Flat by default. `shadow-1` for resting cards; things that float (bars, menus, sheets) get a material, and `shadow-2` when they need separation.
4. **Soft, not round.** Corners come from the radius scale: `radius-md` for most things, `radius-full` only for pills and toggles.
5. **Both themes are first-class.** Every pairing is checked in light and dark. Dark is near-black, not grey.

## Colour

Neutral-first. A page is `bg`; content sits on `surface` cards or grouped lists; inputs and tracks are `surface-sunken`. Text steps down through `ink` → `ink-secondary` → `ink-tertiary`, and all three meet 4.5:1 on every surface in both themes.

| Use | Token |
| --- | --- |
| Page | `bg` |
| Card, grouped list, sheet | `surface` |
| Input, track, well | `surface-sunken` |
| Thumb or knob on a track | `surface-raised` |
| Divider between rows | `separator` (decorative only) |
| Outline that defines a control | `control-border` (3:1) |
| Action, link, selection, focus ring | `accent` with `on-accent` text |
| Selected row, secondary button | `accent-soft` with `accent` text |
| State | `success`, `warning`, `danger` — never decoration |

Don't introduce a second brand hue. If something needs emphasis, use weight or size before colour.

### System colours

Twelve content colours with Apple's exact values in both themes: `system-red`, `-orange`, `-yellow`, `-green`, `-mint`, `-teal`, `-cyan`, `-blue`, `-indigo`, `-purple`, `-pink`, `-brown`. Use them for category tags, list-row icon tiles, chart series, calendar and avatar colours.

- Not for buttons, links or selection — that stays `accent`.
- Not for states — errors are `danger`, not `system-red` (the state tokens are darkened to pass as text).
- In light, orange, yellow, green, mint, teal and cyan fail 3:1 on white: use them as fills with `ink` on top, never as text or thin icons. Each token's note lists its contrast.
- Pick by meaning and keep it stable: once "Work" is indigo, it is indigo everywhere.

## Typography

System type: `system-ui` first, so every platform renders in its own native face (Inter / Segoe / Roboto as fallbacks). Eleven styles following Apple's scale, with three weights (400, 600, 700).

| Style | Size / line | Use |
| --- | --- | --- |
| `large-title` | 34 / 40 bold | Once per screen, top of page |
| `title-1` | 28 / 34 bold | Top-level section headings |
| `title-2` | 22 / 28 semibold | Section and sheet titles |
| `title-3` | 20 / 25 semibold | Card titles, modal headings |
| `headline` | 17 / 22 semibold | Row titles, button labels |
| `body` | 17 / 24 | Reading text |
| `callout` | 16 / 21 | Short descriptions under titles |
| `subheadline` | 15 / 20 | Dense UI, inputs, row subtitles |
| `footnote` | 13 / 18 | Group headers/footers, metadata |
| `caption-1` | 12 / 16 medium | Badges, chart labels |
| `caption-2` | 11 / 13 medium | Tab-bar labels; the floor, never body copy |

For long-form reading there is a separate **Reading** set: `article-title` 40/46 bold (32/38 on phones), `article-dek` 20/28, `article-body` 19/30 (18/28 on phones), `article-h2` 26/32, `article-h3` 20/26, and `code` in the mono family at 14/22. UI text around a post (nav, cards, meta) keeps the UI scale; only the article itself uses the reading set.

- Skip a level rather than inventing an in-between size.
- Larger sizes tighten tracking slightly (negative `letterSpacing`); small sizes don't.
- Sentence case everywhere, including buttons. Group headers in `footnote`, sentence case, `ink-secondary` — not all caps.

## Spacing & layout

A 4px base, but use the named steps, not arbitrary values: `space-4` is the default inset, `space-6` separates groups, `space-8` separates sections. Page gutters are `space-4` on phones and `space-8` on desktop. Keep reading columns around 640px wide.

Rows are at least 44px tall (`space-3` vertical padding + a `headline`/`body` line) so they are comfortable touch targets.

## Shape & elevation

`radius-sm` inputs and thumbs · `radius-md` buttons, cards, grouped lists · `radius-lg` sheets and modals · `radius-full` pills, toggles, avatars. Nested corners shrink: an inner element's radius = outer radius − the padding between them.

## Materials

Translucent, blurred surfaces for anything that floats over scrolling content, from thinnest to thickest: `material-ultrathin` (overlays on media) · `material-thin` (toolbars, tab bars) · `material-regular` (nav bars, sidebars, popovers — the default) · `material-thick` (sheets with lots of text). Each pairs with a `blur-*` radius plus 180% saturation; use the `q-material--*` classes rather than assembling it by hand.

- Never for the page or cards in the flow — those are `bg` and `surface`.
- Text on a material is `ink` or `ink-secondary` only; content behind it is unknown, so nothing lighter is guaranteed readable.
- Falls back to solid `surface` without backdrop-filter support or with reduced transparency on.
- One material layer at a time; don't animate large blurred areas.

## Blog & personal site

Quiet's main use is a personal site: a home page, a writing index, posts, and an about page.

**Widths.** Article text lives in `width-measure` (680px). Everything else — header, footer, post grids, wide figures — uses `width-wide` (1080px). Both get `space-4` side gutters.

**Page anatomy.**

- *Every page:* SiteHeader (sticky, on `material-regular`) → content → SiteFooter.
- *Home:* a short intro in `article-dek`, then PostCard grid for featured posts, then PostList for the rest.
- *Post:* ArticleHeader → Prose (with Figure, CodeBlock and Callout inside) → AuthorBio → PrevNext → Newsletter. On wide screens, a TableOfContents can sit in a sticky column to the right of the measure.
- *Archive and topic pages:* a `title-1` heading, Tags to filter, PostList grouped by year.

**Rhythm.** `space-12` above an article title and between major page sections, `space-8` between end-of-post blocks, `space-6` between paragraphs.

**Topics.** Give each topic one system colour, use it for its Tag everywhere, and never change it.

**One primary button per page.** On a post, that's the Newsletter subscribe; everything else is a link.

## Voice

Short, plain, direct. Labels are verbs ("Save", "Add item"), not "Click here to save". Confirmation copy says what happened ("Saved"), not how great it is. No exclamation marks in UI.

## Iconography

Line icons, 1.5px stroke, 20px default size, rounded caps and joins, coloured with `ink` or `accent`. No filled-and-outlined mixing within one view. (No icon set is bundled yet — Lucide is a good open-source match.)

## Motion

Quick and quiet: 150–250ms, ease-out for entering, ease-in for leaving. Toggles and segmented thumbs slide; sheets rise. Respect `prefers-reduced-motion` by cutting to fades.

## Using it

Load `dist/quiet.css` (or `tokens.css` + `components.css`) and use the `q-` classes shown in `examples/index.html` and each page in `docs/components/`. Components are plain HTML + CSS — no framework required — so they drop into any project.
