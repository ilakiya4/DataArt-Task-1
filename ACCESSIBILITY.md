=> Keyboard Navigation

* Navigate timeline events with Arrow keys, Home, End.

* Tab/Shift+Tab cycles through modal focusable elements.

* Enter/Space activates “View Details”.

* Escape closes modal and returns focus.

=> Focus & Modal

* Modal has focus trap.

* Focus returns to triggering button on close.

* Active timeline marker uses aria-current="true".

=> Screen Reader Support

* Timeline: <main role="list">, <section role="listitem">.

* Modal: role="dialog", aria-modal="true", aria-labelledby, aria-describedby.

* Audio narration reads event title and description on modal open.

=> Visual Accessibility

* Dark mode supported.

* Color contrast meets WCAG AA.

* Reduced-motion media query supported.