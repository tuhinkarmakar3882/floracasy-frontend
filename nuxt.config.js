import bodyParser from 'body-parser'
import session from 'cookie-session'

const milliseconds = 1000
const hours = 1
const minutes = 5
const seconds = 30

export default {
  server: {
    // host: '0.0.0.0',
    port: 3001,
  },

  ssr: true,

  modern: {
    client: true,
    server: true,
  },

  serverMiddleware: [
    bodyParser.json(),
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      maxAge: hours * minutes * seconds * milliseconds,
    }),
    '~/api',
    '~/server/middleware/selective-ssr.js',
  ],

  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
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
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,300;1,400&family=Prata&family=Roboto:wght@300;400&display=swap',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
      },
    ],
  },

  css: [
    '~/styles/main.scss',
    //
  ],

  plugins: ['~/plugins/directives.js'],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxtjs/eslint-module',
  ],

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
        layers: ['utilities'],
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

  eslint: {
    fix: true,
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
    '@nuxtjs/firebase',
    // 'nuxtjs-mdi-font',
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
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyBC8dH53PFPOWqN72FHSZtjM6ekF3gbEOM',
      authDomain: 'floracasy-673ff.firebaseapp.com',
      databaseURL: 'https://floracasy-673ff.firebaseio.com',
      projectId: 'floracasy-673ff',
      storageBucket: 'floracasy-673ff.appspot.com',
      messagingSenderId: '804365562035',
      appId: '1:804365562035:web:c45a8c8ff793dfe2ec00c6',
      measurementId: 'G-RJ7XT8K378',
    },
    services: {
      auth: true,
      // firestore: true,
      // functions: true,
      // storage: true,
      // realtimeDb: true,
      // messaging: true,
      // performance: true,
      // analytics: true,
      // remoteConfig: false,
    },
    auth: {
      persistence: 'local', // default
      initialize: {
        onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
        onAuthStateChangedAction: 'onAuthStateChangedAction',
      },
      ssr: true,
    },
  },

  // pwa: {
  // meta: false,
  // icon: false,
  // manifest: false,
  // workbox: {
  //   importScripts: [
  //     '/firebase-auth-sw.js',
  //   ],
  //   dev: false,
  // },
  // },

  axios: {},

  content: {},

  build: {
    extractCSS: true,
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
}
