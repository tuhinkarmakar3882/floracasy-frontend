<template>
  <div class="notification-page mb-6">
    <LazyRequestPermissionDialog />

    <header>
      <button
        v-ripple="'#65db655f'"
        :disabled="processingRequest || processingRequestDone"
        class="success my-4 px-4 ml-auto"
        style="
          display: flex;
          align-items: center;
          justify-items: center;
          box-shadow: none;
        "
        @click="markAllAsUnread"
      >
        <span
          v-if="processingRequest"
          class="mdi mdi-36px mdi-spin mdi-loading mx-auto"
        />
        <span
          v-else-if="processingRequestDone"
          class="mdi mdi-36px mdi-check mx-auto"
        />
        <span v-else class="mx-auto">Mark all as Read</span>
      </button>
    </header>

    <section class="notifications">
      <transition-group name="scale-up">
        <div
          v-for="(notification, index) in notifications"
          :key="notification.id"
        >
          <NotificationItem
            :notification="notification"
            class="notification-item py-4"
          />
          <InFeedAd v-if="index && index % 5 === 0" />
        </div>
      </transition-group>
    </section>

    <client-only>
      <infinite-loading @infinite="fetchNotifications">
        <template slot="spinner">
          <section
            class="sample-response my-4 mx-4"
            v-for="i in [1, 2, 3, 4, 5]"
            :key="i"
          >
            <ImageSkeleton height="56px" radius="50%" width="56px" />

            <aside>
              <LineSkeleton height="1.5rem" width="90%" />

              <LineSkeleton class="my-2" width="40%" />
            </aside>
          </section>
        </template>
        <template slot="error">
          <p class="danger-light my-6">Network Error</p>
        </template>
        <template slot="no-more">
          <p class="my-4">That's all</p>
        </template>
        <template slot="no-results">
          <p class="my-4">That's all</p>
        </template>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { processLink } from '~/utils/utility'
import NotificationItem from '~/components/Mobile/View/Notification/NotificationItem'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'

export default {
  name: 'Notifications',
  components: { ImageSkeleton, NotificationItem },
  layout: 'ResponsiveApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Notifications',
      notifications: [],
      processingRequestDone: false,
      processingRequest: false,
      page: 1,
      notificationEndpoint: endpoints.notification_system.fetch,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateNewContent', {
      position: 3,
      value: false,
    })
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: 3,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  methods: {
    async fetchNotifications($state) {
      if (!this.notificationEndpoint) {
        $state.complete()
        return
      }

      try {
        const { results, next } = await this.$axios.$get(
          this.notificationEndpoint,
          { params: { uid: this.user.uid } }
        )
        if (results.length) {
          this.notificationEndpoint = processLink(next)
          this.notifications.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
      }
    },

    markAllAsUnread() {
      this.processingRequest = true
      for (const notification of this.notifications) {
        notification.unread = false
      }
      this.$axios
        .$post(endpoints.notification_system.markAllAsRead)
        .then(this.updateUI)
    },

    updateUI() {
      this.processingRequest = false
      this.processingRequestDone = true
      setTimeout(() => {
        this.processingRequest = false
        this.processingRequestDone = false
      }, 2500)
    },
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';
@import 'assets/transitions-and-animations';

.notification-page {
  max-width: $large-screen;
  margin: auto;

  * {
    transition: all 0.3s ease-in-out;
  }

  header {
    button {
      width: 11rem;
    }
  }

  .notification-item {
    &:nth-child(even) {
      background-color: $navigation-bar-color;
    }
  }

  section.sample-response {
    display: grid;
    grid-template-columns: 56px 1fr;
    grid-gap: 16px;
  }
}
</style>
