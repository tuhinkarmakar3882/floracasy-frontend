'use strict'

export default function ({ store, redirect }) {
  if (process.server) {
    // console.log(localStorage.getItem('authUser'))
  } else {
    console.log('Not on Server')
  }
  if (!store.state.authUser) {
    return redirect('/Authentication/GetStarted')
  }
}
