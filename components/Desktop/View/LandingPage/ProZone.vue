<template>
  <div class="pro-zone-container">
    <LazySegmentTitle
      title="Buy Premium for Unlimited Access"
      leading-icon="mdi mdi-crown"
      topic="Pro Zone"
      :highlight-color="tickColor"
    />

    <section class="mt-4">
      <KeyPoint
        v-for="(point, index) in points"
        :key="index"
        :tick-size="24"
        class="my-2"
        :point="point"
        :tick-color="tickColor"
      />
    </section>

    <button class="my-6 premium-outlined-btn" @click="openSignInPage">
      Buy Premium
    </button>
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
      tickColor: '#FFC34D',
    }
  },
  methods: {
    async openSignInPage() {
      await this.$router.push(navigationRoutes.Authentication.SignInToContinue)
    },
  },
}
</script>
