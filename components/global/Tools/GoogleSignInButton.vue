<template>
  <button v-ripple class="button-component" @click="signInWithGoogle">
    <GoogleIcon class="icon mx-4" />
    <span>Continue with Google</span>
  </button>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { LogAnalyticsEvent, showUITip } from '~/utils/utility'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import * as secrets from '~/environmentVariables'

export default {
  name: 'GoogleSignInButton',
  methods: {
    async signInWithGoogle() {
      await showUITip(this.$store, 'hello', '', true)

      this.showLoaderAnimation = true

      this.updateInfo('Loading OAuth Provider')
      const provider = new firebase.auth.GoogleAuthProvider()

      this.updateInfo('Waiting for you to complete the login')
      const user = await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => result.user)
        .catch(() => {})

      if (user && user !== {}) {
        this.updateInfo('Fetching Certificates...')
        const jsonUser = user.toJSON()
        const frontendPayload = {
          uid: jsonUser?.uid,
          displayName: jsonUser?.displayName,
          phoneNumber: jsonUser?.phoneNumber,
          email: jsonUser?.email,
          photoURL: jsonUser?.photoURL,
          createdAt: jsonUser?.createdAt,
          lastLoginAt: jsonUser?.lastLoginAt,
        }
        const backendPayload = {
          ...frontendPayload,
          emailVerified: jsonUser?.emailVerified,
          authDomain: jsonUser?.authDomain,
          providerId: jsonUser?.providerData[0]?.uid,
          updatedAt: jsonUser?.lastLoginAt,
          accessToken: jsonUser?.stsTokenManager?.accessToken,
        }

        this.updateInfo('Validating Credentials...')
        try {
          const response = await this.$axios.$post(
            endpoints.auth.authenticate,
            backendPayload
          )

          this.updateInfo('Logging you in...')
          await this.login(frontendPayload, response)
        } catch (e) {
          await this.abort()
        }
      } else {
        await this.abort()
      }
    },

    async login(payload, { token: tokens }) {
      this.updateInfo('Setting up things for you...')
      await this.saveAndApplyTokens(tokens)

      this.updateInfo('Securing the Connection...')
      await this.updateVuexStates(payload)

      this.updateInfo('Welcome')

      LogAnalyticsEvent('google_sign_in')

      window.location = navigationRoutes.Home.DashBoard
    },

    async abort() {
      this.updateInfo('Error, While Logging you in.')
      await this.$store.dispatch('logout')

      this.showLoaderAnimation = false
      this.updateInfo('Checking...')
      localStorage.clear()

      await showUITip(
        this.$store,
        'Unable to Login. Please Refresh',
        'error',
        false
      )
    },

    async saveAndApplyTokens(tokens) {
      await this.$cookies.set(
        'access',
        tokens.access,
        secrets.cookieSavingConfig
      )
      await this.$cookies.set(
        'refresh',
        tokens.refresh,
        secrets.cookieSavingConfig
      )
      this.$axios.setToken(tokens.access, 'Bearer')
    },

    async updateVuexStates(payload) {
      await this.$store.dispatch('login')
      await this.$store.dispatch('UserManagement/setUserData', {
        user: payload,
      })
      await this.$store.dispatch(
        'NotificationChannel/fetchNotificationChannelId'
      )
    },

    updateInfo(message) {
      this.stateInformation = message || 'Opening Popup for Login'
    },
  },
}
</script>

<style lang="scss" scoped>
.button-component {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  margin: 16px 0;

  span {
    justify-self: flex-start;
  }

  .icon {
    height: 24px;
    width: 24px;
  }
}
</style>
