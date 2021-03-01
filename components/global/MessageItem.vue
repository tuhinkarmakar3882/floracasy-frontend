<template>
  <div class="message-item-component">
    <section
      class="message-container"
      :style="[
        messageType === 'RECEIVED' ? receivedMessageStyles : sentMessageStyles,
      ]"
    >
      <p class="message-body" style="overflow-wrap: break-word">
        {{ chatMessage.message }}
      </p>
      <p class="timestamp my-2">
        <span class="mdi mdi-check mr-2" />
        {{ getStandardTime(chatMessage.createdAt) }}
      </p>
    </section>
  </div>
</template>

<script>
import { CustomMessageType } from '@/interfaces/CustomMessageTypes'
import { getStandardTime } from '~/utils/utility'

export default {
  name: 'MessageItem',
  props: {
    chatMessage: {
      type: Object,
      required: true,
    },
    messageType: {
      type: String,
      default: CustomMessageType.RECEIVED_MESSAGE,
    },
  },

  data() {
    return {
      receivedMessageStyles: {
        marginRight: 'auto',
        backgroundColor: '#1c2d34',
        borderTopLeftRadius: 0,
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px',
      },
      sentMessageStyles: {
        marginLeft: 'auto',
        backgroundColor: '#003366',
        borderBottomRightRadius: 0,
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px',
      },
    }
  },

  methods: {
    getStandardTime,
    getInitials(name) {
      return name.split(' ')[0]
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.message-item-component {
  display: flex;

  img {
    width: 2 * $medium-unit;
    height: 2 * $medium-unit;
    object-position: center;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: $default-box-shadow;
  }

  .message-container {
    width: clamp(250px, 100%, 75vw);
    max-width: 700px;
    padding: $micro-unit $standard-unit;
    border-radius: $medium-unit;
    box-shadow: $default-box-shadow;

    .timestamp {
      font-family: $Nunito-Sans;
      font-size: 13px;
      color: $muted;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      line-height: 1;
    }
  }

  .message-body {
    font-size: $standard-unit;
    color: #cecece !important;
  }
}
</style>
