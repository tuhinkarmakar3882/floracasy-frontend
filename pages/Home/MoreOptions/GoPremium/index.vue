<template>
  <AppFeel
    class="go-premium-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
    custom-header
  >
    <template slot="app-bar-custom-header">
      <h5
        v-ripple
        class="px-5 mdi mdi-arrow-left"
        style="height: 56px; display: flex; align-items: center"
        @click="
          prevURL
            ? $router.back()
            : $router.replace(navigationRoutes.Home.MoreOptions.index)
        "
      />
      <p>{{ pageTitle }}</p>
    </template>

    <template slot="main" class="my-4">
      <section class="main-content px-4">
        <PremiumCrownLogo :width="120" class="mx-auto" />
        <h4 class="heading-title">The Premium Perks!</h4>
        <p>
          Loved using Floracasy? You can now get even more curated set of
          features with Floracasy Premium.
        </p>

        <h6>Features at a Glance:</h6>
        <ul>
          <li v-for="(point, index) in points" :key="index">
            <KeyPoint tick-color="#EFB33D" :tick-size="24" :point="point" />
          </li>
        </ul>

        <div class="text-center my-4">
          <button v-ripple="" class="premium-btn">Continue to Buy</button>
        </div>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import KeyPoint from '@/components/global/KeyPoint'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import PremiumCrownLogo from '~/components/global/Icons/PremiumCrownLogo'

export default {
  name: 'GoPremium',
  middleware: 'isAuthenticated',
  components: { PremiumCrownLogo, KeyPoint, AppFeel },

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      pageTitle: 'Go Premium',
      points: [
        'Premium Interface',
        'Customized Notification',
        'Reach More People Faster',
        'Get Messaging Functionality',
        'Audible Blogs',
        'Post Stories',
        'Get Detailed Insights',
        'Avail Faster Customer Support',
        'And Much More!',
      ],
      navigationRoutes,
    }
  },
  mounted() {},

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
.go-premium-page {
  .main-content {
    .heading-title {
      margin-top: 8px;
    }

    button {
      min-width: auto;
    }

    ul {
      list-style: none;
    }
  }
}
</style>
