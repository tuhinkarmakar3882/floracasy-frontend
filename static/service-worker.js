const precacheName = 'precache-floracasy-pwa-v' + new Date().getTime()
const runtimeCacheName = 'runtime-floracasy-pwa-v' + new Date().getTime()

const precacheList = [
  'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,300;1,400&family=Prata&family=Roboto:wght@300;400&display=swap',
  'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
]

/* Cache on install */
self.addEventListener('install', (event) => {
  this.skipWaiting()
  console.log('Installing...')
  event.waitUntil(
    caches.open(precacheName).then((cache) => {
      return cache.addAll(precacheList)
    })
  )
  console.log('Installed.')
})

/* Clear cache on activate */
self.addEventListener('activate', (event) => {
  console.log('Cleaning old Caches')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('django-pwa-'))
          .filter((cacheName) => cacheName !== precacheName)
          .map((cacheName) => caches.delete(cacheName))
      )
    })
  )
  console.log('Activated!')
})

/* Serve from Cache */
self.addEventListener('fetch', (event) => {
  console.log('fetch')
  event.respondWith(
    caches
      .match(event.request)
      .then(async (response) => {
        if (response) {
          return response
        }
        const networkResponse = await fetch(event.request)
        const clonedResponse = networkResponse.clone()
        const runtimeCache = await caches.open(runtimeCacheName)
        await runtimeCache.put(event.request, networkResponse)
        return Promise.resolve(clonedResponse)
      })
      .catch(() => {
        return caches.match('/offline/')
      })
  )
})
