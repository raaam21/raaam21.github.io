# Bramharishi Shukla: portfolio

A one-page personal site with a terminal look, built with React and Vite and hosted on GitHub Pages.

## Editing content

All the text is in **`src/data.js`**: profile, impact numbers, experience, projects, skills, achievements and education.
Edit that file and the page updates. You don't need to touch the layout.

- To add a job or project, copy an existing `{ ... }` block in its list and change the text.
- To highlight text, wrap it in `**double stars**`.
- To show a resume, put the PDF at `public/resume.pdf`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173, reloads as you edit
```

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages.

The first time only:
1. Create a GitHub repo named `raaam21.github.io` and push this folder to it.
2. In the repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.

The site goes live at `https://raaam21.github.io`.

## Files

| File | Purpose |
|---|---|
| `src/data.js` | All content |
| `src/App.jsx` | Layout, terminal, animations |
| `src/index.css` | Styles; theme colors are at the top |
| `.github/workflows/deploy.yml` | Build and deploy |
