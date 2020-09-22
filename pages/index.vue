<template>
  <div>
    <v-container class="hero-container">
      <div class="hero-content">
        <h1>Reading Redefined.</h1>
        <p>
          One good line, Which is really good,
          <br>
          followed by some other line, and this
          <br>
          line has more lines.
        </p>
        <v-btn :loading="heroButtonLoading" class="btn" color="primary" @click="changeIt">
          Explore Now
        </v-btn>
        <p class="optional-log-in-text">
          Already have an account?
          <span>
          <nuxt-link to="/">
            Log in here
          </nuxt-link>
        </span>
        </p>
      </div>
      <div class="hero-image">

      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  transition: 'slide-x-transition',
  data() {
    return {
      heroButtonLoading: false
    }
  },
  methods: {
    changeIt: function () {
      this.heroButtonLoading = true;
      setTimeout(() => {
        this.heroButtonLoading = false
      }, 2000)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.hero-container {
  .hero-content {
    h1 {
      font-family: $Prata;
      font-size: 36px;
      font-weight: 400;
      color: $white;
    }

    p {
      margin: 36px 0;
      line-height: 1.92;
    }

    button {
      font-size: 18px;
      padding: 20px 28px;
      font-weight: 600;
      text-transform: capitalize;
    }

    .optional-log-in-text {
      font-size: 16px;

      a {
        font-weight: bolder;
        color: $secondary-matte;

        &:hover, &:focus, &:active {
          color: $secondary-highlight;
        }
      }
    }
  }
}
</style>
