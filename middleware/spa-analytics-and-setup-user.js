import { setupUser } from '~/utils/utility'
import { firebaseConfig, universalTrackingID } from '~/environmentVariables'

export default async ({ app, store }) => {
  app.router.afterEach(async (to, _) => {
    if (process.client) {
      window.gtag('config', firebaseConfig.measurementId, { page_path: to })
      window.gtag('config', universalTrackingID, { page_path: to })
    }

    store.state.isUserAuthenticated && (await setupUser(store))
  })
}
