# Swasthya Sathi — Deployment Guide

## 🚀 Quick Start

### Local Development
```bash
cd "Your Project Directory"
npm install                    # Install dependencies (one time)
npm run dev                    # Start dev server on http://localhost:5174
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
├── assets/
│   ├── index-*.css          # Tailwind CSS (27.15 kB gzipped)
│   └── index-*.js           # React + app code (498.94 kB gzipped)
├── sw.js                     # Service worker
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-maskable.png
└── _redirects                # Netlify routing config
```

### Size Optimization
✅ CSS: 27.15 kB (gzipped: 5.96 kB)  
✅ JS: 498.94 kB (gzipped: 147.95 kB)  
✅ Build time: ~21 seconds  
✅ Zero TypeScript errors  

---

## 🌐 Deployment Platforms

### 1. Netlify (Recommended)
**Best for**: Hosting + PWA + Easy deployment

#### Setup
1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Environment**: Node 18+

#### Deploy via Git
```bash
# Push to GitHub
git push origin main

# Netlify auto-deploys on push
# Check deployments at: app.netlify.com
```

#### Deploy via CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Netlify Config (Already Included)
File: `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. Vercel
**Best for**: Zero-config deployment

```bash
npm i -g vercel
vercel --prod
```

Automatically detects React + Vite setup.

### 3. GitHub Pages
**Best for**: Free static hosting

```bash
# Build
npm run build

# Deploy dist/ folder to GitHub Pages branch
# or use GitHub Actions for auto-deploy
```

### 4. Docker (for Custom Servers)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## ✅ Pre-Deployment Checklist

### Code Quality
- [ ] `npm run lint` passes (no ESLint errors)
- [ ] All TypeScript errors resolved
- [ ] `npm run build` succeeds
- [ ] No console errors in dev server

### PWA Setup
- [ ] Service worker registered (DevTools → Application → Service Workers)
- [ ] Manifest valid (no warnings in DevTools)
- [ ] App icons present in `/public/icons/`
- [ ] HTTPS enabled on production domain

### Testing
- [ ] All routes work correctly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Navigation between workspaces functional
- [ ] Demo data displays correctly
- [ ] Offline mode works (test in DevTools)

### Performance
- [ ] Lighthouse score 80+ (mobile)
- [ ] First Contentful Paint < 3s
- [ ] Largest Contentful Paint < 4s
- [ ] Cumulative Layout Shift < 0.1

### SEO
- [ ] Meta tags present in index.html
- [ ] Open Graph tags for social sharing
- [ ] Mobile viewport configured
- [ ] Robots.txt configured (optional)

---

## 🔐 Security Considerations

### Enabled by Default
✅ Content Security Policy (via headers)  
✅ HTTPS enforcement on production  
✅ No sensitive data in browser console  
✅ Service worker origin filtering  

### Recommended Production Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=()
```

### Service Worker Security
- Only registers from HTTPS origins
- Scope limited to app path
- No cross-origin resource caching
- Automatic cache cleanup on updates

---

## 🔄 Continuous Deployment

### GitHub Actions (Auto-Deploy on Push)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: nwtgck/actions-netlify@v2.1
        with:
          publish-dir: './dist'
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 📊 Post-Deployment Verification

### 1. Test Live PWA
```bash
# On production URL
curl https://your-domain.com
# Check response includes manifest link
```

### 2. Verify Service Worker
1. Open production URL in Chrome DevTools
2. Application → Service Workers
3. Should show "activated and running"
4. Network throttle to "Offline"
5. Reload → Should work from cache

### 3. Run Lighthouse Audit
1. DevTools → Lighthouse
2. Run audit for "Mobile"
3. Check PWA score (should be 90+)
4. Review suggestions

### 4. Test Install Prompt
1. Open app on Android device
2. Wait 3-5 seconds
3. Install prompt should appear
4. Tap to install
5. App runs standalone

### 5. Monitor Performance
- Google Analytics: Track app installs
- Sentry: Error monitoring
- WebVitals: Core Web Vitals tracking

---

## 🆘 Troubleshooting

### Service Worker Won't Register
**Check:**
- [ ] Is HTTPS enabled? (HTTP won't work in production)
- [ ] Is `/sw.js` accessible? (test in browser)
- [ ] Browser DevTools console for errors
- [ ] Clear browser cache and hard refresh

### App Shows Old Version
**Fix:**
1. Increment cache version in `sw.js`: `const CACHE_NAME = 'swasthya-sathi-v3'`
2. Deploy new build
3. Users' clients auto-update SW on next visit
4. Or: Manual cache clear via DevTools

### Install Prompt Doesn't Appear
**Check:**
- [ ] On supported browser (Chrome, Edge, Brave)
- [ ] Page fully loaded (3-5 seconds)
- [ ] User interaction happened (click/scroll)
- [ ] Not already installed
- [ ] Manifest is valid

### Offline Mode Not Working
**Debug:**
1. DevTools → Application → Service Workers
2. Check service worker is "activated"
3. Check Cache Storage has `swasthya-sathi-v2`
4. Test offline simulation in Network tab

---

## 📈 Scaling for Production

### Performance Optimization
- [ ] Enable gzip compression (Netlify does this auto)
- [ ] Use CDN for asset delivery
- [ ] Set proper cache headers on assets
- [ ] Lazy-load non-critical images
- [ ] Code-split larger routes

### Analytics & Monitoring
```javascript
// Add to src/index.tsx for production
if (import.meta.env.PROD) {
  // Google Analytics
  // Sentry error tracking
  // User session tracking
}
```

### Environment Configuration
```bash
# .env.production
VITE_API_BASE_URL=https://api.your-domain.com
VITE_ANALYTICS_ID=your-ga-id
```

### Database & API Integration
When connecting real backend:
1. Replace `src/data/*.ts` with API calls
2. Use `fetch()` or `axios` for HTTP
3. Handle errors and loading states
4. Cache API responses if needed

---

## 🎉 Go-Live Checklist

- [ ] Domain configured
- [ ] HTTPS certificate active
- [ ] Build passes (0 errors)
- [ ] PWA manifest valid
- [ ] Service worker registered
- [ ] Lighthouse score 80+
- [ ] Mobile responsive tested
- [ ] All routes working
- [ ] Demo data labeled as such
- [ ] Analytics configured
- [ ] Error tracking enabled
- [ ] Security headers set
- [ ] Performance monitored
- [ ] Team aware of deployment
- [ ] Rollback plan in place

---

## 📞 Support & Resources

- **Netlify Docs**: https://docs.netlify.com
- **Vite Docs**: https://vitejs.dev
- **React Router**: https://reactrouter.com
- **Tailwind CSS**: https://tailwindcss.com
- **PWA Checklist**: https://web.dev/pwa-checklist/

---

*Ready to deploy! 🚀*

*Build Status: ✅ Passing*  
*PWA Status: ✅ Ready*  
*Last Verified: August 29, 2026*
