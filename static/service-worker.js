const staticCacheName = 'floracasy-pwa-v' + new Date().getTime()
const filesToCache = ['/offline.html']
const OFFLINE_URL = '/offline.html'

self.addEventListener('install', (event) => {
  this.skipWaiting()
  event.waitUntil(
    (async () => {
      const cache = await caches.open(staticCacheName)
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))
      return await cache.addAll(filesToCache)
    })()
  )
  console.log('Version Update')
})

// Cleanup Old Cache
self.addEventListener('activate', (event) => {
  console.log('[+] Cleaning up Old Cache')
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()
      return await Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('nuxt-pwa-v'))
          .filter((cacheName) => cacheName !== staticCacheName)
          .map((cacheName) => caches.delete(cacheName))
      )
    })()
  )
})

// Put Things In New Cache & Enable Navigation Preload
self.addEventListener('activate', (event) => {
  console.log('[+] Putting Things In New Cache & Activating Navigation Preload')
  event.waitUntil(
    (async () => {
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable()
      }

      const cache = await caches.open(staticCacheName)
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))
      return await cache.addAll(filesToCache)
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
    console.log('navigation')
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse
          if (preloadResponse) {
            return preloadResponse
          }

          return await fetch(event.request)
        } catch (error) {
          const cache = await caches.open(staticCacheName)
          return await cache.match(OFFLINE_URL)
        }
      })()
    )
  }
})

self.addEventListener('fetch', function (event) {
  if (event.request.method === 'GET') {
    console.log('GET Call')
    event.respondWith(
      caches.open(staticCacheName).then((cache) => {
        return fetch(event.request).catch(() => {
          return caches.match(OFFLINE_URL)
        })
      })
    )
  }
})

// self.addEventListener('fetch', (event) => {
// if (event.request.mode === 'navigate') {
//   event.respondWith(
//     (async () => {
//       try {
//         const preloadResponse = await event.preloadResponse
//         if (preloadResponse) {
//           return preloadResponse
//         }
//
//         return await fetch(event.request)
//       } catch (error) {
//         const cache = await caches.open(staticCacheName)
//         return await cache.match(OFFLINE_URL)
//       }
//     })()
//   )
// }
// event.respondWith(
//   (async () => {
//     const cache = await caches.open(staticCacheName)
//     try {
//       const response = await cache
//         .match(event.request);
//     } catch(e
//   ) {
//   })()
// )
// })

// self.addEventListener('fetch', (event) => {
// event.respondWith(fetch(event.request).catch(() => {}))
// })
