<template>
  <div class="px-4">
    <h3>Login to continue:</h3>
    <pre>{{ user }}</pre>
    <br />
    <button
      v-ripple
      class="secondary-outlined-btn mx-4 my-4"
      @click="signInRedirect"
    >
      Sign With Redirect
    </button>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'

async function checkForUserExistence() {
  return await firebase
    .auth()
    .getRedirectResult()
    .then(function (result) {
      return result
    })
}

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
  async mounted() {
    // this.methods.showLoader()
    const userExistenceResult = await checkForUserExistence()
    if (userExistenceResult.user !== null) {
      await this.$router.replace('/')
    } else {
      console.log('User not logged in')
    }
  },
  methods: {
    showLoader() {
      alert('Loading')
    },
    async signInRedirect() {
      const provider = new firebase.auth.GoogleAuthProvider()
      await firebase
        .auth()
        .signInWithRedirect(provider)
        .then(function (result) {
          alert(result)
          return result
        })
    },
  },
}
</script>
