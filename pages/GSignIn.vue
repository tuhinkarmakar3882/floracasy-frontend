<template>
  <div class="container text-center">
    <h3>Logged in As => {{ whoAmI }}</h3>
    <br>
    <v-btn class="mx-4 my-4" color="secondary" outlined @click="signInRedirect">
      Sign With Redirect
    </v-btn>
    <v-btn class="mx-4 my-4" color="secondary" outlined @click="signInPopup">
      Sign With Pop Up
    </v-btn>
    <v-btn class="mx-4 my-4" color="secondary" outlined @click="test">
      Test
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "GSignIn",
  layout: "PreAuthLayout",
  data() {
    return {
      whoAmI: !this.$firebase.auth().currentUser.isAnonymous
          ? this.$firebase.auth().currentUser
          : "Not Logged in",
    }
  },
  methods: {
    signInRedirect: async function () {
      var provider = new this.$firebase.auth.GoogleAuthProvider()
      const redr = await this.$firebase.auth().signInWithRedirect(provider)
    },
    signInPopup: async function () {
      var provider = new this.$firebase.auth.GoogleAuthProvider()
      const result = await this.$firebase.auth().signInWithPopup(provider)
      var user = result.user
      console.log(user)
    },
    test: async function () {
      const user = this.$firebase.auth().currentUser
      const idToken = await user.getIdToken(true)
      const url = `https://floracasy.firebaseio.com//test.json?auth=${idToken}`
      const test = await this.$axios.$get(url)
      console.log(test)
    },
  },
}
</script>

<style scoped></style>
