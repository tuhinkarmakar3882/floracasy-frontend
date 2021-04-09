import { lazyLoadConfig } from './config/nuxt-lazy-load-config'
import * as secrets from './environmentVariables'
import {
  useRealtimeNotifications,
  useSentryLogging,
  useTouchEvents,
} from './environmentVariables'
import * as packageJson from './package.json'
import sitemapGenerationConfig from './config/sitemapData'
import { SECURE_CSP } from './config/csp-policies'

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
  components: [
    { path: '~/components' },
    { path: '~/components/Accounts' },
    { path: '~/components/Blogs' },
    { path: '~/components/Cards' },

    { path: '~/components/Common/GoogleAdsense' },
    { path: '~/components/Common/Tools' },

    { path: '~/components/Desktop/Tools' },
    { path: '~/components/Desktop/View/LandingPage' },

    { path: '~/components/Icons' },
    { path: '~/components/Layout' },

    { path: '~/components/Mobile/View/Dashboard' },
    { path: '~/components/Mobile/View/Message' },
    { path: '~/components/Mobile/View/Notification' },

    { path: '~/components/Security' },

    { path: '~/components/Social/Posts' },
    { path: '~/components/Social/Shared' },
    { path: '~/components/Social/Stories' },
    { path: '~/components/Social/Stories/Upload', prefix: 'StoryUpload' },
  ],

  server: {
    // host: '0.0.0.0',
    port: 3001,
  },

  plugins: [
    '~/plugins/custom-material-ripple.js',
    '~/plugins/firebase.js',
    {
      src: '~/plugins/register-sw.js',
      mode: 'client',
    },
    {
      src: '~/plugins/fcm.js',
      mode: 'client',
    },
    {
      src: '~/plugins/spa-analytics.js',
      mode: 'client',
    },
    {
      src: '~/plugins/setup-user.js',
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
    server: true,
    client: true,
  },

  modules: [
    'nuxt-helmet',
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    ['nuxt-lazy-load', lazyLoadConfig],
    ['@nuxtjs/pwa', { workbox: false }],
    '@nuxtjs/sitemap',
    // '~/module/csp.js'
  ],

  sitemap:
    process.env.NODE_ENV === 'production' ? sitemapGenerationConfig : false,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    // 'nuxt-purgecss',
    'nuxt-compress',
  ],

  // purgecss: {
  //   content: [
  //     './pages/**/*.vue',
  //     './layouts/**/*.vue',
  //     './components/**/*.vue',
  //   ],
  //   whitelist: ['html', 'body'],
  // },

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
    csp: {
      reportOnly: true,
      hashAlgorithm: 'sha256',
      policies: SECURE_CSP,
    },
  },

  axios: {
    baseURL: secrets.baseUrl,
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
      categories: [
        'social',
        'education',
        'blogs',
        'online communities',
        'messaging',
        'community',
        'earning',
        'publishing',
      ],
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

  loading: {
    color: '#aeacff',
    failedColor: '#ff8282',
    continuous: true,
    height: '2px',
  },

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
