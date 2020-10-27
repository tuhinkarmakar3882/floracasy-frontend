<template>
  <div class="get-started-authentication-page">
    <a
      v-ripple
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
      <button v-ripple class="secondary-outlined-btn" @click="login">
        Continue with
        <GoogleIcon class="ml-1 icon" />
      </button>
    </section>
  </div>
</template>

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

<script>
import GoogleIcon from '@/components/Icons/GoogleIcon'

export default {
  name: 'GetStarted',
  components: { GoogleIcon },
  layout: 'Authentication',
  // middleware: 'publicRoute',

  data() {
    return {
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
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: 'demo',
          password: 'demo',
        })
        // console.log(this.$store.state.authUser)
        await this.$router.push('/')
      } catch (e) {
        // console.log(`Error in logging in ${e}`)
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
