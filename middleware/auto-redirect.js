export default function ({ route }) {
  const modifiedFullPath = route.fullPath.replace('standalone=true', '')
  console.log(modifiedFullPath)
}
