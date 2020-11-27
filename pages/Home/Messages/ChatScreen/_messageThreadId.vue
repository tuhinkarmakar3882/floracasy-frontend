<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Messages.index"
    class="chat-screen--page mb-6"
  >
    <template slot="main">
      <section class="message-thread-list">
        <pre>You're Viewing: {{ $route.params.messageThreadId }}</pre>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import { parseTimeUsingMoment } from '@/utils/utility'
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'MessageThreadId',
  components: { AppFeel },
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Chat Screen',
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: -1 })
  },

  methods: {
    parseTimeUsingMoment,
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
