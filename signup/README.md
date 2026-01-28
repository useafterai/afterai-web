# AfterAI Signup Website

A beautiful signup page for AfterAI, hosted at `useafter.ai/signup`.

## Features

- Modern glassmorphism design matching AfterAI brand colors
- Responsive design for mobile and desktop
- Form validation and error handling
- API key display with copy functionality
- Direct integration with AfterAI signup API

## Setup

### Local Development

1. Open `index.html` in a web browser, or
2. Use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```

3. Update the API endpoint in `script.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8000'; // or your API URL
   ```

### Deployment to Cloudflare Pages

1. **Connect Repository**
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect your Git repository or upload the folder

2. **Build Settings**
   - Build command: (leave empty - static site)
   - Output directory: `/` (root)
   - Root directory: `/` (or the folder containing these files)

3. **Custom Domain**
   - Add custom domain: `useafter.ai`
   - Configure route: `/signup/*` → serve `index.html`
   - Or use Cloudflare Workers for routing

4. **Environment Variables** (if needed)
   - Add `API_BASE_URL` if you want to configure it via environment variables

### DNS Configuration

Ensure your DNS is configured in Cloudflare:
- A record or CNAME pointing to Cloudflare Pages
- SSL/TLS set to "Full" or "Full (strict)"

## File Structure

```
website-signup/
├── index.html      # Main HTML page
├── styles.css      # All styling
├── script.js       # Form logic and API integration
├── README.md       # This file
└── .gitignore      # Git ignore rules
```

## API Integration

The form submits to the `/signup` endpoint with:
```json
{
  "email": "user@example.com",
  "org_name": "Example Corp"
}
```

The API returns:
```json
{
  "tenant_id": "uuid",
  "api_key": "ak_...",
  "message": "Account created successfully..."
}
```

## Customization

### Update API Endpoint

Edit `script.js`:
```javascript
const API_BASE_URL = 'https://your-api-url.com';
```

### Change Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --bg-dark: #000000;
    --bg-purple: #1a0b2e;
    --accent-yellow: #ff8c42;
    --accent-purple: #8b5cf6;
    /* ... */
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Copyright © 2026 AfterAI
