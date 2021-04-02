<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Blogs.Create.index"
    class="draft-blog-page"
  >
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main" class="my-4">This is a Draft View</template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'Drafts',
  middleware: 'isAuthenticated',
  data() {
    return {
      pageTitle: 'Drafts',
      navigationRoutes,
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
