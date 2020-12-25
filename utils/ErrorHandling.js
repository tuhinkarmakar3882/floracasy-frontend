// const errorMessages = {
//   credentialsWereNotProvided: 'Authentication credentials were not provided.',
//   invalidTokens: 'Given token not valid for any token type',
// }
//
// function handleUnauthorizedError(error) {
//   console.log(error.data.detail)
//
//   switch (error.data.detail) {
//     case errorMessages.credentialsWereNotProvided:
//       console.warn('No Credentials were Provided')
//       process.client && window.location.reload()
//       break
//
//     case errorMessages.invalidTokens:
//       console.warn('Credentials Expired.')
//       process.client && window.location.reload()
//       break
//
//     default:
//       console.error('Unhandled Error', error)
//       process.client && window.location.reload()
//   }
// }
//
// export default function handleAxiosRequestError(error, $app) {
//   console.log($app)
//   if (error.status === 401) {
//     handleUnauthorizedError(error)
//   }
// }
