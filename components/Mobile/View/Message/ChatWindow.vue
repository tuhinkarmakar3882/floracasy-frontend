<template>
  <div class="chat-window-component">
    <header>
      <section v-ripple @click="closeChat">
        <i class="mdi mdi-arrow-left mdi-24px" />
        <img
          :src="chatThread.user.photoURL"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </section>

      <p v-ripple>{{ chatThread.user.displayName }}</p>

      <i v-ripple class="mdi mdi-phone mdi-24px ml-auto" />
      <i v-ripple class="mdi mdi-dots-vertical mdi-24px" />
    </header>

    <main>
      <transition-group name="scale-up">
        <section
          v-for="(segment, index) in chatMessages"
          :key="`day - ${index}`"
        >
          <ChatSegmentBlock :segment="segment" />
        </section>
      </transition-group>
      <div ref="bottomOfChat" />

      <TypingAnimation v-if="typing" class="typing-animation" />
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
import TypingAnimation from '~/components/Mobile/View/Message/TypingAnimation'

export default {
  name: 'ChatWindow',
  components: {
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
    onChatClose: {
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
      chatMessages: [],
    }
  },

  watch: {
    message(msg) {
      this.canSendMessage = msg.trim().length > 0
    },
    chatThread(oldThread, newThread) {
      oldThread.id !== newThread.id && this.resetChatWindow()
    },
  },

  mounted() {
    this.fetchMessages()

    setTimeout(() => {
      this.$refs.bottomOfChat.scrollIntoView()
    }, 200)
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

    resetChatWindow() {
      this.typing = false
      this.message = ''
      this.fetchMessages()
    },

    fetchMessages() {
      this.chatMessages = []

      for (let i = 4; i > -1; i--) {
        const timestamp = Date.now() - i * 86400 * 1000

        const temp = []
        for (let j = 0; j < 5; j++) {
          temp.push({
            id: `${i} - ${j}`,
            message: `Day ${i} | Message ${1}`,
            sent: Math.random() > 0.5,
            createdAt: 1620401158506,
          })
        }

        this.chatMessages.push({
          date: timestamp,
          messages: temp,
        })
      }
    },

    async sendMessage() {
      if (!this.canSendMessage) return
      this.$refs.textbox.focus()
      const message = this.message
      this.canSendMessage = false
      this.message = ''

      const newMessage = {
        id: `chatMessages ${Date.now()}`,
        message: message,
        sent: Math.random() > 0.5,
        createdAt: Date.now(),
        shouldSendToServer: true,
      }

      const lastIndex = this.chatMessages.length - 1
      this.chatMessages[lastIndex].messages.push(newMessage)

      this.onChatUpdate(this.chatThread, {
        ...this.chatThread,
        lastMessage: message,
        updatedAt: Date.now(),
        metadata: {
          unread: false,
          senderUID: 'me',
        },
      })

      setTimeout(() => {
        this.$refs.textbox.focus()
        this.$refs.bottomOfChat.scrollIntoView()
      }, 0)
    },

    sendTypingEvent() {
      this.typing = true
      clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(() => {
        this.typing = false
      }, 10000)
    },

    async closeChat() {
      this.onChatClose()
      await this.$router.back()
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
    align-items: center;
    box-shadow: $down-only-box-shadow;
    background: $navigation-bar-color;
    display: grid;
    grid-template-columns: 84px 1fr repeat(2, 56px);

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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      justify-self: flex-start;
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
