import express from 'express'

// Create express router
const router = express.Router()

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get('/getBlogData', (req, res) => {
  console.log(req.query)
  const body = `<h1> Hello, I am not a good person. </h1> <script>console.error("You're hacked!")</script>`
  const blogsData = [
    {
      id: 0,
      title: 'Love your hair but suffering from Hair fall or hair damage?',
      timestamp: 'Mon 13th Nov, 2018, 12:30 P.M.',
      author: 'Jammie Johnson',
      category: 'Beauty & Makeup',
      image: 'https://picsum.photos/249',
      summary:
        'Explore hundreds of integrations for Ghost to speed up your workflow',
    },
    {
      id: 1,
      title: 'That Great Apple iPhone Review',
      timestamp: 'Mon 12th Nov, 2018, 01:30 P.M.',
      author: 'Annie Parker',
      category: 'Technology',
      image: 'https://picsum.photos/251',
      summary:
        'Explore hundreds of integrations for Ghost to speed up your workflow',
    },
  ]
  const requestedBlogId = 0 // req.query.id
  const response = { ...blogsData[requestedBlogId], body }
  res.json({ response })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router,
}
