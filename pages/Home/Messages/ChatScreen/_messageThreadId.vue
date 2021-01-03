<template>
  <AppFeel custom-header class="chat-screen-page" on-back="/">
    <template slot="app-bar-custom-header">
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

    <template slot="main">
      <main class="px-4 pb-8 mb-8">
        <MessageItem
          v-for="chatMessage in chatMessages"
          :key="chatMessage.id"
          class="chatMessage my-6"
          :chat-message="chatMessage"
          :message-type="chatMessage.messageType"
        />
      </main>

      <section class="bottom-area px-4">
        <img v-if="user" :src="user.photoURL" alt="profile-image" />
        <input
          ref="textMessageInput"
          v-model="textMessage"
          type="text"
          placeholder="Type your message here"
          :disabled="isSendingMessage"
          autocomplete="off"
          autofocus
          @keyup.enter="sendMessage"
        />
        <RippleButton
          :on-click="sendMessage"
          :disabled="!canSendMessage"
          :loading="isSendingMessage"
          style="background: transparent !important"
        >
          <span class="mdi mdi-send" />
        </RippleButton>
      </section>

      <client-only>
        <infinite-loading @infinite="infiniteHandler">
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
import endpoints from '~/api/endpoints'
import { processLink } from '~/utils/utility'

export default {
  scrollToTop: false,
  name: 'MessageThreadId',
  middleware: 'isAuthenticated',
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

  async created() {
    await this.setupUser()
  },

  async mounted() {
    window.scrollTo(0, document.body.scrollHeight)
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
    await this.setupUser()

    this.threadDetail = await this.$axios.$get(
      endpoints.chat_system.threadDetail,
      { params: { thread_id: this.$route.params.messageThreadId } }
    )

    await this.resetUnreadCount()
    const { channelId: mailBoxId } = await this.$axios.$get(
      endpoints.chat_system.getMailBoxId
    )

    // eslint-disable-next-line
    const chatSocketUrl = `${secrets.websocketBaseUrl}chat_system_socket/${mailBoxId}/?access=${this.$cookies.get('access')}`

    const connectionOptions = {
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000 + Math.random() * 4000,
      reconnectionDelayGrowFactor: 1.3,
      minUptime: 5000,
      connectionTimeout: 4000,
      maxEnqueuedMessages: 50,
    }

    this.chatSocket = new ReconnectingWebSocket(
      chatSocketUrl,
      [],
      connectionOptions
    )

    this.chatSocket.onopen = () => {}

    this.chatSocket.onmessage = async (e) => {
      const data = JSON.parse(e.data)
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
      await this.resetUnreadCount()
      window.scrollTo(0, document.body.scrollHeight)
    }
  },

  beforeDestroy() {
    this.chatSocket.close()
  },

  methods: {
    async resetUnreadCount() {
      await this.$axios.$post(endpoints.chat_system.markAsRead, {
        thread_id: this.$route.params.messageThreadId,
      })
    },

    async setupUser() {
      const currentUser = await this.$store.getters['UserManagement/getUser']
      if (!currentUser) {
        this.loadingProfile = true
        await this.$store.dispatch('UserManagement/fetchData')
      }
    },

    async infiniteHandler($state) {
      await this.setupUser()
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
        console.log(results)
        if (results.length) {
          this.fetchMessages = processLink(next)
          this.chatMessages.push(...results)
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
          height: 1px;
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
