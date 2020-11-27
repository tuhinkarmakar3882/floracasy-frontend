const staticCacheName = 'django-pwa-v' + new Date().getTime()
const filesToCache = [
  'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,300;1,400&family=Prata&family=Roboto:wght@300;400&display=swap',
]

// Cache on install
self.addEventListener('install', (event) => {
  this.skipWaiting()
  console.log('install')
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache)
    })
  )
})

// Clear cache on activate
self.addEventListener('activate', (event) => {
  console.log('activate')

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('django-pwa-'))
          .filter((cacheName) => cacheName !== staticCacheName)
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
})

// Serve from Cache
self.addEventListener('fetch', (event) => {
  console.log('fetch')
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request)
      })
      .catch(() => {
        return caches.match('/offline/')
      })
  )
})
