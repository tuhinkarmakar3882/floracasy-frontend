<template>
  <div class="chat-segment-block-component">
    <header>
      <small class="pill">{{ getFormattedDate(segment.date) }}</small>
    </header>

    <main>
      <MessageItem
        v-for="(message, index) in segment.messages"
        :key="`message - ${index}`"
        :chat-message="message"
        :sent-message="message.sent"
        class="my-4"
      />
    </main>
  </div>
</template>

<script>
import { getFormattedDate } from '~/utils/utility'

export default {
  name: 'ChatSegmentBlock',
  props: {
    segment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getFormattedDate,
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.chat-segment-block-component {
  header {
    display: grid;
    position: sticky;
    top: 4px;
    place-items: center;
    z-index: 1;

    .pill {
      background: $card-bg-alternate;
      box-shadow: $default-box-shadow;
      padding: 8px 24px;
      border-radius: 50px;
      margin: auto;
      font-size: 12px;
      display: inline-block;
      color: white;
    }
  }
}
</style>
