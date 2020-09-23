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
            ,
            {
                rel: 'stylesheet',
                href: "https://fonts.googleapis.com/css2?family=Montaga&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;1,300;1,400&family=Prata&family=Roboto:wght@300;400&display=swap",
                type: "text/css",
            },
        ],

    },
    css: [
        '~/styles/main.scss',
    ],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,

    buildModules: [
        '@nuxtjs/vuetify',
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxt/content',
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {},
    /*
    ** Content module configuration
    ** See https://content.nuxtjs.org/configuration
    */
    content: {},
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
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
    // loadingIndicator: '~/cli.html',
    loadingIndicator: {
        name: 'rectangle-bounce',
        color: '#C5C2FF',
        background: '#050514'
    }
}
