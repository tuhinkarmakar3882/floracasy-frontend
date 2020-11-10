export default function (req, res, next) {
  const paths = ['/Home/Blogs/Create/New/s']
  if (paths.includes(req.originalUrl)) {
    res.spa = true
  }
  next()
}
