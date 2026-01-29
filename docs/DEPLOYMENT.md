# Deployment Guide

## Prerequisites

- Docker installed
- GitHub account with repository access
- Node.js 20+ (for local development)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## Docker Deployment

### Build Locally

```bash
# Build Docker image
docker build -t afterai-web .

# Run container
docker run -p 3000:3000 afterai-web
```

### Push to GitHub Container Registry

1. **Create GitHub Repository** (if not exists):
   ```bash
   # Create a new repo on GitHub (e.g., useafterai/afterai-web)
   # Then add remote:
   git remote add origin https://github.com/useafterai/afterai-web.git
   git push -u origin main
   ```

2. **GitHub Actions will automatically build and push** when you push to main branch.

3. **Pull and run from GHCR**:
   ```bash
   docker pull ghcr.io/useafterai/afterai-web:latest
   docker run -p 3000:3000 ghcr.io/useafterai/afterai-web:latest
   ```

## Azure Container Apps Deployment

If deploying to Azure Container Apps (similar to backend):

```bash
# Login to Azure
az login

# Create container app (if needed)
az containerapp create \
  --name afterai-web \
  --resource-group your-resource-group \
  --image ghcr.io/useafterai/afterai-web:latest \
  --target-port 3000 \
  --ingress external \
  --env-vars NODE_ENV=production

# Update container app with new image
az containerapp update \
  --name afterai-web \
  --resource-group your-resource-group \
  --image ghcr.io/useafterai/afterai-web:latest
```

## Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
AFTERAI_AUTH_SECRET=your-secret-min-32-chars
```

For **production (e.g. Vercel)** when the API is behind Cloudflare:

- **`AFTERAI_INTERNAL_API_BASE_URL`** (required): Internal API URL used by the `/api/session/login` proxy only. Set to the Azure Container App FQDN (e.g. `https://<app>.azurecontainerapps.io`). Server-to-server login calls use this to bypass Cloudflare; without it, Cloudflare can block those requests (403) and login will fail.
- **`AFTERAI_AUTH_SECRET`**: Must match the backend; used for JWT verification in middleware.
- **`NEXT_PUBLIC_API_BASE_URL`**: Used by the browser for signup/validate (e.g. `https://api.useafter.ai`).

If `AFTERAI_INTERNAL_API_BASE_URL` is missing in production, the login proxy returns **503** with a clear error.

## Vercel Deployment (Alternative)

Vercel is the recommended platform for Next.js apps:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

Or connect your GitHub repository to Vercel for automatic deployments.

## Validation: signup → validate → login → /console

1. **Signup:** Browser POST to `api.useafter.ai/signup` (via `NEXT_PUBLIC_API_BASE_URL`). Cloudflare allows browser traffic.
2. **Validate:** User clicks email link → `.../signup/validate?token=...`. Browser GETs `api.useafter.ai/validate/...`.
3. **Login:** Browser POST to `/api/session/login`. Next.js server calls **internal** API URL (`AFTERAI_INTERNAL_API_BASE_URL`) to bypass Cloudflare, sets `afterai_session` cookie, returns 200.
4. **Redirect:** Client redirects to `returnTo` (default `/console`). Middleware allows access when session is valid.

Ensure `AFTERAI_INTERNAL_API_BASE_URL` is set in production so the login proxy reaches the backend.

## Middleware and static assets

Middleware runs only on `/app`, `/app/*`, `/console`, `/console-coming-soon`, `/signup/validate.html`. It explicitly bypasses `/_next/*`, `/favicon.*` so static assets are never gated. `/api` is not in the matcher.

## Notes

- The app uses Next.js standalone output mode for Docker
- All pages are server-rendered by default
- Client components are marked with "use client"
- Login uses FastAPI `POST /login`; session stored in httpOnly cookie. Set `AFTERAI_AUTH_SECRET` in Next.js and backend.
