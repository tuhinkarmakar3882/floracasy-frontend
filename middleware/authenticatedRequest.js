'use strict'

export default function ({store, redirect}) {
  if (!store.state.authUser) {
    return redirect('/Authentication/GetStarted')
  }
}
