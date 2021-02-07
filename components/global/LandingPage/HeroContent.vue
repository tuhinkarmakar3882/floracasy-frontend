<template>
  <div class="my-4 pb-6 hero-container">
    <section class="hero-image">
      <img
        class="mx-auto"
        src="/images/banner_illustration_logo.svg"
        alt="banner_illustration_logo"
      />
    </section>

    <section class="hero-content my-4">
      <h1>Reading Redefined.</h1>

      <p class="py-4">
        One good line, Which is really good,
        <br />
        followed by some other line, and this
        <br />
        line has more lines.
      </p>

      <section>
        <KeyPoint
          :tick-size="24"
          class="my-0 my-lg-4"
          point="Over 1000+ Articles"
          tick-color="#6DD0BF"
        />
        <KeyPoint
          :tick-size="24"
          class="my-0 my-lg-4"
          point="Build Your Community Faster"
          tick-color="#6DD0BF"
        />
        <KeyPoint
          :tick-size="24"
          class="my-0"
          point="Great Tip of the Day"
          tick-color="#6DD0BF"
        />
      </section>

      <nuxt-link to="/Authentication/SignInToContinue">
        <RippleButton
          :loading="heroButtonLoading"
          :on-click="changeIt"
          class="my-6"
          class-list="primary-btn"
        >
          Explore Now
        </RippleButton>
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
import KeyPoint from '@/components/global/KeyPoint'
import RippleButton from '@/components/global/RippleButton'

export default {
  name: 'HeroContent',
  components: { RippleButton, KeyPoint },
  data() {
    return {
      heroButtonLoading: false,
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
      font-size: $headline-title-font-size;
      font-weight: 400;
      color: $white;
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
