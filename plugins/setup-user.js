import { setupUser } from '~/utils/utility'

export default async ({ app, store }) => {
  app.router.afterEach(async (__, _) => {
    store.state.isUserAuthenticated && (await setupUser(store))
  })
}
