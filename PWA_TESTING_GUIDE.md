# Swasthya Sathi — PWA Testing Guide

## ✅ PWA Features Implemented

This document describes how to test and verify all Progressive Web App (PWA) features of Swasthya Sathi.

---

## 🔧 Service Worker & Caching

### Current Strategy
- **HTML Pages**: Network-first (try online first, fall back to cache)
- **Assets (CSS, JS, Images, Fonts)**: Cache-first (use cached, update in background)
- **Cache Version**: `swasthya-sathi-v2`
- **Auto-updates**: Cache purges old versions on activation

### Features
✅ App shell caching for offline support  
✅ Automatic asset versioning  
✅ Cross-origin request filtering  
✅ Graceful fallback to /index.html for 404 routes  

---

## 📱 Install Prompt (Phones & Tablets)

### How It Works
1. **Detection**: Browser detects PWA-capable device after user interaction
2. **Banner**: Non-intrusive install prompt appears in-app
3. **Install**: User taps "Install App" to add to home screen
4. **Standalone**: App runs fullscreen without browser UI

### Where to Find It
- **Location**: Fixed banner at bottom-left (mobile) or bottom-right (desktop)
- **Code**: [src/components/pwa/InstallAppBanner.tsx](../src/components/pwa/InstallAppBanner.tsx)
- **Logic**: [src/hooks/usePwa.ts](../src/hooks/usePwa.ts)

### Testing on Mobile
**Chrome/Edge on Android:**
1. Open http://localhost:5174/ on phone
2. Wait 3-5 seconds for page to load completely
3. Look for install prompt at bottom of screen
4. Tap "Install App"
5. App installs and appears on home screen

**Safari on iOS 15+:**
- Tap Share → Add to Home Screen
- (Safari doesn't show automatic prompt, but home screen add still works)

### Manual Install Trigger
If automatic prompt doesn't appear:
1. Open DevTools (F12) → Application tab
2. Check "Offline" to simulate PWA environment
3. Prompt may appear after reload

---

## 🌐 Offline Functionality

### What Works Offline
✅ All cached pages and routes  
✅ Patient dashboard with demo data  
✅ Navigation and sidebar  
✅ CSS, JavaScript, images all cached  
✅ "Limited Connection" banner visible  

### What Doesn't Work Offline
❌ Real API calls (none exist; demo uses local data)  
❌ New external resources not yet cached  
❌ Real-time updates  

### Testing Offline Mode

**Method 1: DevTools Offline Simulation**
1. Open browser DevTools (F12)
2. Go to Application → Service Workers
3. Check "Offline" checkbox
4. Reload page → Should load from cache
5. Uncheck to go back online

**Method 2: Airplane Mode**
1. Enable airplane mode on device
2. Refresh app → Should work from cache
3. Try navigation between pages
4. Disable airplane mode to restore connection

**Method 3: DevTools Throttling**
1. DevTools → Network tab
2. Set throttle to "Offline" in dropdown
3. Reload → App works from service worker cache

### Offline Indicator
- **Banner**: Shows "Limited Connection" with WiFi-off icon when offline
- **No banner**: Means you're online (we removed the "Connection restored" message)

---

## 🎯 Manifest & App Configuration

### Location
[public/manifest.webmanifest](../public/manifest.webmanifest)

### Configuration Details
```json
{
  "name": "Swasthya Sathi",                    // Full app name
  "short_name": "Swasthya Sathi",             // Home screen label
  "description": "Connecting Every Village to Better Healthcare",
  "start_url": "/",                           // Launch page
  "display": "standalone",                    // Hide browser UI
  "orientation": "portrait",                  // Mobile orientation
  "background_color": "#f5faf7",              // Splash screen color
  "theme_color": "#0b6b3a",                   // Status bar color
  "icons": [
    {"src": "/icons/icon-192.png", "sizes": "192x192", "purpose": "any"},
    {"src": "/icons/icon-512.png", "sizes": "512x512", "purpose": "any"},
    {"src": "/icons/icon-maskable.png", "sizes": "512x512", "purpose": "maskable"}
  ]
}
```

### Key Settings
- **Display Mode**: `standalone` = fullscreen app, no browser chrome
- **Orientation**: `portrait` = locks to portrait on phones (can rotate with device)
- **Theme Color**: `#0b6b3a` = brand green for status bar on Android
- **Icons**: Maskable icon supports adaptive icons on Android 12+

---

## 📊 Testing Checklist

### Service Worker Installation
- [ ] Open DevTools → Application → Service Workers
- [ ] Service worker shows "activated and running"
- [ ] Scope is `/` (entire app)
- [ ] Status: "activated and running" (not pending)

### Cache Validation
- [ ] DevTools → Application → Cache Storage
- [ ] Expand `swasthya-sathi-v2`
- [ ] See app shell cached: `/`, `/index.html`, `/manifest.webmanifest`, `/sw.js`
- [ ] After visiting pages, CSS and JS assets appear in cache

### Offline Testing
- [ ] Go online, load app completely
- [ ] Enable "Offline" in DevTools
- [ ] Reload page → Loads from cache instantly
- [ ] Click navigation links → All work offline
- [ ] See "Limited Connection" banner
- [ ] Disable offline → Banner disappears

### Install Prompt Testing (Android)
- [ ] Open in Chrome on Android phone
- [ ] Wait for install banner
- [ ] Tap "Install App"
- [ ] App appears on home screen
- [ ] Launch app → Opens in standalone mode (no URL bar)

### Manifest Validation
- [ ] DevTools → Application → Manifest
- [ ] App name, icons, theme colors display correctly
- [ ] No "manifest is not valid" errors

### Performance
- [ ] First load: Download from network
- [ ] Second load: Much faster (cached assets)
- [ ] Offline load: Instant (all from cache)

---

## 🔍 Common Issues & Solutions

### Issue: Install Prompt Not Appearing
**Solution:**
1. Ensure page loads completely (wait 3+ seconds)
2. Trigger user interaction (scroll, click)
3. Check: Is service worker installed? (DevTools → Application → Service Workers)
4. Try on different device or browser (Chrome/Edge works best)
5. iOS: Manual install via Share → Add to Home Screen

### Issue: Service Worker Not Updating
**Solution:**
1. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. Go to DevTools → Application → Service Workers
3. Unregister old service worker
4. Close all tabs of the app
5. Reload page
6. Service worker should re-register with new version

### Issue: App Still Shows Old Content After Update
**Solution:**
1. Cache version updated to `v2` after rebuild
2. Service worker auto-purges old cache on activation
3. Clear browser cache manually: DevTools → Application → Storage → Clear site data
4. Full reload or hard refresh

### Issue: Offline Banner Stays On
**Solution:**
1. Check actual network status
2. If using DevTools "Offline" mode, uncheck it
3. If in airplane mode, disable it
4. Restart browser if stuck

---

## 🚀 Deployment Considerations

### For Production (Netlify, Vercel, etc.)

1. **HTTPS Required**
   - PWA requires HTTPS in production
   - Dev server (localhost) works with HTTP
   - Service worker won't register over HTTP

2. **Service Worker Path**
   - SW file at `/public/sw.js` serves as `/sw.js`
   - Ensure web server doesn't cache the SW file itself
   - Add headers: `Cache-Control: no-cache` for `/sw.js`

3. **Manifest Path**
   - Located at `/public/manifest.webmanifest`
   - Server from root as `/manifest.webmanifest`
   - Include in `<link rel="manifest">` in index.html

4. **Assets**
   - All icons in `/public/icons/` must be accessible
   - CSS and JS bundles auto-cached by SW

5. **Testing Production Build Locally**
   ```bash
   npm run build
   npm run preview
   ```
   Then open http://localhost:4173 (preview server)

---

## 📈 PWA Score (Google Lighthouse)

Expected Lighthouse scores:
- **Performance**: 85-95 (cached assets + minimal JS)
- **Accessibility**: 90-95 (semantic HTML, ARIA labels)
- **Best Practices**: 90-100 (HTTPS ready, PWA manifest valid)
- **SEO**: 90-100 (meta tags, mobile-friendly)

To run Lighthouse:
1. DevTools → Lighthouse tab
2. Select "Mobile" for phone testing
3. Run audit → Get detailed report

---

## 🎨 PWA Branding

### Splash Screen
When app launches standalone:
- **Background**: `#f5faf7` (light mint green)
- **App name**: "Swasthya Sathi"
- **Icon**: 192x192 or 512x512 from manifest

### Status Bar (Android)
- **Color**: `#0b6b3a` (brand green from theme_color)
- **Text**: Auto-adjusted by system

### Home Screen Icon
- **Standard**: 192px icon (any device)
- **High-res**: 512px icon (tablets, hi-DPI phones)
- **Maskable**: Adaptive icon for Android 12+ (rounded/shaped masks)

---

## 📚 Resources

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Google: PWA Checklist](https://web.dev/pwa-checklist/)
- [Web.dev: Service Worker](https://web.dev/service-workers-cache-storage/)
- [Can I Use PWA](https://caniuse.com/mdn-api_serviceworker)

---

## ✨ Current Deployment Status

✅ **Service Worker**: Enhanced with network/cache-first strategies  
✅ **Manifest**: Complete with all icons and metadata  
✅ **Install Banner**: Ready for phones and tablets  
✅ **Offline Support**: App shell cached, demo data available  
✅ **Build**: Production-ready (npm run build)  

### Next Steps for Deployment
1. Deploy to HTTPS hosting (Netlify, Vercel, etc.)
2. Test on real devices (Android Chrome, iOS Safari)
3. Run Lighthouse audit for PWA score
4. Monitor service worker registration in production

---

*Last Updated: August 29, 2026*  
*Status: ✅ Ready for Testing & Deployment*
