<template>
  <AppFeel class="chat-screen-page" custom-header on-back="/">
    <template v-slot:app-bar-custom-header>
      <h5
        v-ripple
        class="px-5 mdi mdi-arrow-left"
        style="height: 56px; display: flex; align-items: center"
        @click="
          prevURL
            ? $router.back()
            : $router.replace(navigationRoutes.Home.Messages.index)
        "
      />
      <p>{{ threadDetail ? threadDetail.name : pageTitle }}</p>
    </template>

    <template v-slot:main>
      <client-only>
        <!-- add a special attribute for the real scroll wrapper -->
        <!--        <div infinite-wrapper>-->
        <!--           set force-use-infinite-wrapper -->
        <!--          <infinite-loading force-use-infinite-wrapper />-->
        <!--        </div>-->
        <!--        <div class="infinite-wrapper">-->
        <!-- set force-use-infinite-wrapper as css selector of the real scroll wrapper -->
        <!--          <infinite-loading force-use-infinite-wrapper=".infinite-wrapper" />-->
        <!--        </div>-->

        <infinite-loading
          direction="top"
          force-use-infinite-wrapper=".infinite-wrapper"
          @infinite="loadMessagesWhenYouReachTheTop"
        >
          <template slot="spinner">
            <LoadingIcon class="mt-4 mb-6" />
            <p class="text-center">Loading Messages...</p>
          </template>
          <template slot="error">
            <p class="danger-light mb-8">Network Error</p>
          </template>
          <template slot="no-more">
            <p class="mb-8"></p>
          </template>
          <template slot="no-results">
            <p class="mb-8"></p>
          </template>
        </infinite-loading>
      </client-only>

      <main class="px-4 pb-8 mb-8 in">
        <MessageItem
          v-for="chatMessage in chatMessages"
          :key="chatMessage.id"
          :chat-message="chatMessage"
          :message-type="chatMessage.messageType"
          class="chatMessage my-6 infinite-wrapper"
        />
      </main>
    </template>

    <template v-slot:footer>
      <section class="bottom-area px-4">
        <img v-if="user" :src="user.photoURL" alt="profile-image" />
        <input
          ref="textMessageInput"
          v-model="textMessage"
          :disabled="isSendingMessage"
          autocomplete="off"
          autofocus
          placeholder="Type your message here"
          type="text"
          @keyup.enter="sendMessage"
        />
        <RippleButton
          :disabled="!canSendMessage"
          :loading="isSendingMessage"
          :on-click="sendMessage"
          style="background: transparent !important"
        >
          <span class="mdi mdi-send" />
        </RippleButton>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import AppFeel from '@/components/global/Layout/AppFeel'
import LoadingIcon from '@/components/global/LoadingIcon'
import RippleButton from '@/components/global/RippleButton'
import * as secrets from '@/environmentalVariables'
import ReconnectingWebSocket from 'reconnecting-websocket'
import MessageItem from '@/components/global/MessageItem.vue'
import { FeatureToggleMessageService } from '~/environmentalVariables'
import endpoints from '~/api/endpoints'
import { processLink } from '~/utils/utility'

export default {
  scrollToTop: false,
  name: 'MessageThreadId',
  middleware: FeatureToggleMessageService ? 'isAuthenticated' : 'hidden',
  components: { MessageItem, RippleButton, LoadingIcon, AppFeel },

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      threadDetail: null,
      chatSocket: null,
      prevURL: null,
      navigationRoutes,
      pageTitle: 'Chat Screen',
      chatMessages: [],
      fetchMessages: endpoints.chat_system.fetchMessages,
      isSendingMessage: false,
      canSendMessage: false,
      textMessage: '',
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  watch: {
    textMessage(msg) {
      this.canSendMessage = msg.trim().length > 0 && msg.length <= 4098
    },
  },

  async mounted() {
    window.scrollTo(0, document.body.scrollHeight)
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })

    this.threadDetail = await this.$axios.$get(
      endpoints.chat_system.threadDetail,
      { params: { thread_id: this.$route.params.messageThreadId } }
    )

    await this.resetUnreadCount()
    const { channelId: mailBoxId } = await this.$axios.$get(
      endpoints.chat_system.getMailBoxId
    )

    // eslint-disable-next-line
    const chatSocketUrl = `${secrets.messageWebsocketBase}chat_system_socket/${mailBoxId}/?access=${this.$cookies.get('access')}`

    const connectionOptions = {
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000 + Math.random() * 4000,
      reconnectionDelayGrowFactor: 1.3,
      minUptime: 5000,
      connectionTimeout: 4000,
      maxEnqueuedMessages: 50,
      maxRetries: 0,
    }

    this.chatSocket = new ReconnectingWebSocket(
      chatSocketUrl,
      [],
      connectionOptions
    )

    this.chatSocket.onopen = () => {
      console.log('socket ready')
    }

    this.chatSocket.onmessage = async (incomingMessage) => {
      const data = JSON.parse(incomingMessage.data)
      const newMessage = {
        user: {
          photoURL: this.user.photoURL,
          displayName: this.user.displayName,
        },
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        message: data.message,
        messageType: data.messageType || 'RECEIVED',
      }

      if (data.messageType === 'SENT') {
        this.textMessage = ''
        this.isSendingMessage = false
      }

      this.chatMessages.push(newMessage)
      this.resetUnreadCount()
    }
  },

  beforeDestroy() {
    // this.chatSocket.close()
  },

  methods: {
    async resetUnreadCount() {
      await this.$axios.$post(
        endpoints.chat_system.markAsRead,
        {
          thread_id: this.$route.params.messageThreadId,
        },
        {
          withCredentials: true,
        }
      )
    },

    async loadMessagesWhenYouReachTheTop($state) {
      if (!this.fetchMessages) {
        $state.complete()
        return
      }
      try {
        const { results, next } = await this.$axios.$get(this.fetchMessages, {
          params: {
            thread_id: this.$route.params.messageThreadId,
          },
        })
        if (results.length) {
          this.fetchMessages = processLink(next)
          this.chatMessages.unshift(...results.reverse())
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
      }
    },

    async sendMessage() {
      if (this.canSendMessage) {
        this.canSendMessage = false
        this.isSendingMessage = true

        try {
          await this.$axios.$post(endpoints.chat_system.send, {
            thread_id: this.$route.params.messageThreadId,
            message: this.textMessage,
          })
          const newMessage = {
            id: Date.now(),
            user: {
              photoURL: this.user.photoURL,
              displayName: this.user.displayName,
            },
            createdAt: Date.now(),
            message: this.textMessage,
            messageType: 'SENT',
          }

          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: 'Sending Message...',
            notificationType: 'info',
            dismissible: true,
            timeout: 1000,
          })
          this.chatMessages.push(newMessage)
          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: 'Sent',
            notificationType: 'success',
            dismissible: true,
            timeout: 1000,
          })
          this.textMessage = ''
        } catch (e) {
          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: "Couldn't Sent",
            notificationType: 'warning',
            dismissible: true,
            timeout: 1000,
          })
        }
        this.isSendingMessage = false
        this.canSendMessage = true
        this.$refs.textMessageInput.focus()
        window.scrollTo(0, document.body.scrollHeight)
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

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.chat-screen-page {
  .top-section {
    .introduction {
      display: flex;
      align-items: center;

      h6 {
        width: 100%;
      }

      .view-blog {
        text-align: center;
        width: 5 * $xxx-large-unit;
        color: $secondary;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          height: $single-unit;
          width: 84px;
          bottom: 0;
          left: calc(50% - 42px);
          background: $secondary-matte;
        }
      }
    }
  }

  .bottom-area {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: $max-width;
    height: 2 * $xx-large-unit;
    display: flex;
    align-items: center;
    background-color: $nav-bar-bg;
    box-shadow: $up-only-box-shadow;

    img {
      width: 2 * $medium-unit;
      height: 2 * $medium-unit;
      object-position: center;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
    }

    input {
      border: 1px solid #4a4a4a;
      background-color: $segment-background;
      width: 100%;
      margin: 0 $micro-unit;
      height: 2 * $medium-unit;
      padding: 0 $micro-unit;
      border-radius: $micro-unit;

      &::placeholder {
        color: darken($muted, $darken-percentage);
      }

      &:not(:placeholder-shown) {
        color: $secondary-matte;
        border: 1px solid $secondary-matte;
      }
    }

    button {
      font-size: 26px;
      padding: 0;
      color: $secondary-matte;
    }
  }
}
</style>
