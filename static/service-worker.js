const version = '1.0.0'
const precacheName = 'precache-floracasy-pwa-v' + new Date().getTime()

const precacheList = [
  'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,300;1,400&family=Prata&family=Roboto:wght@300;400&display=swap',
  'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
]

/* Cache on install */
self.addEventListener('install', function (event) {
  console.log('WORKER: install event in progress.')
  event.waitUntil(
    caches
      .open(version + precacheName)
      .then((cache) => {
        return cache.addAll(precacheList)
      })
      .then(function () {
        console.log('WORKER: install completed')
      })
  )
})

self.addEventListener('fetch', function (event) {
  console.log('WORKER: fetch event in progress.')

  if (event.request.method !== 'GET') {
    console.log(
      'WORKER: fetch event ignored.',
      event.request.method,
      event.request.url
    )
    return
  }
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      const networked = fetch(event.request)
        .then(fetchedFromNetwork, unableToResolve)
        .catch(unableToResolve)

      console.log(
        'WORKER: fetch event',
        cached ? '(cached)' : '(network)',
        event.request.url
      )
      return cached || networked

      function fetchedFromNetwork(response) {
        const cacheCopy = response.clone()
        console.log('WORKER: fetch response from network.', event.request.url)

        caches
          .open(version + 'pages')
          .then(function add(cache) {
            cache.put(event.request, cacheCopy)
          })
          .then(function () {
            console.log(
              'WORKER: fetch response stored in cache.',
              event.request.url
            )
          })
        return response
      }

      function unableToResolve() {
        console.log('WORKER: fetch request failed in both cache and network.')
        /* Here we're creating a response programmatically. The first parameter is the
             response body, and the second one defines the options for the response.
          */
        return new Response('<h1>Service Unavailable</h1>', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/html',
          }),
        })
      }
    })
  )
})

self.addEventListener('activate', function (event) {
  console.log('WORKER: activate event in progress.')

  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (key) {
              return !key.startsWith(version)
            })
            .map(function (key) {
              return caches.delete(key)
            })
        )
      })
      .then(function () {
        console.log('WORKER: activate completed.')
      })
  )
})
