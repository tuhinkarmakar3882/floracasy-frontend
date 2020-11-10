export default function (req, res, next) {
  const paths = ['']
  if (paths.includes(req.originalUrl)) {
    res.spa = true
  }
  next()
}
