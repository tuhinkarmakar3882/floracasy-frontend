<template>
  <AppFeel
    class="payments-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <div class="px-4 my-4">
        <blockquote class="earning-info-card">
          <section>
            <h6 class="mt-0">At a glance</h6>
            <p>
              You&rsquo;ve earned <br />
              <span class="amount">$ 100.0</span>
            </p>
          </section>
          <aside class="graph ml-4 text-center">
            <small>This will eventually be replaced by charts</small>
          </aside>
        </blockquote>

        <blockquote class="claim-your-money-card">
          <h6 class="mt-0">Claim your Earned money</h6>
          <p>
            Now you just need to go steps to claim your money. When your earning
            reaches to claimed money($100), your
            <strong> claim button</strong> will be enabled.
          </p>
          <p>$ 20 more to claim your money</p>
          <button v-ripple="" class="primary-btn">claim</button>
        </blockquote>

        <blockquote class="general-info-card">
          <h6 class="mt-0">
            Just have a look to your earning history : Last 6th month
          </h6>

          <section class="graph dbx py-4 text-center">
            <p>This section is for graph but i can&#39;t make this</p>
          </section>
        </blockquote>

        <blockquote class="promotion-card">
          <p>
            To know your every bolg&#39;s insight view; total view and many more
            exciting than usual. please go &amp; check our premium pack
          </p>
          <div style="height: 250px; width: 100%; background: #444" />
          <button v-ripple="" class="primary-btn">go premium</button>
        </blockquote>
      </div>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'Payments',
  middleware: 'isAuthenticated',
  components: { AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Payments',
      points: ['Try Sharing it More', 'Keep Writing Great Content'],
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

.earning-info-card {
  display: flex;
  justify-content: space-between;
  border-left-color: #56bd40;

  section {
    width: clamp(120px, 70vw, 220px);
    align-self: stretch;

    .amount {
      color: darken($success-light, $lighten-percentage);
      font-family: $Nunito-Sans;
      font-size: $large-unit;
      font-weight: 500;
      filter: drop-shadow($right-only-box-shadow);
    }
  }

  aside {
    align-self: stretch;
    width: 100%;
    border-left: 1px solid greenyellow;
    border-bottom: 1px solid greenyellow;
  }
}
</style>
