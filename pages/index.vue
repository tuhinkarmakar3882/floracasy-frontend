<template>
  <div class="index-page">
    <main>
      <LazyHeroContent class="segment" />

      <LazyPromotionalBlogs />

      <LazyCategoriesPreview class="segment" />

      <LazyCommunityPreview class="segment text-center" />

      <LazyEarnWithUs class="segment" />

      <LazyHearTheExperiences class="segment" />

      <LazyProZone v-if="FeatureTogglePremiumService" class="segment" />
    </main>
  </div>
</template>

<script>
import { FeatureTogglePremiumService } from '~/environmentalVariables'

export default {
  name: 'LandingPage',
  layout: 'PublicRoutes',
  middleware: 'isNotAuthenticated',

  data() {
    return {
      pageTitle: 'Welcome to Floracasy',
      FeatureTogglePremiumService,
    }
  },

  mounted() {},

  methods: {},

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.index-page {
  * {
    transition: all 300ms ease-in-out;
  }

  main {
    .segment {
      position: relative;
      padding: $xx-large-unit $standard-unit;

      &:nth-child(odd):not(:first-child) {
        background-color: $segment-background;
      }
    }
  }
}
</style>
