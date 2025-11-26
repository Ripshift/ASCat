const { addonBuilder } = require('stremio-addon-sdk');

// Addon manifest
const manifest = {
    id: 'com.example.catalogaddon',
    version: '1.0.0',
    name: 'My Catalog Addon',
    description: 'A catalog addon for Stremio',
    
    // Resources provided by this addon
    resources: ['catalog'],
    
    // Types of content this addon provides
    types: ['movie', 'series'],
    
    // Catalog definition
    catalogs: [
        {
            type: 'movie',
            id: 'my-movies',
            name: 'My Movies',
            extra: [
                { name: 'skip', isRequired: false },
                { name: 'genre', isRequired: false }
            ]
        },
        {
            type: 'series',
            id: 'my-series',
            name: 'My Series',
            extra: [
                { name: 'skip', isRequired: false },
                { name: 'genre', isRequired: false }
            ]
        }
    ]
};

// Create addon builder
const builder = new addonBuilder(manifest);

// Sample catalog data
const sampleMovies = [
    {
        id: 'tt1234567',
        type: 'movie',
        name: 'Sample Movie 1',
        poster: 'https://via.placeholder.com/300x450/FF5733/FFFFFF?text=Movie+1',
        background: 'https://via.placeholder.com/1920x1080/FF5733/FFFFFF?text=Movie+1',
        genre: ['Action', 'Adventure'],
        releaseInfo: '2023',
        description: 'This is a sample movie for demonstration purposes.'
    },
    {
        id: 'tt7654321',
        type: 'movie',
        name: 'Sample Movie 2',
        poster: 'https://via.placeholder.com/300x450/33C3FF/FFFFFF?text=Movie+2',
        background: 'https://via.placeholder.com/1920x1080/33C3FF/FFFFFF?text=Movie+2',
        genre: ['Comedy', 'Drama'],
        releaseInfo: '2023',
        description: 'Another sample movie for demonstration purposes.'
    }
];

const sampleSeries = [
    {
        id: 'tt9876543',
        type: 'series',
        name: 'Sample Series 1',
        poster: 'https://via.placeholder.com/300x450/33FF57/FFFFFF?text=Series+1',
        background: 'https://via.placeholder.com/1920x1080/33FF57/FFFFFF?text=Series+1',
        genre: ['Sci-Fi', 'Thriller'],
        releaseInfo: '2023',
        description: 'This is a sample series for demonstration purposes.'
    },
    {
        id: 'tt3456789',
        type: 'series',
        name: 'Sample Series 2',
        poster: 'https://via.placeholder.com/300x450/FF33C3/FFFFFF?text=Series+2',
        background: 'https://via.placeholder.com/1920x1080/FF33C3/FFFFFF?text=Series+2',
        genre: ['Mystery', 'Drama'],
        releaseInfo: '2023',
        description: 'Another sample series for demonstration purposes.'
    }
];

// Catalog handler
builder.defineCatalogHandler(({ type, id, extra }) => {
    console.log(`Catalog request: type=${type}, id=${id}, extra=${JSON.stringify(extra)}`);
    
    if (type === 'movie' && id === 'my-movies') {
        return Promise.resolve({ metas: sampleMovies });
    }
    
    if (type === 'series' && id === 'my-series') {
        return Promise.resolve({ metas: sampleSeries });
    }
    
    // Return empty catalog if no match
    return Promise.resolve({ metas: [] });
});

module.exports = builder.getInterface();
