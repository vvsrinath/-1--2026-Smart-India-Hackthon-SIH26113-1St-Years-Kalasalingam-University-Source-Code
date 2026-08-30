# File Structure

A quick map of the whole repository. Read this first to find where things live,
then read `README.md` for how the app works.

## Top Level

```text
.
├── .github/
│   └── workflows/deploy.yml   # Auto-build + publish to GitHub Pages on push
├── docs/                      # This guide + deployment / PWA testing / backend guides
├── backend/                   # Python FastAPI AI service (Swarm multi-agent × Groq)
├── public/                    # Static files copied as-is into the built site
├── src/                       # All React + TypeScript application code
├── index.html                 # Vite HTML entry (title, favicon, PWA meta)
├── package.json               # npm scripts + dependencies
├── postcss.config.js          # PostCSS wiring (Tailwind)
├── tailwind.config.js         # Design tokens: brand colors, fonts, shadows
├── tsconfig.json              # TypeScript compiler settings (app)
├── tsconfig.node.json         # TypeScript settings (config files / node)
├── vercel.json                # Vercel SPA fallback routing + security headers
├── vite.config.ts             # Vite + React plugin configuration
├── README.md                  # Project overview, routes, how-tos
└── DEPLOYMENT, PWA guides     # now inside docs/
```

## `public/` — Static Assets

Copied unchanged into the root of the build output (`dist/`).

```text
public/
├── favicon.png                # Browser tab icon
├── logo.png                   # App logo (header mark, favicon, PWA icons)
├── manifest.webmanifest       # PWA manifest (name, icons, display modes)
├── sw.js                      # Service worker (network-first pages, offline cache)
├── icons/                     # PWA install icons
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-maskable.png
└── images/                    # Sample photos used by demo screens
    └── *.jpg                  # Random-named demo photos (do not rename)
```

## `backend/` — AI Service (Python)

FastAPI + OpenAI Swarm (multi-agent) calling Groq for inference. Powers the
in-app AI assistant. Full setup: `docs/BACKEND_GUIDE.md`.

```text
backend/
├── app/
│   ├── main.py          # FastAPI routes + SSE streaming
│   ├── agents.py        # Swarm agents (Triage, Medical, Care, Wording) + handoffs
│   ├── groq_client.py   # OpenAI client -> Groq endpoint
│   ├── languages.py     # 12 interface languages (detection + names)
│   ├── memory.py        # in-memory per-session conversation store
│   ├── schemas.py       # request/response models
│   ├── security.py      # multilingual emergency filter (no LLM needed)
│   └── config.py        # env-driven settings (.env)
├── tests/               # pytest suite (runs without a Groq key)
├── requirements.txt
├── .env.example         # copy to .env and add GROQ_API_KEY
└── .venv/               # local virtualenv (gitignored)
```

## `src/` — Application Code

Organized by purpose so each concern has one clear home.

```text
src/
├── index.tsx                  # React entry point (render <App /> into #root)
├── App.tsx                    # App shell + providers (Router, Language)
├── index.css                  # Global styles, Tailwind, Leaflet map styles
│
├── routes/                    # URL -> page matching (single place to wire pages)
│   └── AppRoutes.tsx
│
├── layouts/                   # Page shells that wrap groups of screens
│   ├── PublicLayout.tsx       #   public website frame
│   ├── AuthLayout.tsx         #   login frame
│   ├── WorkspaceLayout.tsx    #   shared frame for role workspaces
│   ├── PatientLayout.tsx      #   patient sidebar + nav
│   ├── DoctorLayout.tsx       #   doctor sidebar + nav
│   ├── SpecialistLayout.tsx   #   specialist sidebar + nav
│   ├── WorkerLayout.tsx       #   health worker
│   ├── PHCLayout.tsx          #   PHC center
│   └── AdminLayout.tsx        #   administrator
│
├── pages/                     # Full screens, grouped by user role / area
│   ├── public/                #   Home, About, Services, How It Works,
│   │                          #   Health Information, Contact, 404
│   ├── auth/                  #   Login
│   ├── patient/               #   Patient dashboard, appointments, records,
│   │                          #   referrals, medicines, follow-ups, find care
│   ├── doctor/                #   Doctor dashboard, appointments, patients,
│   │                          #   consultations, referrals
│   └── specialist/            #   Specialist dashboard, appointments,
│                              #   patients, referrals
│
├── components/                # Reusable UI, grouped by what they do
│   ├── chat/                  #   ChatPanel (shared chat UI), ChatWidget (floating)
│   ├── common/                #   Buttons, Input, Modal, Panel, Tabs, badges,
│   │                          #   EmptyState, SearchBar, Rating, Timeline…  (17 files)
│   ├── dashboard/             #   StatCard, ActivityList (dashboard pieces)
│   ├── healthcare/            #   Appointment, Facility, HealthRecord, HealthTip,
│   │                          #   Healthcare, Referral cards
│   ├── maps/                  #   Leaflet-based HealthcareMap
│   ├── navigation/            #   Header, Footer, Logo, Sidebar, LanguageSelector,
│   │                          #   MobileBottomNav, MobileWorkspaceNav, LiveDateTime,
│   │                          #   DashboardHeader
│   └── pwa/                   #   Install banner (desktop/phone/tablet variants),
│                              #   NativeTitleBar, OfflineStatus
│
├── api/                       # Backend client (SSE chat, translate, health)
│   └── backend.ts             #   streamChat() + helpers, API base URL
│
├── context/                   # Shared React context
│   └── LanguageContext.tsx    #   LanguageProvider + useLanguage()
│
├── data/                      # Local demo data — acts as a temporary database
│   ├── navigation.ts          #   nav items per role (drives sidebars)
│   ├── siteContent.ts         #   copy used across the site
│   ├── demoAppointments.ts    #   sample appointments
│   ├── demoDoctors.ts         #   sample doctors
│   ├── demoFacilities.ts      #   sample facilities
│   ├── demoPatients.ts        #   sample patients
│   ├── demoRecords.ts         #   sample health records
│   ├── demoReferrals.ts       #   sample referrals
│   ├── demoSpecialists.ts     #   sample specialists
│   └── healthTips.ts          #   health tip content
│
├── hooks/                     # Custom React hooks
│   ├── useDateTime.ts         #   live clock/date
│   ├── useDesktop.ts          #   desktop / touch / tablet / OS detection
│   ├── useGeolocation.ts      #   live location
│   ├── useMediaQuery.ts       #   matchMedia helper
│   ├── usePwa.ts              #   installed / display-mode detection
│   ├── useScrollToTop.ts      #   scroll reset on route change
│   └── useWindowControlsOverlay.ts  #  desktop title-bar overlay state
│
├── i18n/                      # Translation dictionaries (12 languages + index)
│   ├── index.ts               #   dictionary registry + fallback logic
│   └── *.json                 #   en, hi, ta, te, mr, bn, gu, kn, ml, or, pa, ur
│
├── types/                     # Shared TypeScript types
│   └── index.ts
│
└── utils/                     # Small helpers
    └── cn.ts                  # Tailwind className combiner
```

## How To Find Things

| I want to change…                    | Go to                                        |
| ------------------------------------ | -------------------------------------------- |
| A page's content                     | `src/pages/<role>/`                          |
| Which URL opens a page               | `src/routes/AppRoutes.tsx`                   |
| Reusable UI (buttons, inputs, cards) | `src/components/<category>/`                 |
| Sidebar / nav menu items             | `src/data/navigation.ts`                     |
| The demo data on screen              | `src/data/demo*.ts`                          |
| Multi-language strings                | `src/i18n/<lang>.json` + `src/i18n/index.ts` |
| PWA setup/install/offline            | `src/components/pwa/`, `public/sw.js`, `public/manifest.webmanifest` |
| Brand colors / fonts / design tokens | `tailwind.config.js` + `src/index.css`       |
| Deployment / hosting settings        | `vercel.json`, `.github/workflows/deploy.yml`, `docs/DEPLOYMENT_GUIDE.md` |

## Golden Rule

**One concern, one folder.** Pages live under `pages`, layouts under `layouts`,
reusable pieces under `components`. If you find yourself searching for where a
file "should" be, a new file breaking this pattern is a sign it belongs in a new
subfolder instead.