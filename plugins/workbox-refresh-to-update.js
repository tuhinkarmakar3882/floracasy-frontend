export default async () => {
  if (process.client) {
    const workbox = await window.$workbox
    if (workbox) {
      workbox.addEventListener('installed', (event) => {
        alert('Yo')
        if (event.isUpdate) {
          alert('New Content Available Please Refresh')
        }
      })
    }
  }
}
