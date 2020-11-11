export default async () => {
  if (process.client) {
    const workbox = await window.$workbox
    if (workbox) {
      workbox.addEventListener('installed', (event) => {
        alert('Workbox Ready')
        if (event.isUpdate) {
          alert('New Content Available Refreshing')
          window.location.reload()
        }
      })
    }
  }
}
