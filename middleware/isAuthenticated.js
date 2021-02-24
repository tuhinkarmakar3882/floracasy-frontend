'use strict'

import { setupUser } from '~/utils/utility'

export default async function ({ store, redirect }) {
  if (!store.state.isUserAuthenticated) {
    return redirect('/Authentication/SignInToContinue')
  }
  await setupUser(store)
}
