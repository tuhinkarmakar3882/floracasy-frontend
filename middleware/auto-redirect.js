export default function ({ route, redirect }) {
  const modifiedFullPath = route.fullPath.replace('standalone=true', '')
  console.log(modifiedFullPath, route.fullPath)

  if (modifiedFullPath !== route.fullPath) {
    console.log('client...')
    process.client ? (window.location = '/') : redirect('/')
  }
}
