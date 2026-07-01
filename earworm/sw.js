const CACHE_NAME = 'synth-cache-v1';

// Add all the specific paths needed to run the app offline
const urlsToCache = [
  '/synth/',
  '/synth/index.html',
  '/synth/manifest.json',
  '/synth/icon-192.png',
  '/synth/icon-512.png'
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