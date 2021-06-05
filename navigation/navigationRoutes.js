export const navigationRoutes = {
  index: '/',

  Authentication: {
    SignInToContinue: '/Authentication/SignInToContinue',
  },

  Home: {
    Account: {
      Details: '/Home/Account/Details',
      Overview: '/Home/Account/Overview/{userUID}',
      Followers: '/Home/Account/Followers/{userUID}',
    },

    Blogs: {
      Create: {
        index: '/Home/Blogs/Create',
        AddBlog: '/Home/Blogs/Create/AddBlog',
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

    Community: {
      index: '/Home/Community',
      Search: '/Home/Community/Search',
      Explore: '/Home/Community/Explore',
      Posts: {
        detail: '/Home/Community/Posts/{postIdentifier}',
        add: '/Home/Community/Posts/AddPost',
      },
      Story: {
        index: '/Home/Community/Stories',
        add: '/Home/Community/Stories/AddStory',
      },
    },

    Messages: {
      index: '/Home/Messages',
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
        PrivacyAndSecurityHelp:
          '/Home/MoreOptions/HelpAndSupport/PrivacyAndSecurityHelp',
        Tickets: {
          index: '/Home/MoreOptions/HelpAndSupport/Tickets',
          Details:
            '/Home/MoreOptions/HelpAndSupport/Tickets/Details/{identifier}',
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
      WriteAndEarn: {
        index: '/Home/MoreOptions/WriteAndEarn',
        HowToWrite: '/Home/MoreOptions/WriteAndEarn/HowToWrite',
        Earning: '/Home/MoreOptions/WriteAndEarn/Earning',
      },
      ReferAndEarn: {
        index: '/Home/MoreOptions/ReferAndEarn',
      },
    },

    Notifications: {
      index: '/Home/Notifications',
    },

    DashBoard: '/Home/DashBoard',
  },
}
