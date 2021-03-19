const staticCacheName = 'nuxt-pwa-v' + new Date().getTime()
const filesToCache = []

self.addEventListener('install', (event) => {
  this.skipWaiting()
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache)
    })
  )
  console.log(`
   _   _           _       _         _____                     _
| | | |_ __   __| | __ _| |_ ___  |  ___|__  _   _ _ __   __| |
| | | | '_ \\ / _\` |/ _\` | __/ _ \\ | |_ / _ \\| | | | '_ \\ / _\` |
| |_| | |_) | (_| | (_| | ||  __/ |  _| (_) | |_| | | | | (_| |
 \\___/| .__/ \\__,_|\\__,_|\\__\\___| |_|  \\___/ \\__,_|_| |_|\\__,_|
      |_|
  `)
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('nuxt-pwa-v'))
          .filter((cacheName) => cacheName !== staticCacheName)
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
  console.log(`
 ___           _        _ _          _
|_ _|_ __  ___| |_ __ _| | | ___  __| |
 | || '_ \\/ __| __/ _\` | | |/ _ \\/ _\` |
 | || | | \\__ \\ || (_| | | |  __/ (_| |
|___|_| |_|___/\\__\\__,_|_|_|\\___|\\__,_|
  `)
})

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => {}))
})
