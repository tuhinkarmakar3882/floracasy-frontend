const staticCacheName = 'floracasy-pwa-v' + new Date().getTime()
const filesToCache = [
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.2/styles/monokai.min.css',
  'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
  'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Prata&family=Raleway:wght@300;400;500&display=swap',
]
const OFFLINE_URL = '/offline.html'

self.addEventListener('install', (event) => {
  this.skipWaiting()
  event.waitUntil(
    (async () => {
      const cache = await caches.open(staticCacheName)
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))
      await cache.addAll(filesToCache)
    })()
  )
  console.log('Version Update')
})

// Cleanup Old Cache
self.addEventListener('activate', function (event) {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== staticCacheName
          })
          .map(function (cacheName) {
            return caches.delete(cacheName)
          })
      )
    })()
  )
})

// Put Things In New Cache & Enable Navigation Preload
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable()
      }

      const cacheNames = await caches.keys()

      await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('nuxt-pwa-v'))
          .filter((cacheName) => cacheName !== staticCacheName)
          .map((cacheName) => caches.delete(cacheName))
      )
    })()
  )
  self.clients.claim()

  console.log(`
 ___           _        _ _          _
|_ _|_ __  ___| |_ __ _| | | ___  __| |
 | || '_ \\/ __| __/ _\` | | |/ _ \\/ _\` |
 | || | | \\__ \\ || (_| | | |  __/ (_| |
|___|_| |_|___/\\__\\__,_|_|_|\\___|\\__,_|
  `)
})

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse
          if (preloadResponse) {
            return preloadResponse
          }

          const networkResponse = await fetch(event.request)
          return networkResponse
        } catch (error) {
          const cache = await caches.open(staticCacheName)
          return await cache.match(OFFLINE_URL)
        }
      })()
    )
  }
})

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open('mysite-dynamic').then(function(cache) {
//       return cache.match(event.request).then(function (response) {
//         return response || fetch(event.request).then(function(response) {
//           cache.put(event.request, response.clone());
//           return response;
//         });
//       });
//     })
//   );
// });
// self.addEventListener('fetch', (event) => {
// event.respondWith(fetch(event.request).catch(() => {}))
// })
