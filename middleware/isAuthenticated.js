'use strict'

import { setupUser } from '~/utils/utility'

export default async function ({ store, redirect, route, from: prev }) {
  if (!store?.state?.isUserAuthenticated) {
    return redirect('/Authentication/SignInToContinue?next=' + route.path)
  }
  await setupUser(store)
}
