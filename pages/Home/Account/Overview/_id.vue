<template>
  <div class="py-6 details-page">
    <FallBackLoader v-if="loadingProfile" class="text-center" />

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

      <section class="timeline-wrapper">
        <h4 class="heading-title mt-0 mb-8 pb-4">The Timeline</h4>

        <div ref="tabNavigation"></div>

        <nav class="tab-bar">
          <p
            v-ripple
            :class="tabNumber === 0 && 'active-tab'"
            @click="changeTab(0)"
          >
            <span class="mdi mdi-newspaper" />
            Blogs
          </p>
          <p
            v-ripple
            :class="tabNumber === 1 && 'active-tab'"
            @click="changeTab(1)"
          >
            <span class="mdi mdi-earth" />
            Posts
          </p>
        </nav>

        <main class="timeline pt-4">
          <section v-if="tabNumber === 0">
            <LazyBlogPost
              v-for="blog in recentBlogs"
              :key="blog.identifier"
              :blog="blog"
              class="activity pt-4"
            />
          </section>

          <section v-if="tabNumber === 1">
            <pre>Community Posts</pre>
          </section>
        </main>
      </section>
    </main>

    <footer v-if="!loadingError">
      <client-only>
        <infinite-loading @infinite="infiniteHandler">
          <template slot="spinner">
            <LoadingIcon class="mt-4 mb-6" />
            <p>Loading Recent Activities Data...</p>
          </template>
          <template slot="error">
            <p class="danger-light my-6">Network Error</p>
          </template>
          <template slot="no-more">
            <div class="no-activity">
              <p class="my-5">That's all :)</p>
            </div>
          </template>
          <template slot="no-results">
            <div class="no-activity">
              <p class="my-5">It's Lonely Here...</p>
            </div>
          </template>
        </infinite-loading>
      </client-only>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { getRelativeTime, processLink, showUITip } from '~/utils/utility'
import { useMessageService } from '~/environmentalVariables'

export default {
  name: 'Overview',
  layout: 'ResponsiveApp',
  middleware: 'isAuthenticated',
  data() {
    return {
      tabNumber: 0,

      useMessageService,
      navigationRoutes,
      pageTitle: 'Profile Details',

      statisticsItem: null,
      recentBlogs: [],

      otherUser: null,

      userBlogEndpoint: endpoints.blog.getBlogsByUid,

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

    async infiniteHandler($state) {
      if (!this.userBlogEndpoint) {
        $state.complete()
        return
      }
      try {
        const { results, next } = await this.$axios.$get(
          this.userBlogEndpoint,
          { params: { uid: this.$route.params.id } }
        )
        if (results.length) {
          this.userBlogEndpoint = processLink(next)
          this.recentBlogs.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
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
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Unable to Perform Operation! Try Again',
          notificationType: 'alert',
          dismissible: true,
        })
      }
      this.followOrUnfollowLoading = false
      this.followOrUnfollowWorking = false
    },

    changeTab(newTabNumber) {
      this.tabNumber = newTabNumber
      this.$refs.tabNavigation.scrollIntoView()
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
  padding: 2rem 0;

  button {
    min-width: auto;
    width: auto;
  }

  .page-loading {
    height: calc(100vh - 120px);
    display: grid;
    place-items: center;
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

  .tab-bar {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(2, 1fr);
    position: sticky;
    top: 56px;
    background-color: $nav-bar-bg;
    box-shadow: $down-only-box-shadow;
    z-index: 1;
    transition: all 0.3s ease-in-out;

    * {
      padding: 0.7rem 0;
      font-size: 1rem;
      font-weight: 300;
    }

    .active-tab {
      color: $white;
      font-weight: 400;
      background: $active-gradient;
      transition: all 0.1s ease-in-out;
    }
  }

  .no-activity {
    color: $muted;
    display: grid;
    place-items: center;
  }
}
</style>
