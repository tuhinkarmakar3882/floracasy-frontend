```javascript
const pwa = {
  meta: {
    name: packageJson.appName,
    author: 'Floracasy Team',
    appleStatusBarStyle: 'black',
    nativeUI: true,
    background_color: packageJson.themeColor,
    theme_color: packageJson.themeColor,
    status_bar: packageJson.themeColor,
  },
  manifest: {
    name: packageJson.appName,
    description: packageJson.description,
    short_name: 'Floracasy',
    lang: 'en-US',
    background_color: packageJson.themeColor,
    theme_color: packageJson.themeColor,
    status_bar: packageJson.themeColor,
    display: 'standalone',
    // start_url: '',
  },
  workbox: {
    // workboxVersion: require('workbox-cdn/package.json').version,
    // workboxURL: undefined,
    // importScripts: [],
    enabled: true,
    autoRegister: true,
    // dev: undefined,
    // Config
    config: {
      debug: true,
    },
    clientsClaim: true,
    skipWaiting: true,
    offlineAnalytics: false,
    workboxExtensions: [],

    // Precache
    preCaching: [],
    cacheOptions: {
      cacheId: 'floracasy' + Date.now().toString(),
      directoryIndex: '/',
      revision: Date.now(),
    },
    cachingExtensions: [],
    cleanupOutdatedCaches: true,

    // Offline
    offline: false,
    offlineStrategy: 'NetworkOnly',
    offlinePage: null,
    offlineAssets: [],

    // Runtime Caching
    runtimeCaching: [
      {
        urlPattern: 'https://fonts.googleapis.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: {cacheableResponse: {statuses: [0, 200]}},
      },
      {
        urlPattern: 'https://cdn.materialdesignicons.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: {cacheableResponse: {statuses: [0, 200]}},
      },
      {
        urlPattern: 'https://fonts.gstatic.com/.*',
        handler: 'cacheFirst',
        method: 'GET',
        strategyOptions: {cacheableResponse: {statuses: [0, 200]}},
      },
    ],
    routingExtensions: [],
    cacheAssets: true,
    assetsURLPattern: undefined,
    // pagesURLPattern: undefined,

    // Sw
    // swTemplate: undefined,
    // swUrl: 'service-worker.js',
    // swScope: '/',
    // swDest: undefined,

    // Router
    // routerBase: undefined,
    // publicPath: undefined
  },
}

// The Following should be used only while building an TWA app
const twa = [
  'nuxt-twa-module',
  {
    defaultUrl: 'https://dev.floracasy.nubes.live',
    hostName: 'dev.floracasy.nubes.live',
    applicationId: 'com.floracasy.dev',
    launcherName: 'Floracasy',
    versionCode: 1,
    versionName: '1.0',
    statusBarColor: packageJson.themeColor,
    sha256Fingerprints: [''],
    iconPath: '/static/icon.png',
    distFolder: '.nuxt/dist/client',
  },
]

const vue = {
  config: {
    productionTip: true,
    devtools: true,
  },
}
```

```javascript
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
```
