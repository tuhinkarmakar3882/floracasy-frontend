const staticCacheName = 'nuxt-pwa-v' + new Date().getTime()
const filesToCache = []

self.addEventListener('install', (event) => {
  this.skipWaiting()
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache)
    })
  )
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
})

self.addEventListener('fetch', (event) => {
  console.log('Thank you for using Floracasy.com')
  event.respondWith(fetch(event.request))
})
