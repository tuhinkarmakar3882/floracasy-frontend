<template>
  <AppFeel custom-header class="chat-screen-page" on-back="/">
    <template slot="app-bar-custom-header">
      <h5
        v-ripple
        class="mdi mdi-arrow-left"
        @click="
          prevURL
            ? $router.back()
            : $router.replace(navigationRoutes.Home.DashBoard)
        "
      />
      <p class="ml-6">
        {{ pageTitle }}
      </p>
    </template>

    <template slot="main">
      <pre>{{ chatMessages }}</pre>
      <client-only>
        <div class="">
          <infinite-loading direction="top" @infinite="infiniteHandler">
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
        </div>
      </client-only>
      <main class="px-4 pb-8 mb-8">
        <MessageItem
          v-for="chatMessage in chatMessages"
          :key="chatMessage.id"
          class="chatMessage my-6"
          :chat-message="chatMessage"
          :message-type="chatMessage.messageType"
        />
      </main>

      <div ref="messageStart" />

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
    </template>
  </AppFeel>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import AppFeel from '@/components/Layout/AppFeel'
import LoadingIcon from '@/components/LoadingIcon'
import RippleButton from '@/components/common/RippleButton'
import MessageItem from '~/components/common/MessageItem.vue'
import endpoints from '~/api/endpoints'

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
      this.canSendMessage = msg.trim().length > 0
    },
  },

  async created() {
    await this.setupUser()
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: -1 })
    await this.setupUser()
    await this.$axios.$post(endpoints.chat_system.markAsRead, {
      thread_id: this.$route.params.messageThreadId,
    })
  },

  methods: {
    async setupUser() {
      const currentUser = await this.$store.getters['UserManagement/getUser']
      if (!currentUser) {
        this.loadingProfile = true
        await this.$store.dispatch('UserManagement/fetchData')
      }
    },

    async infiniteHandler($state) {
      await this.setupUser()
      try {
        const { results, next } = await this.$axios.$get(this.fetchMessages, {
          params: {
            thread_id: this.$route.params.messageThreadId,
          },
        })
        console.log(results)
        if (results.length) {
          this.fetchMessages = next
          this.chatMessages.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
        console.log(e)
      }
    },

    async sendMessage() {
      if (this.canSendMessage) {
        this.canSendMessage = false
        this.isSendingMessage = true
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Sending Message...',
          notificationType: 'info',
          dismissible: true,
        })
        try {
          const result = await this.$axios.$post(endpoints.chat_system.send, {
            thread_id: this.$route.params.messageThreadId,
            message: this.textMessage,
          })
          console.log(result)
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

          this.chatMessages.push(newMessage)
          this.textMessage = ''
          this.isSendingMessage = false

          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: 'Message Sent',
            notificationType: 'success',
            dismissible: true,
          })
          this.$refs.textMessageInput.focus()
          this.$refs.messageStart.scrollIntoView()
        } catch (e) {
          this.isSendingMessage = false
          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: 'Failed to Add Comment. Please Retry',
            notificationType: 'error',
            dismissible: true,
          })
        }
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
