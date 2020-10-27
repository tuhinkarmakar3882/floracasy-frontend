<template>
  <div class="px-4">
    <section v-if="showLoaderAnimation">
      <LoadingIcon />
    </section>
    <section v-else>
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
    </section>
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'
import LoadingIcon from '@/components/LoadingIcon'

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
  components: { LoadingIcon },
  layout: 'Authentication',
  // middleware: 'publicRoute',
  data() {
    return {
      whoAmI: 'Not Logged in',
      firebase,
      showLoaderAnimation: true,
      user: {},
    }
  },

  async mounted() {
    const userExistenceResult = await checkForUserExistence()
    if (userExistenceResult.user !== null) {
      await this.$router.replace('/Home/Dashboard')
    } else {
      this.hideLoader()
      console.log('User not logged in')
    }
  },

  methods: {
    showLoader() {
      this.showLoaderAnimation = true
    },
    hideLoader() {
      this.showLoaderAnimation = false
    },
    async signInRedirect() {
      this.showLoader()
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
