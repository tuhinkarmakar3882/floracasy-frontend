<template>
  <div class="message-page">
    <aside>
      <p ref="chatThreadStart" />

      <header>
        <i v-ripple class="mdi mdi-arrow-left mdi-24px" />
        <p>Messages</p>
        <i v-ripple class="mdi mdi-magnify mdi-24px ml-auto" />
      </header>

      <FallBackLoader v-if="!chatThreads.length" class="my-6" />

      <transition-group name="scale-up">
        <section
          v-for="(thread, index) in chatThreads"
          :key="`thread${index}`"
          class="chat-thread"
          @click="openChat(thread, index)"
        >
          <ChatThread
            v-ripple
            :class="thread === currentThread && ['active']"
            :thread="thread"
          />
          <InFeedAd use-small-ads />
        </section>
      </transition-group>
    </aside>

    <transition name="scale-up">
      <main v-if="currentThread">
        <ChatWindow
          :chat-thread="currentThread"
          :on-chat-close="closeChatThread"
          :on-chat-update="updateChatThread"
          class="chat-window"
        />
      </main>
    </transition>

    <main v-if="!currentThread" class="fallback">
      <InFeedAd use-small-ads v-if="index % 3" class="my-4" />

      <h3>Stay Connected</h3>
      <p>Tap on a Chat Thread & Start Chatting!</p>

      <InFeedAd use-small-ads v-if="index % 3" class="my-4" />
    </main>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { getRelativeTime, LogAnalyticsEvent } from '@/utils/utility'
import endpoints from '@/api/endpoints'
// import { useMessageService } from '~/environmentVariables'

export default {
  name: 'Messages',
  // middleware: useMessageService ? 'isAuthenticated' : 'hidden',

  data() {
    return {
      pageTitle: 'Messages',
      chatThreads: [],
      currentThread: undefined,
      fetchThreadsEndpoint: endpoints.chat_system.fetchThreads,
      navigationRoutes,
    }
  },

  async mounted() {
    this.$router.beforeEach((to, _, next) => {
      if (to.hash === '') {
        this.currentThread = undefined
      }
      next()
    })
    await this.navigationStates()
    await this.fetchThreads()
  },

  beforeDestroy() {
    this.$router.beforeEach((__, _, next) => {
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
      for (let i = 100; i < 200; i++) {
        this.chatThreads.push({
          id: i,
          userUID: i,
          user: {
            displayName: 'Test User ' + i,
            photoURL: 'https://picsum.photos/' + i,
          },
          metadata: {
            unread: true,
            senderUID: 'you',
          },
          updatedAt: Date.now() - 8640000 * i,
          lastMessage: 'Stay Indoors',
        })
      }
    },

    openChat(thread, index) {
      if (this.currentThread === thread) return
      this.chatThreads[index] = {
        ...this.chatThreads[index],
        metadata: { unread: false },
      }
      this.currentThread = this.chatThreads[index]
      this.$router.push(`#${this.currentThread.id}`)
    },

    closeChatThread() {
      this.currentThread = undefined
    },

    updateChatThread(oldThread, newThread) {
      if (this.chatThreads[0] === oldThread) {
        this.chatThreads[0] = newThread
        this.currentThread = newThread
        return
      }

      for (let i = 0; i < this.chatThreads.length; i++) {
        if (this.chatThreads[i] === oldThread) {
          this.chatThreads.splice(i, 1)
          this.currentThread = newThread
        }
      }

      this.chatThreads.unshift(newThread)

      setTimeout(() => {
        this.$refs.chatThreadStart.scrollIntoView()
      }, 100)
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
      z-index: 99999999999;
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
