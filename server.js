const { serveHTTP, getRouter } = require('stremio-addon-sdk');
const addonInterface = require('./addon');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 7000;

serveHTTP(addonInterface, { port: PORT }).then(({ server, app }) => {
    // Serve static files from public directory
    app.use(express.static(path.join(__dirname, 'public')));
    
    console.log(`Stremio addon is running on http://localhost:${PORT}`);
    console.log(`Install in Stremio with: http://localhost:${PORT}/manifest.json`);
}).catch((error) => {
    console.error('Error starting addon:', error);
    process.exit(1);
});
