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
        <span v-if="notification.unread" class="dot" />
      </p>
    </section>

    <transition name="gray-shift">
      <Modal
        v-if="showModal"
        class="modal"
        :toggle="hideModal"
        :color="notification.notificationType.color"
        :modal-type="notification.onclickAction"
      >
        <template slot="title">
          <h4>{{ headerText }}</h4>
        </template>

        <template slot="actions">
          <section>
            <button v-ripple="" class="primary-btn my-4 mx-2">View Blog</button>
            <button v-ripple="" class="secondary-outlined-btn my-4 mx-2">
              See Profile
            </button>
          </section>
        </template>
      </Modal>
    </transition>
  </div>
</template>

<script>
import { getRelativeTime } from '@/utils/utility'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import Modal from '~/components/global/Modal'

export default {
  name: 'NotificationItem',
  components: { Modal },
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
      return this.notification.notificationType.color + '55'
    },
    headerText() {
      const actionName = this.notification.onclickAction

      switch (actionName) {
        case 'like_blog':
          return this.notification.message

        case 'open_ticket_detail':
          return `NOT_IMPLEMENTED - ${actionName}`

        case 'open_comment_page':
          return `NOT_IMPLEMENTED - ${actionName}`

        default:
          return `NOT_IMPLEMENTED - ${actionName}`
      }
    },
  },

  methods: {
    getRelativeTime,

    async performNotificationAction() {
      this.notification.unread && this.markAsRead()

      const actionName = this.notification.onclickAction
      const actionInfo = this.notification.onclickActionInfo

      switch (actionName) {
        case 'open_blog':
          await this.$router.push(
            navigationRoutes.Home.Blogs.Details.replace(
              '{id}',
              actionInfo.identifier
            )
          )
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
          this.showModal = true
          console.log(actionName, actionInfo)
          break

        default:
          console.log('NOT_IMPLEMENTED', actionName, actionInfo)
          break
      }
    },

    markAsRead() {
      this.$axios
        .$post(endpoints.notification_system.updateNotificationSeenStatus, {
          identifier: this.notification.identifier,
          is_read: true,
        })
        .then(() => (this.notification.unread = false))
    },

    hideModal() {
      this.showModal = false
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
}
</style>
