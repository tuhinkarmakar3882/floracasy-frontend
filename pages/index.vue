<template>
  <v-container class="">
    <div class="hero">
      <h1>Reading Redefined.</h1>
      <p>
        One good line, Which is really good,
        <br>
        followed by some other line, and this
        <br>
        line has more lines.
      </p>
      <v-btn :disabled="maybe" :loading="maybe" color="primary" light rounded x-large @click="changeIt">
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
  </v-container>
</template>

<script>
export default {
  components: {},
  transition: 'slide-x-transition',
  data() {
    return {
      maybe: false
    }
  },
  methods: {
    changeIt: function () {
      console.log(this.maybe)
      this.maybe = true;
      setTimeout(() => {
        this.maybe = false
      }, 2000)
    }
  },
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.container {
  padding: 0 64px;

  .hero {
    h1 {
      font-family: $Prata;
      font-size: 52px;
      font-weight: 400;
      color: $white;
    }

    p {
      margin-top: 28px;
      margin-bottom: 48px;
      line-height: 2;
      font-size: 20px;
    }

    button {
      font-size: 20px;
      font-weight: 600 !important;
      text-transform: capitalize;
      width: 240px;
      height: 56px;
    }

    .optional-log-in-text {
      a {
        font-weight: 600;

        color: $secondary-matte;
      }
    }
  }
}
</style>
