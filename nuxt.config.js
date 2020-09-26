export default {
    server: {
        port: 3001, // default: 3000
        // host: '0.0.0.0' // default: localhost
    },
    mode: 'universal',
    target: 'static',
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {
                name: 'viewport',
                content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
            },
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico',
            }

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
        ['nuxt-lazy-load', {
            // These are the default values
            images: true,
            videos: true,
            audios: true,
            iframes: true,
            native: false,
            polyfill: true,
            directiveOnly: false,

            // Default image must be in the static folder
            defaultImage: '/images/default.svg',

            // To remove class set value to false
            loadingClass: 'isLoading',
            loadedClass: 'isLoaded',
            appendClass: 'lazyLoad',

            observerConfig: {
                // See IntersectionObserver documentation
            }
        }]
        // 'nuxt-purgecss',
    ],
    '@fullhuman/postcss-purgecss': {
        content: ['./pages/**/*.vue', './layouts/**/*.vue', './components/**/*.vue'],
        safelist: ['html', 'body']
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

    build: {
        extractCSS: true,
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.(css|vue)$/,
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        }
    },
    // loadingIndicator: '~/cli.html',
    loadingIndicator: {
        name: 'rectangle-bounce',
        color: '#C5C2FF',
        background: '#050514'
    }
}
