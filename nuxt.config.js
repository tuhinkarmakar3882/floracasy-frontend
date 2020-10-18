import bodyParser from 'body-parser'
import session from 'cookie-session'
//
const milliseconds = 1000
const hours = 1
const minutes = 1
const seconds = 60

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
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
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
    ],
  },

  css: ['~/styles/main.scss'],

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
      apiKey: 'AIzaSyAWuJIU3_V6pf0QvF9wev36pNvXYGmNJNo',
      authDomain: 'floracasy.firebaseapp.com',
      databaseURL: 'https://floracasy.firebaseio.com',
      projectId: 'floracasy',
      storageBucket: 'floracasy.appspot.com',
      messagingSenderId: '295292997514',
      appId: '1:295292997514:web:7ac338f7f4fee2ede48273',
      measurementId: 'G-XJLFQ1C8VD',
    },
    services: {
      auth: true,
      // firestore: true,
      // functions: true,
      // storage: true,
      // realtimeDb: true,
      messaging: true,
      performance: true,
      analytics: true,
      remoteConfig: true,
    },
    auth: {
      persistence: 'local', // default
      initialize: {
        onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
        onAuthStateChangedAction: 'onAuthStateChangedAction',
      },
      ssr: true, // default
    },
  },

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
