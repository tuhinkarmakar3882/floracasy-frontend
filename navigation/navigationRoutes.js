export const navigationRoutes = {
  index: '/',

  Authentication: {
    SignInToContinue: '/Authentication/SignInToContinue',
  },

  Home: {
    Account: {
      Details: '/Home/Account/Details',
      Overview: '/Home/Account/Overview/',
    },

    Blogs: {
      Create: {
        index: '/Home/Blogs/Create',
        New: '/Home/Blogs/Create/New',
        Drafts: '/Home/Blogs/Create/Drafts',
      },

      CategoryWise: {
        Name: '/Home/Blogs/CategoryWise/{name}',
      },
      Comments: {
        BlogId: '/Home/Blogs/Comments/{BlogId}',
      },
      Details: '/Home/Blogs/Details/{id}',
    },

    Messages: {
      index: '/Home/Messages',
      ChatScreen: '/Home/Messages/ChatScreen/{messageThreadId}',
    },

    MoreOptions: {
      index: '/Home/MoreOptions',
      About: '/Home/MoreOptions/About',
      FAQ: '/Home/MoreOptions/FAQ',
      GoPremium: '/Home/MoreOptions/GoPremium',
      HelpAndSupport: {
        index: '/Home/MoreOptions/HelpAndSupport',
        Feedback: '/Home/MoreOptions/HelpAndSupport/Feedback',
        PopularTopics: {
          index: '/Home/MoreOptions/HelpAndSupport/PopularTopics',
          WeeklyChallenge:
            '/Home/MoreOptions/HelpAndSupport/PopularTopics/WeeklyChallenge',
          AudioBlogs:
            '/Home/MoreOptions/HelpAndSupport/PopularTopics/AudioBlogs',
        },
        ContactSupport: '/Home/MoreOptions/HelpAndSupport/ContactSupport',
        Tickets: {
          index: '/Home/MoreOptions/HelpAndSupport/Tickets',
        },
      },
      Payments: {
        index: '/Home/MoreOptions/Payments',
      },
      Preferences: {
        index: '/Home/MoreOptions/Preferences',
        EditProfile: '/Home/MoreOptions/Preferences/EditProfile',
        SavedBlogs: '/Home/MoreOptions/Preferences/SavedBlogs',
        NotificationSettings:
          '/Home/MoreOptions/Preferences/NotificationSettings',
      },
      WriteAndEarn: '/Home/MoreOptions/WriteAndEarn',
    },

    Notifications: {
      index: '/Home/Notifications',
    },

    DashBoard: '/Home/DashBoard',
  },

  PublicRoutes: {
    GoPremium: '/PublicRoutes/GoPremium',
    WriteAndEarn: '/PublicRoutes/WriteAndEarn',
  },
}
