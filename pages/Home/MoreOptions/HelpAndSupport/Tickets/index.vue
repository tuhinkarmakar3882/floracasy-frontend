<template>
  <AppFeel
    class="tickets-index-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }} </template>

    <template v-if="tickets" slot="main">
      <TicketCard
        v-for="(ticket, index) in tickets"
        :key="index"
        class="mx-4 my-6"
        :ticket="ticket"
      />
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import TicketCard from '~/components/global/TicketCard'
import endpoints from '~/api/endpoints'

export default {
  name: 'Tickets',
  components: { TicketCard, AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Tickets',
      tickets: [],
    }
  },

  async mounted() {
    const { results } = await this.$axios.$get(endpoints.help_and_support.fetch)
    this.tickets = results
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
