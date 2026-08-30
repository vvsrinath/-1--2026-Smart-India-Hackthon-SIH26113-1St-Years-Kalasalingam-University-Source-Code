# Swasthya Sathi — Deployment Guide

## 🚀 Quick Start

### Local Development
```bash
npm install                    # Install dependencies (one time)
npm run dev                    # Start dev server on http://localhost:5173
```

### Production Build
```bash
npm run build                  # Create optimized bundle in dist/
npm run preview               # Preview production build locally on http://localhost:4173
```

---

## 📦 Build Output

After `npm run build`, the `dist/` folder contains:
```
dist/
├── index.html                # Main HTML file
├── manifest.webmanifest      # PWA manifest
├── logo.png                  # App logo
├── images/                   # Sample photos
├── assets/
│   ├── index-*.css          # Tailwind CSS (≈30 kB gzipped)
│   └── index-*.js           # React + app code (≈152 kB gzipped)
├── sw.js                     # Service worker
└── icons/
    ├── apple-touch-icon.png
    ├── icon-192.png
    ├── icon-512.png
    └── icon-maskable.png
```

> Note: this is a single-page app (client-side routing via React Router). Any
> static host must route unmatched paths back to `/index.html`.

---

## 🌐 Deployment Platforms

### 1. Vercel (Recommended)
**Best for**: Zero-config deployment + PWA + HTTPS + Git integration

This repo already includes `vercel.json` with:
- SPA rewrites (`(.*)` → `/index.html`) so deep links and refreshes work
- Security headers (nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- `no-cache` for `/sw.js` and the manifest
- `immutable` cache for `/assets/*`

#### Deploy via Dashboard (recommended)
1. Push the repo to GitHub (this repo does)
2. On Vercel: **Add New → Project → Import** this repository
3. Project settings must be:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`  ← important (the app lives at the repo root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy — Vercel auto-detects Vite from `vite.config.ts`

#### Deploy via CLI
```bash
npm i -g vercel
vercel --prod          # requires a Vercel login/token
```

> **Known issue worked around**: an earlier deploy returned `404 NOT_FOUND`
> because the Root Directory pointed at a stale `frontend/` folder that no
> longer exists. The app is now at the repository **root**, so Root Directory
> must be `./` and Output Directory `dist`.

### 2. GitHub Pages (Auto-Deploy Included)
A workflow is already included at `.github/workflows/deploy.yml`. On every push
to `main` it:
1. Checks out the repo
2. Runs `npm ci && npm run build`
3. Uploads `dist/` and deploys via `actions/deploy-pages@v4`

To enable it: **Settings → Pages → Source: GitHub Actions** (it must be set to
"GitHub Actions" for the `actions/deploy-pages` step to work).

> For client-side routing on GitHub Pages, add a `404.html` copy of `index.html`
> to the deployed output so unknown routes fall back to the app. GitHub Pages
> serves `404.html` for unmatched paths.

### 3. Netlify
The previous `netlify.toml` was removed when the app moved to the repo root, but
Netlify works fine with the same settings:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- Optional `netlify.toml` if you want a committed config:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 4. Docker (for Custom Servers)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "preview"]
```

---

## ✅ Pre-Deployment Checklist

### Code Quality
- [ ] `npm run build` succeeds (Vite)
- [ ] No console errors when navigating the app
- [ ] All demo data / routes load correctly

### PWA Setup
- [ ] Service worker registered (DevTools → Application → Service Workers)
- [ ] Manifest valid (no warnings in DevTools)
- [ ] App icons present in `/public/icons/`
- [ ] HTTPS enabled on production domain

### Testing
- [ ] All routes work correctly (deep links + refresh)
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Navigation between workspaces functional
- [ ] Offline mode works (test in DevTools)
- [ ] Desktop install prompt + Window Controls Overlay title bar (desktop Chrome/Edge)

### Performance / SEO
- [ ] Lighthouse score 80+ (mobile)
- [ ] Meta tags present in index.html
- [ ] Open Graph tags for social sharing

---

## 🔐 Security Considerations

Enabled in `vercel.json`/`index.html`:
✅ X-Content-Type-Options: nosniff  
✅ X-Frame-Options: SAMEORIGIN  
✅ Referrer-Policy: strict-origin-when-cross-origin  
✅ Permissions-Policy restricted  
✅ `no-cache` on `/sw.js` so the service worker updates  
✅ Immutable caching on `/assets/*`

### Service Worker Security
- Only registers from HTTPS origins
- Scope limited to app path
- No cross-origin resource caching
- Automatic cache cleanup on updates (`swasthya-sathi-v4`)

---

## 🔄 Continuous Deployment

### GitHub Pages (already included)
See `.github/workflows/deploy.yml` — triggers on push to `main` (and manual
`workflow_dispatch`). Requires **Settings → Pages → Source: GitHub Actions**.

### Vercel Git integration
With the repo connected to Vercel, every push to `main` triggers a production
deploy automatically.

---

## 🆘 Troubleshooting

### Vercel returns 404 NOT_FOUND
**Cause**: Root Directory or Output Directory misconfigured.
**Fix**: Project Settings → General → Root Directory `./`, Build `npm run build`,
Output Directory `dist`. Save and redeploy.

### Service Worker Won't Register
- HTTPS required in production (localhost is fine in dev)
- Check `/sw.js` is reachable (should return `no-cache`)
- Clear browser cache and hard refresh

### App Shows Old Version
**Fix**:
1. Increment `const CACHE_NAME = 'swasthya-sathi-vX'` in `public/sw.js` on new releases
2. Deploy new build
3. Clients' service workers self-update on next visit

### Install Prompt Doesn't Appear
- Supported browsers: Chrome, Edge, Brave (desktop + Android)
- Requires the page fully loaded + user interaction
- Already installed? Check DevTools → Application → Manifest
- Firefox/Safari: use the in-app "How to install" steps instead

### Offline Mode Not Working
1. DevTools → Application → Service Workers → is it "activated"?
2. DevTools → Application → Cache Storage → `swasthya-sathi-v4` populated?
3. Test with Network tab set to "Offline"

---

## 📈 Scaling for Production

- Enable CDN delivery (Vercel/Netlify do this automatically)
- Lazy-load routes with React lazy / Suspense
- Code-split larger bundles (chunk warning currently present, non-blocking)
- Add analytics via `import.meta.env.PROD` guard in `src/index.tsx`
- Replace `src/data/*.ts` demo data with real API calls when a backend is ready

---

## 🎉 Go-Live Checklist

- [ ] Domain configured (+ HTTPS certificate)
- [ ] Build passes
- [ ] PWA manifest valid
- [ ] Service worker registered
- [ ] SPA rewrites verified (deep links don't 404)
- [ ] Mobile responsive tested
- [ ] Desktop PWA install tested (Window Controls Overlay title bar)
- [ ] Demo data labeled as illustrative
- [ ] Security headers present
- [ ] Rollback plan in place (redeploy previous Git commit)

---

## 📞 Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com
- **PWA / Window Controls Overlay**: https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API

---

*Ready to deploy! 🚀*

*Build Status: ✅ Passing*  
*PWA Status: ✅ Ready*  
*Last Updated: August 30, 2026*