import * as secrets from './environmentalVariables'

export default {
  ssr: true,
  components: true,

  server: {
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
      src: '~/plugins/vue-infinite-loading.js',
      mode: 'client',
    },
  ],

  modules: [
    '~/module/csp.js',
    '@nuxtjs/axios',
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
        loadingClass: 'isLoading',
        loadedClass: 'isLoaded',
        appendClass: 'lazyLoad',
        observerConfig: {},
      },
    ],
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
  ],

  build: {
    extractCSS: {
      ignoreOrder: true,
    },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
  },

  render: {
    asyncScripts: true,

    csp: {
      addMeta: process.env.NODE_ENV === 'production',
    },
  },

  axios: {
    baseURL: secrets.baseUrl,
    retry: { retries: 1 },
  },

  css: ['~/styles/main.scss'],
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

  tailwindcss: {
    config: {
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
          'plugins/**/*.ts',
          'nuxt.config.ts',
        ],
      },
    },
  },

  telemetry: false,

  watch: ['~/module/csp.js'],
}
