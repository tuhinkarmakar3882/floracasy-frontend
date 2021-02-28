<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.Tickets.index"
    class="ticket-details-page"
  >
    <template v-slot:app-bar-title>{{ pageTitle }}</template>

    <template v-slot:main>
      <main v-if="ticketDetails" class="pb-4 main-body">
        <section class="info-card py-6 px-4 active-background">
          <aside class="top-section mb-4">
            <p class="secondary-highlight">
              Ticket Status:
              <br />
              <small :style="{ color: ticketDetails.color }">
                {{ ticketDetails.status }}
              </small>
            </p>
            <p class="secondary-highlight">
              Raised Date:
              <br />
              <small class="muted">{{ createdAt }}</small>
            </p>
          </aside>

          <p class="secondary-highlight text-center">
            Ticket ID:
            <br />
            <small class="muted">{{ ticketDetails.identifier }}</small>
          </p>
        </section>

        <section class="details px-4">
          <h6 class="my-8">Ticket Topic</h6>
          <p class="description-box">{{ ticketDetails.issueTopic }}</p>

          <h6 class="my-8">Ticket Details</h6>
          <p class="description-box">{{ ticketDetails.issueDetails }}</p>

          <h6 class="my-8">Conversation</h6>
          <p class="description-box">Preview Will Come</p>
        </section>
      </main>
    </template>

    <template v-slot:footer>
      <LoadingError
        v-if="unableToLoadTicketDetails"
        class="px-4"
        error-section="Ticket Details"
      />
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
  computed: {
    createdAt() {
      const date = new Date(this.ticketDetails.createdAt)
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    },
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

<style lang="scss" scoped>
@import 'assets/all-variables';

.ticket-details-page {
  main.main-body {
    max-width: $large;
    margin: auto;

    .info-card {
      background: #1a1a1a;

      .top-section {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
    }

    h6 {
      position: relative;
      font-weight: 400;

      &::after {
        content: '';
        position: absolute;
        height: $single-unit;
        width: 84px;
        bottom: (-$milli-unit);
        left: 0;
        background: lighten($primary, $lighten-percentage);
      }
    }

    .description-box {
      background: $segment-background;
      padding: $standard-unit;
    }

    .shaped {
      border-radius: $nano-unit 0;
    }
  }
}
</style>
