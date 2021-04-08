module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // 'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'standard',
    // "@nuxtjs/eslint-config-typescript",
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {},
}
