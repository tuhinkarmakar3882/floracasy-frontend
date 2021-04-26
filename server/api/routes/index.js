import previewRouter from './previewRouter'

const routes = (app) => {
  app.use('/preview', previewRouter)
}

export default routes
