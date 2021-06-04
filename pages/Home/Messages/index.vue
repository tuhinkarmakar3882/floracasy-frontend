<template>
  <div class="message-page">
    <aside>
      <p ref="chatThreadStart" />

      <header>
        <i
          v-ripple
          class="mdi mdi-arrow-left mdi-24px"
          @click="$router.back()"
        />
        <p>Messages</p>
        <!--        <i v-ripple class="mdi mdi-magnify mdi-24px ml-auto" />-->
      </header>

      <FallBackLoader v-if="!chatThreads.length" class="my-6" />

      <transition-group name="scale-up">
        <section
          v-for="(thread, index) in chatThreads"
          :key="thread.roomId"
          class="chat-thread"
          @click="openChat(thread, index)"
        >
          <ChatThread
            v-ripple
            :class="thread === currentThread && ['active']"
            :thread="thread"
          />
          <!--          <InFeedAd class="my-4" use-small-ads />-->
        </section>
      </transition-group>
    </aside>

    <transition name="scale-up">
      <main v-if="currentThread">
        <ChatWindow
          :chat-thread="currentThread"
          :on-chat-close="closeChatThread"
          :on-chat-update="onChatUpdate"
          :on-message-send="updateChatThread"
          :socket="socket"
          class="chat-window"
        />
      </main>
    </transition>

    <main v-if="!currentThread" class="fallback">
      <InFeedAd class="my-4" use-small-ads />

      <h3>Stay Connected</h3>
      <p>Tap on a Chat Thread & Start Chatting!</p>

      <InFeedAd class="my-4" use-small-ads />
    </main>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { getRelativeTime, showUITip } from '@/utils/utility'
import { useMessageService } from '~/environmentVariables'
import endpoints from '~/api/endpoints'
import ChatThread from '~/components/Mobile/View/Message/ChatThread'
import ChatWindow from '~/components/Mobile/View/Message/ChatWindow'
import { io } from 'socket.io-client'
import FallBackLoader from '~/components/Common/Tools/FallBackLoader'

export default {
  name: 'Messages',
  components: { FallBackLoader, ChatWindow, ChatThread },
  middleware: useMessageService ? 'isAuthenticated' : 'hidden',

  data() {
    return {
      pageTitle: 'Messages',
      chatThreads: [],
      currentThread: undefined,
      fetchError: false,
      navigationRoutes,
      socket: undefined,
    }
  },

  beforeMount() {
    this.$router.beforeEach((to, _, next) => {
      if (to.hash === '') {
        this.currentThread = undefined
      }
      next()
    })
  },

  async mounted() {
    const roomId = this.$route?.params?.roomId
    roomId && (await this.$router.push(`#${roomId}`))

    await this.navigationStates()
    await this.fetchThreads()

    this.socket = io('http://localhost:5000', {
      path: '/ws/chat/',
      extraHeaders: {
        authorization: `Bearer ${await this.$cookies.get('access')}`,
      },
    })

    this.socket.on('message', this.handleChatThreadUpdate)
    this.socket.on('error', async (e) => {
      await showUITip(this.$store, 'Something went Wrong', 'error')
    })
  },

  beforeDestroy() {
    this.$router.beforeEach((_, __, next) => {
      next()
    })
  },

  methods: {
    getRelativeTime,
    async navigationStates() {
      await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
        linkPosition: -1,
      })
      await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
        linkPosition: 0,
      })
    },

    async fetchThreads() {
      this.fetchError = false
      try {
        const results = await this.$axios.$get(endpoints.message_system.chats)
        this.chatThreads.push(...results)
        console.log(this.chatThreads[0])
      } catch (e) {
        this.fetchError = true
      }
    },

    // todo will refactor one day xD
    handleChatThreadUpdate(e) {
      for (let i = 0; i < this.chatThreads.length; i++) {
        const thread = this.chatThreads[i]
        if (thread.roomId === e.roomID) {
          const newThread = {
            ...this.chatThreads[i],
            lastMessage: [
              {
                body: e.message,
                senderUID: e.senderUID,
                toNotify: true,
              },
            ],
            updatedAt: Date.now(),
          }
          this.chatThreads.splice(i, 1)
          this.chatThreads.unshift(newThread)
          console.log(this.chatThreads)
          return
        }
      }

      const newThread = {
        createdAt: Date.now(),
        lastMessage: [
          {
            body: e.message,
            senderUID: e.senderUID,
            toNotify: true,
          },
        ],
        meta: {
          roomType: 'Solo',
        },
        roomId: e.roomID,
        updatedAt: Date.now(),
        user: [{ userUID: e.senderUID }],
      }

      this.chatThreads.unshift(newThread)
    },

    openChat(thread, index) {
      if (this.currentThread === thread) return
      this.chatThreads[index].lastMessage[0].toNotify = false
      this.currentThread = this.chatThreads[index]
      this.$router.push(`#${this.currentThread.roomId}`)

      this.socket.emit('message_read', {
        roomID: this.currentThread.roomId,
      })
    },

    closeChatThread() {
      this.currentThread = undefined
    },

    updateChatThread(oldThread, newThread) {
      this.currentThread = newThread

      if (this.chatThreads[0] === oldThread) {
        this.chatThreads[0] = newThread
        return
      }

      const locationOfOldThread = this.binarySearch(oldThread)
      this.chatThreads.splice(locationOfOldThread, 1)
      this.chatThreads.unshift(newThread)

      setTimeout(() => {
        this.$refs.chatThreadStart.scrollIntoView()
      }, 100)
    },

    onChatUpdate(roomId) {
      this.currentThread = this.chatThreads.find(
        (thread) => thread.roomId === roomId
      )
    },

    binarySearch(thread) {
      let low = 0
      let high = this.chatThreads.length
      while (low <= high) {
        const mid = low + Math.floor((high - low) / 2)

        if (this.chatThreads[mid].updatedAt === thread.updatedAt) {
          return mid
        }

        if (this.chatThreads[mid].updatedAt >= thread.updatedAt) {
          low = mid + 1
        }

        if (this.chatThreads[mid].updatedAt < thread.updatedAt) {
          high = mid - 1
        }
      }
      return -1
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

$image-size: 40px;

.message-page {
  position: relative;
  display: grid;

  * {
    scroll-behavior: smooth;
  }

  @media screen and (min-width: $medium-screen) {
    grid-template-columns: minmax(300px, 25%) 1fr;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 1;
    background: $navigation-bar-color;
    display: flex;
    align-items: center;
    box-shadow: $down-only-box-shadow;

    * {
      color: white;
      line-height: 1;
      font-weight: 400;
    }

    i {
      display: grid;
      place-items: center;
      height: 56px;
      width: 56px;
    }

    p {
      font-size: 18px;
    }
  }

  aside {
    height: 100vh;
    position: relative;
    overflow: scroll;
    background: #0d0d0d;
    box-shadow: $right-only-box-shadow;

    .chat-thread {
      &:nth-child(odd) {
        background: #121212;
      }

      .active {
        background: $card-bg-alternate;
        position: relative;

        @media screen and (min-width: $medium-screen) {
          border-left: 4px solid $secondary;
        }
      }
    }
  }

  main {
    background: linear-gradient(0deg, #050513 50%, #00283f 100%);

    @media screen and (max-width: $medium-screen) {
      z-index: $bring-to-front;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .chat-window {
      background: url('https://images.unsplash.com/photo-1516557070061-c3d1653fa646?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1360&q=85')
        no-repeat top;
      background-size: cover;
    }

    &.fallback {
      display: none;
      @media screen and (min-width: $medium-screen) {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: linear-gradient(
            45deg,
            transparent 0%,
            $navigation-bar-color 12.5%,
            $body-bg-alternate 25%,
            $card-bg 37.5%,
            $card-bg-alternate 50%,
            $card-bg 62.5%,
            $body-bg-alternate 75%,
            $navigation-bar-color 87.5%,
            transparent 100%
          )
          right no-repeat;
        background-size: 400%;
        animation: shift-background 15s infinite alternate-reverse ease-in-out;
        @keyframes shift-background {
          from {
            background-position: left;
          }
          to {
            background-position: right;
          }
        }
      }
    }
  }
}
</style>
