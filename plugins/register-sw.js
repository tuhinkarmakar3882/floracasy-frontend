if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      registration.update()
    })
    .catch((err) => {
      console.error('Service worker registration failed, error:', err)
    })
}
