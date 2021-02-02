<template>
  <div class="index-page">
    <HeroContent class="px-4" />

    <LazyCategoriesShowcase />

    <LazyHearTheExperiences />

    <LazyEarnWithUs />

    <LazyProZone />

    <LazyCommunityShowcase />
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
