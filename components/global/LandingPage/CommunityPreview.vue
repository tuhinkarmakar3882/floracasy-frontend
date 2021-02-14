<template>
  <div class="community-preview-component">
    <LazySegmentTitle
      leading-icon="mdi mdi-earth"
      topic="Community"
      title="The more, The merrier"
      leading-paragraph="A platform where people can socialize, share ideas, grow & create impact
      together."
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
