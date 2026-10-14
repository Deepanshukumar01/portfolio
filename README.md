# Deepanshu Kumar — Portfolio

Personal portfolio built with **React + Vite**, plain CSS (design tokens in `src/styles/global.css`), `lucide-react` for UI icons and `react-icons` for tech logos.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## Where to edit things

All content lives in `src/data/` — components never need to change for content updates.

| What | Where |
| --- | --- |
| Email, LinkedIn URL, photo, resume path, contact form endpoint | `src/data/profile.js` (search for `TODO`) |
| Projects (cards + details modal) | `src/data/projects.js` |
| Skills and proficiency labels | `src/data/skills.js` |
| Job simulations, workshops, events, communities | `src/data/experience.js` |
| Education card + journey (shown in About), college name | `src/data/education.js` |
| Navbar links / section order and numbering | `navLinks` in `src/data/profile.js` |
| SEO / Open Graph URLs | `index.html` (search for `TODO`) |

### Files to add to `public/`

- `public/resume.pdf` — used by every resume button. Until it exists, the buttons show a friendly fallback message.
- `public/profile.jpg` — then set `photo: "/profile.jpg"` in `profile.js`.
- `public/projects/*.png` — real screenshots (≈1600×1000); update each project's `image`.
- `public/og-image.png` — 1200×630 image for link previews.

### Contact form

With `contactFormEndpoint` empty, **Send Message** opens the visitor's email app. To receive messages directly, create a free form at [formspree.io](https://formspree.io) and paste its endpoint URL into `contactFormEndpoint`.

## GitHub section

Fetches public data from the GitHub REST API (no API key, cached per session) and the contribution calendar from `github-contributions-api.jogruber.de`. If either is unavailable, it falls back to a link to the GitHub profile.

## Deploy

**Vercel:** push to GitHub → vercel.com → *Add New Project* → import the repo → framework preset **Vite** (build `npm run build`, output `dist`) → Deploy.

**Netlify:** push to GitHub → app.netlify.com → *Add new site → Import an existing project* → build command `npm run build`, publish directory `dist` → Deploy.

After deploying, replace `https://your-portfolio-url.example/` in `index.html` with your real URL.
