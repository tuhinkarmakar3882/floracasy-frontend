<template>
  <div class="container text-center">
    <h3>Logged in As => {{ whoAmI }}</h3>
    <br />
    <button
      v-ripple
      class="secondary-outlined-btn mx-4 my-4"
      @click="signInRedirect"
    >
      Sign With Redirect
    </button>
    <!--    <button class="secondary-outlined-btn mx-4 my-4" @click="signInPopup">-->
    <!--      Sign With Pop Up-->
    <!--    </button>-->
    <!--    <button class="secondary-outlined-btn mx-4 my-4" @click="test">Test</button>-->
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'GSignIn',
  layout: 'Authentication',
  // middleware: 'publicRoute',
  data() {
    return {
      whoAmI: 'Not Logged in',
    }
  },
  mounted() {
    console.log('firebase', firebase)
  },
  methods: {
    async signInRedirect() {
      const provider = new firebase.auth.GoogleAuthProvider()
      const redr = await firebase.auth().signInWithRedirect(provider)
      console.log(redr)
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
