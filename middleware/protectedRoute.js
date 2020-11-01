'use strict'

import performTokenHandshake from '@/plugins/tokenInterceptor'

export default function ({ store, redirect, $axios }) {
  if (!store.state.authUser) {
    return redirect('/Authentication/SignInToContinue')
  } else {
    performTokenHandshake(store, $axios)
  }
}
