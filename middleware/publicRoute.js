'use strict'

export default function ({ store, redirect }) {
  // const localInstanceOfAuthUser = localStorage.getItem('authUser')
  if (store.state.authUser) {
    // store.commit('SET_USER', JSON.parse(localInstanceOfAuthUser))
    return redirect('/Home/Dashboard')
  }
}
