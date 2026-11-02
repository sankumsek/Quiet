# SegmentedControl

Switches between two to five mutually exclusive views of the same content.

A `surface-sunken` track holds the segments; the selected one becomes a raised `surface` thumb with `shadow-1` and `ink` text, the rest stay `ink-secondary`. Keep labels to one short word. For navigation between unrelated sections use tabs instead. Consumer sets `aria-pressed` on the active segment and handles changes.
