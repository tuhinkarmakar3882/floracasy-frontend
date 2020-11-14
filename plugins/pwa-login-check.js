import { navigationRoutes } from '@/navigation/navigationRoutes'

localStorage.setItem('is_auth', 'true')
export default () => {
  if (process.client) {
    localStorage.getItem('is_auth')
      ? (window.location = navigationRoutes.Home.DashBoard)
      : (window.location = navigationRoutes.index)
  }
}
