# ListGroup

The workhorse layout: rows grouped on a rounded `surface` card, with an optional header and footer.

Rows are at least 44px tall with `space-4` side insets; hairline `separator` dividers start at the text inset, not the edge. A row holds a title, an optional trailing `ink-secondary` detail, and a chevron (navigates), toggle (changes a setting) or nothing. Selected rows use `accent-soft` with `accent` text. Headers and footers are `footnote` in `ink-secondary`, sentence case. Consumer provides rows and their actions.
