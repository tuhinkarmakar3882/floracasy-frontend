<template>
  <div class="index-page">
    <HeroContent/>

    <CategoriesShowcase/>

    <HearTheExperiences/>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  components: {
    HeroContent: () => import("@/components/LandingPage/HeroContent"),
    CategoriesShowcase: () =>
        import("@/components/LandingPage/CategoriesShowcase"),
    HearTheExperiences: () =>
        import("@/components/LandingPage/HearTheExperiences"),
  },
  middleware: "notAuthenticatedRequest",
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import "assets/variables";
</style>
