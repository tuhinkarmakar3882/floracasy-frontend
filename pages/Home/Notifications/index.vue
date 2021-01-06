<template>
  <div class="notification-page mb-6">
    <RequestPermissionDialog />

    <section class="notifications">
      <button
        v-ripple="'#65db655f'"
        class="success my-4 px-4 ml-auto"
        style="
          display: flex;
          align-items: center;
          justify-items: center;
          box-shadow: none;
        "
        :disabled="processingRequest || processingRequestDone"
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
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        class="notification-item py-4"
        :notification="notification"
      />
    </section>

    <client-only>
      <infinite-loading @infinite="infiniteHandler">
        <template slot="spinner">
          <LoadingIcon class="mt-4 mb-6" />
          <p>Loading Notifications...</p>
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
import NotificationItem from '~/components/global/Home/Notification/NotificationItem'
import { processLink } from '~/utils/utility'

export default {
  name: 'Notifications',
  components: {
    RequestPermissionDialog: () =>
      import('@/components/global/Home/Notification/RequestPermissionDialog'),
    NotificationItem,
    LoadingIcon: () => import('@/components/global/LoadingIcon'),
  },
  layout: 'MobileApp',
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

  async created() {
    await this.$store.dispatch('NavigationState/updateNewContent', {
      position: 3,
      value: false,
    })
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: 3,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  methods: {
    async setupUser() {
      const currentUser = await this.$store.getters['UserManagement/getUser']
      if (!currentUser) {
        this.loadingProfile = true
        await this.$store.dispatch('UserManagement/fetchData')
      }
    },

    async infiniteHandler($state) {
      await this.setupUser()

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
  * {
    transition: all 0.3s ease-in-out;
  }

  .notification-item {
    &:nth-child(even) {
      background-color: $nav-bar-bg;
    }
  }
}
</style>
