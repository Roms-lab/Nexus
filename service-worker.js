const CACHE_NAME = 'nexus-cache-v1';
const OFFLINE_URL = 'offline.html';

// Add all files that should be available offline
const assetsToCache = [
  '/', // The root directory
  OFFLINE_URL,
  'index.html',
  'main.html',
  // Add other critical assets like CSS and JS files
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching essential assets');
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached asset if found
      if (response) {
        return response;
      }

      // If not in cache, try fetching from the network
      return fetch(event.request).catch(() => {
        // If network fails, serve the offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
