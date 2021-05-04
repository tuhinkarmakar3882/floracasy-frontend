<template>
  <div class="desktop-landing-page">
    <nav>
      <h1>
        <Logo :width="36" />
        <nuxt-link to="/">Floracasy</nuxt-link>
      </h1>
      <button
        v-ripple
        class="secondary-outlined-btn guest-btn ml-auto"
        @click="continueAsGuest"
      >
        <i class="mdi mdi-account-circle mdi-24px mx-4" />
        <span class="white">Continue as Guest</span>
      </button>
    </nav>

    <main>
      <section>
        <h1 class="mb-8">Where Knowledge gets Socialized</h1>
        <section class="key-points mb-8">
          <KeyPoint
            v-for="(point, index) in points"
            :key="index"
            :point="point"
            class="my-4"
            text-color="#ccc"
            tick-color="#8FF2E1"
            :tick-size="20"
          />
        </section>

        <GoogleSignInButton class="secondary-btn" />
      </section>
    </main>

    <footer>Get Started</footer>

    <aside class="overlay-gradient" />
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { LogAnalyticsEvent } from '~/utils/utility'
import KeyPoint from '~/components/Common/Tools/KeyPoint'
import Logo from '~/components/Common/Tools/Logo'

export default {
  name: 'LandingPage',
  components: { Logo, KeyPoint },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Welcome to Floracasy',
      points: [
        'Explore enriching articles',
        'Discover people around the world',
        'Get paid for your knowledge',
        'Go Premium with Floracoins',
        'And much more!',
      ],
    }
  },
  methods: {
    async continueAsGuest() {
      LogAnalyticsEvent('anonymous_login')
      await this.$router.push(navigationRoutes.Home.DashBoard)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.desktop-landing-page {
  position: relative;
  height: 100vh;
  width: 100%;
  background: url('/images/LandingDesktopBG.jpg') no-repeat center;
  background-size: cover;

  button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 270px;
    height: 48px;

    span {
      justify-self: flex-start;
    }
  }

  nav {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    padding: $standard-unit (2 * $xxx-large-unit);
    display: flex;
    align-items: center;
    z-index: 1;

    h1 {
      display: flex;
      align-items: center;
      font-size: $large-unit;
      margin: 0;
      padding: 0;

      a {
        color: $white;
        text-decoration: none;
        font-size: $large-unit;
        display: block;
        margin-left: $milli-unit;
      }
    }
  }

  main {
    z-index: 1;
    display: grid;
    height: 100vh;
    width: 100vh;
    padding: 2 * $xxx-large-unit;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    * {
      z-index: 1;
    }

    section {
      h1 {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          height: 6px;
          width: 100px;
          background: $secondary-vibrant;
          top: -$large-unit;
          left: 0;
        }
      }
    }

    button {
      width: 290px;
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    right: 5%;
    font-size: clamp(52px, 10vw, 150px);
    z-index: 1;
    color: $card-bg;
  }

  aside.overlay-gradient {
    z-index: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      111.48deg,
      #000814 0%,
      rgba(14, 0, 21, 0.55) 52.33%,
      #00001b 99.48%
    );
  }
}
</style>
