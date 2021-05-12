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

```javascript

self.addEventListener('fetch', (event) => {
  console.log('Fetch event for ', event.request.url)
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log('Found ', event.request.url, ' in cache')
          return response
        }
        console.log('Network request for ', event.request.url)
        return fetch(event.request).then((response) => {
          // TODO 5 - Respond with custom 404 page
          return caches.open(staticCacheName).then((cache) => {
            event.request.method === 'GET' &&
              event.request.destination !== 'image' &&
              cache.put(event.request.url, response.clone())
            return response
          })
        })
      })
      .catch(() => {
        // TODO 6 - Respond with custom offline page
      })
  )
})
// Workbox
const revision = Date.now()
const options = {
  workboxURL:
    'https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/workbox-sw.js',
  importScripts: [],
  config: { debug: true },
  cacheOptions: {
    cacheId: 'floracasy-' + revision,
    directoryIndex: null,
    revision,
  },
  clientsClaim: true,
  skipWaiting: true,
  cleanupOutdatedCaches: true,
  offlineAnalytics: false,
  preCaching: [],
  runtimeCaching: [
    {
      urlPattern: 'https://fonts.googleapis.com/.*',
      handler: 'CacheFirst',
      method: 'GET',
      strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      strategyPlugins: [],
    },
    {
      urlPattern: 'https://cdn.materialdesignicons.com/.*',
      handler: 'CacheFirst',
      method: 'GET',
      strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      strategyPlugins: [],
    },
    {
      urlPattern: 'https://fonts.gstatic.com/.*',
      handler: 'CacheFirst',
      method: 'GET',
      strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
      strategyPlugins: [],
    },
    {
      urlPattern: '/_nuxt/',
      handler: 'NetworkFirst',
      method: 'GET',
      strategyPlugins: [],
    },
    {
      urlPattern: '/images/',
      handler: 'CacheFirst',
      method: 'GET',
      strategyPlugins: [],
    },
    {
      urlPattern: '/',
      handler: 'NetworkOnly',
      method: 'GET',
      strategyPlugins: [],
    },
    {
      urlPattern: '/Home/Dashboard',
      handler: 'NetworkOnly',
      method: 'GET',
      strategyPlugins: [],
    },
  ],
  offlinePage: '/Offline',
  pagesURLPattern: '/',
  offlineStrategy: 'NetworkFirst',
}

importScripts(...[options.workboxURL, ...options.importScripts])

initWorkbox(workbox, options)
workboxExtensions(workbox, options)
precacheAssets(workbox, options)
cachingExtensions(workbox, options)
runtimeCaching(workbox, options)
offlinePage(workbox, options)
routingExtensions(workbox, options)

function getProp(obj, prop) {
  return prop.split('.').reduce((p, c) => p[c], obj)
}

function initWorkbox(workbox, options) {
  if (options.config) {
    // Set workbox config
    workbox.setConfig(options.config)
  }

  if (options.cacheNames) {
    // Set workbox cache names
    workbox.core.setCacheNameDetails(options.cacheNames)
  }

  if (options.clientsClaim) {
    // Start controlling any existing clients as soon as it activates
    workbox.core.clientsClaim()
  }

  if (options.skipWaiting) {
    workbox.core.skipWaiting()
  }

  if (options.cleanupOutdatedCaches) {
    workbox.precaching.cleanupOutdatedCaches()
  }

  if (options.offlineAnalytics) {
    // Enable offline Google Analytics tracking
    workbox.googleAnalytics.initialize()
  }
}

function precacheAssets(workbox, options) {
  if (options.preCaching.length) {
    workbox.precaching.precacheAndRoute(
      options.preCaching,
      options.cacheOptions
    )
  }
}

function runtimeCaching(workbox, options) {
  for (const entry of options.runtimeCaching) {
    const urlPattern = new RegExp(entry.urlPattern)
    const method = entry.method || 'GET'

    const plugins = (entry.strategyPlugins || []).map(
      (p) => new (getProp(workbox, p.use))(...p.config)
    )

    const strategyOptions = { ...entry.strategyOptions, plugins }

    const strategy = new workbox.strategies[entry.handler](strategyOptions)

    workbox.routing.registerRoute(urlPattern, strategy, method)
  }
}

function offlinePage(workbox, options) {
  if (options.offlinePage) {
    // Register router handler for offlinePage
    workbox.routing.registerRoute(
      new RegExp(options.pagesURLPattern),
      ({ request, event }) => {
        const strategy = new workbox.strategies[options.offlineStrategy]()
        return strategy
          .handle({ request, event })
          .catch(() => caches.match(options.offlinePage))
      }
    )
  }
}

function workboxExtensions(workbox, options) {}

function cachingExtensions(workbox, options) {}

function routingExtensions(workbox, options) {}
```
