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

console.log(`
 _____ _
|  ___| | ___  _ __ __ _  ___ __ _ ___ _   _        ___ ___  _ __ ___
| |_  | |/ _ \\| '__/ _\` |/ __/ _\` / __| | | |      / __/ _ \\| '_ \` _ \\
|  _| | | (_) | | | (_| | (_| (_| \\__ \\ |_| |  _  | (_| (_) | | | | | |
|_|   |_|\\___/|_|  \\__,_|\\___\\__,_|___/\\__, | (_)  \\___\\___/|_| |_| |_|
                                       |___/
`)
