self.addEventListener('install', function (event) {
  // مجرد تنصيب - مش بنخزن شيء ثابت هنا
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          return caches.delete(cacheName); // يمسح الكاشات القديمة لو فيه تحديث
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  // نحاول نرد من الكاش أولاً، وإذا ما لقينا، نجيب من النت ونخزن
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response; // من الكاش
      }

      return fetch(event.request).then(function (networkResponse) {
        return caches.open('dynamic-cache').then(function (cache) {
          // نخزن نسخة من الاستجابة في الكاش
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(function () {
        // ممكن ترجع صفحة fallback هنا لو حابب
      });
    })
  );
});
