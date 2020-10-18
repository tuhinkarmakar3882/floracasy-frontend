<template>
  <div class="index-page">
    <div class="text-center">
      <h1>Here is the Style Guide</h1>
      <nuxt-link to="/StyleGuide">
        <RippleButton class-list="primary-btn">
          View the Style Guide
        </RippleButton>
      </nuxt-link>
    </div>

    <HeroContent />

    <CategoriesShowcase />

    <HearTheExperiences />
  </div>
</template>

<script>
import HeroContent from '~/components/LandingPage/HeroContent'
import CategoriesShowcase from '~/components/LandingPage/CategoriesShowcase'
import HearTheExperiences from '~/components/LandingPage/HearTheExperiences'
import RippleButton from '~/components/global/RippleButton'

export default {
  name: 'LandingPage',
  layout: 'PublicRoutes',
  middleware: 'publicRoute',
  components: {
    RippleButton,
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
