const endpoints = {
  auth: {
    authenticate: '/auth/authenticate/',
    logout: '/auth/logout',
    generateToken: '/auth/token/generate/',
    refreshToken: '/auth/token/refresh/',
  },
  blog: {
    fetch: 'blog/fetch',
    create: 'blog/create',
    detail: 'blog/detail/',
    update: 'blog/update/',
    delete: 'blog/delete/',
  },
  categories: {
    test: 'categories/',
  },
  comment_system: {
    test: 'comment_system/',
  },
  help_and_support: {
    fetch: 'help_and_support/fetch',
    create: 'help_and_support/create',
    detail: 'help_and_support/detail/',
    update: 'help_and_support/update/',
    delete: 'help_and_support/delete/',
  },
  leaderboard: {
    test: 'leaderboard/',
  },
  profile_statistics: {
    test: 'profile_statistics/',
  },
  reward_system: {
    test: 'reward_system/',
  },
}
export default endpoints
