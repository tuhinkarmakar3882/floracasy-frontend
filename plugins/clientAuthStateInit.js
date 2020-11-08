export default ({ store }) => {
  if (process.client) {
    const Cookie = require('js-cookie')
    const authUser = Cookie.getJSON('authUser')
    const tokens = Cookie.getJSON('tokens')
    console.log('user', authUser)
    console.log('token', tokens)
    store.commit('SET_USER', authUser)
    store.commit('SET_TOKENS', tokens)
  }
}
