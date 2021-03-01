'use strict'

export default function ({ store, redirect }) {
  if (store.state.isUserAuthenticated) {
    return redirect('/Home/Dashboard')
  }
}
