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
      if (notificationType === 'info') return 'mdi-information'
      if (notificationType === 'reconnecting') return 'mdi-signal-off'
      if (notificationType === 'warning') return 'mdi-alert'
      if (notificationType === 'success') return 'mdi-check-circle'
      if (notificationType === 'error') return 'mdi-alert-circle-outline'
      if (notificationType === 'blog_like') return 'mdi-thumb-up-outline'
      if (notificationType === 'blog_comment') return 'mdi-comment-multiple'
      return 'mdi-bell'
    },
    getColorFor(notificationType) {
      if (notificationType === 'info') return '#a6c52c'
      if (notificationType === 'reconnecting') return '#ff8282'
      if (notificationType === 'warning') return '#eae500'
      if (notificationType === 'success') return '#67ea67'
      if (notificationType === 'error') return '#f77479'
      return '#8FF2E0'
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
