import { randomBytes } from 'crypto'
import { ADSENSE_CSP } from '../config/csp-policies'

export default function cspModule() {
  this.options.render.csp = {
    reportOnly: true,
    hashAlgorithm: 'sha256',
    policies: ADSENSE_CSP,
  }

  this.nuxt.hook('vue-renderer:ssr:context', (context) => {
    const nonce = randomBytes(128).toString('base64')
    context.nuxt.state.nonce = nonce
  })

  this.nuxt.hook('render:route', (_, { cspScriptSrcHashes }, context) => {
    const nonce = context.nuxt.state.nonce
    cspScriptSrcHashes.push(`'nonce-${nonce}'`)
  })
}
