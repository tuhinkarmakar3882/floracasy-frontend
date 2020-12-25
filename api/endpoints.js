const endpoints = {
  auth: {
    authenticate: 'auth/authenticate/',
    logout: 'auth/logout/',
    generateToken: 'auth/token/generate/',
    refreshToken: 'auth/token/refresh/',
    checkToken: 'auth/checkToken/',
    whoAmI: 'auth/safe_detail/',
  },
  blog: {
    fetch: 'allow_authenticated/blog/fetch/',
    info: 'allow_authenticated/blog/info/',

    create: 'allow_authenticated/blog/create/',
    detail: 'allow_authenticated/blog/detail/',

    like: 'allow_authenticated/blog/like/',
    share: 'allow_authenticated/blog/share/',

    getBlogsByUid: 'allow_authenticated/blog/get_blogs_by_uid/',

    getSavedBlogs: 'allow_authenticated/blog/get_saved_blogs/',

    addOrRemoveToSaveBlogs:
      'allow_authenticated/blog/add_or_remove_to_save_blogs/',
  },
  categories: {
    fetch: 'allow_any/categories/fetch/',
  },
  comment_system: {
    fetchByBlogId: 'allow_authenticated/comment_system/fetchByBlogId/',
    createCommentForBlogId:
      'allow_authenticated/comment_system/createCommentForBlogId/',
  },
  chat_system: {
    initializeChatThread:
      'allow_authenticated/message_system/initializeChatThread/',

    fetchThreads: 'allow_authenticated/message_system/fetchThreads/',
    fetchMessages: 'allow_authenticated/message_system/fetchMessages/',
    send: 'allow_authenticated/message_system/send/',
    threadDetail: 'allow_authenticated/message_system/threadDetail/',

    markAsRead: 'allow_authenticated/message_system/markAsRead/',
    getMailBoxId: 'allow_authenticated/message_system/getMailBoxId/',
  },
  feedback_collection: {
    create: 'allow_authenticated/feedback_collection/create/',
  },
  follow_system: {
    follow_or_unfollow: 'allow_authenticated/follow_system/follow_or_unfollow/',
  },
  help_and_support: {
    fetch: 'allow_authenticated/help_and_support/fetch/',
    create: 'allow_authenticated/help_and_support/create/',
    detail: 'allow_authenticated/help_and_support/detail/',
  },
  leaderboard: {
    test: 'leaderboard/',
  },
  notification_system: {
    getNotificationsByUid:
      'allow_authenticated/notification_system/get_notifications_by_uid/',
    getNotificationChannelId:
      'allow_authenticated/notification_system/get_my_notifications_channel_id/',
  },
  profile_statistics: {
    detail: 'allow_authenticated/profile_statistics/detail/',
    profileData: 'allow_authenticated/profile_statistics/profile_data/',
  },
  upload_handler_system: {
    process_image: 'upload_handler_system/process_image/',
  },

  health_check: {
    test: 'health_check/',
  },
  test_access_token: 'test_access_token/',
}
export default endpoints
