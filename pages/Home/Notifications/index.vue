<template>
  <div class="notification-page mb-6">
    <section
      ref="banner-block"
      :key="'banner-item'"
      class="banner text-center mb-6 px-2"
      :style="[showBanner ? { height: '300px' } : {}]"
    >
      <h5 v-if="!maybe" class="my-4">
        Would you like to receive notifications?
      </h5>
      <div v-if="!maybe" class="actions my-3">
        <button
          v-ripple=""
          class="secondary-btn mb-4 mx-2"
          @click="alert('Will be implemented shortly')"
        >
          Yes
        </button>
        <button
          v-ripple=""
          class="secondary-outlined-btn mb-4 mx-2"
          @click="showMaybeAndCollapse"
        >
          May be later
        </button>
      </div>
      <p v-if="!maybe" class="mb-3">
        You can always change this setting later in the
        <nuxt-link
          :to="navigationRoutes.Home.MoreOptions.Preferences.EditProfile.index"
        >
          Preferences
        </nuxt-link>
      </p>

      <h5 v-if="maybe" class="text-center mb-4">No Problem</h5>
      <p v-if="maybe" class="text-center mb-4">
        Tip: You can always change this setting later in the
        <nuxt-link
          :to="navigationRoutes.Home.MoreOptions.Preferences.EditProfile.index"
        >
          Preferences
        </nuxt-link>
      </p>
    </section>
    <section v-if="isContentLoading">
      <LoadingIcon />
    </section>
    <section v-else-if="hasError">
      <p class="text-center">No Notifications are Available.</p>
    </section>
    <section class="notifications">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        v-ripple="notification.notificationType.color + '55'"
        class="px-4 py-2"
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
          {{ parse(notification.createdAt) }}
          <span class="dot" />
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import utility from '@/utils/utility'
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
      parse: utility.timeStringParser,
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

  .notifications {
    div {
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
  }
}
</style>
