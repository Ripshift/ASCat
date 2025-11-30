const { getRouter } = require('stremio-addon-sdk');
const addonInterface = require('./addon');
const express = require('express');
const path = require('path');

const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Serve static files first
app.use(express.static(path.join(__dirname, 'public')));

// Mount addon routes
const router = getRouter(addonInterface);
app.use(router);

// For local development
if (require.main === module) {
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => {
        console.log(`Stremio addon is running on http://localhost:${PORT}`);
        console.log(`Install in Stremio with: http://localhost:${PORT}/manifest.json`);
    });
}

module.exports = app;
