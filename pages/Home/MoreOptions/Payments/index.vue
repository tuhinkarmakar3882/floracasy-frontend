<template>
  <AppFeel
    class="payments-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="px-6 my-8">
        <h1>This is my Super duper Payments Page</h1>
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
