# Book Publisher — Frontend

This directory contains all the frontend source files for the Book Publisher website.

## Tech Stack
- **HTML5** — page structure (`index.html`, `books.html`, `about.html`, `reviews.html`, `booklet.html`, `preview.html`)
- **CSS** — `styles.css` (custom styles)
- **JavaScript** — `script.js` (interactivity)
- **Vite** — build tool & dev server
- **Tailwind CSS** — utility classes

## Local Development

```bash
# Install dependencies
npm install

# Start dev server on http://localhost:3000
npm run dev
```

The Vite dev server runs on **port 3000** (`http://localhost:3000`).

## Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

## Project Structure

```
frontend/
├── index.html          # Entry point
├── books.html          # Books listing page
├── about.html          # About page
├── reviews.html        # Reviews page
├── booklet.html        # Booklet page
├── preview.html        # Preview page
├── styles.css          # Global stylesheet
├── script.js           # Main JavaScript
├── src/                # Source files
├── public/             # Static assets
├── reviews_assets/     # Review images & media
├── package.json
├── vite.config.ts
└── tailwind.config.js
```
