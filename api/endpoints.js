const endpoints = {
  auth: {
    authenticate: '/auth/authenticate/',
    logout: '/auth/logout/',
    generateToken: '/auth/token/generate/',
    refreshToken: '/auth/token/refresh/',
    checkToken: '/auth/checkToken/',
  },
  blog: {
    fetch: 'blog/fetch/',
    create: 'blog/create/',
    detail: 'blog/detail/',
    update: 'blog/update/',
    delete: 'blog/delete/',
    getBlogsByUid: 'blog/get_blogs_by_uid/',
  },
  categories: {
    fetch: 'categories/fetch/',
  },
  comment_system: {
    test: 'comment_system/',
  },
  help_and_support: {
    fetch: 'help_and_support/fetch/',
    create: 'help_and_support/create/',
    detail: 'help_and_support/detail/',
    update: 'help_and_support/update/',
    delete: 'help_and_support/delete/',
  },
  leaderboard: {
    test: 'leaderboard/',
  },
  profile_statistics: {
    detail: 'profile_statistics/detail/',
  },
  reward_system: {
    test: 'reward_system/',
  },
  health_check: {
    test: 'health_check/',
  },
  test_access_token: 'test_access_token/',
}
export default endpoints
