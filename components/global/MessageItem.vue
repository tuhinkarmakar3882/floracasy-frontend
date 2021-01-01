<template>
  <div class="message-item-component">
    <section
      class="message-container"
      :style="[
        messageType === 'RECEIVED'
          ? {
              marginRight: 'auto',
              backgroundColor: '#1e1e50',
              borderTopLeftRadius: 0,
            }
          : {
              marginLeft: 'auto',
              backgroundColor: '#00293c',
              borderBottomRightRadius: 0,
            },
      ]"
    >
      <p class="message-body" style="overflow-wrap: break-word">
        {{ chatMessage.message }}
      </p>
      <p class="timestamp">
        <span class="mdi mdi-clock-time-nine-outline" />
        {{ parseStandardTimeUsingMoment(chatMessage.createdAt) }}
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

  methods: {
    parseStandardTimeUsingMoment: getStandardTime,
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
    border-radius: $micro-unit;
    box-shadow: $default-box-shadow;

    .timestamp {
      font-family: $Nunito-Sans;
      font-size: 13px;
      color: $muted;
      text-align: right;
    }
  }

  .message-body {
    font-size: $standard-unit;
    color: #cecece !important;
  }
}
</style>
