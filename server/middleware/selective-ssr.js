import { navigationRoutes } from '@/navigation/navigationRoutes'

export default function (req, res, next) {
  const paths = [navigationRoutes.Home.Blogs.Create.NewBlog]
  if (paths.includes(req.originalUrl)) {
    res.spa = true
  }
  next()
}
