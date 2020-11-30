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
    info: 'blog/info/',

    create: 'blog/create/',
    detail: 'blog/detail/',

    like: 'blog/like/',
    share: 'blog/share/',

    getBlogsByUid: 'blog/get_blogs_by_uid/',

    addOrRemoveToSaveBlogs: 'blog/add_or_remove_to_save_blogs/',
  },
  categories: {
    fetch: 'categories/fetch/',
  },
  comment_system: {
    fetchByBlogId: 'comment_system/fetchByBlogId/',
    createCommentForBlogId: 'comment_system/createCommentForBlogId/',
  },
  chat_system: {
    fetchThreads: 'chat_system/fetchThreads/',
    fetchMessages: 'chat_system/fetchMessages/',
    // send: 'chat_system/send/',
    threadDetail: 'chat_system/threadDetail/',
    markAsRead: 'chat_system/markAsRead/',
    getMailBoxId: 'chat_system/getMailBoxId/',
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
