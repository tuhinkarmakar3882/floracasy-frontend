import { cookieSavingConfig } from '~/environmentVariables'

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
    if (!error) return

    if (error?.status === 401) {
      switch (error.data.detail) {
        case errorMessages.credentialsWereNotProvided:
          process.client && window.location.reload()
          break

        case errorMessages.invalidTokens:
          $cookies.set('access', '', cookieSavingConfig)
          process.client && window.location.reload()
          break

        default:
          process.client && window.location.reload()
          break
      }
    }
  })

  // $axios.onRequest((req) => console.log(req.url))
}
