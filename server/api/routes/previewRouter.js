import express from 'express'
import linkPreviewGenerator from 'link-preview-generator'

const router = express.Router()

router.get('/link', async (req, res) => {
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

export default router
