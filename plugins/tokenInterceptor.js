import endpoints from '@/api/endpoints'

export default function performTokenHandshake(store, $axios) {
  const storeTokens = store.getters.getAuthenticationTokens

  $axios.setToken(storeTokens.access, 'Bearer')
  // Testing Access Token
  console.log('Testing Access Token')

  $axios
    .$post(endpoints.test_access_token)
    .then(() => {
      console.log('This Access Token Works. Cool Human!')
    })
    .catch((e) => {
      console.warn(
        '[!] Access Token is Invalid. So, Trying to obtain a new token',
        e
      )
      console.info('Making Request to backend for grabbing a new Access Token')
      $axios
        .$post(endpoints.auth.refreshToken, {
          refresh: storeTokens.refresh,
        })
        .then((response) => {
          console.info('New Set of Credentials Received. Setting Them')

          store.dispatch('updateTokens', {
            tokens: response,
          })

          $axios.setToken(response.access, 'Bearer')
          console.info('All Good to go!')
        })
        .catch((e) => {
          console.warn(
            'Even the Refresh Token Has Expired',
            storeTokens.refresh
          )
          console.warn(e)

          const Cookie = process.client ? require('js-cookie') : undefined
          Cookie.remove('authUser')
          store.dispatch('logout')
          window.location = '/Authentication/SignInToContinue'
        })
    })
}
