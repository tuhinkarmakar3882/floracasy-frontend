<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.Tickets.index"
    class="ticket-details-page"
  >
    <template v-slot:app-bar-title>{{ pageTitle }}</template>

    <template v-slot:main>
      <pre>{{ ticketDetails }}</pre>
    </template>

    <template v-slot:footer>
      <LoadingError error-section="Ticket Details" class="px-4" />
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
      ticketDetails: undefined,
      unableToLoadTicketDetails: false,
      ticketFetchEndpoint: endpoints.help_and_support.fetch,
    }
  },
  async mounted() {
    try {
      await this.fetchTicketDetails()
    } catch (e) {
      this.unableToLoadTicketDetails = true
    }
  },

  methods: {
    async fetchTicketDetails() {
      this.ticketDetails = await this.$axios.$get(
        endpoints.help_and_support.detail.replace(
          '{ticketID}',
          this.$route.params.identifier
        )
      )
    },
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
