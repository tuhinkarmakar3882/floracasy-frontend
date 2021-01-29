'use strict'

import { setupUser } from '~/utils/utility'

export default async function ({ store, redirect }) {
  if (!store.state.authState) {
    return redirect('/Authentication/SignInToContinue')
  }
  await setupUser(store)
}
