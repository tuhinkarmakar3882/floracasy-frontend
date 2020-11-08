import * as secrets from './environmentalVariables'

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

  router: {
    middleware: [],
  },

  plugins: [
    '~/plugins/custom-material-ripple.js',
    '~/plugins/firebase.js',
    '~/plugins/token-renewal-service.js',
    {
      src: '~/plugins/firebase-authentication.js',
      mode: 'client',
    },
    {
      src: '~/plugins/axios.js',
      mode: 'client',
    },
    {
      src: '~/plugins/authenticationStateInitializer.js',
      mode: 'client',
    },
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxt/content',
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

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxtjs/eslint-module',
  ],

  build: {
    extractCSS: true,
  },

  axios: {
    baseURL: secrets.baseUrl,
    retry: { retries: 2 },
  },

  css: [
    '~/styles/main.scss',
    //
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
  eslint: {
    fix: true,
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
}
