export default function ({ route, redirect }) {
  const modifiedFullPath = route.fullPath.replace('standalone=true', '')
  console.log(modifiedFullPath, route.fullPath)

  if (modifiedFullPath !== route.fullPath) {
    if (process.client) {
      console.log('client...')
      redirect(modifiedFullPath)
    } else {
      console.log('server...')
      redirect(modifiedFullPath)
    }
  }
}
