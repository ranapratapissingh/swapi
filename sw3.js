"use script";
var cacheNames = {
  'shell' : 'cachedShell.v2',
  'js' : 'cachedJs.v1',
  'css' : 'cachedCss.v2',
  'img' : 'cachedImg.v2',
  'font' : 'cachedFont.v2',
  'api' : 'cachedApi.v2'
};
self.addEventListener('install', function(evt) {
    evt.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(evt) {
    evt.waitUntil(
        caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
            
            var cacheName = '';
            for (var cacheKey in cacheNames) {
              var temp = cacheNames.cacheKey;
              if (temp) {
                temp = temp.slice(0, temp.length-1);
                tempkey = key.slice(0, key.length-1);
                if (temp == tempkey) {
                  cacheName = cacheNames.cacheKey;
                  console.log(cacheName);
                  break;
                }
              }
            }

            if (key !== cacheName) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
      );
      return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  var referrerUrl = event.request.referrer;
  var requestUrl = event.request.url;
  if (event.request.method != 'GET') {
    event.respondWith(fetch(event.request));
  } else{
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
          var fetchRequest = event.request.clone();
          var cacheName = cacheNames['shell'];
          /*check image request*/
          if (/.*\.(jpg|png|jpeg|gif)$/i.test(event.request.url)) {
            cacheName = cacheNames['img'];
          }
          /*check image request*/
          /*check css request*/
          if (/.*\.(css)$/i.test(event.request.url)) {
            cacheName = cacheNames['css'];
          }
          /*check css request*/
          /*check js request*/
          if (/.*\.(js|json)$/i.test(event.request.url)) {
            cacheName = cacheNames['js'];
          }
          /*check js request*/
          /*check font request*/
          if (/.*\.(woff|woff2)$/i.test(event.request.url)) {
            cacheName = cacheNames['font'];
          }
          /*check font request*/
          /*check api request*/
          if (/.*\/api\//i.test(event.request.url)) {
            cacheName = cacheNames['api'];
          }
          /*check api request*/
          // Cache hit - return response if not api
          /*if (response && (cacheName!=cacheNames['api'] && cacheName!=cacheNames['js'] && cacheName!=cacheNames['css'])) {
            return response;
          }*/

          var fetchPromise = fetch(fetchRequest).then(
            function(response) {
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              var responseToCache = response.clone();
              
              caches.open(cacheName)
                .then(function(cache) {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
          if (referrerUrl.indexOf('bp') > -1 || requestUrl.indexOf('bp') > -1) {
              return fetchPromise;
          }
          
          return response || fetchPromise;
        })
      );
  }

});
