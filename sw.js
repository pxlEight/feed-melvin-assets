const CACHE_NAME = 'feed-melvin-v1';

// All the assets your game needs to run offline
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    'https://fonts.googleapis.com/css2?family=VT323&display=swap',
    'https://pxleight.github.io/feed-melvin-assets/melvin_icon_web_app.png',
    'https://pxleight.github.io/feed-melvin-assets/Nursery_background_rev002.svg',
    'https://pxleight.github.io/feed-melvin-assets/levi_scale_sprite_web.svg',
    'https://pxleight.github.io/feed-melvin-assets/classic_levi_sprite_web.svg',
    'https://pxleight.github.io/feed-melvin-assets/super_levi_sprite_web.svg',
    'https://pxleight.github.io/feed-melvin-assets/super_levi_FULL_sprite_web.svg',
    'https://pxleight.github.io/feed-melvin-assets/gamma_levi_sprite_web.svg',
    'https://pxleight.github.io/feed-melvin-assets/feed_bottle_sprite_web.svg',
    'https://pxleight.github.io/feed-melvin-assets/burp_hand_sprite_web.svg'
];

// Install Event: Cache all assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Fetch Event: Serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
