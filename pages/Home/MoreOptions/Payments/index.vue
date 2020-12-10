<template>
  <AppFeel
    class="payments-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <div class="px-4 my-4">
        <blockquote class="earning-info-card">
          <h4 class="mt-0">How much you have earned</h4>
          <p>total earnings in dollar</p>
          <small class="secondary"> $ 100.0 </small>
          <section class="graph dbx py-4 text-center">
            <p>This section is for Graph</p>
          </section>
        </blockquote>

        <hr />

        <blockquote class="claim-your-money-card">
          <h4 class="mt-0">Claim your Earned money</h4>
          <p>
            Now you just need to go steps to claim your money. When your earning
            reaches to claimed money($100), your
            <strong> claim button</strong> will be enabled.
          </p>
          <p>$ 20 more to claim your money</p>
          <button v-ripple="" class="primary-btn">claim</button>
        </blockquote>

        <hr />

        <blockquote class="general-info-card">
          <h4 class="mt-0">
            Just have a look to your earning history : Last 6th month
          </h4>

          <section class="graph dbx py-4 text-center">
            <p>This section is for graph but i can&#39;t make this</p>
          </section>
        </blockquote>

        <hr />

        <blockquote class="promotion-card">
          <p>
            To know your every bolg&#39;s insight view; total view and many more
            exciting than usual. please go &amp; check our premium pack
          </p>

          <img
            src="https://images.unsplash.com/photo-1607448884844-646fe28e07a2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=668&amp;q=80"
            alt="image of premium"
            class="my-5"
            style="
              height: 350px;
              width: 100%;
              object-fit: cover;
              object-position: center;
            "
          />

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
