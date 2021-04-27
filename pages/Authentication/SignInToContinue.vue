<template>
  <div class="get-started-authentication-page">
    <a
      aria-label="Close Popup"
      title="Close Popup"
      @click="$router.push(navigationRoutes.Home.DashBoard)"
    >
      <i class="mdi mdi-close" />
    </a>

    <h4 class="mt-6 mb-0">Let's Get Started!</h4>

    <p class="my-4">It's Secure, Faster, Better!</p>

    <section class="my-2">
      <KeyPoint
        class="keypoint"
        text-color="white"
        point="Unlimited Articles"
        tick-color="#9c9aff"
        :tick-size="20"
      />
      <KeyPoint
        class="keypoint"
        text-color="white"
        point="Discover People"
        tick-color="#9c9aff"
        :tick-size="20"
      />
      <KeyPoint
        class="keypoint"
        text-color="white"
        point="And a Lot More!"
        tick-color="#9c9aff"
        :tick-size="20"
      />
    </section>

    <GoogleSignInButton class="vibrant-outlined-btn" />
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import 'firebase/auth'

export default {
  name: 'SignInToContinue',
  layout: 'Authentication',
  middleware: 'isNotAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Sign In To Continue',
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.get-started-authentication-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: clamp(300px, 90vw, 500px);
  background: darken($card-bg, 5%);
  border-radius: 10px;
  padding: 2rem 1.5rem;
  box-shadow: 0 0 4px lighten($card-bg, 50%);

  * {
    text-align: center;
  }

  a {
    position: absolute;
    top: $standard-unit;
    right: $large-unit;
    font-size: 1.5rem;
    text-decoration: none !important;
    z-index: 1;
  }

  section {
    .keypoint {
      margin: $micro-unit 0;
    }
  }

  button {
    width: 290px;
  }
}
</style>
