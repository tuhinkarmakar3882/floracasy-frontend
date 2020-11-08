'use strict'

import clientSideAuthenticationStateInitializer from '@/plugins/authenticationStateInitializer'

export default function ({ store, redirect }) {
  clientSideAuthenticationStateInitializer({ store })
  if (store.state.authUser) {
    return redirect('/Home/Dashboard')
  }
}
