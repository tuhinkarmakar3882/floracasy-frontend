<template>
  <div
    v-ripple="fadedColor"
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

  computed: {
    fadedColor() {
      // return this.notification.notificationType.color + '55'
      return '#FFAF0055'
    },
  },

  methods: {
    getRelativeTime,

    async performNotificationAction() {
      const actionName = this.notification.onclickAction
      const actionInfo = this.notification.onclickActionInfo

      switch (this.notification.onclickAction) {
        case 'open_blog':
          console.log(actionName, actionInfo)
          break

        case 'open_ticket_detail':
          console.log(actionName, actionInfo)
          await this.$router.push(
            navigationRoutes.Home.MoreOptions.HelpAndSupport.Tickets.index
          )
          break

        case 'open_profile_details':
          console.log(actionName, actionInfo)
          await this.$router.push(
            navigationRoutes.Home.Account.Overview.replace(
              '{userUID}',
              this.notification.onclickActionInfo.followerUID
            )
          )
          break

        case 'open_comment_page':
          console.log(actionName, actionInfo)
          break

        default:
          console.log('NOT_IMPLEMENTED', actionName, actionInfo)
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
