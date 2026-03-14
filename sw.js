self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('madrasa-store').then((cache) => cache.addAll([
      './index.html',
      './style.css', // നിങ്ങളുടെ സി.എസ്.എസ് ഫയൽ പേര്
      './script.js'  // നിങ്ങളുടെ ജാവാസ്ക്രിപ്റ്റ് ഫയൽ പേര്
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});