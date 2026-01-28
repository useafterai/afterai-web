# AfterAI Website

Marketing website for AfterAI — production AI change intelligence.

## Structure

```
website/
├── index.html          # Root page (redirects to /signup/)
├── script.js           # Root page script (minimal, for redirect)
├── styles.css          # Root page styles (legacy, not used after redirect)
├── favicon.png         # Site favicon
├── logo.png            # AfterAI logo
├── README.md           # This file
└── signup/
    ├── index.html      # Signup page
    ├── script.js       # Signup form logic and API integration
    ├── styles.css      # Signup page styles
    └── .gitignore      # Git ignore rules
```

## Features

- **Root redirect**: Automatically redirects to `/signup/` page
- **Signup page**: Modern glassmorphism design matching AfterAI brand colors
- **Responsive design**: Works on mobile and desktop
- **Form validation**: Client-side validation with error handling
- **API integration**: Direct integration with AfterAI signup API
- **API key display**: Shows API key with copy functionality after successful signup

## Setup

### Local Development

1. Open `signup/index.html` in a web browser, or
2. Use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```
   Then navigate to `http://localhost:8000/signup/`

3. Update the API endpoint in `signup/script.js`:
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
   - Root directory: `/website` (or the folder containing these files)

3. **Custom Domain**
   - Add custom domain: `useafter.ai`
   - Configure route: `/signup/*` → serve `signup/index.html`
   - Root `/` → serves `index.html` (which redirects to `/signup/`)

4. **Environment Variables** (if needed)
   - Add `API_BASE_URL` if you want to configure it via environment variables

### DNS Configuration

Ensure your DNS is configured in Cloudflare:
- A record or CNAME pointing to Cloudflare Pages
- SSL/TLS set to "Full" or "Full (strict)"

## API Integration

The signup form submits to the `/signup` endpoint with:
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

Edit `signup/script.js`:
```javascript
const API_BASE_URL = 'https://your-api-url.com';
```

### Change Colors

Edit CSS variables in `signup/styles.css`:
```css
:root {
    --bg: #0b0b12;
    --accent: #7b5cff;
    --accent2: #f6c945;
    --text: #f5f5f7;
    --muted: rgba(245, 245, 247, 0.72);
    --muted2: rgba(245, 245, 247, 0.58);
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
