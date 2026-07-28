# Cogie — Login Page

A pixel-matched, accessible, responsive login screen built with plain HTML, CSS, and vanilla JavaScript (no framework/build step required).

## 🔗 Live preview
Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## 🎨 Design
- **Typefaces:** Playfair Display (display/headings) + Inter (UI/body), loaded via Google Fonts.
- **Layout:** Two-panel split — a dark gradient "hero" panel with an eyebrow label, headline, and supporting quote on the left; a clean form panel with the Cogie mark, heading, and inputs on the right.
- Colors, spacing, and type scale were derived directly from the supplied design reference.

## 🧩 Project structure
```
cogie-login/
├── index.html          # Markup + form structure
├── styles.css          # All styling, responsive breakpoints, design tokens
├── script.js           # Validation, password toggle, submit handling
├── screenshots/         # Rendered screenshots of every state/breakpoint
└── README.md
```

## ✅ Features & best practices
- **Semantic HTML** — proper `<label>`/`<input>` pairing, `<form>`, landmark `<main>`/`<section>`.
- **Form validation** — required fields, email format check, minimum password length, inline error messages.
- **Accessibility**
  - Visible keyboard focus states on every interactive element.
  - `aria-invalid`, `aria-describedby`, and `role="alert"` / `aria-live="polite"` on error and status messages so screen readers announce issues.
  - Password-visibility toggle exposes `aria-pressed` and an accurate `aria-label` ("Show password" / "Hide password").
  - Decorative visual panel marked `aria-hidden="true"` so screen readers skip straight to the form.
  - Respects `prefers-reduced-motion`.
- **Responsive** — fluid down to small phones (390px) with a stacked layout; verified at desktop (1440px), tablet (820px), and mobile (390px) breakpoints — see `/screenshots`.
- **No inline styles/scripts** — CSS and JS are kept in separate files for readability and caching.

## 🖼️ Screenshots
| File | Description |
|---|---|
| `01-desktop-login.png` | Default state, desktop (1440px) |
| `02-tablet-login.png` | Stacked layout, tablet (820px) |
| `03-mobile-login.png` | Stacked layout, mobile (390px) |
| `04-desktop-validation-errors.png` | Empty-form submit → validation errors |
| `05-desktop-invalid-values.png` | Invalid email / too-short password |
| `06-desktop-password-visible.png` | Password visibility toggled on |
| `07-desktop-success.png` | Successful sign-in state |

## 🚀 Deploying to GitHub
```bash
cd cogie-login
git add .
git commit -m "Initial commit: Cogie login page"
git branch -M main
git remote add origin https://github.com/<your-username>/cogie-login.git
git push -u origin main
```
Then make the repository public under **Settings → General → Danger Zone → Change visibility**.
