<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.Tickets.index"
    class="ticket-details-page"
  >
    <template v-slot:app-bar-title>{{ pageTitle }}</template>

    <template v-slot:main>
      <main v-if="ticketDetails" class="main-body">
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

        <section class="px-4">
          <h6 class="my-8">Ticket Topic</h6>
          <p class="description-box">{{ ticketDetails.issueTopic }}</p>
        </section>

        <hr class="reversed-faded-divider my-6" />

        <section class="px-4">
          <h6 class="mb-8">Ticket Details</h6>
          <p class="description-box">{{ ticketDetails.issueDetails }}</p>
        </section>

        <hr class="faded-divider my-6" />

        <h6 class="mb-8 mx-4">Conversation</h6>

        <section class="conversation-container description-box">
          <aside v-if="conversationHistory">
            <MessageItem
              v-for="message in conversationHistory"
              :key="message.identifier"
              :chat-message="message"
              class="my-4"
              :message-type="message.messageType"
            />
          </aside>

          <client-only>
            <infinite-loading @infinite="infiniteHandler">
              <template slot="spinner">
                <LoadingIcon class="mt-4 mb-6" />
                <p class="text-center">Loading More Conversation...</p>
              </template>
              <template slot="error">
                <p class="danger-light my-6">Network Error</p>
              </template>
              <template slot="no-more">
                <p class="success my-6" />
              </template>
              <template slot="no-results"> No message</template>
            </infinite-loading>
          </client-only>
        </section>
      </main>
    </template>

    <template v-slot:footer>
      <LoadingError
        v-if="unableToLoadTicketDetails"
        class="px-4"
        error-section="Ticket Details"
      />
      <aside class="bottom-area">
        <img
          v-if="user"
          :src="user.photoURL"
          alt="profile-image"
          height="40"
          width="40"
        />
        <div
          ref="textBox"
          class="text-box"
          contenteditable
          @focusin="showPlaceholder = false"
          @focusout="showPlaceholder = true"
        >
          <transition name="scale-up">
            <label
              v-if="commentMessage.length === 0 && showPlaceholder"
              class="muted"
            >
              Type your comment here...
            </label>
          </transition>
        </div>
        <RippleButton
          :disabled="!canSendComment"
          :loading="isSendingComment"
          style="background: transparent !important"
        >
          <span class="mdi mdi-send mdi-36px" />
        </RippleButton>
      </aside>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'
import { mapGetters } from 'vuex'
import { processLink } from '~/utils/utility'

export default {
  name: 'TicketDetail',
  components: { AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Ticket Detail',
      ticketDetails: undefined,
      conversationHistory: [],
      unableToLoadTicketDetails: false,

      ticketFetchEndpoint: endpoints.help_and_support.fetch,
      conversationFetchEndpoint: endpoints.help_and_support.conversation.detail,

      commentMessage: '',
      isSendingComment: false,
      canSendComment: false,
      showPlaceholder: true,
    }
  },
  computed: {
    createdAt() {
      const date = new Date(this.ticketDetails.createdAt)
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    },
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
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

    async infiniteHandler($state) {
      if (!this.conversationFetchEndpoint) {
        $state.complete()
        return
      }

      try {
        const { results, next } = await this.$axios.$get(
          this.conversationFetchEndpoint,
          {
            params: {
              ticketID: this.$route.params.identifier,
            },
          }
        )
        console.log(results)
        if (results.length) {
          this.conversationFetchEndpoint = processLink(next)
          this.conversationHistory.push(...results)
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

<style lang="scss" scoped>
@import 'assets/all-variables';

.ticket-details-page {
  max-width: $large;
  margin: auto;
  .main-body {
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
        height: $double-unit;
        width: 2 * $xxx-large-unit;
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

    .conversation-container {
      padding-bottom: 6rem;
    }
  }

  .bottom-area {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: $large;
    max-height: 3.5 * $xx-large-unit;
    padding: $micro-unit $nano-unit;
    display: flex;
    align-items: center;
    background-color: $nav-bar-bg;
    box-shadow: $up-only-box-shadow;

    $image-size: 2 * $medium-unit;

    img {
      min-width: $image-size;
      width: $image-size;
      min-height: $image-size;
      height: $image-size;
      object-position: center;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
      aspect-ratio: 1;
    }

    .text-box {
      border: 1px solid #4a4a4a;
      background-color: $segment-background;
      width: 100%;
      word-break: break-all;
      margin: 0 $micro-unit;
      min-height: 2 * $x-large-unit;
      max-height: 3 * $xx-large-unit;
      padding: $micro-unit $milli-unit;
      border-radius: $micro-unit;
      overflow: scroll;
      outline: 0 none;
      display: flex;
      align-items: center;

      &:focus(:placeholder-shown) {
        color: $secondary-matte;
        border: 1px solid $secondary-matte;
      }
    }

    button {
      align-self: stretch;
      padding: 0;
      color: $secondary-matte;
      width: 64px;
      min-width: auto;
      min-height: 2 * $x-large-unit;
      height: auto;
    }
  }
}
</style>
