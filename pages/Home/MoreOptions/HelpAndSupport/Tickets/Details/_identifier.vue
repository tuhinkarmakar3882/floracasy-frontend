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

        <h6 class="mb-8 mx-4">Conversation with Support Team</h6>

        <section class="conversation-container description-box">
          <aside v-if="conversationHistory">
            <MessageItem
              v-for="message in conversationHistory"
              :key="message.identifier"
              :chat-message="message"
              :message-type="message.messageType"
              class="my-4"
            />
          </aside>

          <client-only>
            <infinite-loading @infinite="fetchConversation">
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
      <section v-if="ticketDetails">
        <main
          v-if="ticketDetails.status !== 'Ticket Resolved'"
          class="bottom-area"
        >
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
            @keyup="updateText"
            @keyup.enter="addSupportMessage"
          >
            <transition name="scale-up">
              <label
                v-if="supportMessage.length === 0 && showPlaceholder"
                class="muted"
              >
                Type your message here...
              </label>
            </transition>
          </div>
          <RippleButton
            :disabled="supportMessage.trim().length === 0"
            :loading="isSendingSupportMessage"
            :on-click="addSupportMessage"
            style="background: transparent !important"
          >
            <span class="mdi mdi-send mdi-36px" />
          </RippleButton>
        </main>

        <aside v-else class="bottom-area">
          <p class="mx-auto py-6 success-light">The Ticket has been Resolved</p>
        </aside>
      </section>
      <span ref="conversation" />
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'
import { mapGetters } from 'vuex'
import { processLink, showUITip } from '~/utils/utility'

export default {
  name: 'TicketDetail',
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

      supportMessage: '',
      isSendingSupportMessage: false,
      canSendSupportMessage: false,
      showPlaceholder: true,
    }
  },
  computed: {
    createdAt() {
      const date = new Date(this.ticketDetails.createdAt)
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
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

    async fetchConversation($state) {
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

    async sendToServer() {
      await this.$axios.$post(endpoints.help_and_support.conversation.create, {
        ticketID: this.$route.params.identifier,
        message: this.supportMessage,
      })

      this.conversationHistory.push({
        id: Date.now(),
        user: {
          photoURL: this.user.photoURL,
          displayName: this.user.displayName,
        },
        messageType: 'SENT',
        createdAt: Date.now(),
        message: this.supportMessage,
      })

      this.clearSupportMessageInput()

      setTimeout(() => {
        this.$refs.conversation.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        })
      }, 150)
    },

    async addSupportMessage() {
      if (this.supportMessage.trim().length > 0) {
        this.canSendSupportMessage = false
        this.isSendingSupportMessage = true

        await showUITip(this.$store, 'Sending Support Message...', 'info')

        try {
          await this.sendToServer()
          await showUITip(this.$store, 'Message Added', 'success')
        } catch (e) {
          await showUITip(this.$store, 'Network Error', 'error')
        } finally {
          this.isSendingSupportMessage = false
        }
      }
    },

    clearSupportMessageInput() {
      this.supportMessage = ''
      this.$refs.textBox.textContent = ''
    },

    updateText() {
      this.supportMessage = this.$refs.textBox.textContent
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
