const errorMessages = {
  credentialsWereNotProvided: 'Authentication credentials were not provided.',
  invalidTokens: 'Given token not valid for any token type',
}

function handleUnauthorizedError(error) {
  if (error.data.detail === errorMessages.credentialsWereNotProvided) {
    console.warn('No Credentials were Provided')
    location.reload()
  }
  if (error.data.details === errorMessages.invalidTokens) {
    console.warn('Credentials Expired.')
    location.reload()
  }
}

export default function handleAxiosRequestError(error) {
  if (error.status === 401) {
    handleUnauthorizedError(error)
  }
}
