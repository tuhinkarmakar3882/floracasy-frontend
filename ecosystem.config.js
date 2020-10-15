module.exports = {
  apps: [
    {
      name: "Floracasy",
      exec_mode: "cluster",
      instances: "max", // Or a number of instances
      // script: "./node_modules/nuxt-start/bin/nuxt-start.js",
      script: "./node_modules/nuxt/bin/nuxt.js",
      args: "start",
      env: {
        HOST: "127.0.0.1",
        PORT: 3001,
        NODE_ENV: "production",
      },
    },
  ],
}
