<template>
  <div v-if="loading" class="message-page-loading">
    <AppBarHeader :fallback-page="fallbackPage" :previous-page="previousPage">
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>
    <main>
      <svg viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z"
        />
      </svg>
      <p>Simple. Secure. Reliable.</p>
    </main>
  </div>

  <div v-else-if="hasMessagingAccess" class="message-page">
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

      <section
        v-if="loadingChatThreads"
        key="loading-chat-threads"
        class="sample-response px-4 py-2"
      >
        <ImageSkeleton height="64px" radius="50%" width="64px" />
        <aside>
          <LineSkeleton width="45%" />
          <LineSkeleton class="my-2" width="90%" />
          <LineSkeleton class="my-2" width="70%" />
        </aside>
      </section>

      <LoadingError
        error-section="Chat Threads"
        v-else-if="fetchError"
        class="px-4 py-4"
      />

      <div v-else>
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
      </div>
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

  <div v-else class="message-page-fallback">
    <AppBarHeader :fallback-page="fallbackPage" :previous-page="previousPage">
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>
    <main>
      <section v-if="unreadThreads > 0" class="info-bar vibrant">
        <i class="mdi mdi-information mdi-24px" />
        <span
          >You have received {{ unreadMessages }} messages from
          <strong>{{ unreadThreads }}</strong> peoples</span
        >
      </section>

      <header class="px-4 pb-2">
        <section>
          <h2>FC-Messaging</h2>
          <p class="mt-8 mb-6">
            Experience the Safest & the most reliable way to communicate
          </p>

          <KeyPoint
            :tick-size="20"
            class="my-2"
            point="A Minimalistic UI"
            text-color="#FFF"
            tick-color="#8FF2E1"
          />
          <KeyPoint
            :tick-size="20"
            class="my-2"
            point="Peer to Peer Encrypted"
            text-color="#FFF"
            tick-color="#8FF2E1"
          />
          <KeyPoint
            :tick-size="20"
            class="my-2"
            point="Reliable at Core"
            text-color="#FFF"
            tick-color="#8FF2E1"
          />
          <KeyPoint
            :tick-size="20"
            class="my-2"
            point="Optimized for Security & Safety"
            text-color="#FFF"
            tick-color="#8FF2E1"
          />
        </section>

        <img alt="" class="my-4" src="/images/message_illustration.jpg" />
      </header>

      <CurrentProgress class="my-8" hide-headline />
    </main>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { getRelativeTime, showUITip } from '@/utils/utility'
import { MESSAGE_SERVICE_BASE, useMessageService } from "~/environmentVariables";
import endpoints from '~/api/endpoints'
import ChatThread from '~/components/Mobile/View/Message/ChatThread'
import ChatWindow from '~/components/Mobile/View/Message/ChatWindow'
import { io } from 'socket.io-client'
import CurrentProgress from '~/components/Mobile/View/Referral/CurrentProgress'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import KeyPoint from '~/components/Common/Tools/KeyPoint'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import LoadingError from '~/components/Common/Tools/LoadingError'

export default {
  name: 'Messages',
  components: {
    LoadingError,
    LineSkeleton,
    ImageSkeleton,
    KeyPoint,
    AppBarHeader,
    CurrentProgress,
    ChatWindow,
    ChatThread,
  },
  middleware: useMessageService ? 'isAuthenticated' : 'hidden',

  asyncData({ from: previousPage }) {
    return { previousPage }
  },

  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.DashBoard,
      pageTitle: 'Messages',
      chatThreads: [],
      currentThread: undefined,
      fetchError: false,
      navigationRoutes,
      socket: undefined,
      loading: true,
      loadingChatThreads: true,
      hasMessagingAccess: undefined,
      unreadThreads: 0,
      unreadMessages: 0,
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
    this.hasMessagingAccess = await this.checkForMessagingAccess()
    this.loading = false

    if (!this.hasMessagingAccess) {
      this.unreadThreads = await this.fetchNumberOfThreads()
      this.unreadMessages = await this.fetchNumberOfUnreadMessages()
      return
    }

    const roomId = this.$route?.params?.roomId
    roomId && (await this.$router.push(`#${roomId}`))

    await this.navigationStates()
    await this.fetchThreads()

    this.socket = io(MESSAGE_SERVICE_BASE, {
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
    async fetchNumberOfThreads() {
      const { numberOfChatThreads } = await this.$axios
        .$get(endpoints.message_system.getNumberOfThreads)
        .catch(() => ({ numberOfChatThreads: 0 }))
      return numberOfChatThreads
    },

    async fetchNumberOfUnreadMessages() {
      const { numberOfUnreadMessages } = await this.$axios
        .$get(endpoints.message_system.getNumberOfUnreadMessages)
        .catch(() => ({ numberOfUnreadMessages: 0 }))
      return numberOfUnreadMessages
    },

    getRelativeTime,
    async navigationStates() {
      await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
        linkPosition: -1,
      })
      await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
        linkPosition: 0,
      })
    },

    async checkForMessagingAccess() {
      const results = await this.$axios.$get(endpoints.rewards.claimed)
      if (!results.length) return false
      return !!results.find((item) => item.reward?.name === 'messaging')
    },

    async fetchThreads() {
      this.fetchError = false
      try {
        const results = await this.$axios.$get(endpoints.message_system.chats)
        this.chatThreads.push(...results)
      } catch (e) {
        this.fetchError = true
      } finally {
        this.loadingChatThreads = false
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

  section.sample-response {
    display: grid;
    grid-template-columns: 2 * $xxx-large-unit 1fr;
    grid-gap: $standard-unit;
  }
}

.message-page-fallback {
  main {
    max-width: $large-screen;
    margin: auto;

    section.info-bar {
      display: grid;
      place-items: center;
      grid-template-columns: 24px 1fr;
      gap: 16px;
      padding: 24px 16px;
      background: $body-bg-alternate;

      span {
        font-family: $Nunito-Sans;

        strong {
          font-weight: 900;
        }
      }
    }

    header {
      display: flex;
      flex-direction: column;

      img {
        height: 250px;
        order: 0;
        margin: auto;
      }

      section {
        order: 1;

        h2 {
          text-align: center;
        }
      }

      @media screen and (min-width: $medium-screen) {
        flex-direction: row;
        justify-content: space-between;

        img {
          order: 1;
        }

        section {
          order: 0;

          h2 {
            text-align: left;
          }
        }
      }
    }
  }
}

.message-page-loading {
  main {
    max-width: $large-screen;
    margin: auto;
    height: calc(100vh - 56px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    $offset: 80;

    svg {
      stroke: $secondary-vibrant;
      stroke-width: 1px;
      height: 16vh;
      width: 16vw;

      path {
        stroke-dasharray: $offset;
        stroke-dashoffset: $offset;
        fill: transparent;
        filter: drop-shadow(0 0 1px $secondary-vibrant);
        animation: draw 2s ease-in-out forwards,
          fill-in 1s ease-in-out forwards 2s,
          ripple-effect 2s ease-in-out infinite alternate-reverse 3s;
      }

      @keyframes draw {
        to {
          stroke-dashoffset: 0;
          filter: drop-shadow(0 0 0 $secondary-vibrant);
        }
      }
      @keyframes fill-in {
        to {
          stroke: transparent;
          stroke-width: 0;
          fill: $secondary-vibrant;
          filter: drop-shadow(0 0 1px $secondary-vibrant);
        }
      }
      @keyframes ripple-effect {
        0% {
          filter: drop-shadow(0 0 1px $secondary-vibrant);
        }
        50% {
          filter: drop-shadow(0 0 0 $secondary-vibrant);
        }
        100% {
          filter: drop-shadow(0 0 1px $secondary-vibrant);
        }
      }
    }

    p {
      opacity: 0;
      animation: zoom-in 250ms ease-in-out forwards;

      @keyframes zoom-in {
        from {
          transform: scale(0.75);
        }
        to {
          opacity: 1;
          color: white;
          transform: scale(1);
        }
      }
    }
  }
}
</style>
