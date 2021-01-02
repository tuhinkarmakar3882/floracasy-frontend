<template>
  <div class="notification-page mb-6">
    <RequestPermissionDialog />

    <section class="notifications">
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

      try {
        const { results, next } = await this.$axios.$get(
          this.notificationEndpoint,
          { params: { uid: this.user.uid } }
        )
        if (results.length) {
          this.notificationEndpoint = next
          this.notifications.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
      }
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

  .banner {
    background-color: $card-background;
    height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-size: $standard-unit - $double-unit;
    }

    .actions {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: center;

      button {
        min-width: auto;
        width: 148px;
      }
    }
  }

  .notification-item {
    &:nth-child(even) {
      background-color: $nav-bar-bg;
    }
  }
}
</style>
