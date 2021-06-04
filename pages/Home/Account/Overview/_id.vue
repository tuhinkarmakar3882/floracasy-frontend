<template>
  <div class="details-page">
    <AppBarHeader :fallback-page="fallbackPage" :previous-page="previousPage">
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>

    <FallBackLoader v-if="loadingProfile" class="my-8" />

    <LoadingError
      v-else-if="loadingError"
      class="px-4"
      error-section="Profile Details"
    />

    <main v-else>
      <section v-if="otherUser" class="user-profile px-1">
        <LazyBasicUserData :user="otherUser" />

        <LazyUserStatistics :statistics-item="statisticsItem" />

        <p v-if="otherUser.about" class="">{{ otherUser.about }}</p>

        <aside class="actions my-4">
          <section @click="followOrUnfollow(otherUser)">
            <RippleButton
              :class-list="
                statisticsItem.isFollowing
                  ? 'danger-outlined-btn'
                  : 'primary-btn'
              "
              :disabled="followOrUnfollowLoading"
              :loading="followOrUnfollowLoading"
              class="px-6"
              style="width: 120px"
            >
              {{ statisticsItem.isFollowing ? 'Unfollow' : 'Follow' }}
            </RippleButton>
          </section>

          <section
            v-if="useMessageService"
            @click="initializeChatThread(otherUser)"
          >
            <RippleButton
              :disabled="messageLoading"
              :loading="messageLoading"
              class="px-6"
              class-list="primary-outlined-btn"
              style="width: 120px"
            >
              Message
            </RippleButton>
          </section>
        </aside>
      </section>

      <hr class="faded-divider" />

      <LazyUserTimeline :user-uid="$route.params.id" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { getRelativeTime, LogAnalyticsEvent, showUITip } from '~/utils/utility'
import { useMessageService } from '~/environmentVariables'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import FallBackLoader from '~/components/Common/Tools/FallBackLoader'
import LoadingError from '~/components/Common/Tools/LoadingError'
import RippleButton from '~/components/Common/Tools/RippleButton'

export default {
  name: 'Overview',
  components: {
    RippleButton,
    LoadingError,
    FallBackLoader,
    AppBarHeader,
  },
  middleware: 'isAuthenticated',

  asyncData({ from: previousPage }) {
    return { previousPage }
  },

  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.DashBoard,
      pageTitle: 'Profile Details',

      useMessageService,
      navigationRoutes,

      statisticsItem: null,
      otherUser: null,

      followOrUnfollowLoading: false,

      messageLoading: false,

      loadingProfile: true,
      loadingError: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })

    if (this.$route.params.id === this.user.uid)
      await this.$router.replace(navigationRoutes.Home.Account.Details)
    else await this.loadProfile()
  },

  methods: {
    getRelativeTime,

    async loadProfile() {
      this.loadingError = false
      try {
        const { statistics, userData } = await this.$axios.$get(
          endpoints.profile_statistics.detail,
          { params: { uid: this.$route.params.id } }
        )
        this.statisticsItem = statistics

        this.otherUser = this.statisticsItem.user
        this.otherUser.about = userData.about
        this.otherUser.designation = userData.designation
      } catch (e) {
        await showUITip(
          this.$store,
          'Error while Fetching Data. Try Again',
          'error'
        )
        this.loadingError = true
      } finally {
        this.loadingProfile = false
      }
    },

    async initializeChatThread(receiverData) {
      this.messageLoading = true

      try {
        const { roomID } = await this.$axios.$post(
          endpoints.message_system.chats,
          { receiverUID: [receiverData.uid] }
        )

        await this.$router.push({
          name: 'Home-Messages',
          params: { roomId: roomID },
        })
      } catch (e) {
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Unable to start Chatting! Try Again',
          notificationType: 'error',
          dismissible: true,
        })
      } finally {
        this.messageLoading = false
      }
    },

    async followOrUnfollow(receiverData) {
      this.followOrUnfollowLoading = true

      try {
        await this.$axios.$post(endpoints.follow_system.follow_or_unfollow, {
          uid: receiverData.uid,
        })

        this.statisticsItem.isFollowing = !this.statisticsItem.isFollowing
      } catch (e) {
        await showUITip(this.$store, 'Something Went Error', 'error')
      } finally {
        this.followOrUnfollowLoading = false
      }

      LogAnalyticsEvent('following_or_unfollowing')
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

.details-page {
  main {
    padding: 1rem 0;
    max-width: $large-screen;
    margin: auto;
  }

  button {
    min-width: auto;
    width: auto;
  }

  .user-profile {
    text-align: center;

    .actions {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 1rem;
      gap: 1rem;
    }
  }
}
</style>
