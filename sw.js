const CACHE_NAME = 'grammar-rules-v1';
const urlsToCache = [
    '/rules/',
    '/rules/assets/css/site.css',
    '/rules/assets/favicon.svg',
    '/rules/manifest.json',
    '/rules/tenses/README.html',
    '/rules/prepositions/README.html',
    '/rules/2-passive-voice.html',
    '/rules/3-irregular-verbs.html',
    '/rules/4-phrasal-verbs.html',
    // Add more pages as needed
];

// Install event - cache resources
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
