# Sarmad Saeed Portfolio - Mobile Optimisation Report

## Main issue fixed

The welcome screen was not reliable on small mobile screens because the intro overlay was taller than the phone viewport while the page was locked with `overflow: hidden`. On 320px and 360px wide devices, the **Continue to portfolio** button could sit below the visible area, making the portfolio appear broken.

## Professional fixes applied

- Made the welcome screen mobile-safe with `100vh` / `100dvh` support.
- Added scroll support inside the welcome overlay and welcome card.
- Compressed the welcome card spacing on small phones without changing the desktop design.
- Kept the **Continue to portfolio** button visible and tappable on 320px, 360px, 375px, 390px, and 414px phone widths.
- Changed the mobile menu into a floating dropdown below the header so the sticky header no longer expands across most of the phone screen.
- Reduced the mobile header height from roughly 138px on very small screens to about 62px.
- Added safe-area support for iPhone notch / dynamic island devices using `viewport-fit=cover` and `env(safe-area-inset-*)`.
- Improved tap targets for buttons and navigation links.
- Added stronger wrapping rules for emails, phone numbers, LinkedIn URL, long headings, and terminal-style text.
- Disabled the heavy matrix canvas effect on small touch devices for smoother mobile performance.
- Kept animations and visual effects active on desktop where they are more suitable.
- Added responsive handling for portrait, landscape, small phones, tablets, laptops, and desktops.
- Added menu close-on-outside-click and automatic menu reset when switching from mobile to desktop width.

## Responsive QA completed

Tested viewport widths:

- 320 x 568
- 360 x 740
- 375 x 667
- 390 x 844
- 414 x 896
- 768 x 1024
- 1024 x 768
- 1366 x 768

Results:

- Continue button visible on tested mobile sizes.
- Continue button clickable on tested mobile sizes.
- No horizontal page overflow detected.
- Mobile navigation opens correctly.
- Mobile navigation updates `aria-expanded` correctly.
- JavaScript syntax check passed.
- CSS parse check passed.
- Local links and internal anchors passed.

## Files changed

- `index.html`
- `styles.css`
- `script.js`

The CV PDF and DOCX files were preserved from the previous professional CV version.
