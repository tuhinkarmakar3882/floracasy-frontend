<template>
  <AppFeel
    class="draft-blog-page"
    :on-back="navigationRoutes.Home.Blogs.Create.index"
  >
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main" class="my-4">This is a Draft View</template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'Drafts',
  components: { AppFeel },
  data() {
    return {
      pageTitle: 'Drafts',
      navigationRoutes,
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
