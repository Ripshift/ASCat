const { serveHTTP } = require('stremio-addon-sdk');
const addonInterface = require('./addon');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 7000;

// Create Express app to serve static files
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

serveHTTP(addonInterface, { port: PORT, app: app })
    .then(() => {
        console.log(`Stremio addon is running on http://localhost:${PORT}`);
        console.log(`Install in Stremio with: http://localhost:${PORT}/manifest.json`);
    })
    .catch((error) => {
        console.error('Error starting addon:', error);
        process.exit(1);
    });
