const staticCacheName = 'floracasy-pwa-v' + new Date().getTime()
const filesToCache = []
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

// // Cleanup Old Cache
// self.addEventListener('activate', (event) => {
//   console.log('[+] Cleaninup Old Cache')
//   event.waitUntil(
//     (async () => {
//       const cacheNames = await caches.keys()
//       await Promise.all(
//         cacheNames
//           .filter((cacheName) => cacheName !== staticCacheName)
//           .map((cacheName) => caches.delete(cacheName))
//       )
//     })()
//   )
// })

// Put Things In New Cache & Enable Navigation Preload
self.addEventListener('activate', (event) => {
  console.log('[+] Putting Things In New Cache & Activating Navigation Preload')
  event.waitUntil(
    (async () => {
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable()
      }

      const cacheNames = await caches.keys()
      const cache = await caches.open(staticCacheName)
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))
      await cache.addAll(filesToCache)

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

          return await fetch(event.request)
        } catch (error) {
          const cache = await caches.open(staticCacheName)
          return await cache.match(OFFLINE_URL)
        }
      })()
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
