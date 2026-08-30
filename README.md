# Swastya Sathi Healthcare App

Swastya Sathi is a React and TypeScript healthcare application prototype. It connects patients with healthcare services and gives doctors and specialists separate workspaces for appointments, patients, referrals, and consultations.

This is currently a frontend demo. The screens use local demo data, so there is no real login, database, API, or appointment booking service yet.

## ⭐ Key Features

- ✅ **Progressive Web App (PWA)** – Installable on phones, works offline
- ✅ **Live Clock & Date** – Real-time date/time in the headers, read from the device clock (works offline)
- ✅ **Live Location** – Requests geolocation permission and tracks your live position with a place name
- ✅ **Desktop-App Feel on PC** – Custom draggable title bar in the Window Controls Overlay on installed desktop PWAs, with native minimize/maximize/close
- ✅ **Device-Wise Install Prompts** – Desktop offers a native desktop app (Windows/macOS/Linux detected), tablets say “Install for tab”, phones say “Install phone”
- ✅ **Responsive Design** – Desktop sidebar, tablet nav, mobile bottom nav (same React app)
- ✅ **AI Care Assistant (Swasthya Mitra)** – Swarm multi-agent + Groq: understands intent and language, answers health/app questions and translates, replying in any of the 12 supported languages (floating widget + patient chat page)
- ✅ **6 Role Workspaces** – Patient, Doctor, Specialist, Health Worker, PHC, Admin
- ✅ **Multi-Language** – 12 Indian languages (English, Hindi, Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Oriya, Punjabi, Urdu)
- ✅ **Service Worker** – Network-first for pages, cache-first for assets
- ✅ **Demo Data** – Realistic healthcare scenarios with sample patients, appointments, referrals
- ✅ **Role-Based Auth Flow** – Multi-step onboarding with language selection

## 📚 Documentation

- **[FILE_STRUCTURE.md](docs/FILE_STRUCTURE.md)** – Map of every folder and file in the repo
- **[PWA_TESTING_GUIDE.md](docs/PWA_TESTING_GUIDE.md)** – How to test install prompt, offline mode, service worker
- **[DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)** – Deploy to Netlify, Vercel, Docker, or custom servers
- **[BACKEND_GUIDE.md](docs/BACKEND_GUIDE.md)** – Run the Swarm × Groq AI assistant backend (Python + FastAPI)

## Run The App

Make sure Node.js and npm are installed. From the project folder, run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5174/`.

Other useful commands:

```bash
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Check JavaScript and TypeScript files with ESLint

npm run backend:setup   # Create backend/.venv and install Python deps
npm run backend:dev     # Run the AI backend on http://localhost:8000
npm run backend:test    # Run the backend pytest suite
```

### Running the AI assistant (optional but recommended)

The AI assistant lives in a small Python backend (`backend/`). See
**[docs/BACKEND_GUIDE.md](docs/BACKEND_GUIDE.md)** for full setup. Summary:

```bash
cd backend
python -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env      # then add your free Groq API key from console.groq.com
.venv/bin/uvicorn app.main:app --reload --port 8000
```

The frontend talks to `http://localhost:8000` by default (override with a
`VITE_API_BASE_URL` env var at build time). Without the backend running, the
chat widget shows a friendly "offline" notice instead of failing.

## How The App Starts

The startup path is small:

1. `src/index.tsx` finds the HTML element with the id `root` and renders the React application.
2. `src/App.tsx` wraps the app in `BrowserRouter` so URLs work, and in `LanguageProvider` so pages can read the selected language.
3. `AppShell` runs `useScrollToTop` whenever the route changes, then renders `AppRoutes`.
4. `src/routes/AppRoutes.tsx` matches the current URL and renders the correct layout and page.

```text
index.html
  -> src/index.tsx
    -> App
      -> BrowserRouter + LanguageProvider
        -> AppRoutes
          -> Layout
            -> Page
```

## Main Routes

### Public website

| URL | Page |
| --- | --- |
| `/` | Home |
| `/about` | About the platform |
| `/services` | Healthcare services |
| `/how-it-works` | How the service works |
| `/health-information` | Health information |
| `/contact` | Contact page |

### Login

`/login` displays the login screen. It is a frontend demo and does not check a real user account.

### Patient workspace

Patient screens use `PatientLayout` and start at `/patient`:

| URL | Purpose |
| --- | --- |
| `/patient` | Patient dashboard |
| `/patient/assistant` | AI care assistant chat |
| `/patient/find-healthcare` | Find doctors and facilities |
| `/patient/appointments` | View appointments |
| `/patient/records` | View health records |
| `/patient/referrals` | View referrals |
| `/patient/follow-up` | View follow-up care |
| `/patient/medicines` | Medication list and tracking |
| `/patient/consult-online` | Online consultation placeholder |
| `/patient/messages` | Messages placeholder |
| `/patient/notifications` | Notifications placeholder |
| `/patient/profile` | Profile settings placeholder |
| `/patient/help` | Help and support placeholder |

### Doctor workspace

Doctor screens use `DoctorLayout` and start at `/doctor`:

| URL | Purpose |
| --- | --- |
| `/doctor` | Doctor dashboard |
| `/doctor/appointments` | Doctor appointments |
| `/doctor/patients` | Patient list |
| `/doctor/patients/:id` | Patient consultation details |
| `/doctor/referrals` | Referral management |
| `/doctor/prescriptions` | Prescriptions placeholder |
| `/doctor/reports` | Reports placeholder |

### Specialist workspace

Specialist screens use `SpecialistLayout` and follow the same pattern as the doctor workspace. Their pages include the dashboard, appointments, patients, and referrals.

## Folder Guide

A quick view of the layout. For an annotated, file-by-file map, see **[docs/FILE_STRUCTURE.md](docs/FILE_STRUCTURE.md)**.

```text
.
├── index.html                    Vite entry HTML (title, favicon, PWA meta)
├── vercel.json                   Vercel edge SPA routing + security headers
├── vite.config.ts                Vite + React plugin config
├── tailwind.config.js            Brand colors, fonts, shadows, spacing
├── postcss.config.js             Tailwind/autoprefixer plumbing
├── tsconfig.json / tsconfig.node.json   TypeScript config
├── package.json                  npm scripts and dependencies
├── .github/workflows/deploy.yml  GitHub Pages build & deploy (optional)
│
├── docs/                         Project guides
│   ├── FILE_STRUCTURE.md         Map of every folder and file
│   ├── DEPLOYMENT_GUIDE.md       Deploy to Netlify, Vercel, Docker, etc.
│   ├── PWA_TESTING_GUIDE.md      Test install prompt, offline, service worker
│   └── BACKEND_GUIDE.md          Run the AI assistant backend (Swarm × Groq)
│
├── backend/                      Python FastAPI + Swarm × Groq AI service
│   ├── app/                      API, agents, language detection, memory
│   ├── tests/                    Pytest suite (no key needed)
│   ├── requirements.txt
│   └── .env.example              -> copy to .env, add GROQ_API_KEY
│
├── public/                       Static files copied as-is to the build
│   ├── index.html assets not needed here
│   ├── favicon.png               Browser tab icon
│   ├── logo.png                  App logo (header, favicon, PWA icons)
│   ├── images/                   Sample photos (patients, doctors, tips)
│   ├── icons/                    PWA install icons (192/512/maskable/apple)
│   ├── manifest.webmanifest      PWA manifest (name, icons, standalone)
│   └── sw.js                     Service worker (offline caching)
│
└── src/                          Application source
    ├── index.tsx                 React entry point
    ├── App.tsx                   Top-level providers and app shell
    ├── index.css                 Global CSS, Tailwind and Leaflet styles
    ├── routes/                   URL-to-page definitions (AppRoutes)
    ├── layouts/                  Shared shells: public, auth, workspaces
    ├── pages/                    Full screens grouped by user role
    │   ├── public/               Home, About, Services, Contact, NotFound
    │   ├── auth/                 Login
    │   ├── patient/              Patient workflow screens
    │   ├── doctor/               Doctor workflow screens
    │   └── specialist/           Specialist workflow screens
    ├── components/               Reusable UI
    │   ├── common/               Buttons, panels, inputs, tabs, states
    │   ├── dashboard/            Dashboard cards and activity lists
    │   ├── healthcare/           Appointment, facility, record, tip cards
    │   ├── navigation/           Headers, sidebars, footer, logo, language
    │   ├── maps/                 Leaflet healthcare map
    │   └── pwa/                  Install banner, offline status
    ├── context/                  Shared React context (language)
    ├── data/                     Local demo data (appointments, patients…)
    ├── hooks/                    Reusable React hooks
    ├── i18n/                     13 language dictionaries + index
    ├── types/                    Shared TypeScript types
    └── utils/                    Small utilities (className helper)
```

## Layouts And Pages

A layout is the outer frame around a group of pages. For example, `PatientLayout` provides the patient sidebar and workspace navigation, while `PatientAppointments` provides the screen content.

This keeps navigation consistent:

```text
PatientLayout
  - DashboardHeader
  - Sidebar / MobileWorkspaceNav
  - Outlet page content
```

Pages are separated by role so a patient workflow can change without editing the doctor workflow. Repeated visual pieces are extracted into shared components such as `Button`, `Panel`, `StatusBadge`, `Tabs`, and `SectionHeading`.

## Demo Data

The files in `src/data/` act like a temporary local database. They export arrays of typed objects used by the pages:

- `demoAppointments.ts` contains appointment examples.
- `demoDoctors.ts` and `demoSpecialists.ts` contain care-team examples.
- `demoFacilities.ts` contains healthcare facilities.
- `demoPatients.ts` contains patient examples.
- `demoRecords.ts` contains health record examples.
- `demoReferrals.ts` contains referral examples.
- `healthTips.ts` contains health tip content.

To change what appears on a screen, edit the matching data file or replace the local data with an API call later.

## Language Support

`src/context/LanguageContext.tsx` defines the available Indian languages and exports `useLanguage()` for components. The English dictionary is complete for the current navigation actions. Other languages are listed in the selector but fall back to English until their dictionaries are added.

Inside a component, the normal pattern is:

```tsx
const { t, language, setLanguage } = useLanguage();
const label = t('nav.home');
```

Add new translated strings to the English dictionary first, then add the same keys to another language dictionary.

## Branding And Styling

- `index.html` contains the browser title and favicon.
- `public/logo.png` is the Swastya Sathi logo (favicon, PWA icons and in-app header mark).
- `src/components/navigation/Logo.tsx` displays the mark and wordmark across the application.
- `tailwind.config.js` contains the brand colors, spacing extensions, shadows, and font settings.
- `src/index.css` contains global styles and the Leaflet map stylesheet.

When adding a new screen, prefer the existing Tailwind classes and common components so the new screen matches the rest of the application.

## Adding A New Page

1. Create the page in the correct role folder under `src/pages/`.
2. Import it in `src/routes/AppRoutes.tsx`.
3. Add a `Route` inside the correct layout route.
4. Add a navigation item in `src/data/navigation.ts` if users should reach it from a sidebar or header.
5. Use existing demo data or add a typed data file in `src/data/`.
6. Run `npm run build` to catch TypeScript, JSX, and import errors.

## Current Prototype Limitations

- Login is visual only.
- Data is stored in source files and resets when the app reloads.
- Language options other than English fall back to English content.
- Several secondary screens intentionally use `WorkspacePlaceholder`.
- App data is still local demo data (no database yet). The AI assistant backend (`backend/`) is real, but health/appointment data is not yet served by an API.
