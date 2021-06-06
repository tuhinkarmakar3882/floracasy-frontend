<template>
  <div class="chat-window-component">
    <header>
      <section v-ripple @click="closeChat">
        <i class="mdi mdi-arrow-left mdi-24px" />
        <img :src="photoURL" alt="" decoding="async" loading="lazy" />
      </section>

      <p v-ripple @click="openProfileDetails">
        {{ chatThread.user[0].displayName }}
      </p>

      <!--      <i v-ripple class="mdi mdi-phone mdi-24px ml-auto" />-->
      <!--      <i v-ripple class="mdi mdi-dots-vertical mdi-24px" />-->
    </header>

    <main>
      <FallBackLoader v-if="loadingMoreMessage" />
      <transition-group name="scale-up">
        <div class="py-4" ref="loadMoreSection" key="fetchMessages" />

        <section
          v-for="(segment, index) in chatMessages"
          :key="`day - ${index}`"
        >
          <ChatSegmentBlock :segment="segment" />
        </section>
      </transition-group>
      <div ref="bottomOfChat" />

      <TypingAnimation
        :photo-url="photoURL"
        v-if="typing"
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
        @keyup.shift.enter="sendMessage"
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
import endpoints from '~/api/endpoints'
import ChatSegmentBlock from '~/components/Mobile/View/Message/ChatSegmentBlock'
import { Socket } from 'socket.io-client'
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { showUITip } from '~/utils/utility'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import FallBackLoader from '~/components/Common/Tools/FallBackLoader'

export default {
  name: 'ChatWindow',
  components: {
    FallBackLoader,
    LineSkeleton,
    ChatSegmentBlock,
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
    onMessageSend: {
      type: Function,
      required: true,
    },
    socket: {
      type: Socket,
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
      typing: false,
      typingTimeout: undefined,
      isSendingMessage: false,
      canSendMessage: false,
      messageCount: 0,
      noMore: false,
      loadingMoreMessage: false,
      chatMessages: [{ messages: [], date: Date.now() }],
      photoURL: '/images/default.svg',
    }
  },
  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  watch: {
    message(msg) {
      this.canSendMessage = msg.trim().length > 0
    },
    chatThread(oldThread, newThread) {
      oldThread.roomId !== newThread.roomId && this.resetChatWindow()
    },
  },

  async mounted() {
    this.fetchProfileImage()
    await this.fetchMessages()

    setTimeout(() => {
      this.$refs.bottomOfChat.scrollIntoView()
    }, 200)

    this.socket.on('typing', this.handleTypingEvent)
    this.socket.on('message', this.handleOnMessage)

    this.socket.emit('message_read', { roomID: this.chatThread.roomId })

    this.startIObserver()
  },

  beforeDestroy() {
    this.socket.off('message', this.handleOnMessage)
    this.socket.off('message', this.handleTypingEvent)
  },

  methods: {
    handleTypingEvent(e) {
      if (e.roomID === this.chatThread.roomId) {
        clearTimeout(this.typingTimeout)
        this.typing = true

        this.typingTimeout = setTimeout(() => {
          this.typing = false
        }, 5000)
      }
    },

    async handleOnMessage(e) {
      const newMessage = {
        id: e.conversationId,
        message: e.message,
        sent: false,
        createdAt: Date.now(),
        shouldSendToServer: false,
      }

      if (e.roomID === this.chatThread.roomId) {
        const lastIndex = this.chatMessages.length - 1
        this.chatMessages[lastIndex].messages.push(newMessage)
        this.onChatUpdate(e.roomID)
        this.socket.emit('message_read', { roomID: this.chatThread.roomId })
        this.messageCount++
        return
      }

      await showUITip(this.$store, 'New Message Received', 'message')
    },

    async resetChatWindow() {
      this.typing = false
      this.noMore = false
      this.message = ''
      this.messageCount = 0
      this.photoURL = '/images/default.svg'
      this.chatMessages = [{ messages: [], date: Date.now() }]
      await this.fetchMessages()
      this.fetchProfileImage()

      this.socket.emit('message_read', { roomID: this.chatThread?.roomId })
    },

    async fetchProfileImage() {
      const { photoURL } = await this.$axios.$get(
        endpoints.profile_statistics.getProfileImage,
        {
          params: {
            uid: this.chatThread.user[0]?.userUID,
          },
        }
      )
      this.photoURL = photoURL
    },

    async fetchMessages() {
      if (this.noMore) return
      this.loadingMoreMessage = true
      //  Todo - Add the Try Catch
      try {
        const response = await this.$axios.$get(
          endpoints.message_system.getMessages.replace(
            '{roomId}',
            this.chatThread.roomId
          ),
          {
            params: { conversationAfter: this.messageCount },
          }
        )
        this.noMore = !response.length
        this.messageCount += response.length
        this.groupByDate(response)
        this.loadingMoreMessage = false
      } catch (e) {
        console.log(e)
      }
    },

    groupByDate(messages) {
      let currentGroup = this.chatMessages[0]
      let currentGroupDate = new Date(currentGroup.date).toDateString()

      for (let i = messages.length - 1; i >= 0; i--) {
        const message = messages[i]
        const dateString = new Date(message.createdAt).toDateString()

        if (currentGroupDate !== dateString) {
          this.chatMessages.unshift({
            messages: [],
            date: message.createdAt,
          })

          this.chatMessages[1] = currentGroup

          currentGroup = this.chatMessages[0]
          currentGroupDate = new Date(currentGroup.date).toDateString()
        }

        currentGroup.messages.unshift(message)
      }
    },

    async sendMessage() {
      if (!this.canSendMessage) return
      this.$refs.textbox.focus()
      const message = this.message?.trim()
      this.canSendMessage = false
      this.message = ''

      const newMessage = {
        id: `chatMessages ${Date.now()}`,
        message: message,
        sent: true,
        createdAt: Date.now(),
        shouldSendToServer: true,
      }

      const lastIndex = this.chatMessages.length - 1
      this.chatMessages[lastIndex].messages.push(newMessage)

      this.onChatUpdate(this.chatThread.roomId)

      this.onMessageSend(this.chatThread, {
        ...this.chatThread,
        lastMessage: [
          {
            body: message,
            senderUID: this.user.uid,
          },
        ],
        updatedAt: Date.now(),
      })

      const payload = {
        roomId: this.chatThread.roomId,
        message,
      }

      this.socket?.emit('message', payload)
      this.messageCount++

      setTimeout(() => {
        this.$refs.textbox.focus()
        this.$refs.bottomOfChat.scrollIntoView()
      }, 0)
    },

    sendTypingEvent() {
      this.socket.emit('typing', {
        roomID: this.chatThread.roomId,
      })
    },

    async closeChat() {
      this.onChatClose()
      await this.$router.back()
    },

    async openProfileDetails() {
      await this.$router.push(
        navigationRoutes.Home.Account.Overview.replace(
          '{userUID}',
          this.chatThread.user[0].userUID
        )
      )
    },

    startIObserver() {
      this.observer = new IntersectionObserver(this.handleIntersection, {
        rootMargin: '100px',
      })
      const target = this.$refs.loadMoreSection
      this.observer.observe(target)
    },

    handleIntersection(entries) {
      entries.map((entry) => {
        this.observer.observe(entry.target)
        if (entry.isIntersecting) {
          this.fetchMessages()
        }
        return entry
      })
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
        object-fit: cover;
      }
    }
  }
}
</style>
