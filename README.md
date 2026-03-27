# LooFinder - Shenzhen Toilet Finder

React + Vite app for finding nearby toilets and Shenzhen metro station toilet locations.

## Local Development

Prerequisite: Node.js 20+

1. Install dependencies
   - `npm install`
2. Run dev server
   - `npm run dev`
3. Build production bundle
   - `npm run build`

## Deploy to Vercel

This project is ready for Vercel deployment with `vercel.json`:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrite: all routes -> `index.html`

### Option A: Deploy from GitHub (recommended)

1. Push code to GitHub repository.
2. In Vercel, click **Add New Project** and import the GitHub repo.
3. Keep default settings from `vercel.json`.
4. Click **Deploy**.

### Option B: Deploy via Vercel CLI

1. Install CLI
   - `npm i -g vercel`
2. Login
   - `vercel login`
3. Deploy
   - `vercel --prod`
