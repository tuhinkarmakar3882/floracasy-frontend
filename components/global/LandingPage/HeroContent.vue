<template>
  <div class="hero-container">
    <img
      class="hero-image"
      src="/images/banner_illustration_logo.svg"
      alt="banner_illustration_logo"
    />

    <section class="hero-content my-4">
      <h1>Reading Redefined.</h1>

      <p class="my-6">
        One good line, Which is really good,
        <br />
        followed by some other line, and this
        <br />
        line has more lines.
      </p>

      <LazyKeyPoint
        v-for="(point, index) in points"
        :key="index"
        :tick-size="24"
        class="my-0 my-lg-4"
        :point="point"
        tick-color="#6DD0BF"
      />

      <nuxt-link :to="navigationRoutes.Authentication.SignInToContinue">
        <LazyRippleButton
          :loading="heroButtonLoading"
          :on-click="changeIt"
          class="my-6"
          class-list="primary-btn"
        >
          Explore Now
        </LazyRippleButton>
      </nuxt-link>

      <p class="optional-log-in-text mb-6">
        Already have an account?
        <span>
          <nuxt-link to="/Authentication/SignInToContinue">
            Log in here
          </nuxt-link>
        </span>
      </p>
    </section>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'HeroContent',
  data() {
    return {
      navigationRoutes,
      heroButtonLoading: false,
      points: ['First Point', 'Second Point', 'Third Point', 'And Much More'],
    }
  },
  methods: {
    changeIt() {
      this.heroButtonLoading = true
      setTimeout(() => {
        this.heroButtonLoading = false
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.hero-container {
  text-align: center;

  @media only screen and (min-width: $small) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
  }

  .hero-image {
    width: 50vw;
    order: 0;
    margin: auto;

    @media only screen and (min-width: $small) {
      order: 2;
      margin: unset;
    }
  }

  .hero-content {
    text-align: center;
    order: 1;

    @media only screen and (min-width: $small) {
      text-align: left;
      order: 0;
    }

    h1 {
      font-family: $Prata;
      font-weight: 400;
      color: $white;

      @media only screen and (max-width: 362px) {
        font-size: $xx-large-unit;
      }
    }

    .optional-log-in-text {
      font-size: 16px;

      a {
        font-weight: bolder;
        color: $secondary-matte;

        &:hover,
        &:focus,
        &:active {
          color: $secondary-highlight;
        }
      }
    }
  }
}
</style>
