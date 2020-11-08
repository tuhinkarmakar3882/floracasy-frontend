const Cookie = require('js-cookie')

const clientSideAuthenticationStateInitializer = ({ store }) => {
  if (process.client) {
    const authUser = Cookie.getJSON('authUser')
    const tokens = Cookie.getJSON('tokens')
    console.log('user', authUser)
    console.log('token', tokens)
    store.commit('SET_USER', authUser)
    store.commit('SET_TOKENS', tokens)
  }
}
export default clientSideAuthenticationStateInitializer
