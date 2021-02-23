'use strict'

export default async function ({ store, redirect }) {
  if (!store.state.isUserAuthenticated) {
    return redirect('/Authentication/SignInToContinue')
  }
}
