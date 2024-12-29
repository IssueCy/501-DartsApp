//?     Make app offline available with Service Worker:

const CACHE_NAME = 'darts-app-cache-v1';
const ASSETS = [
    './',
    './index.html',
    './game-panel.html',
    './style.css',
    './app.js',
    './fonts/Montserrat-VariableFont_wght.ttf',
    './fonts/Montserrat-Italic-VariableFont_wght.ttf',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('SW installed');
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});
