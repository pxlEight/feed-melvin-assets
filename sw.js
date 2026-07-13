const CACHE_NAME = 'feed-melvin-v5';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    'https://www.feedmelvin.com/melvin_icon_web_app.png?v=2',
    'https://www.feedmelvin.com/Nursery_background_rev002.png'
];

// Install: Pre-cache the core assets
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Forces the waiting service worker to become the active service worker
    
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        }).then(() => self.clients.claim()) // Takes control of all open pages immediately
    );
});

// Fetch: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
