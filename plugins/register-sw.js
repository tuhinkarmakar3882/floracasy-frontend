if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => {
      // console.log('Registration successful, scope is:', registration.scope)
    })
    .catch(() => {
      // console.log('Service worker registration failed, error:', err)
    })
}
