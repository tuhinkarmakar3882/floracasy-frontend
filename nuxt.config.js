import { lazyLoadConfig } from './config/nuxt-lazy-load-config'
import * as secrets from './environmentalVariables'
import * as packageJson from './package.json'

export default {
  ssr: true,
  components: true,

  server: {
    port: 3001,
  },
  serverMiddleware: ['~/api', '~/server/middleware/selective-ssr.js'],

  plugins: [
    '~/plugins/custom-material-ripple.js',
    '~/plugins/firebase.js',
    {
      src: '~/plugins/register-sw.js',
      mode: 'client',
    },
    {
      src: '~/middleware/spa-analytics.js',
      mode: 'client',
    },
    {
      src: '~/plugins/firebase-authentication.js',
      mode: 'client',
    },
    '~/plugins/axios.js',
    {
      src: '~/plugins/notificationSocketConnection.js',
      mode: 'client',
    },
    {
      src: '~/plugins/vue-infinite-loading.js',
      mode: 'client',
    },
  ],

  // modern: {
  //   client: true,
  //   server: true,
  // },

  modules: [
    'nuxt-helmet',
    'nuxt-vue-select',
    '~/module/csp.js',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    ['nuxt-lazy-load', lazyLoadConfig],
    ['@nuxtjs/pwa', { workbox: false }],
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    'nuxt-purgecss',
    'nuxt-compress',
  ],

  purgecss: {
    content: [
      './pages/**/*.vue',
      './layouts/**/*.vue',
      './components/**/*.vue',
    ],
    whitelist: ['html', 'body'],
  },

  'nuxt-compress': {
    gzip: {
      cache: true,
    },
    brotli: {
      threshold: 10240,
    },
  },

  router: {},

  build: {
    extractCSS: {
      ignoreOrder: true,
    },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },

    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-url': {},
        'postcss-preset-env': this.preset,
        cssnano: {
          preset: [
            'default',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      },
      order: 'presetEnvAndCssnanoLast',
      preset: {
        stage: 2,
      },
    },
  },

  render: {
    asyncScripts: true,
    injectScripts: true,
    resourceHints: true,

    csp: {
      addMeta: process.env.NODE_ENV === 'production',
    },

    http2: {
      push: true,
      pushAssets: (_, __, publicPath, preloadFiles) =>
        preloadFiles
          .filter((f) => f.asType === 'script' && f.file === 'runtime.js')
          .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    },
  },

  axios: {
    baseURL: secrets.baseUrl,
  },

  css: [
    '~/styles/main.scss',
    // '@mdi/font/css/materialdesignicons.min.css',
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
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no',
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
      // TODO MAKE CSS LOAD ASYNCHRONOUSLY

      //  Google Fonts
      {
        rel: 'dns-prefetch',
        crossorigin: true,
        href: 'https://fonts.gstatic.com/',
      },
      {
        rel: 'preconnect',
        crossorigin: true,
        href: 'https://fonts.gstatic.com/',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,300;1,400&family=Prata&family=Roboto:wght@300;400&family=Raleway:wght@300;400&display=swap',
      },

      //  Material Design Icons
      {
        rel: 'dns-prefetch',
        crossorigin: true,
        href: 'https://cdn.materialdesignicons.com/',
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
      scope: '/',
    },
    workbox: false,
  },

  telemetry: false,

  // typescript: {
  //   typeCheck: {
  //     eslint: {
  //       files: './**/*.{ts,js,vue}',
  //     },
  //   },
  // },

  watch: ['~/module/csp.js'],
}
