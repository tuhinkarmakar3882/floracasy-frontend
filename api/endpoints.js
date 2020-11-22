const endpoints = {
  auth: {
    authenticate: '/auth/authenticate/',
    logout: '/auth/logout/',
    generateToken: '/auth/token/generate/',
    refreshToken: '/auth/token/refresh/',
    checkToken: '/auth/checkToken/',
    whoAmI: '/auth/whoAmI/',
  },
  blog: {
    fetch: 'blog/fetch/',
    create: 'blog/create/',
    detail: 'blog/detail/',
    update: 'blog/update/',
    delete: 'blog/delete/',

    like: 'blog/like/',
    share: 'blog/share/',

    getBlogsByUid: 'blog/get_blogs_by_uid/',
  },
  categories: {
    fetch: 'categories/fetch/',
  },
  comment_system: {
    fetchByBlogId: 'comment_system/fetchByBlogId/',
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
  notification_system: {
    getNotificationsByUid: 'notification_system/get_notifications_by_uid/',
    getNotificationChannelId:
      'notification_system/get_my_notifications_channel_id/',
  },
  profile_statistics: {
    detail: 'profile_statistics/detail/',
    profileData: 'profile_statistics/profile_data/',
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
