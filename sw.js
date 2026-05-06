const CACHE_NAME = 'madrasa-store-v2'; // Increment version
const ASSETS = [
  './',
  './index.html',
  './logo.png',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event - Network First for HTML, Stale-While-Revalidate for others
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // For HTML files (like index.html), use Network First
  if (e.request.mode === 'navigate' || (e.request.headers.get('accept') && e.request.headers.get('accept').includes('text/html'))) {
    e.respondWith(
      fetch(e.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy));
        return response;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  // For other assets, use Stale-While-Revalidate
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      const fetchedResponse = fetch(e.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, networkResponse.clone());
        });
        return networkResponse;
      }).catch(() => {});

      return cachedResponse || fetchedResponse;
    })
  );
});