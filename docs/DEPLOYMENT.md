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

For production, set these in your deployment platform. `AFTERAI_AUTH_SECRET` must match the backend value (used for JWT verification in middleware).

## Vercel Deployment (Alternative)

Vercel is the recommended platform for Next.js apps:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

Or connect your GitHub repository to Vercel for automatic deployments.

## Notes

- The app uses Next.js standalone output mode for Docker
- All pages are server-rendered by default
- Client components are marked with "use client"
- Login uses FastAPI `POST /login`; session stored in httpOnly cookie. Set `AFTERAI_AUTH_SECRET` in Next.js and backend.
