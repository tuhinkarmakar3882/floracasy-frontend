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
          <h5>{{ notification.message }}</h5>
        </template>

        <template slot="body">
          <section
            v-if="notification.onclickAction === 'open_blog_comment_page'"
          >
            <blockquote v-if="message">&ldquo;{{ message }}&rdquo;</blockquote>
            <LoadingIcon v-else />
          </section>
        </template>

        <template slot="actions">
          <!--          Comment Notification Actions-->
          <section
            v-if="notification.onclickAction === 'open_blog_comment_page'"
          >
            <button
              v-ripple=""
              class="primary-outlined-btn my-4 mx-2"
              @click="openCommentDetailsPage"
            >
              Send Reply
            </button>
            <button
              v-ripple=""
              class="secondary-outlined-btn my-4 mx-2"
              @click="openProfilePage('commentedBy')"
            >
              See Profile
            </button>
          </section>

          <!--          Blog Like Notification Actions-->
          <section v-else-if="notification.onclickAction === 'like_blog'">
            <button
              v-ripple=""
              class="primary-outlined-btn my-4 mx-2"
              @click="openBlogDetailsPage('identifier')"
            >
              View Blog
            </button>
            <button
              v-ripple=""
              class="secondary-outlined-btn my-4 mx-2"
              @click="openProfilePage('liked_by')"
            >
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
import LoadingIcon from '~/components/global/LoadingIcon'

export default {
  name: 'NotificationItem',
  components: { LoadingIcon, Modal },
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      message: undefined,
    }
  },

  computed: {
    fadedColor() {
      return this.notification.notificationType.color + '55'
    },
  },

  mounted() {
    this.$router.beforeEach((to, _, next) => {
      if (to.hash === '') {
        this.showModal = false
      }
      next()
    })
  },

  beforeDestroy() {
    this.$router.beforeEach((_, __, next) => {
      next()
    })
  },

  methods: {
    getRelativeTime,

    async performNotificationAction() {
      this.notification.unread && this.markAsRead()

      const actionName = this.notification.onclickAction
      const actionInfo = this.notification.onclickActionInfo

      switch (actionName) {
        case 'open_blog':
          await this.openBlogDetailsPage('identifier')
          break

        case 'like_blog':
          await this.openModal()
          break

        case 'open_ticket_detail':
          await this.$router.push(
            navigationRoutes.Home.MoreOptions.HelpAndSupport.Tickets.index
          )
          break

        case 'open_profile_details':
          await this.openProfilePage('followerUID')
          break

        case 'open_blog_comment_page':
          await this.openModal()
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

    async hideModal() {
      this.showModal = false
      await this.$router.back()
    },

    async openModal() {
      this.message = undefined
      await this.$router.push('#detail')
      this.showModal = true
      await this.getCommentMessage(this.notification.onclickActionInfo)
    },

    async openProfilePage(keyName) {
      await this.$router.push(
        navigationRoutes.Home.Account.Overview.replace(
          '{userUID}',
          this.notification.onclickActionInfo[keyName]
        )
      )
    },

    async openCommentDetailsPage() {
      await this.$router.push(
        navigationRoutes.Home.Blogs.Comments.BlogId.replace(
          '{BlogId}',
          this.notification.onclickActionInfo.blogIdentifier
        )
      )
    },
    async openBlogDetailsPage(keyName) {
      await this.$router.push(
        navigationRoutes.Home.Blogs.Details.replace(
          '{id}',
          this.notification.onclickActionInfo[keyName]
        )
      )
    },
    async getCommentMessage({ commentIdentifier }) {
      const { message } = await this.$axios.$get(
        endpoints.comment_system.blog.detail.replace(
          '{identifier}',
          commentIdentifier
        )
      )
      this.message = message
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
