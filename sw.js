const CACHE_NAME = 'madrasa-store-v1';
const ASSETS = [
  './',               // ഇത് പുതുതായി ചേർക്കുക
  './index.html',
  './logo.png',
  './manifest.json',
  './icon-192.png',   // ഐക്കണുകളും ചേർക്കുന്നത് നല്ലതാണ്
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});