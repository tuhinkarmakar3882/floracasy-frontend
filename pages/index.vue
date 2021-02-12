<template>
  <div class="index-page">
    <main>
      <LazyHeroContent class="segment" />

      <LazyCategoriesPreview class="segment" />

      <LazyCommunityPreview class="segment" />

      <LazyEarnWithUs class="segment" />

      <LazyHearTheExperiences class="segment" />

      <LazyProZone class="segment" />
    </main>
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
  main {
    .segment {
      padding: $xx-large-unit $standard-unit;

      &:nth-child(even) {
        background-color: $segment-background;
      }
    }
  }
}
</style>
