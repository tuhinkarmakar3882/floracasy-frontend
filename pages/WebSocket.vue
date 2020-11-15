<template>
  <AppFeel class="websocket-page" on-back="/">
    <template slot="app-bar-title"> WebSocket Demo</template>
    <template slot="main">
      <main class="chat-window px-4">
        <p
          v-for="(msg, index) in chatMessages"
          :key="index"
          class="my-4"
          :class="msg.type === 'sent' ? 'right-aligned' : 'left-aligned'"
        >
          {{ msg.message }}
        </p>
      </main>
      <section class="bottom-bar px-4">
        <input
          v-model="message"
          type="text"
          size="100"
          placeholder="Type something here"
          class="ml-4"
          @keyup="blah"
        />
        <span
          v-ripple=""
          class="mdi mdi-send-circle secondary"
          @click="sendMessage()"
        />
      </section>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
//
// document.querySelector('#chat-message-input').onkeyup = function (e) {
//   if (e.keyCode === 13) {
//     // enter, return
//     document.querySelector('#chat-message-submit').click()
//   }
// }

const backendUrl = 'localhost:8000'
const messageArray = []

export default {
  name: 'WebSocket',
  components: { AppFeel },
  data() {
    return {
      chatMessages: messageArray,
      message: '',
      chatSocket: null,
    }
  },

  mounted() {
    this.chatSocket = new WebSocket('ws://' + backendUrl + '/ws/chat/testRoom/')

    this.chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data)
      console.log('received', data)
      messageArray.push({ message: data.message, type: 'received' })
    }

    this.chatSocket.onclose = (e) => {
      console.error('Chat socket closed unexpectedly', e)
    }
  },

  methods: {
    blah(e) {
      if (e.keyCode === 13) {
        this.sendMessage()
      }
    },
    sendMessage() {
      this.chatSocket.send(
        JSON.stringify({ message: this.message, type: 'sent' })
      )
      // messageArray.push({ message: this.message, type: 'sent' })
      this.message = ''
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.websocket-page {
  .chat-window {
    display: flex;
    flex-direction: column;
    width: 100%;

    p {
      padding: $standard-unit $milli-unit;
      border-radius: $nano-unit;
      box-shadow: $default-box-shadow;
      font-style: $Nunito-Sans;

      &.right-aligned {
        margin-left: auto;
        background-color: #6565d9;
      }

      &.left-aligned {
        margin-right: auto;
        background-color: #202062;
      }
    }
  }

  .bottom-bar {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      padding: $nano-unit $standard-unit !important;
      margin-right: $nano-unit !important;
      width: 90%;
      height: 2 * $x-large-unit;
      border-radius: $nano-unit;
      color: $white;
      background-color: lighten($card-background, $darken-percentage);
      box-shadow: $up-only-box-shadow;
    }

    span {
      font-size: 2 * $xx-large-unit;
      border-radius: 50%;
    }
  }
}
</style>
