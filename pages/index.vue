<template>
  <div class="index-page">
    <a href="/Home/Dashboard">BACK TO Dashboard</a>
    <HeroContent />

    <CategoriesShowcase />

    <HearTheExperiences />
  </div>
</template>

<script>
import HeroContent from '~/components/LandingPage/HeroContent'
import CategoriesShowcase from '~/components/LandingPage/CategoriesShowcase'
import HearTheExperiences from '~/components/LandingPage/HearTheExperiences'

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
    return {}
  },
  methods: {},
}
</script>
