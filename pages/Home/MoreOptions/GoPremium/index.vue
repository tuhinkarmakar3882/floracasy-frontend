<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.index"
    class="go-premium-page"
    custom-header
  >
    <template v-slot:app-bar-custom-header>
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

    <template v-slot:main class="my-4">
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
            <KeyPoint :point="point" :tick-size="24" tick-color="#EFB33D" />
          </li>
        </ul>

        <div class="text-center my-4">
          <button v-ripple class="premium-btn">Continue to Buy</button>
        </div>
      </section>
    </template>

    <template v-slot:footer>
      <InFeedAd use-small-ads />
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import KeyPoint from '@/components/global/KeyPoint'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import PremiumCrownLogo from '~/components/global/Icons/PremiumCrownLogo'
import { usePremiumServices } from '~/environmentVariables'

export default {
  name: 'GoPremium',
  middleware: usePremiumServices ? 'isAuthenticated' : 'hidden',
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
