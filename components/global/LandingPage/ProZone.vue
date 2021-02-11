<template>
  <div class="pro-zone-container">
    <LazySegmentTitle
      title="Buy Premium for Unlimited Access"
      topic="Pro Zone"
    />

    <section class="mt-4">
      <KeyPoint
        v-for="(point, index) in points"
        :key="index"
        :tick-size="24"
        class="my-0 my-lg-4"
        :point="point"
        tick-color="#6DD0BF"
      />
    </section>

    <button class="my-6" @click="openSignInPage">Explore Now</button>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'ProZone',
  data() {
    return {
      navigationRoutes,
      points: [
        'No Advertisement',
        'Read as much as you like',
        'Greater Community Reach',
        'Advanced Metrics',
        'Avail Member Only Perks',
        'Free Content Booster',
        'Direct Messaging',
        '24x7 Priority Support',
      ],
    }
  },
  methods: {
    async openSignInPage() {
      await this.$router.push(navigationRoutes.Authentication.SignInToContinue)
    },
  },
}
</script>
