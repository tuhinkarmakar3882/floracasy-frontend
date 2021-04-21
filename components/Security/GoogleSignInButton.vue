<template>
  <button v-ripple class="button-component" @click="signInWithGoogle">
    <GoogleIcon class="icon mx-4" />
    <span>Continue with Google</span>
    <transition name="scale-down">
      <aside
        v-show="showLoaderAnimation"
        class="loader"
        @click.stop
        :style="!showLoaderAnimation && { zIndex: -1 }"
      >
        <i class="mdi mdi-loading mdi-spin mdi-48px vibrant" />
        <p class="mt-4">{{ stateInformation }}</p>
      </aside>
    </transition>
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
  data() {
    return {
      showLoaderAnimation: false,
      stateInformation: '',
    }
  },

  methods: {
    async signInWithGoogle() {
      this.showLoaderAnimation = true

      await showUITip(this.$store, 'Opening Google Auth Page')

      this.updateInfo('Loading OAuth Provider')
      const provider = new firebase.auth.GoogleAuthProvider()

      this.updateInfo('Waiting for you to complete the login')
      const user = await firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => result.user)
        .catch(() => {})

      if (!user) {
        console.log('aborting..', user)
        await this.abort()
        return
      }

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

      try {
        this.updateInfo('Validating Credentials...')

        const response = await this.$axios.$post(
          endpoints.auth.authenticate,
          backendPayload
        )

        await this.login(frontendPayload, response)
      } catch (e) {
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

      const redirectTo = this.$route.query?.next

      redirectTo
        ? await this.$router.replace(redirectTo)
        : await this.$router.replace(navigationRoutes.Home.DashBoard)
    },

    async abort() {
      this.updateInfo('Error, While Logging you in.')
      await this.$store.dispatch('logout')

      this.showLoaderAnimation = false

      this.updateInfo('Checking...')
      await showUITip(this.$store, 'Unable to Login. Please Refresh', 'error')
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
      await this.$store.dispatch('UserManagement/fetchData')
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
@import 'assets/all-variables';

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

  aside.loader {
    position: fixed;
    top: $zero-unit;
    left: $zero-unit;
    right: $zero-unit;
    bottom: $zero-unit;
    z-index: $bring-to-front + 1;
    background: linear-gradient(
        45deg,
        rgba($navigation-bar-color, 0.95) 0%,
        rgba($body-bg-alternate, 0.95) 16%,
        rgba($card-bg, 0.95) 32%,
        rgba($card-bg-alternate, 0.95) 48%,
        rgba($card-bg, 0.95) 64%,
        rgba($body-bg-alternate, 0.95) 80%,
        rgba($navigation-bar-color, 0.95) 100%
      )
      right no-repeat;
    background-size: 400%;
    animation: shift-background 20s infinite alternate-reverse ease-in-out;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-size: 18px;
      color: $white;
    }
  }

  @keyframes shift-background {
    from {
      background-position: left;
    }
    to {
      background-position: right;
    }
  }
}
</style>
