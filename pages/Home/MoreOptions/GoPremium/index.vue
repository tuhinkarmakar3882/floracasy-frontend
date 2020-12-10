<template>
  <AppFeel
    class="go-premium-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main" class="my-4">
      <section class="px-4">
        <div class="">
          <h4 class="heading-title">The Premium Perks!</h4>
          <p class="text-center pt-5">
            Lorem ipsum dolor sit amet, The Pro Zone
          </p>
          <ul>
            <li v-for="(point, index) in points" :key="index">
              <KeyPoint tick-color="#d8ff00" :tick-size="24" :point="point" />
            </li>
          </ul>
          <div class="text-center my-4">
            <button v-ripple="" class="premium-btn">Buy Premium</button>
          </div>
        </div>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import KeyPoint from '@/components/global/KeyPoint'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'GoPremium',
  middleware: 'isAuthenticated',
  components: { KeyPoint, AppFeel },
  data() {
    return {
      pageTitle: 'Go Premium',
      points: [
        'Get Detailed Insights',
        'Premium Interface',
        'Audible Blogs',
        'Reach More People Faster',
        'Get Messaging Functionality',
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
  main {
    button {
      min-width: auto;
    }

    ul {
      list-style: none;
    }
  }
}
</style>
