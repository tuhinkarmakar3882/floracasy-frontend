<template>
  <div class="index-page">
    <HeroContent />

    <CategoriesShowcase />

    <HearTheExperiences />
  </div>
</template>

<script>
import HeroContent from '@/components/global/LandingPage/HeroContent'
import CategoriesShowcase from '@/components/global/LandingPage/CategoriesShowcase'
import HearTheExperiences from '@/components/global/LandingPage/HearTheExperiences'

export default {
  name: 'LandingPage',
  layout: 'PublicRoutes',
  middleware: 'publicRoute',
  components: {
    HeroContent,
    CategoriesShowcase,
    HearTheExperiences,
  },
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
