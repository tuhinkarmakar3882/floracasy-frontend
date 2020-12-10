<template>
  <div class="get-started-authentication-page">
    <div v-if="showLoaderAnimation">
      <p class="text-center mb-8">{{ stateInformation }}</p>
      <LoadingIcon />
    </div>

    <div v-else>
      <a
        class="close-btn"
        aria-label="close button"
        @click="
          () => {
            this.$router.replace('/')
          }
        "
      >
        <span class="mdi mdi-close" />
      </a>

      <h3 class="my-6 text-center">Let&rsquo;s Get Started</h3>
      <small class="text-center" style="display: block">
        Get Started with the most advanced <br />
        password less sign in
      </small>
      <section class="signupOptionsGrid my-8">
        <button
          v-ripple
          class="secondary-outlined-btn"
          @click="signInWithPopup"
        >
          Continue with
          <GoogleIcon class="ml-1 icon" />
        </button>
      </section>
    </div>
  </div>
</template>

<script>
import GoogleIcon from '@/components/global/Icons/GoogleIcon'
import firebase from 'firebase/app'
import 'firebase/auth'
import LoadingIcon from '@/components/global/LoadingIcon'
import endpoints from '@/api/endpoints'
import * as secrets from '@/environmentalVariables'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'SignInToContinue',
  components: { LoadingIcon, GoogleIcon },
  layout: 'Authentication',
  middleware: 'publicRoute',

  data() {
    return {
      pageTitle: 'Sign In To Continue',
      showLoaderAnimation: false,
      stateInformation: 'Checking...',
      signupOptions: [
        {
          id: 0,
          provider: 'Google',
          icon: 'mdi mdi-google',
        },
      ],
    }
  },

  async mounted() {
    // await this.$firebase.analytics().logEvent('page_view')
  },

  methods: {
    async signInWithPopup() {
      await this.$store.dispatch('SocketHandler/updateSocketMessage', {
        message: '',
        notificationType: '',
        dismissible: true,
      })
      this.showLoader()
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
        const commonPayload = {
          uid: jsonUser.uid,
          displayName: jsonUser.displayName,
          phoneNumber: jsonUser.phoneNumber,
          email: jsonUser.email,
          photoURL: jsonUser.photoURL,
          createdAt: jsonUser.createdAt,
          lastLoginAt: jsonUser.lastLoginAt,
        }
        const backendPayload = {
          ...commonPayload,
          emailVerified: jsonUser.emailVerified,
          authDomain: jsonUser.authDomain,
          providerId: jsonUser.providerData[0].uid,
          updatedAt: jsonUser.lastLoginAt,
          accessToken: jsonUser.stsTokenManager.accessToken,
        }
        this.updateInfo('Validating Credentials...')
        await this.$axios
          .$post(endpoints.auth.authenticate, backendPayload)
          .then(async (response) => {
            const frontendPayload = {
              ...commonPayload,
            }
            this.updateInfo('Logging you in...')
            await this.login(frontendPayload, response)
          })
          .catch(async (e) => {
            console.error(e)
            await this.abort()
          })
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

      window.location = navigationRoutes.Home.DashBoard
    },

    async abort() {
      this.updateInfo('Error, While Logging you in.')

      await this.$store.dispatch('logout')
      this.hideLoader()
      this.updateInfo('Checking...')
      localStorage.clear()
      await this.$store.dispatch('SocketHandler/updateSocketMessage', {
        message: 'Unable to Login. Please Refresh',
        notificationType: 'error',
        dismissible: false,
      })
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
      this.$axios.setToken(this.$cookies.get('access'), 'Bearer')
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

    showLoader() {
      this.showLoaderAnimation = true
    },

    hideLoader() {
      this.showLoaderAnimation = false
    },

    updateInfo(message) {
      this.stateInformation = message || 'Opening Popup for Login'
    },
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.get-started-authentication-page {
  display: block;
  position: relative;
  width: clamp(300px, 90vw, 650px);
  background: darken($card-background, 5%);
  border-radius: 10px;
  padding: 2rem 1.5rem;
  box-shadow: 0 0 4px lighten($card-background, 50%);

  .close-btn {
    position: absolute;
    top: $standard-unit;
    right: $large-unit;
    font-size: 1.5rem;
    text-decoration: none !important;
    z-index: 1;
  }

  .signupOptionsGrid {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    place-items: center;
    grid-row-gap: 3vh;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 1.8 * $large-unit;
      width: 250px;
      font-size: 1rem;

      & .icon {
        height: 100%;
        padding: $standard-unit - $nano-unit;
      }
    }
  }
}
</style>
