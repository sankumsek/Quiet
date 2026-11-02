# Materials

Translucent surfaces that blur and tint whatever scrolls behind them, for bars, sidebars, menus and sheets.

Use `q-material` plus one thickness: `--ultrathin` (overlays on media), `--thin` (toolbars, tab bars), `--regular` (the default: nav bars, sidebars, popovers), `--thick` (sheets with lots of text). Each pairs a `material-*` colour with a `blur-*` radius and 180% saturation.

Rules: materials are for things that float over content, never for the page itself or for cards in the flow (use `surface`). Text on a material is `ink` or `ink-secondary` only. Falls back to solid `surface` when the browser lacks backdrop-filter or the user asks for reduced transparency. Blur is GPU work; avoid stacking materials or animating large blurred areas.
