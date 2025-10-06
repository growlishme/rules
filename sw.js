const CACHE_NAME = 'grammar-rules-v1';
const urlsToCache = [
    '/rules/',
    '/rules/assets/css/base.css',
    '/rules/assets/css/sidebar.css',
    '/rules/assets/css/table.css',
    '/rules/assets/favicon.svg',
    '/rules/manifest.json',

    '/rules/tenses/README.html',
    '/rules/tenses/01-present-simple.html',
    '/rules/tenses/02-present-continuous.html',
    '/rules/tenses/03-present-perfect.html',
    '/rules/tenses/04-present-perfect-continuous.html',
    '/rules/tenses/05-past-simple.html',
    '/rules/tenses/06-past-continuous.html',
    '/rules/tenses/07-past-perfect.html',
    '/rules/tenses/08-past-perfect-continuous.html',
    '/rules/tenses/09-future-simple-will.html',
    '/rules/tenses/10-future-going-to.html',
    '/rules/tenses/11-future-continuous.html',
    '/rules/tenses/12-future-perfect.html',
    '/rules/tenses/13-future-perfect-continuous.html',

    '/rules/prepositions/README.html',
    '/rules/prepositions/01-time.html',
    '/rules/prepositions/02-place.html',
    '/rules/prepositions/03-movement-direction.html',
    '/rules/prepositions/04-common-expressions.html',
    '/rules/prepositions/05-adjective-combinations.html',
    '/rules/prepositions/06-verb-combinations.html',
    '/rules/prepositions/07-common-mistakes.html',

    '/rules/2-passive-voice.html',
    '/rules/3-irregular-verbs.html',
    '/rules/4-phrasal-verbs.html',
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
