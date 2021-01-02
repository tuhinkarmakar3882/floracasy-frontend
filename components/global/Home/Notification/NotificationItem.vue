<template>
  <div class="notification-item-component">
    <section
      v-ripple="fadedColor"
      class="notification-details"
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
    </section>

    <transition name="gray-shift">
      <section v-if="showModal" class="modal">
        <h6>What do you want to do?</h6>
        <aside>
          <button class="secondary-outlined-btn" @click="showModal = false">
            Action 1
          </button>
          <button class="secondary-outlined-btn">Action 2</button>
        </aside>
      </section>
    </transition>
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
  data() {
    return {
      showModal: false,
    }
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

      switch (actionName) {
        case 'open_blog':
          this.showModal = true
          console.log(actionName, actionInfo)
          break

        case 'like_blog':
          this.showModal = true
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

.notification-item-component {
  .notification-details {
    position: relative;
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
  }

  .modal {
    position: fixed;
    background: $card-background;
    width: 100%;
    height: calc(100vh - 112px);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 56px;
    z-index: 1;
    flex-direction: column;

    button {
      min-width: auto;
      width: auto;
    }
  }
}
</style>
