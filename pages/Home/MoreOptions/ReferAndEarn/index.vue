<template>
  <div class="refer-and-earn-page">
    <AppBarHeader
      :fallback-page="fallbackPage"
      :previous-page="previousPage"
      no-right-padding
    >
      <template #title>{{ pageTitle }}</template>
      <template #action-button>
        <i v-ripple class="mdi mdi-help-circle-outline secondary" />
      </template>
    </AppBarHeader>

    <main>
      <InviteCode />

      <ApplyReferralCode />

      <CurrentProgress class="mt-6 mb-2" />

      <ReferralHistory style="margin-top: 2.5rem" />
    </main>

    <aside class="px-4">
      <div>
        <section>
          <h2>What is Refer and Earn?</h2>
          <p>
            It is an opportunity where you can earn Flora coins to unlock some
            premium features in the platform such as messaging, audio blogs,
            etc.
          </p>
        </section>
        <section>
          <h2>What is Flora coins?</h2>
          <p>
            It is a virtual currency that can be used within the platform to
            unlock premium features
          </p>
        </section>
        <section>
          <h2>Can I use multiple referral code?</h2>
          <p>
            No, every user gets one referal code and can redeem it by sharing
            and inviting others to the platform
          </p>
        </section>
        <section>
          <h2>Can I use Flora coins to redeem real money?</h2>
          <p>No, you can use it to unlock premium features in the platform.</p>
        </section>
        <section>
          <h2>How many users can I invite with the referal code?</h2>
          <p>As much as you want there is no limit.</p>
        </section>
      </div>
    </aside>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import InviteCode from '~/components/Mobile/View/Referral/InviteCode'
import ApplyReferralCode from '~/components/Mobile/View/Referral/ApplyReferralCode'
import ReferralHistory from '~/components/Mobile/View/Referral/ReferralHistory'
import CurrentProgress from '~/components/Mobile/View/Referral/CurrentProgress'

export default {
  name: 'ReferAndEarn',
  components: {
    CurrentProgress,
    ReferralHistory,
    ApplyReferralCode,
    InviteCode,
    AppBarHeader,
  },
  middleware: 'isAuthenticated',

  asyncData({ from: previousPage }) {
    return { previousPage }
  },

  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.MoreOptions.index,
      navigationRoutes,
      pageTitle: 'Refer & Earn',
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
@import 'assets/all-variables';

.refer-and-earn-page {
  main {
    max-width: $large-screen;
    margin: auto;
  }
}
</style>
