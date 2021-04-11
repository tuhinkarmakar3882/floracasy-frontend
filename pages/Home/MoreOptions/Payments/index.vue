<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.index"
    :prev-url-path="prevURL"
    class="payments-page"
    dynamic-back
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
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
            <ProgressRing
              show-percentage-text
              :percentage="
                balanceInfo.earning > 100 ? 100 : balanceInfo.earning
              "
            />

            <section class="content ml-4">
              <h6 class="my-0">Progress</h6>
              <p class="mt-2 muted">
                Need
                <span class="danger-light"
                  ><strong>${{ 100 - balanceInfo.earning }}</strong></span
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

      <!--      <h4 class="px-4">Now Earn Floracoin & Get Exciting Offers</h4>-->
      <!--      <hr class="faded-divider" />-->
      <!---->
      <!--      <section class="question-answer px-4">-->
      <!--        <h6>What is Floracoin?</h6>-->
      <!--        <p>-->
      <!--          As you all know you can earn money by writing blogs .Here we represent-->
      <!--          your earning &many more statistics against your blogs.-->
      <!--        </p>-->
      <!--      </section>-->
      <!---->
      <!--      <section class="question-answer text-right px-4">-->
      <!--        <h6>Purpose of Floracoins?</h6>-->
      <!--        <p>-->
      <!--          Floracoin Mainly a digital currency for you which is only valid on-->
      <!--          Floracasy . You can use this Coins for going Premium. You can also get-->
      <!--          more interesting stuff access buy spending floracoins.-->
      <!--        </p>-->
      <!--      </section>-->
      <!---->
      <!--      <InFeedAd class="my-4" use-small-ads />-->
      <!---->
      <!--      <section class="question-answer px-4">-->
      <!--        <h4>How To Earn Floracoin?</h4>-->
      <!--        <KeyPoint-->
      <!--          class="my-4"-->
      <!--          :tick-size="20"-->
      <!--          point="When You Share Floracasy & someone join with Your reference You Can Get 50 Floracoin"-->
      <!--          tick-color="#65db65"-->
      <!--        />-->
      <!--        <KeyPoint-->
      <!--          class="my-4"-->
      <!--          :tick-size="20"-->
      <!--          point="On each Blog That Written By You You May Get 15 Floracoin"-->
      <!--          tick-color="#65db65"-->
      <!--        />-->
      <!--        <KeyPoint-->
      <!--          class="my-4"-->
      <!--          :tick-size="20"-->
      <!--          point="When you get your first threshold money you can get 10 Floracoin"-->
      <!--          tick-color="#65db65"-->
      <!--        />-->
      <!--      </section>-->
      <!---->
      <!--      <hr class="faded-divider" />-->
      <!---->
      <!--      <section class="premium-perks px-4">-->
      <!--        <h4>Get Ultimate Exclusive Access</h4>-->

      <!--        <KeyPoint-->
      <!--          class="my-4"-->
      <!--          :tick-size="20"-->
      <!--          point="Get Add Free Experience"-->
      <!--          tick-color="#65db65"-->
      <!--        />-->
      <!--        <KeyPoint-->
      <!--          class="my-4"-->
      <!--          :tick-size="20"-->
      <!--          point="Get Audio blogs"-->
      <!--          tick-color="#65db65"-->
      <!--        />-->
      <!--        <KeyPoint-->
      <!--          class="my-4"-->
      <!--          :tick-size="20"-->
      <!--          point="Ultimate Use Of Our Messaging Services"-->
      <!--          tick-color="#65db65"-->
      <!--        />-->
      <!--        <KeyPoint-->
      <!--          class="my-4"-->
      <!--          :tick-size="20"-->
      <!--          point="Priority 24×7 Contact Support"-->
      <!--          tick-color="#65db65"-->
      <!--        />-->
      <!--        <KeyPoint-->
      <!--          class="my-4"-->
      <!--          :tick-size="20"-->
      <!--          point="Get More User Friendly Interface"-->
      <!--          tick-color="#65db65"-->
      <!--        />-->
      <!--        <KeyPoint-->
      <!--          class="my-4"-->
      <!--          :tick-size="20"-->
      <!--          point="Get Free 50 flora coin for Net Purchase"-->
      <!--          tick-color="#65db65"-->
      <!--        />-->
      <!--      </section>-->
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { usePremiumServices } from '~/environmentVariables'
import endpoints from '~/api/endpoints'
import { getRelativeTime } from '~/utils/utility'

export default {
  name: 'Payments',
  middleware: 'isAuthenticated',

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      usePremiumServices,
      navigationRoutes,
      prevURL: null,
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
    }
  },
  async mounted() {
    await this.fetchCurrentEarnings()
  },

  methods: {
    async fetchCurrentEarnings() {
      try {
        this.balanceInfo = await this.$axios.$get(endpoints.payments.fetch)
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
