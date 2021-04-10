<template>
  <div class="hero-container">
    <img
      alt="banner_illustration_logo"
      class="hero-image"
      src="/images/banner_illustration_logo.svg"
    />

    <section class="hero-content">
      <img
        src="/images/CaptionText.png"
        alt="Where Knowledge Gets Socialized"
        class="caption-image"
      />

      <LazyKeyPoint
        v-for="(point, index) in points"
        :key="index"
        :point="point"
        :tick-size="24"
        class="my-1"
        text-color="#cacaca"
        tick-color="#6dc363"
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
      points: [
        'Explore enriching articles',
        'Discover people around the world',
        'Get rewarded for your knowledge',
        'And a lot more!',
      ],
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

  @media only screen and (min-width: $small-screen) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
  }

  .hero-image {
    width: 50vw;
    order: 0;
    margin: auto;

    @media only screen and (min-width: $small-screen) {
      order: 2;
      margin: unset;
    }
  }

  .hero-content {
    text-align: center;
    order: 1;

    @media only screen and (min-width: $small-screen) {
      text-align: left;
      order: 0;
    }

    .caption-image {
      height: 90px;
      margin: $xxx-large-unit auto;
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
