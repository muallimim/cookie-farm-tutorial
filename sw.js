const CACHE_NAME = 'cookie-farm-tutorial-v1';

const URLS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=2',
  './module_01.html',
  './module_02.html',
  './module_03.html',
  './module_04.html',
  './module_05.html',
  './module_06.html',
  './module_07.html',
  './module_08.html',
  './module_09.html',
  './module_10.html',
  './module_11.html',
  './module_12.html',
  './module_13.html',
  './module_14.html',
  './module_15.html',
  './module_16.html',
  './module_17.html',
  './module_18.html',
  './module_19.html',
  './module_20.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Tüm 20 modül çevrimdışı kullanım için önbelleğe alındı.');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // Çevrimdışı hafızadan anında getir (Sıfır mobil kota harcar)
      }
      return fetch(event.request);
    })
  );
});
