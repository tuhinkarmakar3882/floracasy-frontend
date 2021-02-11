<template>
  <div class="earn-with-us-container">
    <LazySegmentTitle
      leading-paragraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own
          custom integrations with our open source developer SDK"
      title="Get Rewarded for Your Knowledge"
      topic="Earning"
    />

    <button class="primary-btn my-6" @click="openSignInPage">
      Start Earning
    </button>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'EarnWithUs',

  data() {
    return {
      navigationRoutes,
    }
  },
  methods: {
    async openSignInPage() {
      await this.$router.push(navigationRoutes.Authentication.SignInToContinue)
    },
  },
}
</script>
