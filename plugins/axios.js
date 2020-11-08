import handleAxiosRequestError from '@/utils/ErrorHandling'

export default function ({ $axios }) {
  $axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
  $axios.defaults.xsrfCookieName = 'csrftoken'

  $axios.onError(({ response: error }) => {
    if (!error) {
      console.log('Having Trouble to connect')
    }
    handleAxiosRequestError(error)
  })

  $axios.onRequest((req) => {
    console.log(req.headers.common)
  })
}
