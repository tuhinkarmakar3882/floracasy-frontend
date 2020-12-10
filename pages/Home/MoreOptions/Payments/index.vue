<template>
  <AppFeel
    class="payments-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <div>
        <div>
          <div>
            <button class="primary-btn">back</button>
            <h3>Payment</h3>
            <p>profile icon</p>

            <hr />
          </div>

          <div>
            <h2>How much you have earned</h2>
            <p>total earnings in doller</p>
            <strong> $. 100 </strong>

            <p>this section is for graph</p>
          </div>

          <hr />

          <div>
            <h2>Claim your Earned money</h2>
            <p>
              Now you just need to go steps to claim your money. When your
              earning reaches to calimed money($100), your
              <strong> claim button</strong> will be enabled.
            </p>
            <div>
              <p>$ 20 more to claim your money</p>
              <button class="primary-btn">claim</button>
            </div>
          </div>

          <hr />

          <div>
            <h2>just have a look to your earning history : Last 6th month</h2>

            <div>This section is for graph but i can&#39;t make this</div>
          </div>

          <hr />

          <div>
            <p>
              To know your every bolg&#39;s insight view; total view and many
              more exciting than usual. please go &amp; check our premium pack
            </p>

            <img
              src="https://images.unsplash.com/photo-1607448884844-646fe28e07a2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=668&amp;q=80"
              alt="image of premium"
            />

            <button class="primary-btn">go premium</button>
          </div>
        </div>
      </div>
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
  mounted() {},

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
