import { setupUser } from '~/utils/utility'
import { firebaseConfig } from '~/environmentVariables'

export default async ({ app, store }) => {
  app.router.afterEach(async (to, _) => {
    process.client &&
      window.gtag('config', firebaseConfig.measurementId, { page_path: to })
    if (store.state.isUserAuthenticated) {
      await setupUser(store)
    }
  })
}
