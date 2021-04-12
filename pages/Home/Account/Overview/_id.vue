<template>
  <div class="details-page">
    <AppBarHeader sticky>
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>

    <FallBackLoader v-if="loadingProfile" />

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

        <section class="actions my-4">
          <div @click="followOrUnfollow(otherUser)">
            <RippleButton
              :class-list="
                statisticsItem.isFollowing
                  ? 'danger-outlined-btn'
                  : 'primary-btn'
              "
              :disabled="followOrUnfollowWorking"
              :loading="followOrUnfollowLoading"
              class="px-6"
              style="width: 120px"
            >
              {{ statisticsItem.isFollowing ? 'Unfollow' : 'Follow' }}
            </RippleButton>
          </div>
          <div
            v-if="useMessageService"
            @click="initializeChatThread(otherUser)"
          >
            <RippleButton
              :disabled="messageWorking"
              :loading="messageLoading"
              class="px-6"
              class-list="primary-outlined-btn"
              style="width: 120px"
            >
              Messages
            </RippleButton>
          </div>
        </section>
      </section>

      <hr class="faded-divider" />

      <UserTimeline :user-uid="$route.params.id" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { getRelativeTime, showUITip } from '~/utils/utility'
import { useMessageService } from '~/environmentVariables'
import AppBarHeader from '~/components/Layout/AppBarHeader'

export default {
  name: 'Overview',
  components: { AppBarHeader },
  middleware: 'isAuthenticated',
  data() {
    return {
      useMessageService,
      navigationRoutes,
      pageTitle: 'Profile Details',

      statisticsItem: null,
      otherUser: null,

      followOrUnfollowLoading: false,
      followOrUnfollowWorking: false,

      messageLoading: false,
      messageWorking: false,

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
      this.messageWorking = true
      try {
        const {
          chat_thread_id: chatThreadId,
        } = await this.$axios.$post(
          endpoints.chat_system.initializeChatThread,
          { uid: receiverData.uid }
        )

        await this.$router.push({
          path: navigationRoutes.Home.Messages.ChatScreen.replace(
            /{messageThreadId}/,
            chatThreadId
          ),
        })
      } catch (e) {
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Unable to start Chatting! Try Again',
          notificationType: 'alert',
          dismissible: true,
        })
        this.messageLoading = false
        this.messageWorking = false
      }
    },

    async followOrUnfollow(receiverData) {
      this.followOrUnfollowLoading = true
      this.followOrUnfollowWorking = true
      try {
        await this.$axios.$post(endpoints.follow_system.follow_or_unfollow, {
          uid: receiverData.uid,
        })
        this.statisticsItem.isFollowing = !this.statisticsItem.isFollowing
      } catch (e) {
        await showUITip(
          this.$store,
          'Unable to Perform Operation! Try Again',
          'alert',
          true
        )
      }
      this.followOrUnfollowLoading = false
      this.followOrUnfollowWorking = false
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
