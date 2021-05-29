'use strict'

import { setupUser } from '~/utils/utility'

export default async function ({ store, redirect, route, from: prev }) {
  if (!store?.state?.isUserAuthenticated) {
    const nextPath =
      route.path === '/Home/MoreOptions/ReferAndEarn'
        ? route.fullPath
        : route.path
    return redirect('/Authentication/SignInToContinue?next=' + nextPath)
  }
  await setupUser(store)
}
