<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.Tickets.index"
    class="ticket-details-page"
  >
    <template slot="app-bar-title">{{ pageTitle }}</template>

    <template slot="main">
      <pre>{{ $route.params }}</pre>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'

export default {
  name: 'TicketDetail',
  components: { AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Ticket Detail',
      tickets: [],
      ticketFetchEndpoint: endpoints.help_and_support.fetch,
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
