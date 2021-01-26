export default async ({ app }) => {
  app.router.afterEach((to, _) => {
    process.client && window.gtag('config', 'G-RJ7XT8K378', { page_path: to })
  })
}
