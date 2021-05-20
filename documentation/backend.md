# Floracasy Backend API Structure

> Version. 2.0.0
>
> Date: 12th April, 2021

```json
{
  "core": {
    "authentication": {
      "authenticate": "/core/authentication/authenticate/",
      "logout": "/core/authentication/logout/",
      "token": {
        "check": "/core/authentication/token/check/",
        "refresh": "/core/authentication/token/refresh/"
      },
      "profile": {
        "detail": "This will return the Profile details",
        "update": "This will update the Profile details"
      }
    }
  },
  "blog": {
    "actions": {
      "like": "/blog/:blogId/like/",
      "share": "/blog/:blogId/share/",
      "comment": {
        "fetch": "GET: /blog/:blogId/comment/",
        "create": "POST: /blog/:blogId/comment/",
        "delete": "DELETE: /blog/:blogId/comment/:commentId/"
      }
    },
    "fetch": {
      "details": "Get: /blog/:blogId",
      "list": "Get: /blog/",
      "by": {
        "user": "Get: /blog/by/user/:user_id",
        "category": "Get: /blog/by/category/:category_id",
      }
    },
    "create": "Post: /blog/",
    "delete": "Delete: /blog/:blogId/",
    "update": "Put: /blog/:blogId/"
  },
  "category": {},
  "community": {
    "post": {
      "actions": {
        "like": "/community/post/:postId/like/",
        "share": "/community/post/:postId/share/",
        "comment": {
          "fetch": "GET: /post/:postId/comment/",
          "create": "POST: /post/:postId/comment/",
          "delete": "DELETE: /post/:postId/comment/:commentId/"
        }
      },
      "fetch": {
        "details": "/community/post/:postId/",
        "list": "/community/post/"
      },
      "create": "POST: /community/post/",
      "delete": "DELETE: /community/post/:postId/delete/",
      "update": "PUT: /community/post/:postId"
    },
    "story": {
      "actions": {
        "like": "/community/story/:storyId/like/",
        "share": "/community/story/:storyId/share/",
        "comment": {
          "fetch": "GET: /story/:storyId/comment/",
          "create": "POST: /story/:storyId/comment/",
          "delete": "DELETE: /story/:storyId/comment/:commentId/"
        }
      },
      "fetch": {
        "details": "/community/story/:storyId/",
        "list": "/community/story/"
      },
      "create": "POST: /community/story/",
      "delete": "DELETE: /community/story/:storyId/delete/",
      "update": "PUT: /community/story/:storyId"
    }
  },
  "fileUpload": {
    "image": "",
    "audio": ""
  },
  "follow": {},
  "helpAndSupport": {
    "feedback": {}
  },
  "messaging": {},
  "notification": {
    "fetch": "/notifications/",
    "send": "/notifications/send/",
    "save_and_send": "/notifications/save_and_send/",
    "NotifyFollowers": "/notifications/notify/",
    "initialize_notification_channel": "/notifications/initialize/",
    "save_fcm_token": "POST: /notifications/fcm_token/",
    "update_notification_seen_status": "PUT: /notifications/:notificationId/",
    "has_unread": "/notifications/has_unread/",
    "mark_all_as_read": "PUT: /notifications/mark_all_as_read/",
    "get_notification_channel_id": "GET: /notifications/channel/"
  },
  "payment": {
    "balance": "GET: /payments/balance/"
  },
  "profileStatistics": {
    "detail": "/profile/detail/",
    "profileData": "/profile/stats/",
    "photoURL": {
      "fetch": "GET: /profile/:userId/photo/",
      "update": "POST: /profile/photo/"
    }
  }
}
```
