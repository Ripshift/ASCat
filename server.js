const { getRouter } = require('stremio-addon-sdk');
const addonInterface = require('./addon');
const express = require('express');
const path = require('path');

const router = getRouter(addonInterface);
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Mount addon routes
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
