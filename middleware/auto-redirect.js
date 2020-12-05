export default function ({ route, redirect }) {
  const modifiedFullPath = route.fullPath.replace('standalone=true', '')
  if (modifiedFullPath !== route.fullPath) {
    process.client ? (window.location = '/') : redirect('/')
  }
}
