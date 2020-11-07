'use strict'

export default function ({ store }) {
  if (store.state.authUser) {
    window.location = '/Home/Dashboard'
    // return redirect('/Home/Dashboard')
  }
}
