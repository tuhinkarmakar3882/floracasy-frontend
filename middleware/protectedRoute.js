'use strict'

import endpoints from '@/api/endpoints'

export default function ({ store, redirect, $axios }) {
  if (!store.state.authUser) {
    return redirect('/Authentication/SignInToContinue')
  } else {
    const accessToken = store.state.authUser.token.access
    $axios.setToken(accessToken, 'Bearer')
    // Testing Access Token
    console.log('Testing Access Token')

    $axios
      .$post(endpoints.test_access_token)
      .then(() => {
        // This Access Token Works. Cool Human!
        console.log('This Access Token Works. Cool Human!')
      })
      .catch(() => {
        // [!] Access Token is Invalid. So, Trying to obtain a new token
        console.warn(
          '[!] Access Token is Invalid. So, Trying to obtain a new token'
        )
        const refreshToken = store.state.authUser.token.refresh
        // Making Request to backend for grabbing a new Access Token
        console.info(
          'Making Request to backend for grabbing a new Access Token'
        )
        $axios
          .$post(endpoints.auth.refreshToken, {
            refresh: refreshToken,
          })
          .then((response) => {
            // New Set of Credentials Received. Setting Them
            console.info('New Set of Credentials Received. Setting Them')

            store.dispatch('updateTokens', {
              tokens: response,
            })

            // store.state.authUser.token.access = newAccessToken
            // store.state.authUser.token.refresh = newRefreshToken
            $axios.setToken(response.access, 'Bearer')
          })
          .catch(() => {
            // Even the Refresh Token Has Expired
            console.warn('Even the Refresh Token Has Expired')
            // console.warn(error.response)

            const Cookie = process.client ? require('js-cookie') : undefined
            Cookie.remove('authUser')
            store.dispatch('logout')
            redirect('/Authentication/SignInToContinue')
          })
      })
  }
}
