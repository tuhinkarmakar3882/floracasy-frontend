import { cookieSavingConfig } from '~/environmentalVariables'

const errorMessages = {
  credentialsWereNotProvided: 'Authentication credentials were not provided.',
  invalidTokens: 'Given token not valid for any token type',
}

export default async function ({ $axios, $cookies, store }) {
  $axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
  $axios.defaults.xsrfCookieName = 'csrftoken'
  $axios.setToken($cookies.get('access'), 'Bearer')

  if (store.state.isUserAuthenticated)
    await store.dispatch('NotificationChannel/fetchNotificationChannelId')

  $axios.onError(({ response: error }) => {
    if (!error) {
      console.log('Having Trouble to connect')
    }
    if (error?.status === 401) {
      switch (error.data.detail) {
        case errorMessages.credentialsWereNotProvided:
          // console.warn('No Credentials were Provided')
          process.client && window.location.reload()
          break

        case errorMessages.invalidTokens:
          // console.warn('Credentials Expired.')
          $cookies.set('access', '', cookieSavingConfig)
          process.client && window.location.reload()
          break

        default:
          // console.error('Unhandled Error', error)
          process.client && window.location.reload()
      }
    }
  })

  // $axios.onRequest((req) => console.log(req.url))
}
