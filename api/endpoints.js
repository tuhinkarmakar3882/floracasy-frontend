import { uploadServerBase } from '../environmentVariables'

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
    seo: '/allow_any/blog/seo/list/',

    sampleBlogs: '/allow_any/blog/fetch/sample_blogs/',
    fetch: '/allow_any/blog/fetch/',
    info: '/allow_authenticated/blog/info/',
    detail: '/allow_any/blog/detail/',

    create: '/allow_authenticated/blog/create/',
    delete: '/allow_authenticated/blog/delete/',

    like: '/allow_authenticated/blog/like/',
    share: '/allow_authenticated/blog/share/',

    getBlogsByUid: '/allow_authenticated/blog/fetch/by_uid/',
    getSavedBlogs: '/allow_authenticated/blog/saved/fetch/',

    updateViewCount: '/allow_authenticated/blog/updateViewCount/{identifier}/',
    addOrRemoveToSaveBlogs:
      '/allow_authenticated/blog/add_or_remove_to_save_blogs/',
  },
  categories: {
    fetch: '/allow_any/categories/fetch/',
  },
  comment_system: {
    blog: {
      fetch: '/allow_authenticated/comment_system/blog/fetch/',
      create: '/allow_authenticated/comment_system/blog/create/',
      detail: '/allow_authenticated/comment_system/detail/Blog/{identifier}/',
      delete: '/allow_authenticated/comment_system/blog/delete/',
    },
    post: {
      fetch: '/allow_authenticated/comment_system/post/fetch/',
      create: '/allow_authenticated/comment_system/post/create/',
      detail: '/allow_authenticated/comment_system/detail/Post/{identifier}/',
      delete: '/allow_authenticated/comment_system/post/delete/',
    },
  },
  community_service: {
    stories: {
      index: '/allow_authenticated/community_service/stories/',
      delete: '/allow_authenticated/community_service/stories/delete/',
      reaction: '/allow_authenticated/community_service/stories/reactions/',
      updateViewStatus:
        '/allow_authenticated/community_service/stories/updateViewStatus/',

      status: '/allow_authenticated/community_service/stories/status/',

      detail:
        '/allow_authenticated/community_service/stories/detail/{identifier}/',
    },
    posts: {
      index: '/allow_authenticated/community_service/posts/',
      delete: '/allow_authenticated/community_service/posts/delete/',
      detail:
        '/allow_authenticated/community_service/posts/detail/{identifier}/',
      like: '/allow_authenticated/community_service/posts/like/',
      share: '/allow_authenticated/community_service/posts/share/',
      getByUserUID:
        '/allow_authenticated/community_service/posts/fetch/by_user_uid/',
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
    search: '/allow_authenticated/follow_system/search/',
    fetch: '/allow_authenticated/follow_system/fetch/',
    getSuggestions: '/allow_authenticated/follow_system/getSuggestions/',
  },
  help_and_support: {
    fetch: '/allow_authenticated/help_and_support/fetch/',
    create: '/allow_authenticated/help_and_support/create/',
    detail: '/allow_authenticated/help_and_support/detail/{ticketID}/',
    conversation: {
      detail: '/allow_authenticated/help_and_support/conversation/detail/',
      create: '/allow_authenticated/help_and_support/conversation/create/',
    },
  },
  leaderboard: {
    test: 'leaderboard/',
  },
  notification_system: {
    fetch: '/allow_authenticated/notification_system/fetch/',
    saveFCMToken: '/allow_authenticated/notification_system/save_fcm_token/',

    updateNotificationSeenStatus:
      '/allow_authenticated/notification_system/update_notification_seen_status/',
    getNotificationChannelId:
      '/allow_authenticated/notification_system/get_my_notifications_channel_id/',
    markAllAsRead: '/allow_authenticated/notification_system/mark_all_as_read/',
  },
  profile_statistics: {
    detail: '/allow_authenticated/profile_statistics/detail/',
    profileData: '/allow_authenticated/profile_statistics/profile_data/',
    getProfileImage:
      '/allow_authenticated/profile_statistics/get_profile_image/',
  },
  upload_handler_system: {
    process_image: uploadServerBase + '/upload/process_image/',
    upload_image: uploadServerBase + '/upload/image/',
    upload_audio: uploadServerBase + '/upload/audio/',
  },

  payments: {
    fetch: '/allow_authenticated/payments/fetch/',
  },

  health_check: {
    test: 'health_check/',
  },
  test_access_token: 'test_access_token/',
}
export default endpoints
