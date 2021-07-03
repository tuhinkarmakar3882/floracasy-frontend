<template>
  <div class="details-page">
    <AppBarHeader
      :fallback-page="fallbackPage"
      :previous-page="previousPage"
      no-right-padding
    >
      <template #title>{{ pageTitle }}</template>
      <template #action-button>
        <i v-ripple class="mdi mdi-share" @click="shareProfile" />
      </template>
    </AppBarHeader>

    <aside v-if="loadingProfile" class="px-4 sample-response">
      <section class="my-4">
        <ImageSkeleton height="64px" radius="50%" width="64px" />

        <aside>
          <LineSkeleton height="2rem" />

          <LineSkeleton class="my-4 mx-auto" height="1.2rem" width="70%" />

          <LineSkeleton class="my-4 mx-auto" width="40%" />
        </aside>
      </section>

      <section class="my-8">
        <div>
          <ImageSkeleton height="52px" radius="50%" width="52px" />
          <LineSkeleton class="my-4" />
        </div>
        <div>
          <ImageSkeleton height="52px" radius="50%" width="52px" />
          <LineSkeleton class="my-4" />
        </div>
        <div>
          <ImageSkeleton height="52px" radius="50%" width="52px" />
          <LineSkeleton class="my-4" />
        </div>
      </section>

      <LineSkeleton class="my-8 mx-auto" height="3rem" width="80%" />

      <section>
        <LineSkeleton class="my-4" height="1.2rem" />
        <LineSkeleton class="mb-6" height="2.5rem" />
        <LineSkeleton class="my-4" height="150px" />
        <LineSkeleton class="my-4" width="80%" />
        <LineSkeleton class="my-4" width="50%" />
        <LineSkeleton class="my-4" width="30%" />
      </section>
    </aside>

    <LoadingError
      v-else-if="loadingError"
      class="px-4"
      error-section="Profile Details"
    />

    <main v-else>
      <section class="user-profile px-1">
        <BasicUserData :user-data="user" />

        <section>
          <UserStatistics
            v-if="statisticsItem"
            :statistics-item="statisticsItem"
            :user-id="user.uid"
          />
          <aside v-else class="sample-3-column-response my-8 px-4">
            <section>
              <ImageSkeleton height="52px" radius="50%" width="52px" />
              <LineSkeleton class="my-4" />
            </section>
            <section>
              <ImageSkeleton height="52px" radius="50%" width="52px" />
              <LineSkeleton class="my-4" />
            </section>
            <section>
              <ImageSkeleton height="52px" radius="50%" width="52px" />
              <LineSkeleton class="my-4" />
            </section>
          </aside>
        </section>

        <section class="other-info">
          <p
            v-ripple
            class="about text-center"
            @click="editContent"
            v-if="isMe"
          >
            {{ user.about || 'About Not Set' }}
          </p>
          <p v-ripple class="about text-center" v-else>
            {{ otherUser.about }}
          </p>
        </section>

        <section class="actions" v-if="isMe">
          <button
            v-ripple
            class="primary-btn px-6"
            @click="
              $router.push(navigationRoutes.Home.MoreOptions.Payments.index)
            "
          >
            Payments
          </button>
          <button
            v-ripple
            class="primary-outlined-btn px-6"
            @click="
              $router.push(
                navigationRoutes.Home.MoreOptions.Preferences.SavedBlogs
              )
            "
          >
            Saved Blogs
          </button>
        </section>
        <aside class="actions my-4" v-else>
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

      <UserTimeline :user-uid="user.uid" />
    </main>

    <transition name="slide-up">
      <LazyShareFallbackForDesktop
        v-if="useShareFallBack"
        :description="descriptionText"
        :handle-close="hideFallback"
        :link-url="profileLink"
        style="z-index: 10000001; position: fixed"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { getRelativeTime, LogAnalyticsEvent, showUITip } from '~/utils/utility'
import { useMessageService } from '~/environmentVariables'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import LoadingError from '~/components/Common/Tools/LoadingError'
import RippleButton from '~/components/Common/Tools/RippleButton'
import BasicUserData from '~/components/Accounts/BasicUserData'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import UserTimeline from '~/components/Accounts/UserTimeline'
import UserStatistics from '~/components/Accounts/UserStatistics'

export default {
  name: 'Overview',
  components: {
    UserStatistics,
    UserTimeline,
    BasicUserData,
    RippleButton,
    LoadingError,
    ImageSkeleton,
    LineSkeleton,
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

      useShareFallBack: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
    isMe() {
      return this.$route.params.id === this.user.uid
    },
    descriptionText() {
      return `View ${this.isMe ? 'my' : 'this'} profile on Floracasy: `
    },
    profileLink() {
      return `https://floracasy.com${this.$route.path}`
    },
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })

    if (this.isMe) this.otherUser = this.user

    await this.loadProfile()
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

    async editContent() {
      await this.$router.push(
        navigationRoutes.Home.MoreOptions.Preferences.EditProfile
      )
    },

    async shareProfile() {
      if (!navigator.share) {
        LogAnalyticsEvent('profile_share_fallback_opened')
        this.useShareFallBack = !this.useShareFallBack
        return
      }

      await this.useNativeShare()
    },
    async useNativeShare() {
      try {
        await navigator.share({
          title: this.blog.title + '- Floracasy',
          text: `I just published this on Floracasy: ${this.blog.title}. Read more at Floracasy`,
          url: navigationRoutes.Home.Blogs.Details.replace(
            '{id}',
            this.blog.identifier
          ),
        })

        await this.updateShareCount()
        LogAnalyticsEvent('blog_shared')
      } catch (error) {
        await showUITip(this.$store, 'May be Later?', 'warning')
      }
    },
    hideFallback() {
      this.useShareFallBack = false
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

  aside.sample-3-column-response {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    gap: 16px;

    section {
      display: grid;
      place-items: center;
    }
  }

  aside.sample-response {
    section:first-child {
      display: grid;
      grid-template-columns: 64px 1fr;
      grid-gap: 16px;
      gap: 16px;
    }

    section:nth-child(2) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 16px;
      gap: 16px;

      div {
        display: grid;
        place-items: center;
      }
    }
  }
}
</style>
