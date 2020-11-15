import handleAxiosRequestError from '@/utils/ErrorHandling'

export default async function ({ $axios, $cookies, store }) {
  $axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
  $axios.defaults.xsrfCookieName = 'csrftoken'
  $axios.setToken($cookies.get('access'), 'Bearer')

  if (store.state.authState)
    await store.dispatch('NotificationChannel/fetchNotificationChannelId')

  $axios.onError(({ response: error }) => {
    if (!error) {
      console.log('Having Trouble to connect')
    }
    handleAxiosRequestError(error)
  })

  $axios.onRequest((req) => {
    console.log(req.headers)
  })
}
