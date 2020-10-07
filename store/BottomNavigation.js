export const state = () => ({
    menuOptions: [
        {
            id: 0,
            text: "Home",
            icon: "mdi-home",
            color: "red",
            route: "/Home/Dashboard"
        },
        {
            id: 1,
            text: "Account",
            icon: "mdi-account",
            color: "green",
            route: "/Home/Account/Details"
        },
    ],
    activeLink: 0,
})

export const mutations = {
    update(state, {linkPosition}) {
        state.activeLink = linkPosition;
    },
}

export const actions = {
    // nuxtServerInit({commit}, {req}) {
    //     if (req.session && req.session.authUser) {
    //         console.log("user set as", req.session.authUser)
    //         commit('SET_USER', req.session.authUser)
    //     }
    // },
    //
    // async login({commit}, {username, password}) {
    //     try {
    //         const {data} = await axios.post('/api/login', {username, password})
    //         commit('SET_USER', data)
    //     } catch (error) {
    //         if (error.response && error.response.status === 401) {
    //             throw new Error('Bad credentials')
    //         }
    //         throw error
    //     }
    // },
    //
    // async logout({commit}) {
    //     await axios.post('/api/logout')
    //     commit('SET_USER', null)
    // }
}

export const getters = {
    getMenuOptions(state) {
        return state.menuOptions
    },
    getActiveLink(state) {
        return state.activeLink
    }
}
