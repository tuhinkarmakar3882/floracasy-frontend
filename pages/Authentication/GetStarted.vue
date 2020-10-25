<template>
  <div class="content">
    <h2 class="mt-4 mb-6 text-center">Let&rsquo;s Get Started</h2>

    <section class="signupOptionsGrid my-8">
      <RippleButton
        v-for="option in signupOptions"
        :key="option.id"
        class-list="secondary-outlined-btn"
        :on-click="login"
      >
        <span>Continue with {{ option.provider }}</span>
      </RippleButton>
    </section>

    <p class="muted-text text-center mt-6 mb-4">
      Get Started with the most advanced password less sign in
    </p>

    <div class="text-center my-6">
      <RippleButton
        :on-click="
          () => {
            this.$router.replace('/')
          }
        "
      >
        Go Back
      </RippleButton>
    </div>
  </div>
</template>

<script>
import RippleButton from '~/components/global/RippleButton'

export default {
  name: 'GetStarted',
  components: { RippleButton },
  layout: 'Authentication',
  middleware: 'publicRoute',

  data() {
    return {
      signupOptions: [
        {
          id: 0,
          provider: 'Google',
          icon: 'mdi-email',
        },
        {
          id: 1,
          provider: 'Facebook',
          icon: 'mdi-email',
        },
        {
          id: 2,
          provider: 'Twitter',
          icon: 'mdi-email',
        },
        {
          id: 3,
          provider: 'LinkedIn',
          icon: 'mdi-email',
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

<style lang="scss" scoped>
@import 'assets/all-variables';

.content {
  display: block;
  width: clamp(300px, 90vw, 650px);
  background: darken($card-background, 5%);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0 4px lighten($card-background, 50%);

  .signupOptionsGrid {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    place-items: center;
    grid-row-gap: 3vh;
  }

  .muted-text {
    font-weight: 300;
    text-align: center;
  }

  button {
    width: 15.5rem;
    height: 2.6rem;
  }
}
</style>
