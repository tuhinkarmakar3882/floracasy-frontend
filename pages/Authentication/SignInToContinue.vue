<template>
  <div class="get-started-authentication-page">
    <a aria-label="Close Popup" title="Close Popup" @click="$router.back()">
      <i class="mdi mdi-close" />
    </a>

    <h3 class="my-4">Let's Get Started</h3>

    <p class="my-4">It's Secure, Faster, Better</p>

    <GoogleSignInButton class="secondary-outlined-btn" />
  </div>
</template>

<script>
import 'firebase/auth'

export default {
  name: 'SignInToContinue',
  layout: 'Authentication',
  middleware: 'isNotAuthenticated',

  data() {
    return {
      pageTitle: 'Sign In To Continue',
      showLoaderAnimation: false,
      stateInformation: 'Checking...',
      signupOptions: [
        {
          id: 0,
          provider: 'Google',
          icon: 'mdi mdi-google',
        },
      ],
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

  a {
    position: absolute;
    top: $standard-unit;
    right: $large-unit;
    font-size: 1.5rem;
    text-decoration: none !important;
    z-index: 1;
  }

  button {
    width: 290px;
  }
}
</style>
