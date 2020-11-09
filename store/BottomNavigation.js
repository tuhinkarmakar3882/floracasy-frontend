export const state = () => ({
  menuOptions: [
    {
      id: 0,
      text: 'Home',
      icon: 'mdi-home',
      color: '#6360f8',
      route: '/Home/Dashboard',
    },
    {
      id: 1,
      text: 'Profile',
      icon: 'mdi-account',
      color: '#6360f8',
      route: '/Home/Account/Details',
    },
    {
      id: 2,
      text: 'Create',
      icon: 'mdi-plus-circle',
      color: '#6360f8',
      route: '/Home/Blogs/Create',
    },
    {
      id: 3,
      text: 'Notification',
      icon: 'mdi-bell',
      color: '#6360f8',
      route: '/Home/Notifications',
    },
    {
      id: 4,
      text: 'More',
      icon: 'mdi-dots-horizontal-circle',
      color: '#6360f8',
      route: '/Home/MoreOptions',
    },
  ],
  activeLink: 0,
})

export const mutations = {
  update(state, { linkPosition }) {
    state.activeLink = linkPosition
  },
}

export const actions = {}

export const getters = {
  getMenuOptions(state) {
    return state.menuOptions
  },
  getActiveLink(state) {
    return state.activeLink
  },
}
