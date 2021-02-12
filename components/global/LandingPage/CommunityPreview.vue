<template>
  <div class="community-preview-component">
    <LazySegmentTitle
      leading-paragraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own
          custom integrations with our open source developer SDK"
      title="The more, The merrier"
      topic="Community"
      leading-icon="mdi mdi-earth"
    />

    <button class="secondary-btn my-6" @click="openSignInPage">
      Connect Easily
    </button>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'CommunityPreview',
  methods: {
    async openSignInPage() {
      await this.$router.push(navigationRoutes.Authentication.SignInToContinue)
    },
  },
}
</script>
