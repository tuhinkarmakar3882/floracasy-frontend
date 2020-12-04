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
      addMeta: true,
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
          'plugins/**/*.ts',
          'nuxt.config.ts',
        ],
      },
    },
  },

  telemetry: false,

  watch: ['~/module/csp.js'],
}
