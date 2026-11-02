# CodeBlock

A code sample with an optional filename bar and a copy button.

Sits on `surface-sunken` with `radius-md`, set in the `code` style (mono 14/22) and scrolls horizontally rather than wrapping. Highlighting is deliberately minimal and uses theme tokens so it passes contrast in both themes: keywords `.k` accent, strings `.s` success, numbers `.n` warning, comments `.c` ink-tertiary italic. If you use a highlighter (Shiki, Prism), map its classes onto these four. Consumer provides the code, filename and copy handler.
