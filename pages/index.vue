<template>
  <div class="index-page">
    <LazyHeroContent class="segment" />

    <LazyCategoriesPreview class="segment" />

    <LazyHearTheExperiences class="segment" />

    <LazyEarnWithUs class="segment" />

    <LazyProZone class="segment" />

    <LazyCommunityPreview class="segment" />
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  layout: 'PublicRoutes',
  middleware: 'isNotAuthenticated',

  data() {
    return {
      pageTitle: 'Welcome to Floracasy',
    }
  },

  mounted() {},

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.segment {
  padding: $large-unit $standard-unit;

  &:nth-child(even) {
    background-color: $segment-background;
  }
}
</style>
