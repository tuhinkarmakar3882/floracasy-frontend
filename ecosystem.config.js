module.exports = {
  apps: [
    {
      name: 'Floracasy',
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt-ts.js',
      args: 'start',
      env: {
        HOST: '127.0.0.1',
        PORT: 3001,
        NODE_ENV: 'production',
      },
    },
  ],
}
