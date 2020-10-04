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
  middleware: "notAuthenticatedRequest",
  components: {
    HeroContent: () => import("@/components/LandingPage/HeroContent"),
    KeyPoint: () => import("~/components/global/KeyPoint"),
    CategoriesShowcase: () => import("@/components/LandingPage/CategoriesShowcase"),
    HearTheExperiences: () => import("@/components/LandingPage/HearTheExperiences"),
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import "assets/variables";


</style>
