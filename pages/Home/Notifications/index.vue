<template>
  <div class="notification-page mb-6">
    <section class="banner text-center mb-6">
      <h6 class="mb-4">Would you like to receive notifications?</h6>
      <small>
        You can always change this setting later in the
        <nuxt-link :to="navigationRoutes.Home.MoreOptions.Preferences"
          >Preferences</nuxt-link
        >
      </small>
      <div class="actions mt-6 mb-4">
        <button class="secondary-btn mr-5">Yes</button>
        <button class="danger-outlined-btn">May be later</button>
      </div>
    </section>

    <section v-if="isContentLoading">
      <LoadingIcon />
    </section>
    <section v-else-if="hasError">
      <p class="text-center">No Notifications are Available.</p>
    </section>
    <div v-else class="notifications px-4">
      <section v-for="(notification, index) in notifications" :key="index">
        <h1 :class="`mdi ${notification.notificationType.icon}`" />
        <p>{{ notification.message }}</p>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '~/api/endpoints'
import LoadingIcon from '~/components/LoadingIcon'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'Notifications',
  components: { LoadingIcon },
  layout: 'MobileApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Notifications',
      isContentLoading: true,
      notifications: null,
      hasError: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async mounted() {
    this.isContentLoading = true
    this.hasError = false
    await this.$store.dispatch('BottomNavigation/update', {
      linkPosition: 3,
    })
    const currentUser = await this.$store.getters['UserManagement/getUser']
    if (!currentUser) {
      await this.$store.dispatch('UserManagement/fetchData')
    }
    try {
      this.notifications = await this.$axios
        .$get(endpoints.notification_system.getNotificationsByUid, {
          params: {
            uid: this.user.uid,
          },
        })
        .then(({ details }) => details)
    } catch (e) {
      this.notifications = null
      this.hasError = true
    }
    this.isContentLoading = false
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

.notification-page {
  .banner {
    padding: $medium-unit $micro-unit;
    background-color: $card-background;
    box-shadow: $default-box-shadow;

    .actions {
      text-align: center;

      button {
        min-width: auto;

        &:nth-child(1) {
          width: 142px;
        }
      }
    }
  }

  .notifications {
    section {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-column-gap: 1rem;
      place-items: center;
    }
  }
}
</style>
