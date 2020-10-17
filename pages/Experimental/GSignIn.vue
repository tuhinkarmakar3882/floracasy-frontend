<template>
  <div class="container text-center">
    <h3>Logged in As => {{ whoAmI }}</h3>
    <br />
    <button class="mx-4 my-4" @click="signInRedirect">
      Sign With Redirect
    </button>
    <button class="mx-4 my-4" @click="signInPopup">Sign With Pop Up</button>
    <button class="mx-4 my-4" @click="test">Test</button>
  </div>
</template>

<script>
export default {
  name: 'GSignIn',
  layout: 'Authentication',
  middleware: 'publicRoute',
  data() {
    return {
      whoAmI: 'Not Logged in',
    }
  },
  methods: {
    async signInRedirect() {
      // const provider = new this.$firebase.auth.GoogleAuthProvider()
      // const redr = await this.$firebase.auth().signInWithRedirect(provider)
    },
    async signInPopup() {
      // const provider = new this.$firebase.auth.GoogleAuthProvider()
      // const result = await this.$firebase.auth().signInWithPopup(provider)
      // const user = result.user
      // console.log(user)
    },
    async test() {
      // const user = this.$firebase.auth().currentUser
      // const idToken = await user.getIdToken(true)
      // const url = `https://floracasy.firebaseio.com//test.json?auth=${idToken}`
      // const test = await this.$axios.$get(url)
      // console.log(test)
    },
  },
}
</script>

<style scoped></style>
