export default function ({ route, redirect }) {
  const modifiedFullPath = route.fullPath.replace('standalone=true', '')
  process.client
    ? (window.location = modifiedFullPath)
    : redirect(modifiedFullPath)
}
