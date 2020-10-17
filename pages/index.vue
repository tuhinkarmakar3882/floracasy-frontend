<template>
  <div class="index-page">
    <h1>Here is the Style Guide</h1>
    <nuxt-link to="/StyleGuide">
      <button class="primary-btn">View the Style Guide</button>
    </nuxt-link>

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
