<template>
  <div class="notification-page mb-6">
    <section
      ref="banner-block"
      :key="'banner-item'"
      class="banner text-center mb-6"
      :style="[showBanner ? { height: computedHeight } : {}]"
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
          class="danger-outlined-btn"
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
    <!--    <button v-ripple class="success-outlined-btn" @click="showTheBanner">-->
    <!--      Show-->
    <!--    </button>-->
    <section v-if="isContentLoading">
      <LoadingIcon />
    </section>
    <section v-else-if="hasError">
      <p class="text-center">No Notifications are Available.</p>
    </section>
    <div v-else class="notifications px-4">
      <section v-for="(notification, index) in notifications" :key="index">
        <h3 :class="`mdi ${notification.notificationType.icon}`" />
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

    this.showBanner = true

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
      }, 3000)
      localStorage.removeItem('hide-notification-consent')
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
    padding: 0 $micro-unit;
    background-color: $segment-background;
    box-shadow: $down-only-box-shadow;
    height: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

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
