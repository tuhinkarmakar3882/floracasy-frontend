module.exports = {
    apps: [{
        name: 'Floracasy', // App name that shows in `pm2 ls`
        exec_mode: 'cluster',
        instances: 'max',
        cwd: './production/current', // only if using a subdirectory
        script: "./node_modules/nuxt/bin/nuxt.js",
        args: "start",
        watch: '.'
    }],
};
