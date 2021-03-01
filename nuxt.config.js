import { lazyLoadConfig } from './config/nuxt-lazy-load-config'
import * as secrets from './environmentalVariables'
import {
  useRealtimeNotifications,
  useSentryLogging,
  useTouchEvents,
} from './environmentalVariables'
import * as packageJson from './package.json'
import { ADSENSE_CSP } from './config/csp-policies'

const sentryLoggingPlugin = {
  src: '~/plugins/sentry.js',
  mode: 'client',
}
const notificationSocketPlugin = {
  src: '~/plugins/notificationSocketConnection.js',
  mode: 'client',
}
const touchEventsPlugin = {
  src: '~/plugins/vue-touch-events.js',
  mode: 'client',
}

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
      src: '~/middleware/spa-analytics-and-setup-user.js',
      mode: 'client',
    },
    '~/plugins/axios.js',
    {
      src: '~/plugins/vue-infinite-loading.js',
      mode: 'client',
    },

    ...(useRealtimeNotifications ? [notificationSocketPlugin] : []),
    ...(useSentryLogging ? [sentryLoggingPlugin] : []),
    ...(useTouchEvents ? [touchEventsPlugin] : []),
  ],

  modern: {
    client: true,
    server: true,
  },

  modules: [
    'nuxt-helmet',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    ['nuxt-lazy-load', lazyLoadConfig],
    ['@nuxtjs/pwa', { workbox: false }],
    // '~/module/csp.js'
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
    injectScripts: true,
    resourceHints: true,
    asyncScripts: true,
    http2: {
      push: true,
      // pushAssets: (_, __, publicPath, preloadFiles) =>
      //   preloadFiles
      //     .filter((f) => f.asType === 'script' && f.file === 'runtime.js')
      //     .map((f) => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    },
    csp: {
      reportOnly: false,
      hashAlgorithm: 'sha256',
      policies: ADSENSE_CSP,
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
      {
        rel: 'preconnect',
        crossorigin: true,
        href: secrets.baseUrl,
      },

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
        rel: 'preload',
        as: 'style',
        href:
          'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Prata&family=Raleway:wght@300;400;500&display=swap',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Prata&family=Raleway:wght@300;400;500&display=swap',
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
        rel: 'preload',
        as: 'style',
        href:
          'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.materialdesignicons.com/5.4.55/css/materialdesignicons.min.css',
      },
    ],
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
      orientation: 'portrait',
      dir: 'ltr',
    },
    workbox: false,
  },

  telemetry: false,

  // watch: ['~/module/csp.js'],

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
        enabled: true,
        content: [
          'components/**/*.vue',
          'layouts/**/*.vue',
          'pages/**/*.vue',
          'plugins/**/*.js',
          'plugins/**/*.ts',
          'nuxt.config.js',
          'nuxt.config.ts',
          'assets/**/*.scss',
          'styles/**/*.scss',
        ],
      },
    },
  },

  loading: { color: '#C5C2FF' },

  loadingIndicator: {
    name: 'rectangle-bounce',
    color: '#C5C2FF',
    background: '#050514',
  },

  layoutTransition: {
    name: 'gray-shift',
    mode: 'out-in',
  },

  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
}
