export const state = () => ({
    menuOptions: [
        {
            id: 0,
            text: "Home",
            icon: "mdi-home",
            color: "red",
            route: "/"
        },
        {
            id: 1,
            text: "Book",
            icon: "mdi-book",
            color: "green",
            route: "/"
        },
    ],
    activeLink: 0,
})

export const mutations = {
    // SET_USER(state, user) {
    //     state.authUser = user
    // }
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
