<template>
  <div class="chat-window-component">
    <header>
      <section v-ripple @click="$router.back()">
        <i class="mdi mdi-arrow-left mdi-24px" />
        <img alt="" src="https://picsum.photos/46" />
      </section>

      <p v-ripple>{{ chatThread.name }}</p>

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
    </main>

    <footer>
      <textarea
        ref="textbox"
        v-model="message"
        class="input-field"
        placeholder="Type Your Message Here!"
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

export default {
  name: 'ChatWindow',
  props: {
    chatThread: {
      type: Object,
      required: false,
      default() {
        return undefined
      },
    },
  },

  data() {
    return {
      message: '',
      isSendingMessage: false,
      canSendMessage: false,
      chatMessages: [
        {
          message: 'Hello!',
          sent: true,
          createdAt: Date.now(),
        },
        {
          message: 'Hi!',
          sent: false,
          createdAt: Date.now(),
        },
        {
          message: "how's it going?",
          sent: false,
          createdAt: Date.now(),
        },
        {
          message: 'Good! You say!',
          sent: true,
          createdAt: Date.now(),
        },
        {
          message: 'Hello!',
          sent: true,
          createdAt: Date.now(),
        },
        {
          message: 'Hi!',
          sent: false,
          createdAt: Date.now(),
        },
        {
          message: "how's it going?",
          sent: false,
          createdAt: Date.now(),
        },
        {
          message: 'Good! You say!',
          sent: true,
          createdAt: Date.now(),
        },
        {
          message: 'Hello!',
          sent: true,
          createdAt: Date.now(),
        },
        {
          message: 'Hi!',
          sent: false,
          createdAt: Date.now(),
        },
        {
          message: "how's it going?",
          sent: false,
          createdAt: Date.now(),
        },
        {
          message: 'Good! You say!',
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
  methods: {
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
        this.message = ''
      } catch (e) {
      } finally {
        this.$refs.bottomOfChat.scrollIntoView()
        this.$refs.textbox.focus()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.chat-window-component {
  display: grid;
  height: 100vh;

  --footer-size: 72px;

  grid-template-rows: 56px 1fr var(--footer-size);

  main,
  footer {
    background: rgba($black, 0.3);
  }

  main {
    overflow: scroll;
    padding: 16px;
  }

  footer {
    display: flex;
    flex: 1 1 100%;
    align-items: center;
    position: relative;

    * {
      height: 60px;
    }

    textarea {
      position: relative;
      color: $white;
      padding: $standard-unit 64px $standard-unit $standard-unit;
      margin: 0 $micro-unit;
      border: 1px solid #33334e;
      resize: none;
      border-radius: 50px;
      background: $card-bg;
      box-shadow: $default-box-shadow;

      &:hover,
      &:focus,
      &:active {
        border-color: #4b73ff;
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
