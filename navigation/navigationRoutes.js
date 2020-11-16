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
      Details: '/Home/Blogs/Details/{id}',
    },

    Messages: {
      index: '/Home/Messages',
    },

    MoreOptions: {
      index: '/Home/MoreOptions',
      About: '/Home/MoreOptions/About',
      FAQ: '/Home/MoreOptions/FAQ',
      GoPremium: '/Home/MoreOptions/GoPremium',
      HelpAndSupport: '/Home/MoreOptions/HelpAndSupport',
      Payments: '/Home/MoreOptions/Payments',
      Preferences: '/Home/MoreOptions/Preferences',
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
