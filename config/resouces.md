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
const twa= [
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
