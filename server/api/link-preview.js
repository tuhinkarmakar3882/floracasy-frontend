import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import express from 'express'
import linkPreviewGenerator from 'link-preview-generator'

const app = express()
app.use(compression())
app.use(helmet())
app.use(bodyParser.json())

const systemHealth = express.Router()
systemHealth.get('/', async (req, res) => {
  const link = req.query.link

  try {
    const pagePreview = await linkPreviewGenerator(link)
    res.send(pagePreview)
  } catch (e) {
    res.status(404).send({
      error: {
        message: e.message,
      },
    })
  }
})

app.use('/previewLinkUrl', systemHealth)

export default app
