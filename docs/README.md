# AfterAI Web Application (internal)

Modern web application for AfterAI — Production AI Change Intelligence Platform.

## Overview

This is a Next.js application providing:
- Marketing landing page
- Authentication flows (signup, login, email verification)
- App console with sidebar navigation
- Integrations setup workflow
- Various console pages (Change Feed, Assessments, API Keys, etc.)

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with AfterAI purple/gold theme
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Docker Deployment

The Dockerfile uses Node 20 and `npm install` (no lockfile). For reproducible builds, add `package-lock.json`, copy it in the Dockerfile, and use `npm ci` instead of `npm install`.

```bash
# Build Docker image
docker build -t afterai-web .

# Run container
docker run -p 3000:3000 afterai-web
```

## Project Structure

```
afterai-web/
├── app/
│   ├── app/              # App console pages
│   │   ├── layout.tsx    # Console layout with sidebar
│   │   ├── page.tsx      # Home page
│   │   ├── integrations/ # Integration setup
│   │   └── ...
│   ├── login/            # Sign in page
│   ├── signup/           # Sign up page
│   ├── verify/           # Email verification page
│   ├── terms/            # Terms of Service
│   ├── privacy/          # Privacy Policy
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── docs/                 # Internal docs (README, DEPLOYMENT, etc.)
├── public/               # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── Dockerfile
```

## Features

### Landing Page
- Hero section with AfterAI value proposition
- Value tiles (AURA, ACE, PACR)
- Pricing teaser

### Authentication
- Signup (username, email, password, optional full name) → POST to backend; success shows "Check your email"
- Email verification flow
- Sign in page
- Mock authentication for login (ready for API integration)

### App Console
- Sidebar navigation with sections: HOME, OBSERVE, ASSESS, RECORD, DEVELOP, ADMIN
- Space selector, user menu

### Integrations Page
- Step-by-step integration setup, API key generation, code snippets (Python/TypeScript)

## Design System

- **Purple**: `#7b5cff` (primary accent)
- **Gold**: `#f6c945` (secondary accent)
- **Dark**: `#0b0b12` (background)
- **Text**: `#f5f5f7`

## Environment Variables

- **`NEXT_PUBLIC_API_BASE_URL`** — Base URL for the AfterAI API (signup, etc.). Default: `https://api.useafter.ai`. Set to your backend (e.g. `http://localhost:8000`) for local dev.

## API Integration

Signup POSTs to `{NEXT_PUBLIC_API_BASE_URL}/signup` with `username`, `email`, `password`, and optional `name`. Other flows use mock/stub data until wired.

**Email verification:** The backend emails a link to `{WEBSITE_BASE_URL}/signup/validate.html?token=...`. The Next app redirects `validate.html` → `/signup/validate`, calls `GET {NEXT_PUBLIC_API_BASE_URL}/validate/{token}`, then shows the API key or an error. Ensure the backend `WEBSITE_BASE_URL` (default `https://useafter.ai`) matches the deployed Next.js URL.

## Deployment

- Vercel (recommended; site is deployed via Vercel only)
- Docker containers (image push via GHCR workflow, manual dispatch)
- Any Node.js hosting platform

## License

Copyright © 2026 AfterAI
