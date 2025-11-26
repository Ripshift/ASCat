# Stremio Catalog Addon

A catalog addon for Stremio that provides custom movie and series catalogs.

## Features

- ✅ Movie catalog
- ✅ Series catalog
- ✅ Genre filtering support
- ✅ Pagination support

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the addon:
   ```bash
   npm start
   ```

3. The addon will run on `http://localhost:7000`

## Adding to Stremio

### Local Installation (HTTP)
1. Open Stremio
2. Go to Addons
3. Click the puzzle icon (🧩) in the top right
4. Enter the addon URL: `http://localhost:7000/manifest.json`
5. Click "Install"

### Remote Installation (HTTPS) - Using ngrok
1. Start the addon: `npm start`
2. In another terminal, run: `ngrok http 7000`
3. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
4. In Stremio, install with: `https://abc123.ngrok.io/manifest.json`

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

## Customization

Edit `addon.js` to customize:
- **Manifest**: Change addon name, description, and catalog definitions
- **Sample Data**: Replace `sampleMovies` and `sampleSeries` with your own data
- **Catalog Handler**: Modify the logic to fetch data from APIs or databases

## Catalog Structure

Each catalog item (meta) should have:
- `id`: Unique identifier (IMDB ID recommended, e.g., "tt1234567")
- `type`: Content type ("movie" or "series")
- `name`: Title of the content
- `poster`: URL to poster image (recommended: 300x450)
- `background`: URL to background image (optional, recommended: 1920x1080)
- `genre`: Array of genres
- `releaseInfo`: Release year
- `description`: Plot summary

## Adding Real Data

Replace the sample data with real content from:
- External APIs (TMDB, OMDB, etc.)
- Your own database
- JSON files
- Web scraping (ensure you have permission)

Example with TMDB API:
```javascript
const fetch = require('node-fetch');
const TMDB_API_KEY = 'your_api_key';

builder.defineCatalogHandler(async ({ type, id, extra }) => {
    if (type === 'movie' && id === 'my-movies') {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`
        );
        const data = await response.json();
        
        const metas = data.results.map(movie => ({
            id: `tt${movie.id}`,
            type: 'movie',
            name: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            background: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            description: movie.overview,
            releaseInfo: movie.release_date.split('-')[0]
        }));
        
        return { metas };
    }
    
    return { metas: [] };
});
```

## HTTPS Deployment Options

### Option 1: ngrok (Easiest for Testing)
1. Install ngrok: `npm install -g ngrok` or download from https://ngrok.com
2. Start your addon: `npm start`
3. In another terminal: `ngrok http 7000`
4. Use the HTTPS URL provided (e.g., `https://abc123.ngrok.io/manifest.json`)

**Pros**: Instant HTTPS, no configuration needed
**Cons**: Free tier has random URLs that change on restart

### Option 2: Cloudflare Tunnel (Free, Persistent)
1. Install cloudflared: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
2. Run: `cloudflared tunnel --url http://localhost:7000`
3. Use the provided HTTPS URL

**Pros**: Free, more stable than ngrok free tier
**Cons**: Requires Cloudflare account for persistent tunnels

### Option 3: Deploy to Cloud Platform (GitHub Integration)

#### Render (Easiest)
1. Push code to GitHub
2. Go to https://render.com and sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Render auto-detects settings from `render.yaml`
6. Click "Create Web Service"
7. Get your HTTPS URL (e.g., `https://your-addon.onrender.com`)

#### Railway
1. Push code to GitHub
2. Go to https://railway.app and sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-deploys using `railway.json`
6. Get your HTTPS URL from the deployment

#### Vercel
1. Push code to GitHub
2. Go to https://vercel.com and sign in with GitHub
3. Click "Add New" → "Project"
4. Import your repository
5. Vercel uses `vercel.json` for configuration
6. Get your HTTPS URL (e.g., `https://your-addon.vercel.app`)

All platforms provide:
- ✅ Free HTTPS
- ✅ Auto-deploy on git push
- ✅ Custom domains (optional)

### Option 4: Self-Hosted with SSL Certificate
Add HTTPS directly to the addon (requires domain + SSL certificate):

```javascript
// server.js - HTTPS version
const https = require('https');
const fs = require('fs');
const { getRouter } = require('stremio-addon-sdk');
const addonInterface = require('./addon');

const PORT = process.env.PORT || 7000;

const options = {
    key: fs.readFileSync('path/to/private-key.pem'),
    cert: fs.readFileSync('path/to/certificate.pem')
};

https.createServer(options, getRouter(addonInterface))
    .listen(PORT, () => {
        console.log(`HTTPS addon running on https://localhost:${PORT}`);
    });
```

Get free SSL certificates from [Let's Encrypt](https://letsencrypt.org/) using certbot.

## License

MIT
