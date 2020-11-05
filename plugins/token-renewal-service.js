import utility from '@/utils/utility'
import endpoints from '@/api/endpoints'

let interval

//  Todo Remove Logs.
function renewToken($axios, store, redirect) {
  if (process.client && store.state.authUser) {
    // console.log('Starting Renewal')
    const storeTokens = store.getters.getAuthenticationTokens

    $axios.setToken(storeTokens.access, 'Bearer')

    $axios
      .$post(endpoints.auth.refreshToken, {
        refresh: storeTokens.refresh,
      })
      .then((response) => {
        // console.info('New Set of Credentials Received. Setting Them')

        store.commit('SET_TOKENS', response)
        const Cookie = process.client ? require('js-cookie') : undefined
        // console.log(response)
        Cookie && Cookie.set('tokens', response)

        $axios.setToken(response.access, 'Bearer')
        // console.info('All Good to go!')
      })
      .catch(() => {
        console.warn('Refresh Token Has Expired', storeTokens.refresh)

        console.error('Should be logged out')
        const Cookie = process.client ? require('js-cookie') : undefined
        Cookie && Cookie.remove('authUser')
        Cookie && Cookie.remove('tokens')

        store.dispatch('logout')
        redirect('/Authentication/SignInToContinue')
      })
  } else {
    console.log(`Renewal Service Stopped`)
    clearInterval(interval)
  }
}

export default ({ $axios, store, redirect }) => {
  renewToken($axios, store, redirect)
  interval = setInterval(
    () => {
      renewToken($axios, store, redirect)
    },
    utility.convertIntoMilliseconds({
      minutes: 9,
    })
  )
}
