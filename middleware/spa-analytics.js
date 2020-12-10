export default async ({ app }) => {
  app.router.afterEach((to, from) => {
    process.client && window.gtag('config', 'G-RJ7XT8K378', { page_path: to })
    console.log('analytics sent!')
  })
}
