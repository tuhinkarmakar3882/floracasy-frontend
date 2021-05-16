import axios from 'axios'
import * as secrets from '../environmentVariables'
import endpoints from '../api/endpoints'

const sitemapGenerationConfig = {
  hostname: 'https://floracasy.com',
  gzip: true,
  exclude: [
    '/Home/Messages',
    // '/Home/Blogs/Create/Drafts',
    '/Home/MoreOptions/HelpAndSupport/PopularTopics',
    '/Home/MoreOptions/HelpAndSupport/PrivacyAndSecurityHelp',

    '/Home/Messages/**',
    '/Home/MoreOptions/HelpAndSupport/PopularTopics/**',
    '/Home/MoreOptions/HelpAndSupport/PrivacyAndSecurityHelp/**',
  ],
  routes: async () => {
    const DYNAMIC_ROUTES = [
      {
        url: '/error',
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date(),
      },
    ]

    const { data: blogList } = await axios.get(
      secrets.baseUrl + endpoints.blog.seo
    )
    DYNAMIC_ROUTES.push(
      ...blogList.results.map((blog) => ({
        url: '/Home/Blogs/Details/{}'.replace('{}', blog.identifier),
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date(),
      }))
    )

    const { data: categoryList } = await axios.get(
      secrets.baseUrl + endpoints.categories.fetch
    )
    DYNAMIC_ROUTES.push(
      ...categoryList.data.map((category) => ({
        url: '/Home/Blogs/CategoryWise/{}'.replace('{}', category.name),
        changefreq: 'daily',
        priority: 1,
        lastmod: new Date(),
      }))
    )
    return DYNAMIC_ROUTES
  },
}

export default sitemapGenerationConfig
