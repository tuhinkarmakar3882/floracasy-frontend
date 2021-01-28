import { uploadServerBase } from '~/environmentalVariables'

const endpoints = {
  auth: {
    authenticate: '/auth/authenticate/',
    logout: '/auth/logout/',
    generateToken: '/auth/token/generate/',
    refreshToken: '/auth/token/refresh/',
    checkToken: '/auth/checkToken/',
    whoAmI: '/auth/safe_detail/',
  },
  blog: {
    fetch: '/allow_authenticated/blog/fetch/',
    info: '/allow_authenticated/blog/info/',

    updateViewCount: '/allow_authenticated/blog/updateViewCount/{identifier}/',

    create: '/allow_authenticated/blog/create/',
    detail: '/allow_any/blog/detail/',

    like: '/allow_authenticated/blog/like/',
    share: '/allow_authenticated/blog/share/',

    getBlogsByUid: '/allow_authenticated/blog/get_blogs_by_uid/',

    getSavedBlogs: '/allow_authenticated/blog/get_saved_blogs/',

    addOrRemoveToSaveBlogs:
      '/allow_authenticated/blog/add_or_remove_to_save_blogs/',
  },
  categories: {
    fetch: '/allow_any/categories/fetch/',
  },
  comment_system: {
    fetchByBlogId: '/allow_authenticated/comment_system/fetchByBlogId/',
    detail: '/allow_authenticated/comment_system/detail/{identifier}/',
    createCommentForBlogId:
      '/allow_authenticated/comment_system/createCommentForBlogId/',
  },
  community_service: {
    stories: '/allow_authenticated/community_service/stories/',
    posts: {
      detail:
        '/allow_authenticated/community_service/posts/detail/{identifier}/',
      index: '/allow_authenticated/community_service/posts/',
      like: '/allow_authenticated/community_service/posts/like/',
      share: '/allow_authenticated/community_service/posts/share/',
    },
  },
  chat_system: {
    initializeChatThread:
      '/allow_authenticated/message_system/initializeChatThread/',

    fetchThreads: '/allow_authenticated/message_system/fetchThreads/',
    fetchMessages: '/allow_authenticated/message_system/fetchMessages/',
    send: '/allow_authenticated/message_system/send/',
    threadDetail: '/allow_authenticated/message_system/threadDetail/',

    markAsRead: '/allow_authenticated/message_system/markAsRead/',
    getMailBoxId: '/allow_authenticated/message_system/getMailBoxId/',
  },
  feedback_collection: {
    create: '/allow_authenticated/feedback_collection/create/',
  },
  follow_system: {
    follow_or_unfollow:
      '/allow_authenticated/follow_system/follow_or_unfollow/',
  },
  help_and_support: {
    fetch: '/allow_authenticated/help_and_support/fetch/',
    create: '/allow_authenticated/help_and_support/create/',
    detail: '/allow_authenticated/help_and_support/detail/',
  },
  leaderboard: {
    test: 'leaderboard/',
  },
  notification_system: {
    fetch: '/allow_authenticated/notification_system/fetch/',
    updateNotificationSeenStatus:
      '/allow_authenticated/notification_system/update_notification_seen_status/',
    getNotificationChannelId:
      '/allow_authenticated/notification_system/get_my_notifications_channel_id/',
    markAllAsRead: '/allow_authenticated/notification_system/mark_all_as_read/',
  },
  profile_statistics: {
    detail: '/allow_authenticated/profile_statistics/detail/',
    profileData: '/allow_authenticated/profile_statistics/profile_data/',
  },
  upload_handler_system: {
    process_image: uploadServerBase + '/upload/process_image/',
    upload_image: uploadServerBase + '/upload/image/',
    upload_audio: uploadServerBase + '/upload/audio/',
  },

  health_check: {
    test: 'health_check/',
  },
  test_access_token: 'test_access_token/',
}
export default endpoints
