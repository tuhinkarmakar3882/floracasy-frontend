export default function ({ $axios }) {
  $axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
  $axios.defaults.xsrfCookieName = 'csrftoken'
  // $axios.onRequest((ctx) => {
  //   console.log('Making Request with', ctx)
  // })
}
