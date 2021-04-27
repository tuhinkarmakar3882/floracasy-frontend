# Floracasy Backend API Structure

> Version. 2.0.0
>
> Date: 12th April, 2021

```json
{
  "core": {
    "authentication": {
      "login": "/core/authentication/login/",
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
      "like": "/blog/actions/like/",
      "share": "/blog/actions/share/",
      "update": {
        "viewCount": "/blog/actions/update/viewCount"
      }
    },
    "fetch": {
      "details": "/blog/fetch/detail/",
      "list": "/blog/fetch/list/"
    },
    "create": "/blog/create/",
    "delete": "/blog/delete/",
    "update": "/blog/update/"
  },
  "category": {},
  "comment": {},
  "community": {
    "post": {
      "actions": {
        "like": "/community/post/actions/like/",
        "share": "/community/post/actions/share/",
        "update": {
          "viewCount": "/community/post/actions/update/viewCount"
        }
      },
      "fetch": {
        "details": "/community/post/fetch/detail/",
        "list": "/community/post/fetch/list/"
      },
      "create": "/community/post/create/",
      "delete": "/community/post/delete/",
      "update": "/community/post/update/"
    },
    "story": {
      "actions": {
        "like": "/community/story/actions/like/",
        "share": "/community/story/actions/share/",
        "update": {
          "viewCount": "/community/story/actions/update/viewCount"
        }
      },
      "fetch": {
        "details": "/community/story/fetch/detail/",
        "list": "/community/story/fetch/list/"
      },
      "create": "/community/story/create/",
      "delete": "/community/story/delete/",
      "update": "/community/story/update/"
    }
  },
  "feedback": {},
  "fileUpload": {},
  "follow": {},
  "helpAndSupport": {},
  "messaging": {},
  "notification": {},
  "payment": {},
  "profileStatistics": {}
}
```
