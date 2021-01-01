<template>
  <div
    v-ripple="notification.notificationType.color + '55'"
    class="notification-item"
    @click="
      dispatchNotificationAction(
        notification.onclickAction,
        notification.onclickActionInfo
      )
    "
  >
    <p
      :class="notification.notificationType.icon"
      :style="{ color: notification.notificationType.color }"
      style="font-size: 24px"
    />
    <p>
      <span class="message">
        {{ notification.message }}
      </span>
      <br />
      {{ getRelativeTime(notification.createdAt) }}
      <span class="dot" />
    </p>
  </div>
</template>

<script>
import { getRelativeTime } from '@/utils/utility'

export default {
  name: 'NotificationItem',

  props: {
    notification: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getRelativeTime,
    dispatchNotificationAction(actionName, actionInfo) {
      console.log(actionName, actionInfo)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.notification-item {
  display: grid;
  align-items: center;
  grid-template-columns: 10% 90%;
  grid-column-gap: $standard-unit;
  padding: $medium-unit;

  p {
    font-family: $Nunito-Sans;
    font-size: $milli-unit;
    align-self: flex-start;

    .message {
      color: #cacaca;
      font-family: $Raleway;
      font-size: $standard-unit;
    }
  }

  .dot {
    display: inline-block;
    width: $nano-unit + $single-unit;
    height: $nano-unit + $single-unit;
    border-radius: 50%;
    background-color: $success-light;
    margin-left: $nano-unit;
    margin-bottom: $single-unit;
  }

  &:nth-child(even) {
    background-color: $nav-bar-bg;
  }
}
</style>
