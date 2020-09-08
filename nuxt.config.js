export default {
    server: {
        // port: 8080, // default: 3000
        // host: '0.0.0.0' // default: localhost
    },
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'spa',
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'static',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
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
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
            ,
            {
                rel: 'stylesheet',
                href: "https://fonts.googleapis.com/css2?family=Bad+Script&family=Montserrat:ital,wght@0,300;0,400;0,500;1,400&family=Comfortaa:wght@300;400;500;700&family=Playfair+Display:wght@400;500&family=Roboto:wght@300;400&display=swap",
            },
        ],

    },
    /*
    ** Global CSS
    */
    css: [
        '~/styles/bootstrap.min.css',
        // '~/styles/bootstrap-grid.min.css',
        // '~/styles/bootstrap-reboot.min.css',
        '~/styles/main.scss',
        '~/styles/base.scss',
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
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    /*
    ** Nuxt.js modules
    */
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
                    primary: "#C60156",
                    secondary: "#FF748E",
                    muted: "#aaaaaa",
                    semiDark: "#6e6e6e",
                    fallBackNavigation: "#3e0029",
                    carousalBg: "#ffebeb",
                    indicator: "#85085b",
                    indicatorHighlight: "#fa2f6f",
                    jumbotronBg: "#ededed",
                }
            }
        }
    },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {},
    // loadingIndicator: '~/cli.html',
    loadingIndicator: {
        name: 'rectangle-bounce',
        color: '#C60156',
        background: '#FFF'
    }
}
