'use strict'

export default function ({ store }) {
  if (!store.state.authUser) {
    window.location = '/Authentication/SignInToContinue'
    // return redirect('/Authentication/SignInToContinue')
  }
}
