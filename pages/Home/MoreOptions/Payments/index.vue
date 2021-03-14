<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.index"
    :prev-url-path="prevURL"
    class="payments-page"
    dynamic-back
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="payment-card px-4 py-6">
        <header>
          <section>
            <p>Total Amount Earned</p>
            <small>$60</small>
          </section>
          <button class="disabled-btn" disabled>Redeem</button>
        </header>

        <main>
          <div class="chart" />
        </main>

        <aside class="bottom-part mt-6">
          <ProgressRing :percentage="60" />

          <section class="content ml-4">
            <h6 class="my-0">Progress</h6>
            <p class="mt-2 muted">
              Need <span class="vibrant"><strong>$40</strong></span> more to
              redeem your earning.
            </p>
          </section>
        </aside>
      </section>

      <hr class="faded-divider" />
      <section class="floracoins-promotion px-4">
        <h4>Now Earn Floracoin & Get Exciting Offers</h4>

        <h6>What is Floracoin?</h6>
        <p>
          As you all know you can earn money by writing blogs .Here we represent
          your earning &many more statistics against your blogs.
        </p>

        <h6>Purpose of Floracoins?</h6>
        <p>
          Floracoin Mainly a digital currency for you which is only valid on
          Floracasy . You can use this Coins for going Premium. You can also get
          more interesting stuff access buy spending floracoins.
        </p>

        <h4>How To Earn Floracoin?</h4>
        <KeyPoint
          :tick-size="20"
          point="When You Share Floracasy & someone join with Your reference You Can Get 50 Floracoin"
          tick-color="#9a9a9a"
        />
        <KeyPoint
          :tick-size="20"
          point="On each Blog That Written By You You May Get 15 Floracoin"
          tick-color="#9a9a9a"
        />
        <KeyPoint
          :tick-size="20"
          point="When you get your first threshold money you can get 10 Floracoin"
          tick-color="#9a9a9a"
        />
      </section>

      <hr class="faded-divider" />

      <section class="premium-perks px-4">
        <h4>Get Ultimate Exclusive Access</h4>

        <h6>What is Floracoin?</h6>
        <p>
          As you all know you can earn money by writing blogs .Here we represent
          your earning &many more statistics against your blogs.
        </p>

        <h6>Purpose of Floracoins?</h6>
        <p>
          Floracoin Mainly a digital currency for you which is only valid on
          Floracasy . You can use this Coins for going Premium. You can also get
          more interesting stuff access buy spending floracoins.
        </p>

        <h4>Now Earn Floracoin & Get Exciting Offers</h4>
        <KeyPoint
          :tick-size="20"
          point="When You Share Floracasy & someone join with Your reference You Can Get 50 Floracoin"
          tick-color="#9a9a9a"
        />
        <KeyPoint
          :tick-size="20"
          point="On each Blog That Written By You You May Get 15 Floracoin"
          tick-color="#9a9a9a"
        />
        <KeyPoint
          :tick-size="20"
          point="When you get your first threshold money you can get 10 Floracoin"
          tick-color="#9a9a9a"
        />
      </section>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { usePremiumServices } from '~/environmentVariables'

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
      points: [
        'Get Detailed Insights',
        'Premium Interface',
        'Audible Blogs',
        'Reach More People Faster',
        'Get Messaging Functionality',
        'Avail Faster Customer Support',
        'And Much More!',
      ],
    }
  },
  mounted() {},

  methods: {},

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
    background: $card-background;

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
          color: $vibrant;
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
