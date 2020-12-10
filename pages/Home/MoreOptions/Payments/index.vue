<template>
  <AppFeel
    class="payments-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <h4 class="text-center px-4">You've Earned : <span>$27</span></h4>
      <section class="px-4 text-center">
        <label for="redeem-meter">
          You can Redeem it once you reach the threshold
        </label>
        <br />
        <progress id="redeem-meter" class="my-4" value="27" max="100" />
      </section>
      <section class="tips-to-improve px-4 my-6">
        <fieldset class="pl-3 py-4" style="border: 1px solid #333">
          <legend class="px-3">Few Tips to Increase Your Earning:</legend>
          <KeyPoint
            v-for="(point, index) in points"
            :key="index"
            class="py-2"
            tick-color="#6DD0BF"
            :tick-size="24"
            :point="point"
          />
        </fieldset>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import KeyPoint from '@/components/global/KeyPoint'

export default {
  name: 'Payments',
  middleware: 'isAuthenticated',
  components: { KeyPoint, AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Payments',
      points: ['Try Sharing it More', 'Keep Writing Great Content'],
    }
  },
  async mounted() {
    // await this.$firebase.analytics().logEvent('page_view')
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
