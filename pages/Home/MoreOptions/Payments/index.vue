<template>
  <div class="payments-page">
    <AppBarHeader :fallback-page="fallbackPage" :previous-page="previousPage">
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <main>
      <div class="payment-card px-4 py-6">
        <FallBackLoader v-if="loading">
          <template #fallback>
            <p class="text-center">Fetching Latest Earnings from server</p>
          </template>
        </FallBackLoader>

        <LoadingError
          v-else-if="loadingError"
          error-section="Current Earnings"
        />

        <section v-else>
          <header>
            <section>
              <p>Total Amount Earned</p>
              <small>
                <strong>${{ balanceInfo.earning }}</strong>
              </small>
            </section>
            <button class="disabled-btn" disabled>Redeem</button>
          </header>

          <main>
            <div class="chart" />
          </main>

          <aside class="bottom-part mt-6">
            <ProgressRing :percentage="percentage" show-percentage-text />

            <section class="content ml-4">
              <h6 class="my-0">Progress</h6>
              <p class="mt-2 muted">
                Need
                <span class="danger-light"
                  ><strong>${{ amountLeft }}</strong></span
                >
                more to redeem your earning.
              </p>
            </section>
          </aside>
          <p class="text-center mt-6 primary-light">
            <small> - Updated Yesterday - </small>
          </p>
        </section>
      </div>

      <h4 class="heading-title my-6 px-4">Tips to Improve Your Earnings</h4>

      <section class="py-4 px-4">
        <LazyKeyPoint
          v-for="(point, index) in tipsToImprove"
          :key="index"
          :point="point"
          :tick-size="20"
          class="my-4"
          tick-color="#6DD0BF"
        />
      </section>
    </main>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { usePremiumServices } from '~/environmentVariables'
import endpoints from '~/api/endpoints'
import { getRelativeTime } from '~/utils/utility'
import ProgressRing from '~/components/Common/Tools/ProgressRing'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import FallBackLoader from '~/components/Common/Tools/FallBackLoader'
import LoadingError from '~/components/Common/Tools/LoadingError'

export default {
  name: 'Payments',
  components: { LoadingError, FallBackLoader, AppBarHeader, ProgressRing },
  middleware: 'isAuthenticated',

  asyncData({ from: previousPage }) {
    return { previousPage }
  },

  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.MoreOptions.index,
      usePremiumServices,
      navigationRoutes,
      pageTitle: 'Payments',
      tipsToImprove: [
        'Try to be a Consistent Blog Writer on the Platform',
        'Great content, keeps your readers engaged',
        'Try engaging with your community via our Social Section',
        'Remember, Consistency is the key to be Successful',
      ],
      points: [
        'Get Detailed Insights',
        'Premium Interface',
        'Audible Blogs',
        'Reach More People Faster',
        'Get Messaging Functionality',
        'Avail Faster Customer Support',
        'And Much More!',
      ],
      loading: true,
      loadingError: false,
      balanceInfo: undefined,
      percentage: 0,
      requiredToClaim: 50,
    }
  },
  computed: {
    amountLeft() {
      const remaining = this.requiredToClaim - (this.balanceInfo?.earning || 0)
      return remaining > 0 ? remaining : 0
    },
  },

  async mounted() {
    await this.fetchCurrentEarnings()
  },

  methods: {
    async fetchCurrentEarnings() {
      try {
        this.balanceInfo = await this.$axios.$get(endpoints.payments.fetch)
        const currentEarning = this.balanceInfo.earning
        const percentage = Math.floor(
          (currentEarning / this.requiredToClaim) * 100
        )
        this.percentage = percentage > 100 ? 100 : percentage
      } catch (e) {
        this.loadingError = true
      } finally {
        this.loading = false
      }
    },
    getRelativeTime,
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.payments-page {
  .payment-card {
    background: $card-bg;

    * {
      font-family: $Nunito-Sans;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      section {
        small {
          font-size: $medium-unit;
          color: $secondary-vibrant;
        }

        p {
          font-family: $Raleway;
          color: $muted;
        }
      }
    }

    .bottom-part {
      display: flex;
      align-items: center;
    }
  }
}
</style>
