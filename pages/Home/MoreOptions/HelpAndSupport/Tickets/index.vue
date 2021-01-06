<template>
  <AppFeel
    class="tickets-index-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title">{{ pageTitle }}</template>

    <template v-if="tickets" slot="main">
      <TicketCard
        v-for="(ticket, index) in tickets"
        :key="index"
        class="mx-4 my-6"
        :ticket="ticket"
      />
    </template>

    <template slot="footer">
      <client-only>
        <infinite-loading @infinite="infiniteHandler">
          <template slot="spinner">
            <LoadingIcon class="mt-4 mb-6" />
            <p class="text-center">Getting Support Tickets...</p>
          </template>
          <template slot="error">
            <p class="danger-light mb-8">Network Error</p>
          </template>
          <template slot="no-more">
            <p class="my-8" />
          </template>
          <template slot="no-results">
            <p class="my-8">🎉 Great! There's no ticket.</p>
          </template>
        </infinite-loading>
      </client-only>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import TicketCard from '@/components/global/TicketCard'
import LoadingIcon from '@/components/global/LoadingIcon'
import endpoints from '@/api/endpoints'
import { processLink } from '~/utils/utility'

export default {
  name: 'Tickets',
  components: { LoadingIcon, TicketCard, AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Ticket Status',
      tickets: [],
      ticketFetchEndpoint: endpoints.help_and_support.fetch,
    }
  },
  mounted() {},

  methods: {
    async infiniteHandler($state) {
      if (!this.ticketFetchEndpoint) {
        $state.complete()
        return
      }
      try {
        const { results, next } = await this.$axios.$get(
          this.ticketFetchEndpoint,
          { params: { category_name: this.category } }
        )
        if (results.length) {
          this.ticketFetchEndpoint = processLink(next)
          this.tickets.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
      }
    },
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
