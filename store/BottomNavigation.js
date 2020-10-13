export const state = () => ({
    menuOptions: [
        {
            id: 0,
            text: "Home",
            icon: "mdi-home",
            color: "#3734E5",
            route: "/Home/Dashboard"
        },
        {
            id: 1,
            text: "Account",
            icon: "mdi-account",
            color: "#3734E5",
            route: "/Home/Account/Details"
        },
        {
            id: 2,
            text: "Settings",
            icon: "mdi-email",
            color: "#3734E5",
            route: "/Home/Messages"
        },
    ],
    activeLink: 0,
})

export const mutations = {
    update(state, {linkPosition}) {
        state.activeLink = linkPosition;
    },
}

export const actions = {}

export const getters = {
    getMenuOptions(state) {
        return state.menuOptions
    },
    getActiveLink(state) {
        return state.activeLink
    }
}
