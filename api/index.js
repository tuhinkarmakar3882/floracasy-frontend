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

router.get('/getBlogData', (_, res) => {
  res.json({ message: 'Hello, World!' })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router,
}
