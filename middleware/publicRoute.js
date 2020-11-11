'use strict'

export default async function ({ store, redirect }) {
  await store.dispatch('checkTokenValidity')
  if (store.state.authState) {
    return redirect('/Home/Dashboard')
  }
}
