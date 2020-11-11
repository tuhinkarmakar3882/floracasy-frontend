'use strict'

export default function ({ store, redirect }) {
  if (!store.state.authState) {
    return redirect('/Authentication/SignInToContinue')
  }
}
