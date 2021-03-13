<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.index"
    :prev-url-path="prevURL"
    class="payments-page"
    dynamic-back
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="payment-card px-4">
        <header>
          <p>$60</p>
          <p>Total Amount Earned</p>
        </header>

        <main>
          <div class="chart" />
        </main>

        <aside class="bottom-part">
          <section class="progress-ring" />

          <section class="content">
            <h6>Progress</h6>
            <p>
              Need <span class="vibrant">$40</span> more to redeem your earning.
            </p>
          </section>
          <button class="disabled-btn" disabled>Redeem</button>
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
          point="When You Share Floracasy & someone join with Your reference You Can Get 50 Floracoin"
          tick-color="#9a9a9a"
          :tick-size="20"
        />
        <KeyPoint
          point="On each Blog That Written By You You May Get 15 Floracoin"
          tick-color="#9a9a9a"
          :tick-size="20"
        />
        <KeyPoint
          point="When you get your first threshold money you can get 10 Floracoin"
          tick-color="#9a9a9a"
          :tick-size="20"
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
          point="When You Share Floracasy & someone join with Your reference You Can Get 50 Floracoin"
          tick-color="#9a9a9a"
          :tick-size="20"
        />
        <KeyPoint
          point="On each Blog That Written By You You May Get 15 Floracoin"
          tick-color="#9a9a9a"
          :tick-size="20"
        />
        <KeyPoint
          point="When you get your first threshold money you can get 10 Floracoin"
          tick-color="#9a9a9a"
          :tick-size="20"
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
