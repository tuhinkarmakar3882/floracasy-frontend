<template>
  <AppFeel
    class="payments-page"
    :on-back="navigationRoutes.Home.MoreOptions.Payments.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="px-6 my-8">
        <h4>This is a super duper blog title</h4>
        <h6>12th October 2020, 03:25 a.m.</h6>

        <img
          src="https://images.unsplash.com/photo-1605719882474-71f5ebe2ad55?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=700&amp;q=80"
          width="350"
          height="200"
          alt="blog pictures"
        />

        <ul>
          <li><span class="mdi mdi-remove-red-eye" />4M</li>
          <li><span class="mdi mdi-mode-comment" /> 400</li>
          <li><span class="mdi mdi-favourite" /> 600</li>
          <li><span class="mdi mdi-monetization-on" /> 40k</li>
        </ul>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '~/components/Layout/AppFeel'
import { navigationRoutes } from '~/navigation/navigationRoutes'
export default {
  name: 'InsightView',
  middleware: 'isAuthenticated',
  components: { AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Insight View',
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
