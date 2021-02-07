<template>
  <div class="index-page">
    <LazyHeroContent class="px-4" />

    <LazyCategoriesShowcase class="px-4" />

    <LazyHearTheExperiences class="px-4" />

    <LazyEarnWithUs class="px-4" />

    <LazyProZone class="px-4" />

    <LazyCommunityShowcase class="px-4" />
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

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
