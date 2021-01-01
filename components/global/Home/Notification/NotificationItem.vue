<template>
  <div
    v-ripple="notification.notificationType.color + '55'"
    class="notification-item"
    @click="performNotificationAction"
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
import { navigationRoutes } from '~/navigation/navigationRoutes'

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

    async performNotificationAction() {
      switch (this.notification.onclickAction) {
        case 'open_blog':
          console.log(this.notification.onclickActionInfo)
          break
        case 'open_ticket_detail':
          console.log(this.notification.onclickActionInfo)
          await this.$router.push(
            navigationRoutes.Home.MoreOptions.HelpAndSupport.Tickets.index
          )
          break
        case 'open_profile_details':
          await this.$router.push(
            navigationRoutes.Home.Account.Overview.replace(
              '{userUID}',
              this.notification.onclickActionInfo.followerUID
            )
          )
          break
        case 'open_comment_page':
          console.log(this.notification.onclickActionInfo)
          break
        default:
          console.log('NOT_IMPLEMENTED', this.notification.onclickAction)
          break
      }
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
