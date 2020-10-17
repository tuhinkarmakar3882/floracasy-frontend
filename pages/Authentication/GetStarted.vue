<template>
  <div class="content">
    <h1 class="headline-text my-4 text-center">Let&rsquo;s Get Started</h1>

    <div class="signupOptionsGrid">
      <div v-for="option in signupOptions" :key="option.id" class="gridItems">
        <button class="secondary-outlined-btn" @click="login">
          <span>Continue with {{ option.provider }}</span>
        </button>
      </div>
    </div>

    <div class="muted-text text-center my-4">
      Get Started with the most advanced password less sign in
    </div>

    <div class="text-center mt-4">
      <button
        @click="
          () => {
            this.$router.back()
          }
        "
      >
        Go Back
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GetStarted',
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
}
</script>

<style lang="scss" scoped>
@import 'assets/variables';

.content {
  display: block;
  width: clamp(300px, 90vw, 650px);
  background: darken($card-background, 5%);
  border-radius: 10px;
  padding: 2rem 1.5rem;
  box-shadow: 0 0 4px lighten($card-background, 50%);

  .headline-text {
    font-family: $Prata;
    font-weight: 400;
    letter-spacing: 1px;
    color: white;
    font-size: clamp(24px, 4vw, 32px);
  }

  .signupOptionsGrid {
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    place-items: center;
    grid-row-gap: 3vh;
    margin: 1.5rem 0;
    padding: 1.5rem 0;
    background: transparent;

    .gridItems {
      background: transparent;
    }
  }

  .muted-text {
    font-weight: 300;
    letter-spacing: 1px;
    text-align: center;
    color: $muted;
  }
}
</style>
