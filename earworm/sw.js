const CACHE_NAME = 'earworm-cache-v1';

// Add all the specific paths needed to run the app offline
const urlsToCache = [
  '/earworm/',
  '/earworm/index.html',
  '/earworm/manifest.json',
  '/earworm/icon-192.png',
  '/earworm/icon-512.png'
];

// Install the service worker and cache the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});