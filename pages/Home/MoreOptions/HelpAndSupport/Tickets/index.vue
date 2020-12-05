<template>
  <AppFeel
    class="tickets-index-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <TicketCard
        v-for="(ticket, index) in tickets"
        :key="index"
        class="mx-4"
        :ticket="ticket"
      />
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import TicketCard from '~/components/global/TicketCard'

export default {
  name: 'Tickets',
  components: { TicketCard, AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Tickets',
      tickets: [
        {
          icon: 'mdi mdi-check-circle',
          color: '#65db65',
          name: 'This Ticket is Resolved',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cum, est eum, ex fugit minus nam, neque nobis quam rem sapiente unde voluptatem. Assumenda commodi eius eveniet minus. Quis, tenetur?',
          status: 'RESOLVED',
        },
        {
          icon: 'mdi mdi-information',
          color: '#9c9aff',
          name: 'This Ticket is Raised',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cum, est eum, ex fugit minus nam, neque nobis quam rem sapiente unde voluptatem. Assumenda commodi eius eveniet minus. Quis, tenetur?',
          status: 'RAISED',
        },
        {
          icon: 'mdi mdi-alert',
          color: '#ff8282',
          name: 'This Ticket needs Attention ',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cum, est eum, ex fugit minus nam, neque nobis quam rem sapiente unde voluptatem. Assumenda commodi eius eveniet minus. Quis, tenetur?',
          status: 'NEEDS ATTENTION',
        },
      ],
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
