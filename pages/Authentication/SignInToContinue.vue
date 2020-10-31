<template>
  <div class="get-started-authentication-page">
    <div v-if="showLoaderAnimation">
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
import GoogleIcon from '@/components/Icons/GoogleIcon'
import firebase from 'firebase/app'
import 'firebase/auth'
import LoadingIcon from '@/components/LoadingIcon'
import endpoints from '@/api/endpoints'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'SignInToContinue',
  components: { LoadingIcon, GoogleIcon },
  layout: 'Authentication',
  middleware: 'publicRoute',

  data() {
    return {
      showLoaderAnimation: false,
      signupOptions: [
        {
          id: 0,
          provider: 'Google',
          icon: 'mdi mdi-google',
        },
      ],
    }
  },

  methods: {
    showLoader() {
      this.showLoaderAnimation = true
    },

    hideLoader() {
      this.showLoaderAnimation = false
    },

    async signInWithPopup() {
      this.showLoader()
      const provider = new firebase.auth.GoogleAuthProvider()
      const user = await firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          return result.user
        })

      if (user !== null) {
        const jsonUser = user.toJSON()

        const frontendPayload = {
          uid: jsonUser.uid,
          displayName: jsonUser.displayName,
          phoneNumber: jsonUser.phoneNumber,
          email: jsonUser.email,
          photoURL: jsonUser.photoURL,
          createdAt: jsonUser.createdAt,
          lastLoginAt: jsonUser.lastLoginAt,
          expirationTime: jsonUser.expirationTime,
        }

        const backendPayload = {
          uid: jsonUser.uid,
          email: jsonUser.email,
          emailVerified: jsonUser.emailVerified,
          photoURL: jsonUser.photoURL,
          authDomain: jsonUser.authDomain,
          providerId: jsonUser.providerData[0].uid,
          displayName: jsonUser.displayName,
          createdAt: jsonUser.createdAt,
          updatedAt: jsonUser.lastLoginAt,
          accessToken: jsonUser.stsTokenManager.accessToken,
        }

        console.log('token =>', backendPayload.accessToken)

        await this.$axios
          .$post(endpoints.auth.authenticate, backendPayload)
          .then(() => {
            this.$store.commit('SET_USER', frontendPayload)
            Cookie.set('authUser', frontendPayload)
            this.$router.replace('/Home/Dashboard')
          })
          .catch(() => {
            Cookie.remove('authUser')
            this.$store.dispatch('logout', frontendPayload)
            this.hideLoader()
          })
      } else {
        // Todo Add UI Hint
        Cookie.remove('authUser')
        await this.$store.dispatch('logout')
        this.hideLoader()
      }
    },
  },

  head() {
    return {
      title: 'Sign in to continue',
      meta: [
        {
          // hid: 'description',
          // name: 'description',
          // content: 'My custom description',
        },
      ],
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
