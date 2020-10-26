<template>
  <div class="container text-center">
    <h3>Logged in As => {{ whoAmI }}</h3>
    <h3>{{ firebase.auth.user }}</h3>
    <h3>{{ user }}</h3>
    <br />
    <!--    <button-->
    <!--      v-ripple-->
    <!--      class="secondary-outlined-btn mx-4 my-4"-->
    <!--      @click="signInRedirect"-->
    <!--    >-->
    <!--      Sign With Redirect-->
    <!--    </button>-->
    <button
      v-ripple
      class="secondary-outlined-btn mx-4 my-4"
      @click="signInPopup"
    >
      Sign With Pop Up
    </button>
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
      firebase,
      user: {},
    }
  },
  mounted() {
    console.log('firebase', firebase)
  },
  methods: {
    async signInRedirect() {
      const provider = new firebase.auth.GoogleAuthProvider()
      const redr = await firebase.auth().signInWithRedirect(provider)
      this.user = redr.user
      // await firebase
      //   .auth()
      //   .getRedirectResult()
      //   .then(function (result) {
      //     if (result.credential) {
      /// /       This gives you a Google Access Token. You can use it to access the Google API.
      // const token = result.credential.accessToken
      // alert(token)
      // }
      /// /The signed-in user info.
      // const user = result.user
      // alert(user)
      // })
      // .catch(function (error) {
      /// /Handle Errors here.
      // const errorCode = error.code
      // const errorMessage = error.message
      /// /The email of the user's account used.
      // const email = error.email
      /// /The firebase.auth.AuthCredential type that was used.
      // const credential = error.credential
      //
      // console.log(
      //   '!!!!!!!error',
      //   errorCode,
      //   errorMessage,
      //   email,
      //   credential
      // )
      // })
      // console.log(redr)
    },
    async signInPopup() {
      const provider = new firebase.auth.GoogleAuthProvider()
      const result = await firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken
          console.log(result.additionalUserInfo)
          console.log('token', token)
          // The signed-in user info.
          return result
          // ...
        })
        .catch(function (error) {
          console.error(error)
          // Handle Errors here.
          // const errorCode = error.code
          // const errorMessage = error.message
          // The email of the user's account used.
          // const email = error.email
          // The firebase.auth.AuthCredential type that was used.
          // const credential = error.credential
          // ...
        })
      const user = result.additionalUserInfo
      console.log(user)
      this.user = user
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
