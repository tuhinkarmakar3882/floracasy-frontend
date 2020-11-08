const errorMessages = {
  credentialsWereNotProvided: 'Authentication credentials were not provided.',
  invalidTokens: 'Given token not valid for any token type',
}

export default function ({ $axios }) {
  $axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
  $axios.defaults.xsrfCookieName = 'csrftoken'

  $axios.onError(({ response: error }) => {
    if (!error) {
      console.log('Having Trouble to connect')
    }
    if (error.status === 401) {
      if (error.data.detail === errorMessages.credentialsWereNotProvided) {
        console.warn('No Credentials were Provided')
        location.reload()
      }
      if (error.data.details === errorMessages.invalidTokens) {
        console.warn('Credentials Expired.')
        location.reload()
      }
    }
  })

  $axios.onRequest((req) => {
    console.log(req.headers.common)
  })
}
