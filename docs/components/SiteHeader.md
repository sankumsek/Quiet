# SiteHeader

The site's top bar: your name on the left, a few navigation links on the right, on `material-regular` so content blurs underneath as it scrolls.

Markup: `header.q-header.q-material.q-material--regular > .q-header__inner > a.q-header__name + nav.q-nav`. Mark the current section with `aria-current="page"` (ink, semibold); other links are `ink-secondary` and get a `surface-sunken` pill on hover. Height is `height-header`, width is `width-wide`. Keep it to three to five links; the name links home. Consumer provides the links and current page.
