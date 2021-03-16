import { firebaseConfig, universalTrackingID } from '~/environmentVariables'

export default ({ app }) => {
  if (process.client) {
    window.gtag('config', firebaseConfig.measurementId)
    window.gtag('config', universalTrackingID)
  }
  app.router.afterEach(async (to, _) => {
    if (process.client) {
      window.gtag('config', firebaseConfig.measurementId, {
        page_path: to,
      })
      window.gtag('config', universalTrackingID, {
        page_title: to.name,
        page_path: to.path,
      })
    }
  })
}
