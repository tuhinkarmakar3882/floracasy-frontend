<template>
  <div class="chat-window-component">
    <header>
      <section v-ripple @click="$router.back()">
        <i class="mdi mdi-arrow-left mdi-24px" />
        <img
          alt=""
          decoding="async"
          loading="lazy"
          src="https://picsum.photos/46"
        />
      </section>

      <p v-ripple>{{ chatThread.user.displayName }}</p>

      <i v-ripple class="mdi mdi-phone mdi-24px ml-auto" />
      <i v-ripple class="mdi mdi-dots-vertical mdi-24px" />
    </header>

    <main>
      <transition-group name="scale-up">
        <MessageItem
          v-for="(item, index) in chatMessages"
          :key="`chatMessages${index}`"
          :chat-message="item"
          :sent-message="item.sent"
          class="my-4"
        />
      </transition-group>
      <div ref="bottomOfChat" />

      <TypingAnimation
        v-if="chatMessages.length % 2 && typing"
        class="typing-animation"
      />
    </main>

    <footer>
      <textarea
        ref="textbox"
        v-model="message"
        class="input-field"
        placeholder="Type Your Message Here!"
        @keyup="sendTypingEvent"
        @keyup.enter="sendMessage"
      />
      <i
        v-ripple
        :class="[
          canSendMessage ? 'sent-button' : 'disabled',
          isSendingMessage ? 'mdi-spin mdi-loader' : 'mdi-send',
        ]"
        class="mdi mdi-36px"
        @click="sendMessage"
      />
    </footer>
  </div>
</template>

<script>
import { showUITip } from '~/utils/utility'
import TypingAnimation from '~/components/Mobile/View/Message/TypingAnimation'
import MessageItem from '~/components/Mobile/View/Message/MessageItem'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default {
  name: 'ChatWindow',
  components: {
    MessageItem,
    TypingAnimation,
  },
  props: {
    chatThread: {
      type: Object,
      required: false,
      default() {
        return undefined
      },
    },
    onChatUpdate: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      message: '',
      typing: true,
      typingTimeout: undefined,
      isSendingMessage: false,
      canSendMessage: false,
      lastMessageTime: Date.now(),

      chatMessages: [
        {
          message: 'Hello!',
          sent: true,
          createdAt: 1620401158506,
        },
        {
          message: 'Hi!',
          sent: false,
          createdAt: 1620401168506,
        },
        {
          message: "How's it going?",
          sent: false,
          createdAt: 1620501158506,
        },
        {
          message: 'Good! You say!',
          sent: true,
          createdAt: Date.now(),
        },
        {
          message: "I'm good till now only.",
          sent: true,
          createdAt: Date.now(),
        },
        {
          message: "How's the Covid Situation over there buddy?",
          sent: false,
          createdAt: Date.now(),
        },
        {
          message: 'It getting worse here day by day...',
          sent: false,
          createdAt: Date.now(),
        },
        {
          message: 'Same Pinch... Cases are rising rapidly.',
          sent: true,
          createdAt: Date.now(),
        },
        {
          message: 'I can understand.',
          sent: false,
          createdAt: Date.now(),
        },
        {
          message: 'Stay indoors!',
          sent: false,
          createdAt: Date.now(),
        },
        {
          message: 'You too!',
          sent: true,
          createdAt: Date.now(),
        },
      ],
    }
  },

  watch: {
    message(msg) {
      this.canSendMessage = msg.trim().length > 0
    },
  },

  mounted() {
    // for (let i = 0; i < 10000; i++) {
    //   this.chatMessages.push({
    //     id: i,
    //     message: i,
    //     sent: true,
    //     createdAt: 1620401158506,
    //   })
    // }
  },
  methods: {
    // shouldShowTimeDiff(createdAt) {
    //   const seconds = 1000
    //   const minute = 60 * seconds
    //   const hour = 60 * minute
    //   const day = 24 * hour
    //
    //   const timeDiff = this.lastMessageTime - createdAt
    //   const absoluteTimeDifference = Math.abs(timeDiff)
    //   const timeDifferenceInDays = absoluteTimeDifference / day
    //
    //   if (timeDifferenceInDays >= 1) {
    //     this.lastMessageTime = createdAt
    //     console.log('cool')
    //     return true
    //   }
    //   return false
    // },

    async sendMessage() {
      if (!this.canSendMessage) return

      this.canSendMessage = false
      await showUITip(this.$store, 'Sending...', 'info')

      try {
        this.chatMessages.push({
          message: this.message,
          sent: this.chatMessages.length % 2 === 0,
          createdAt: Date.now(),
        })
        await showUITip(this.$store, 'Comment Added', 'success')
        this.onChatUpdate(this.chatThread, {
          ...this.chatThread,
          lastMessage: this.message,
        })
        this.message = ''
      } catch (e) {
      } finally {
        this.$refs.bottomOfChat.scrollIntoView()
        this.$refs.textbox.focus()
      }
    },

    sendTypingEvent() {
      this.typing = true
      clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(() => {
        this.typing = false
      }, 10000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.chat-window-component {
  display: grid;
  height: 100vh;

  --footer-size: 64px;

  grid-template-rows: 56px 1fr var(--footer-size);
  scroll-behavior: smooth;

  * {
    scroll-behavior: smooth;
  }

  main,
  footer {
    background: rgba($black, 0.4);
  }

  main {
    overflow: scroll;
    padding: 16px 16px 4px;
    position: relative;
  }

  footer {
    display: flex;
    flex: 1 1 100%;
    align-items: center;
    position: relative;

    * {
      height: 56px;
    }

    textarea {
      position: relative;
      color: $white;
      padding: $milli-unit 64px $milli-unit $milli-unit;
      margin: 0 $micro-unit;
      border: 1px solid #33334e;
      resize: none;
      border-radius: 50px;
      background: $card-bg;
      line-height: 29px;
      box-shadow: $default-box-shadow;

      &:hover,
      &:focus,
      &:active {
        border-color: hsl(227, 70%, 35%);
      }

      &::placeholder {
        color: #5b5b7e;
        font-size: $standard-unit;
        font-weight: 300;
      }
    }

    i {
      position: absolute !important;
      display: grid;
      place-items: center;
      width: 64px;
      right: $standard-unit;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;

      &.sent-button {
        color: $primary-light;
      }
    }
  }

  header {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    box-shadow: $down-only-box-shadow;
    background: $navigation-bar-color;

    * {
      color: white;
      line-height: 1;
      font-weight: 400;
      height: 56px;
      display: grid;
      place-items: center;
    }

    i {
      display: grid;
      place-items: center;
      width: 56px;
    }

    p {
      font-size: 18px;
    }

    section {
      display: flex;
      position: relative;
      border-radius: 0 50px 50px 0;
      width: 84px;

      i {
        width: $xxx-large-unit;
      }

      img {
        border-radius: 50%;
        height: $x-large-unit;
        width: $x-large-unit;
      }
    }
  }
}
</style>
