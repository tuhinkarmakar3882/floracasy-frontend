<template>
  <div class="earn-with-us-container text-center">
    <LazySegmentTitle
      leading-paragraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own
          custom integrations with our open source developer SDK"
      title="Earn with Us"
      topic="Earning"
    />

    <nuxt-link
      :to="navigationRoutes.Authentication.SignInToContinue"
      class="my-6"
    >
      Start Earning
    </nuxt-link>
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
  methods: {},
}
</script>
