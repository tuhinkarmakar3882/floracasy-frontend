<template>
  <AppFeel class="edit-profile-page" :on-back="navigationRoutes.Home.DashBoard">
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="px-4">
        <h5>This is my super duper comments page & And I Love It!</h5>
        <pre class="my-4"> Requested Blog: {{ $route.params }} </pre>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
// import endpoints from '@/api/endpoints'
import AppFeel from '@/components/Layout/AppFeel'

export default {
  name: 'CommentSection',
  components: { AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Comments',
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
