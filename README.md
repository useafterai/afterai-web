# AfterAI Web Application

Modern web application for AfterAI - Production AI Change Intelligence Platform.

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
- Social proof section

### Authentication
- Signup with data region selection
- Email verification flow
- Sign in page
- Mock authentication (ready for API integration)

### App Console
- Sidebar navigation with sections:
  - HOME
  - OBSERVE (Change Feed, Drift Watch, Dashboards)
  - ASSESS (Assessments, Baselines)
  - RECORD (PACRs - coming soon)
  - DEVELOP (Integrations, API Keys)
  - ADMIN (Usage & Billing, Settings)
- Space selector
- User menu

### Integrations Page
- Step-by-step integration setup
- Integration selection (OpenAI, Anthropic, LangChain, etc.)
- API key generation
- Code snippets for Python and TypeScript
- Copy-to-clipboard functionality

## Design System

### Colors
- **Purple**: `#7b5cff` (primary accent)
- **Gold**: `#f6c945` (secondary accent)
- **Dark**: `#0b0b12` (background)
- **Text**: `#f5f5f7` (primary text)
- **Muted**: `rgba(245, 245, 247, 0.72)` (secondary text)

### Typography
- Font: Inter, system fonts
- Headings: Bold, large sizes
- Body: Regular weight, readable line-height

## API Integration

Currently, the app uses mock data and stubbed API calls. To integrate with the AfterAI backend:

1. Update API endpoints in form handlers
2. Add authentication token management
3. Replace mock data with real API calls
4. Add error handling and loading states

## Deployment

The application can be deployed to:
- Vercel (recommended for Next.js)
- Docker containers
- Any Node.js hosting platform

## License

Copyright © 2026 AfterAI
