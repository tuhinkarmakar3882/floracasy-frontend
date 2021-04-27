import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import express from 'express'
import InitializeRoutes from './routes'

const app = express()
app.use(compression())
app.use(helmet())
app.use(bodyParser.json())

InitializeRoutes(app)

export default app
