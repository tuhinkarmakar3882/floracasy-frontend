<template>
  <AppFeel
    class="payments-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="px-6 my-8">
        <h3>Your total earning</h3>

        <h5>$0.00</h5>

        <ul>
          <li>You can earn unlimited money per month</li>

          <li>
            You can claim your money only when you have already earned $ 100
          </li>

          <li>
            If you have done any kind of bad thing which is against of our
            rule(like opened floracasy repeatedly by a single user, use any
            network bouncing app etc. for more details you can check out our
            earning policy page) ,we will cut money from your earnings .
          </li>
        </ul>

        <h4>
          This section will be replaced by graph. ami onk kuja6i but ki6u bujta
          prini kisb code 6ilo.
        </h4>

        <h3>Your blogs total reach</h3>
        <h3>300</h3>

        <h3>Your profiles total engagement</h3>

        <h3>4k</h3>

        <h6>To show all blogs insight view tap the below button</h6>

        <button>Insight View</button>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'Payments',
  middleware: 'isAuthenticated',
  components: { AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Payments',
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
