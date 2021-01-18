import { randomBytes } from 'crypto'

export default function cspModule() {
  this.options.render.csp = {
    // reportOnly: true,
    hashAlgorithm: 'sha256',
    policies: {
      'script-src': [
        'self',
        'apis.google.com',
        'https://www.google-analytics.com/analytics.js',
        'https://www.googletagmanager.com/gtag/js',
        'blob:',
      ],
      'worker-src': ['self', 'blob:'],
      'object-src': ["'none'"],
      'base-uri': ["'none'"],
      'require-trusted-types-for': ["'style'"],
    },
  }

  this.nuxt.hook('vue-renderer:ssr:context', (context) => {
    const nonce = randomBytes(128).toString('base64')
    context.nuxt.state.nonce = nonce
  })

  this.nuxt.hook('render:route', (url, { cspScriptSrcHashes }, context) => {
    const nonce = context.nuxt.state.nonce
    cspScriptSrcHashes.push(`'nonce-${nonce}'`)
  })
}
