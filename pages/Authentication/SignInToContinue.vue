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

        // const data = {
        //   apiKey: 'AIzaSyBC8dH53PFPOWqN72FHSZtjM6ekF3gbEOM',
        //   appName: '[DEFAULT]',
        //   authDomain: 'floracasy-673ff.firebaseapp.com',
        //   createdAt: '1603785378287',
        //   displayName: 'Tuhin Karmakar',
        //   email: 'tuhinkarmakar3882@gmail.com',
        //   emailVerified: true,
        //   isAnonymous: false,
        //   lastLoginAt: '1604039961043',
        //   multiFactor: {
        //     enrolledFactors: [],
        //     phoneNumber: null,
        //     photoURL:
        //       'https://lh3.googleusercontent.com/a-/AOh14Ghfly-3lLCiVZecNYSoVwZJLZYyBppqeLYXaQnVnw=s96-c',
        //   },
        //   providerData: [
        //     {
        //       displayName: 'Tuhin Karmakar',
        //       email: 'tuhinkarmakar3882@gmail.com',
        //       phoneNumber: null,
        //       photoURL:
        //         'https://lh3.googleusercontent.com/a-/AOh14Ghfly-3lLCiVZecNYSoVwZJLZYyBppqeLYXaQnVnw=s96-c',
        //       providerId: 'google.com',
        //       uid: '103702870113860414328',
        //     },
        //     { redirectEventId: null },
        //   ],
        //   stsTokenManager: {
        //     accessToken:
        //       'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQxMGM4ZjhiMGRjN2Y1NWUyYjM1NDFmMjllNWFjMzc0M2Y3N2NjZWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiVHVoaW4gS2FybWFrYXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2hmbHktM2xMQ2lWWmVjTllTb1Z3WkpMWll5QnBwcWVMWVhhUW5Wbnc9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmxvcmFjYXN5LTY3M2ZmIiwiYXVkIjoiZmxvcmFjYXN5LTY3M2ZmIiwiYXV0aF90aW1lIjoxNjA0MDM5OTYxLCJ1c2VyX2lkIjoiQnhVUWJMYWhxMlZObElsMFJ2bENZeDA5U2lvMiIsInN1YiI6IkJ4VVFiTGFocTJWTmxJbDBSdmxDWXgwOVNpbzIiLCJpYXQiOjE2MDQwMzk5NjEsImV4cCI6MTYwNDA0MzU2MSwiZW1haWwiOiJ0dWhpbmthcm1ha2FyMzg4MkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwMzcwMjg3MDExMzg2MDQxNDMyOCJdLCJlbWFpbCI6WyJ0dWhpbmthcm1ha2FyMzg4MkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.ZmFZPwKonmHLcc7Q3xGwd8B_qVpotKs1KT6mZa1H4tXGn7V0ARrk6HgNaNLTUQfNbD-SktrUiGA8e04pQKHr3afPn7wet5TxzZlBTNSZIOBG6cWRi21uf7RvhcWB9Ewbwy1kw3N4LraccZoCtKiUCs1EpbH3GXbb51FcQQziA6X1dlqzZzjMQOJGHKKJRRD0qpRDWKRyMGHAkOutkJ9qmpdOyayob9GCsoIT-XrQCcSM0quBaxts_xANlPhNuaQhN1rAk_978LiTLN1-lAQW9sN_4KRbQKWJMcLWPPRkM0cBcBHk4c2j1O8mvfp7rfjrum1JI-zb1strxlq3zC-6pg',
        //     apiKey: 'AIzaSyBC8dH53PFPOWqN72FHSZtjM6ekF3gbEOM',
        //     expirationTime: 1604043561000,
        //     refreshToken:
        //       'AG8BCndwEboEPos2XdapwfivmdwBoD2-OWUTdedal3qk_emHyIS4vxerBdrYig46McHZmFwuj0mxPDM67UNafEAbnlYcghcDrbK0Cok6EFkI6kfp8pY5vhfB6ca8G7myCQo64gCEmjeFLcJFcHOaWlv5O2K3xLgZGoj4KxtF3IjE6HADl_52SM0Z9qBGM0dTxVojlTxDAFEtGInHUmYfKrZBAI0odrFCESdjWaGAJZAnqXGjP1qgqhrz1atDzwG2z4mJ8IJKMw3fTyuVyXGCZ6BSq65Z4xGUTo0k5Kp0W2IFIqpyNNQ_o3X8ngudgcHvRdH1hoSA2A6xFPacjCUeus1kwIn16-7PJ4VtXb6UvviFiHkUPOeRSWFjieSr4kil6wLjG5eGeFY-M12WQcLJgfyGYGzSshoNh23afmTYeL0Dy2CGKABhk1O9n1cOOBQMLZzvJ5wfrsmC',
        //   },
        //   tenantId: null,
        //   uid: 'BxUQbLahq2VNlIl0RvlCYx09Sio2',
        // }

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

        await this.$axios
          .$post('/auth/authenticate/', backendPayload)
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
