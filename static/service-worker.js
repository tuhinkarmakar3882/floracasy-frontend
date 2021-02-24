const staticCacheName = 'nuxt-pwa-v' + new Date().getTime()
const filesToCache = [
  'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Prata&family=Raleway:wght@300;400;500&display=swap',
  'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
]

// Cache on install
self.addEventListener('install', (event) => {
  this.skipWaiting()
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(filesToCache)
    })
  )
})

// Clear cache on activate
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

// Serve from Cache
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(staticCacheName).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return (
          response ||
          fetch(event.request).then((response) => {
            event.request.method === 'GET' &&
              (event.request.destination === 'style' ||
                event.request.destination === 'font') &&
              cache.put(event.request, response.clone())
            return response
          })
        )
      })
    })
  )
})

//  Workbox
// const revision = Date.now()
// const options = {
//   workboxURL:
//     'https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/workbox-sw.js',
//   importScripts: [],
//   config: { debug: true },
//   cacheOptions: {
//     cacheId: 'floracasy-' + revision,
//     directoryIndex: null,
//     revision,
//   },
//   clientsClaim: true,
//   skipWaiting: true,
//   cleanupOutdatedCaches: true,
//   offlineAnalytics: false,
//   preCaching: [],
//   runtimeCaching: [
//     {
//       urlPattern: 'https://fonts.googleapis.com/.*',
//       handler: 'CacheFirst',
//       method: 'GET',
//       strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
//       strategyPlugins: [],
//     },
//     {
//       urlPattern: 'https://cdn.materialdesignicons.com/.*',
//       handler: 'CacheFirst',
//       method: 'GET',
//       strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
//       strategyPlugins: [],
//     },
//     {
//       urlPattern: 'https://fonts.gstatic.com/.*',
//       handler: 'CacheFirst',
//       method: 'GET',
//       strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
//       strategyPlugins: [],
//     },
//     {
//       urlPattern: '/_nuxt/',
//       handler: 'NetworkFirst',
//       method: 'GET',
//       strategyPlugins: [],
//     },
//     {
//       urlPattern: '/images/',
//       handler: 'CacheFirst',
//       method: 'GET',
//       strategyPlugins: [],
//     },
//     {
//       urlPattern: '/',
//       handler: 'NetworkOnly',
//       method: 'GET',
//       strategyPlugins: [],
//     },
//     {
//       urlPattern: '/Home/Dashboard',
//       handler: 'NetworkOnly',
//       method: 'GET',
//       strategyPlugins: [],
//     },
//   ],
//   offlinePage: null,
//   pagesURLPattern: '/',
//   offlineStrategy: 'NetworkFirst',
// }
//
// importScripts(...[options.workboxURL, ...options.importScripts])
//
// initWorkbox(workbox, options)
// workboxExtensions(workbox, options)
// precacheAssets(workbox, options)
// cachingExtensions(workbox, options)
// runtimeCaching(workbox, options)
// offlinePage(workbox, options)
// routingExtensions(workbox, options)
//
// function getProp(obj, prop) {
//   return prop.split('.').reduce((p, c) => p[c], obj)
// }
//
// function initWorkbox(workbox, options) {
//   if (options.config) {
//     // Set workbox config
//     workbox.setConfig(options.config)
//   }
//
//   if (options.cacheNames) {
//     // Set workbox cache names
//     workbox.core.setCacheNameDetails(options.cacheNames)
//   }
//
//   if (options.clientsClaim) {
//     // Start controlling any existing clients as soon as it activates
//     workbox.core.clientsClaim()
//   }
//
//   if (options.skipWaiting) {
//     workbox.core.skipWaiting()
//   }
//
//   if (options.cleanupOutdatedCaches) {
//     workbox.precaching.cleanupOutdatedCaches()
//   }
//
//   if (options.offlineAnalytics) {
//     // Enable offline Google Analytics tracking
//     workbox.googleAnalytics.initialize()
//   }
// }
//
// function precacheAssets(workbox, options) {
//   if (options.preCaching.length) {
//     workbox.precaching.precacheAndRoute(
//       options.preCaching,
//       options.cacheOptions
//     )
//   }
// }
//
// function runtimeCaching(workbox, options) {
//   for (const entry of options.runtimeCaching) {
//     const urlPattern = new RegExp(entry.urlPattern)
//     const method = entry.method || 'GET'
//
//     const plugins = (entry.strategyPlugins || []).map(
//       (p) => new (getProp(workbox, p.use))(...p.config)
//     )
//
//     const strategyOptions = { ...entry.strategyOptions, plugins }
//
//     const strategy = new workbox.strategies[entry.handler](strategyOptions)
//
//     workbox.routing.registerRoute(urlPattern, strategy, method)
//   }
// }
//
// function offlinePage(workbox, options) {
//   if (options.offlinePage) {
//     // Register router handler for offlinePage
//     workbox.routing.registerRoute(
//       new RegExp(options.pagesURLPattern),
//       ({ request, event }) => {
//         const strategy = new workbox.strategies[options.offlineStrategy]()
//         return strategy
//           .handle({ request, event })
//           .catch(() => caches.match(options.offlinePage))
//       }
//     )
//   }
// }
//
// function workboxExtensions(workbox, options) {}
//
// function cachingExtensions(workbox, options) {}
//
// function routingExtensions(workbox, options) {}
