import { navigationRoutes } from '@/navigation/navigationRoutes'

export default async ({ store, redirect }) => {
  if (process.client) {
    localStorage.getItem('is_auth')
      ? (window.location = navigationRoutes.Home.DashBoard)
      : await forceLogout(store, redirect)
  }
}

async function forceLogout(store, redirect) {
  await store.dispatch('logout')
  localStorage.removeItem('is_auth')
  redirect(navigationRoutes.index)
}
