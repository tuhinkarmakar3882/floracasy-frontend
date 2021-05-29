<template>
  <div class="refer-and-earn-page">
    <AppBarHeader
      :fallback-page="fallbackPage"
      :previous-page="previousPage"
      no-right-padding
    >
      <template #title>{{ pageTitle }}</template>
      <template #action-button>
        <i
          v-ripple
          class="mdi mdi-help-circle-outline secondary"
          @click="openFAQ"
        />
      </template>
    </AppBarHeader>

    <!--    <main>-->
    <!--      <p class="text-center my-4">-->
    <!--        Stay Tuned, Because Something Exciting is Coming-->
    <!--      </p>-->
    <!--    </main>-->

    <main>
      <InviteCode />

      <ApplyReferralCode :invite-code="$route.query.inviteCode" />

      <CurrentProgress class="mt-6 mb-2" />

      <ReferralHistory style="margin-top: 2.5rem" />
    </main>
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

  methods: {
    openFAQ() {
      this.$router.push(
        navigationRoutes.Home.MoreOptions.FAQ + '#What is Refer and Earn?'
      )
    },
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

.refer-and-earn-page {
  main {
    max-width: $large-screen;
    margin: auto;
  }
}
</style>
