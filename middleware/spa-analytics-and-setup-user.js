import { setupUser } from '~/utils/utility'
import { analyticsID } from '~/environmentalVariables'

export default async ({ app, store }) => {
  app.router.afterEach(async (to, _) => {
    process.client && window.gtag('config', analyticsID, { page_path: to })
    if (store.state.isUserAuthenticated) {
      await setupUser(store)
    }
  })
}
