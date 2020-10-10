module.exports = {
    apps: [{
        name: 'Floracasy', // App name that shows in `pm2 ls`
        exec_mode: 'cluster',
        instances: 'max', // Or a number of instances
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
    }]
}
