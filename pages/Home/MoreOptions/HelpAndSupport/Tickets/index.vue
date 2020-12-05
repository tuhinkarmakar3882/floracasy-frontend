<template>
  <AppFeel
    class="tickets-index-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <CustomListView class="px-4">
        <template slot="list-items">
          <blockquote
            v-for="(ticket, index) in tickets"
            :key="index"
            v-ripple="`${ticket.color}5F`"
            class="px-4 py-3 my-8"
            :style="{ borderLeftColor: ticket.color }"
          >
            <span
              :class="ticket.icon"
              class="icon"
              :style="{ color: ticket.color }"
            />
            <p class="ticket-name">{{ ticket.name }}</p>
            <i class="mdi mdi-chevron-right arrow-go" />
          </blockquote>
        </template>
      </CustomListView>
    </template>
  </AppFeel>
</template>

<style lang="scss" scoped>
@import 'assets/all-variables';

.tickets-index-page {
  blockquote {
    display: grid;
    grid-template-columns: 0.5fr 4fr 0.5fr;
    grid-column-gap: 1rem;
    align-items: center;
    text-align: left;

    span {
      font-size: clamp(1.6rem, 8vw, 2rem);
    }

    p {
      color: lighten($body-text-default, $lighten-percentage);
      font-size: 1rem;
      width: 100%;
    }

    i {
      font-size: clamp(20px, 8vw, 28px);
      color: #3a3a3a;
    }
  }
}
</style>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import CustomListView from '~/components/global/Layout/CustomListView'

export default {
  name: 'Tickets',
  components: { CustomListView, AppFeel },
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
          state: 'RESOLVED',
        },
        {
          icon: 'mdi mdi-information',
          color: '#9c9aff',
          name: 'This Ticket is Raised',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cum, est eum, ex fugit minus nam, neque nobis quam rem sapiente unde voluptatem. Assumenda commodi eius eveniet minus. Quis, tenetur?',
          state: 'RAISED',
        },
        {
          icon: 'mdi mdi-alert',
          color: '#ff8282',
          name: 'This Ticket needs Attention ',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cum, est eum, ex fugit minus nam, neque nobis quam rem sapiente unde voluptatem. Assumenda commodi eius eveniet minus. Quis, tenetur?',
          state: 'NEEDS_ATTENTION',
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
