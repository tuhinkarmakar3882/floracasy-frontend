import { navigationRoutes } from '@/navigation/navigationRoutes'

export default async ({ store }) => {
  if (process.client) {
    localStorage.getItem('is_auth')
      ? (window.location = navigationRoutes.Home.DashBoard)
      : await forceLogout(store)
  }
}

async function forceLogout(store) {
  await store.dispatch('logout')
  window.location = navigationRoutes.index
}
