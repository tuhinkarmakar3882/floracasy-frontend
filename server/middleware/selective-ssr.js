export default function (req, res, next) {
  const paths = ['/Home/Blogs/Create']
  if (paths.includes(req.originalUrl)) {
    res.spa = true
  }
  next()
}
