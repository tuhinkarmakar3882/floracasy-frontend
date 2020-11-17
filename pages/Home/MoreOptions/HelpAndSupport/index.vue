<template>
  <AppFeel
    class="help-and-support-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="px-6 my-8">
        <h1>This is my Super duper Help and Support Page</h1>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'HelpAndSupport',
  components: { AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Help And Support',
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
