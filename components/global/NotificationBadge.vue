<template>
  <client-only>
    <div
      class="notification-badge"
      :style="[{ height: socketMessage ? '56px' : 0 }]"
    >
      <span
        v-if="socketMessage"
        class="mdi mr-3"
        :class="getIconFor(socketMessageType)"
        :style="{ color: getColorFor(socketMessageType) }"
      />
      <p :style="{ color: getColorFor(socketMessageType) }">
        {{ socketMessage }}
      </p>
    </div>
  </client-only>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotificationBadge',
  computed: {
    ...mapGetters({
      socketMessage: 'SocketHandler/getSocketMessage',
      socketMessageType: 'SocketHandler/getSocketMessageType',
    }),
  },
  methods: {
    getIconFor(notificationType) {
      switch (notificationType) {
        case 'info':
          return 'mdi-information'
        case 'reconnecting':
          return 'mdi-signal-off'
        case 'warning':
          return 'mdi-alert'
        case 'success':
          return 'mdi-check-circle'
        case 'error':
          return 'mdi-alert-circle-outline'
        case 'blog_like':
          return 'mdi-thumb-up-outline'
        case 'blog_comment':
          return 'mdi-comment-multiple'
        case 'add_to_save_later':
          return 'mdi-bookmark-check'
        case 'remove_from_save_later':
          return 'mdi-bookmark-minus'
        case 'help_ticket_creation':
          return 'mdi-ticket'
        case 'feedback_creation':
          return 'mdi-comment-check'
        case 'following':
          return 'mdi-account-plus'
        case 'followed':
          return 'mdi-account-plus'
        case 'unfollow':
          return 'mdi-account-minus'
        default:
          return 'mdi-bell'
      }
    },
    getColorFor(notificationType) {
      switch (notificationType) {
        case 'info':
          return '#a6c52c'
        case 'reconnecting':
          return '#ff8282'
        case 'warning':
          return '#eae500'
        case 'success':
          return '#67ea67'
        case 'error':
          return '#f77479'
        case 'add_to_save_later':
          return '#67ea67'
        case 'remove_from_save_later':
          return '#eae500'
        case 'help_ticket_creation':
          return '#67ea67'
        case 'feedback_creation':
          return '#daa43d'
        case 'following':
          return '#cac9ff'
        case 'followed':
          return '#dadf2c'
        case 'unfollow':
          return '#ff7979'
        default:
          return '#8FF2E0'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.notification-badge {
  position: fixed;
  overflow: hidden;
  text-align: center;
  background: #1d1d1d;
  transition: all 300ms ease-in-out;
  height: 2 * $x-large-unit;
  width: 100%;
  right: 0;
  z-index: 9999999;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-weight: 500;
    font-size: 13px !important;
  }

  span {
    font-size: 20px;
    animation: shake 350ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both 0.4s;

    @keyframes shake {
      0% {
        transform: scale(0.9);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
}
</style>
