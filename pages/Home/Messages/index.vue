<template>
  <div class="message-page">
    <aside>
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
          @click="openChat(thread)"
        >
          <ChatThread
            v-ripple
            :class="thread === currentThread && ['active']"
            :thread="thread"
          />
        </section>
      </transition-group>
    </aside>

    <transition name="scale-up">
      <main v-if="currentThread">
        <ChatWindow :chat-thread="currentThread" class="chat-window" />
      </main>
    </transition>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { getRelativeTime } from '@/utils/utility'
import endpoints from '@/api/endpoints'
import { useMessageService } from '~/environmentVariables'

export default {
  name: 'Messages',
  middleware: useMessageService ? 'isAuthenticated' : 'hidden',

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
      this.chatThreads = await this.$axios
        .$get('https://jsonplaceholder.typicode.com/users')
        .catch((e) => {
          console.warn(e)
          return []
        })
    },

    openChat(thread) {
      if (this.currentThread === thread) return
      this.currentThread = thread
      this.$router.push(`#${this.currentThread.id}`)
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

  @media screen and (min-width: $medium-screen) {
    grid-template-columns: minmax(272px, 25%) 1fr;
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
    background: #111;
    box-shadow: $right-only-box-shadow;

    .chat-thread {
      .active {
        border-left: $nano-unit solid $secondary;
        border-right: $nano-unit solid $secondary;
        border-radius: $nano-unit 0 0 $nano-unit;
        background: $card-bg;
        position: relative;

        @media screen and (min-width: $medium-screen) {
          border-left: 4px solid $secondary;
          border-right: none;
        }
      }
    }
  }

  main {
    @media screen and (max-width: $medium-screen) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
    }

    .chat-window {
      background: url('https://images.unsplash.com/photo-1516557070061-c3d1653fa646?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2750&q=100')
        no-repeat top;
      background-size: cover;
    }
  }
}
</style>
