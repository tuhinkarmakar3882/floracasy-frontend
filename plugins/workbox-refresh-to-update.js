export default async () => {
  if (process.client) {
    const workbox = await window.$workbox
    if (workbox) {
      workbox.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          console.log('New Content Available Refreshing')
          window.location.reload()
        }
      })
    }
  }
}
