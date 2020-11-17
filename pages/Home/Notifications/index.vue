<template>
  <div class="notification-page mb-6">
    <div
      class="banner-container"
      :style="[
        { opacity: showBanner ? 1 : 0 },
        !showBanner && { display: 'none' },
      ]"
    >
      <section
        ref="banner-block"
        :key="'banner-item'"
        class="banner text-center mb-6"
        :style="[showBanner ? { height: '272px' } : {}]"
      >
        <h5 v-if="!maybe" class="mb-4">
          Would you like to receive notifications?
        </h5>
        <small v-if="!maybe">
          You can always change this setting later in the
          <nuxt-link :to="navigationRoutes.Home.MoreOptions.Preferences"
            >Preferences
          </nuxt-link>
        </small>
        <div v-if="!maybe" class="actions mt-6 mb-4">
          <button
            v-ripple
            class="secondary-btn mr-5"
            @click="alert('Will be implemented shortly')"
          >
            Yes
          </button>
          <button
            v-ripple
            class="secondary-outlined-btn"
            @click="showMaybeAndCollapse"
          >
            May be later
          </button>
        </div>
        <h5 v-if="maybe" class="text-center mb-4">No Problem</h5>
        <p v-if="maybe" class="text-center mb-4">
          Tip: You can always change this setting later in the
          <nuxt-link :to="navigationRoutes.Home.MoreOptions.Preferences"
            >Preferences
          </nuxt-link>
        </p>
      </section>
    </div>
    <section v-if="isContentLoading">
      <LoadingIcon />
    </section>
    <section v-else-if="hasError">
      <p class="text-center">No Notifications are Available.</p>
    </section>
    <CustomListView v-else>
      <template slot="list-items">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          v-ripple="notification.notificationType.color + '55'"
          class="px-4 py-2"
        >
          <p :style="{ color: notification.notificationType.color }">
            <span
              :class="notification.notificationType.icon"
              style="font-size: 24px"
            />
            <span class="option-name ml-4" style="font-size: 16px">
              {{ notification.message }}
            </span>
          </p>
        </li>
      </template>
    </CustomListView>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomListView from '@/components/Layout/CustomListView'
import endpoints from '~/api/endpoints'
import LoadingIcon from '~/components/LoadingIcon'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'Notifications',
  components: { CustomListView, LoadingIcon },
  layout: 'MobileApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      showBanner: false,
      pageTitle: 'Notifications',
      isContentLoading: true,
      notifications: null,
      hasError: false,
      maybe: false,
      computedHeight: 0,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async created() {
    await this.$store.dispatch('BottomNavigation/updateNewContent', {
      position: 3,
      value: false,
    })
  },

  async mounted() {
    this.isContentLoading = true
    this.hasError = false
    this.initHeight()

    const hideNotificationConsent = localStorage.getItem(
      'hide-notification-consent'
    )
    this.showBanner = hideNotificationConsent
      ? hideNotificationConsent < 0
      : true

    hideNotificationConsent &&
      localStorage.setItem(
        'hide-notification-consent',
        (parseInt(hideNotificationConsent) - 1).toString()
      )
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

  methods: {
    showMaybeAndCollapse() {
      this.maybe = true

      setTimeout(() => {
        this.showBanner = false
      }, 2500)
      localStorage.setItem('hide-notification-consent', '200')
    },

    initHeight() {
      this.$refs['banner-block'].style.height = 'auto'
      this.$refs['banner-block'].style.position = 'absolute'
      this.$refs['banner-block'].style.visibility = 'hidden'
      this.$refs['banner-block'].style.display = 'block'

      this.computedHeight = getComputedStyle(this.$refs['banner-block']).height
      this.computedHeight =
        (parseInt(this.computedHeight.replace('px', '')) + 40).toString() + 'px'

      this.$refs['banner-block'].style.position = null
      this.$refs['banner-block'].style.visibility = null
      this.$refs['banner-block'].style.display = null
      this.$refs['banner-block'].style.height = 0
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

  .banner-container {
    display: grid;
    place-items: center;
    height: calc(100vh - 112px);
    transition: all 0.5s ease-in-out;
    position: fixed;
    background: transparent;
    width: 100%;

    .banner {
      padding: $medium-unit $milli-unit;
      background-color: lighten($segment-background, $darken-percentage);
      height: 0;
      display: grid;
      place-items: center;
      overflow: hidden;
      box-shadow: 0 0 0 100vh #0e0e18e6;
      border-radius: $milli-unit;
      margin: 0 $standard-unit;

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
  }
}
</style>
