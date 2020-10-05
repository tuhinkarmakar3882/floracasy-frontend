import bodyParser from "body-parser";
import session from 'cookie-session'

export default {
    server: {
        port: 3001,
    },

    ssr: false,

    modern: {
        client: true,
        server: true,
    },

    serverMiddleware: [
        // body-parser middleware
        bodyParser.json(),
        // session middleware
        session({
            secret: 'super-secret-key',
            resave: false,
            saveUninitialized: false,
            cookie: {maxAge: 15000}
        }),
        // Api middleware
        // We add /api/login & /api/logout routes
        '~/api'
    ],

    // target: 'static',

    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            {
                charset: 'utf-8',
            },
            {
                name: 'viewport',
                content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || '',
            }
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
                href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,300;1,400&family=Prata&family=Roboto:wght@300;400&display=swap',
            },
        ],
    },

    css: [
        '~/styles/main.scss',
    ],

    plugins: [],

    components: true,

    buildModules: [
        '@nuxtjs/vuetify',
        // 'nuxt-purgecss',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxt/content',
        '@nuxtjs/firebase',
        // 'nuxt-purgecss',
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
                }
            }
        ],
    ],

    firebase: {
        config: {
            apiKey: "AIzaSyAWuJIU3_V6pf0QvF9wev36pNvXYGmNJNo",
            authDomain: "floracasy.firebaseapp.com",
            databaseURL: "https://floracasy.firebaseio.com",
            projectId: "floracasy",
            storageBucket: "floracasy.appspot.com",
            messagingSenderId: "295292997514",
            appId: "1:295292997514:web:7ac338f7f4fee2ede48273",
            measurementId: "G-XJLFQ1C8VD"
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
            remoteConfig: true
        }
    },

    axios: {},

    content: {},

    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                light: {
                    "primary": "#514EFF",
                    "primary-matte": "#3734E5",
                    "secondary": "#6DD0BF",
                    "secondary-matte": "#52B2A2",
                    "secondary-highlight": "#8FF2E1",
                    "muted": "#959595",

                    "arrow-tone": "#1C1C2B",
                    "quote-tone": "#3A3A49",

                    "eco-tone": "#1B7B6B",
                    "eco-tick": "#7EE1D0",

                    "silver-tone": "#3734E5",
                    "silver-tick": "#C5C2FF",

                    "gold-tone": "#EFB33D",

                    "card-background": "#191928",
                    "body-background": "#050514",
                    "segment-background": "#111120",
                    "footer-background": "#1C1C2B",

                    "black": "#000000",
                    "white": "#FFFFFF",
                },
                dark: {
                    "primary": "#514EFF",
                    "primary-matte": "#3734E5",
                    "secondary": "#6DD0BF",
                    "secondary-matte": "#52B2A2",
                    "secondary-highlight": "#8FF2E1",
                    "muted": "#959595",

                    "arrow-tone": "#1C1C2B",
                    "quote-tone": "#3A3A49",

                    "eco-tone": "#1B7B6B",
                    "eco-tick": "#7EE1D0",

                    "silver-tone": "#3734E5",
                    "silver-tick": "#C5C2FF",

                    "gold-tone": "#EFB33D",

                    "card-background": "#191928",
                    "body-background": "#050514",
                    "segment-background": "#111120",
                    "footer-background": "#1C1C2B",

                    "black": "#000000",
                    "white": "#FFFFFF",
                }
            }
        },
        treeShake: true,
        options: {
            customProperties: true
        }
    },

    build: {},

    loadingIndicator: {
        name: 'rectangle-bounce',
        color: '#C5C2FF',
        background: '#050514'
    },

    loading: {color: '#C5C2FF'},

    /* Layout Transitions */
    layoutTransition: {
        name: "gray-shift",
        mode: "out-in"
    },
    /* Page Transitions */
    pageTransition: {
        name: "slide-x-transition",
        mode: "out-in"
    }
}
