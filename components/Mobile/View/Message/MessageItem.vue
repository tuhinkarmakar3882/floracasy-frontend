<template>
  <div class="chat-message-item-component">
    <main :class="[messageType, detailVisibility]" @click="toggleDetails">
      <p>{{ chatMessage.message }}</p>
    </main>

    <transition name="scale-up">
      <aside v-if="showDetails" :class="messageType" class="timestamp my-2">
        <i
          v-if="sentMessage"
          :class="icon"
          class="mdi"
          style="font-size: 12px; margin: 0 6px"
        />

        <span> {{ sendingState }} </span>
      </aside>
    </transition>
  </div>
</template>

<script>
import { getStandardTime } from '~/utils/utility'

export default {
  name: 'MessageItem',
  props: {
    chatMessage: {
      type: Object,
      required: true,
    },
    sentMessage: {
      type: Boolean,
      default: false,
    },
    shouldSendToServer: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showDetails: false,
      timeout: undefined,
      sendingState: getStandardTime(this.chatMessage.createdAt),
      icon: 'mdi-check',
    }
  },

  computed: {
    messageType() {
      return this.sentMessage ? 'sent-msg' : 'received-msg'
    },
    detailVisibility() {
      return this.showDetails && 'details'
    },
  },

  mounted() {
    // this.sentMessage && this.shouldSendToServer && this.sendToServer()
  },

  methods: {
    getStandardTime,
    toggleDetails() {
      clearTimeout(this.timeout)
      this.showDetails = !this.showDetails
    },

    sendToServer() {
      this.showDetails = true
      this.sendingState = 'Sending...'
      this.icon = 'mdi-loading mdi-spin'

      this.timeout = setTimeout(() => {
        this.sendingState = 'Sent'
        this.icon = 'mdi-check'
      }, 2000)

      this.timeout = setTimeout(() => {
        this.sendingState = 'Delivered'
        this.icon = 'mdi-check-all'
      }, 4000)

      this.timeout = setTimeout(() => {
        this.sendingState = 'Read'
        this.icon = 'mdi-check-all vibrant'
      }, 6000)

      this.timeout = setTimeout(() => {
        this.showDetails = false
      }, 8000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.chat-message-item-component {
  display: flex;
  flex-direction: column;
  position: relative;

  main {
    width: auto;
    max-width: 75%;
    padding: $micro-unit $standard-unit;
    box-shadow: $default-box-shadow;
    border-radius: $nano-unit;
    position: relative;

    &::after {
      position: absolute;
      content: '';
      height: 100px;
      width: 100px;
      clip-path: polygon(56% 16%, 8% 16%, 20% 32%);
      top: -16px;
    }

    &.received-msg {
      margin-right: auto;
      background: hsl(227, 77%, 32%);

      &::after {
        left: -16px;
        background: hsl(227, 77%, 32%);
      }
    }

    &.sent-msg {
      margin-left: auto;
      background: #273954;

      &::after {
        right: -16px;
        background: #273954;
        transform: scaleX(-1);
      }
    }

    &.details {
      margin-bottom: 20px;
    }

    p {
      overflow-wrap: break-word;
      white-space: pre-line;
      font-size: $standard-unit;
      color: #cecece !important;
      line-height: 1.5;
    }
  }

  aside.timestamp {
    position: absolute;
    display: flex;
    color: $muted;
    align-items: center;
    right: 0;

    &.received-msg {
      bottom: -$milli-unit;
      right: unset;
      left: 0;
    }

    &.sent-msg {
      bottom: -$standard-unit;
    }

    span {
      font-weight: 300;
      font-family: $Nunito-Sans;
      font-size: 12px;
      line-height: 1;
    }
  }
}
</style>
