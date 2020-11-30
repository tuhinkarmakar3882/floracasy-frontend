import * as secrets from './environmentalVariables'
import * as packageJson from './package.json'

export default {
  ssr: true,
  components: true,

  server: {
    // host: '0.0.0.0',
    port: 3001,
  },
  serverMiddleware: ['~/api', '~/server/middleware/selective-ssr.js'],

  modern: {
    client: true,
    server: true,
  },

  router: {},

  plugins: [
    '~/plugins/custom-material-ripple.js',
    '~/plugins/firebase.js',
    {
      src: '~/plugins/firebase-authentication.js',
      mode: 'client',
    },
    {
      src: '~/plugins/axios.js',
      mode: 'client',
    },
    {
      src: '~/plugins/notificationSocketConnection.js',
      mode: 'client',
    },
    {
      src: '~/plugins/nuxt-quill-editor.js',
      mode: 'client',
    },
    {
      src: '~/plugins/vue-infinite-loading.js',
      mode: 'client',
    },
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    'cookie-universal-nuxt',
    [
      'nuxt-lazy-load',
      {
        images: true,
        videos: true,
        audios: true,
        iframes: true,
        native: false,
        polyfill: true,
        directiveOnly: false,

        defaultImage: '/images/default.svg',

        // To remove class set value to false
        loadingClass: 'isLoading',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad',

        observerConfig: {
          // See IntersectionObserver documentation
        },
      },
    ],

    //  // The Following should be used only while building an TWA app
    // [
    //   'nuxt-twa-module',
    //   {
    //     /* module options */
    //     defaultUrl: 'https://dev.floracasy.nubes.live',
    //     hostName: 'dev.floracasy.nubes.live',
    //     applicationId: 'com.floracasy.dev',
    //     launcherName: 'Floracasy',
    //     versionCode: 1,
    //     versionName: '1.0',
    //     statusBarColor: packageJson.themeColor,
    //     sha256Fingerprints: [''],
    //     iconPath: '/static/icon.png',
    //     distFolder: '.nuxt/dist/client',
    //   },
    // ],
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
  ],

  build: {
    extractCSS: true,
  },

  axios: {
    baseURL: secrets.baseUrl,
    retry: { retries: 1 },
  },

  css: [
    '~/styles/main.scss',
    //
  ],
  head: {
    titleTemplate: '%s - Floracasy',
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'The One Stop Hub for Passionate & Creative minds',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'preconnect',
        crossorigin: true,
        href: 'https://fonts.gstatic.com/',
      },
      {
        rel: 'preconnect',
        crossorigin: true,
        href: 'https://cdn.materialdesignicons.com/',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,300;1,400&family=Prata&family=Roboto:wght@300;400&display=swap',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
      },
    ],
  },

  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#C5C2FF',
    background: '#050514',
  },

  loading: { color: '#C5C2FF' },

  layoutTransition: {
    name: 'gray-shift',
    mode: 'out-in',
  },

  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },

  content: {},

  tailwindcss: {
    config: {
      theme: {
        fontSize: {
          xs: ['0.75rem', { lineHeight: '1rem' }],
          sm: ['0.875rem', { lineHeight: '1.25rem' }],
          base: ['1rem', { lineHeight: '1.5rem' }],
          lg: ['1.125rem', { lineHeight: '1.75rem' }],
          xl: ['1.25rem', { lineHeight: '1.75rem' }],
          '2xl': ['1.5rem', { lineHeight: '2rem' }],
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
          '5xl': ['3rem', { lineHeight: '1' }],
          '6xl': ['4rem', { lineHeight: '1' }],
        },
      },
      variants: {},
      plugins: [],
      future: {
        standardFontWeights: true,
        defaultLineHeights: true,
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
      },
      purge: {
        layers: ['base', 'components', 'utilities'],
        enabled: process.env.NODE_ENV === 'production',
        content: [
          'components/**/*.vue',
          'layouts/**/*.vue',
          'pages/**/*.vue',
          'plugins/**/*.js',
          'nuxt.config.js',
          // TypeScript
          'plugins/**/*.ts',
          'nuxt.config.ts',
        ],
      },
    },
  },

  pwa: {
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
      start_url: '/',
    },
    workbox: false,
    // workbox: {
    //   // workboxVersion: require('workbox-cdn/package.json').version,
    //   // workboxURL: undefined,
    //   // importScripts: [],
    //   enabled: true,
    //   autoRegister: true,
    //   // dev: undefined,
    //   // Config
    //   config: {
    //     debug: true,
    //   },
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   offlineAnalytics: false,
    //   workboxExtensions: [],
    //
    //   // Precache
    //   preCaching: [],
    //   cacheOptions: {
    //     cacheId: 'floracasy' + Date.now().toString(),
    //     directoryIndex: '/',
    //     revision: Date.now(),
    //   },
    //   cachingExtensions: [],
    //   cleanupOutdatedCaches: true,
    //
    //   // Offline
    //   offline: false,
    //   offlineStrategy: 'NetworkFirst',
    //   offlinePage: null,
    //   offlineAssets: [],
    //
    //   // Runtime Caching
    //   runtimeCaching: [
    //     {
    //       urlPattern: 'https://fonts.googleapis.com/.*',
    //       handler: 'cacheFirst',
    //       method: 'GET',
    //       strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
    //     },
    //     {
    //       urlPattern: 'https://cdn.materialdesignicons.com/.*',
    //       handler: 'cacheFirst',
    //       method: 'GET',
    //       strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
    //     },
    //     {
    //       urlPattern: 'https://fonts.gstatic.com/.*',
    //       handler: 'cacheFirst',
    //       method: 'GET',
    //       strategyOptions: { cacheableResponse: { statuses: [0, 200] } },
    //     },
    //   ],
    //   routingExtensions: [],
    //   cacheAssets: true,
    //   // assetsURLPattern: undefined,
    //   // pagesURLPattern: undefined,
    //
    //   // Sw
    //   // swTemplate: undefined,
    //   // swUrl: 'service-worker.js',
    //   // swScope: '/',
    //   // swDest: undefined,
    //
    //   // Router
    //   // routerBase: undefined,
    //   // publicPath: undefined
    // },
  },
}
