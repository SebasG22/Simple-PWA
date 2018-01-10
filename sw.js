var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = ['/','index.html', '/styles.css'];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
            if(cacheName === CACHE_NAME ) return
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
  
    const title = 'Yai works !';
    const options = {
      body: event.data.text(),
      icon: 'assets/imgs/android-icon-36x36.png',
      badge: 'assets/imgs/android-icon-36x36.png'
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });