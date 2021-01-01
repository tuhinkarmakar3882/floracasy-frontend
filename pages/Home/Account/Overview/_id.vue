<template>
  <div class="py-6 details-page">
    <main v-if="loadingProfile" class="text-center">
      <div class="pageLoading">
        <LoadingIcon />
        Fetching data from server
      </div>
    </main>
    <main v-else>
      <section v-if="otherUser" class="text-center user-profile px-1">
        <div class="basic-data">
          <img
            alt="profile-picture"
            class="picture"
            :src="otherUser.photoURL"
            width="100"
            height="100"
          />
          <div class="basic-details">
            <p class="name">{{ otherUser.displayName }}</p>
            <p v-if="otherUser.designation" class="designation">
              <em>{{ otherUser.designation }}</em>
            </p>
          </div>
        </div>

        <div>
          <section v-if="statisticsItem" class="stats">
            <div class="item">
              <span class="number">{{ statisticsItem['totalBlogs'] }}</span>
              <p class="type">Blogs</p>
            </div>
            <div class="item">
              <span class="number">{{
                statisticsItem['peopleSharedMyBlogs'] +
                statisticsItem['peopleLikedMyBlogs']
              }}</span>
              <p class="type">Engagements</p>
            </div>
            <div class="item">
              <span class="number">{{ statisticsItem['totalFollowers'] }}</span>
              <p class="type">Followers</p>
            </div>
          </section>

          <section v-else class="text-center my-8">
            <LoadingIcon class="mt-4 mb-6" />
            <p>Loading Profile Data...</p>
          </section>
        </div>

        <section class="other-info">
          <p v-if="otherUser.about" class="about text-center">
            {{ otherUser.about }}
          </p>
        </section>

        <section class="actions">
          <div @click="followOrUnfollow(otherUser)">
            <RippleButton
              class="px-6"
              :loading="followOrUnfollowLoading"
              :disabled="followOrUnfollowWorking"
              :class-list="
                statisticsItem.isFollowing
                  ? 'danger-outlined-btn'
                  : 'primary-btn'
              "
              style="width: 120px"
            >
              {{ statisticsItem.isFollowing ? 'Unfollow' : 'Follow' }}
            </RippleButton>
          </div>
          <div @click="initializeChatThread(otherUser)">
            <RippleButton
              style="width: 120px"
              class="px-6"
              class-list="primary-outlined-btn"
              :loading="messageLoading"
              :disabled="messageWorking"
            >
              Messages
            </RippleButton>
          </div>
        </section>
      </section>

      <section class="recent-activity">
        <h4 class="heading-title" style="margin-bottom: 2rem !important">
          Recent Activities
        </h4>

        <BlogPost
          v-for="activity in recentActivities"
          :key="activity.identifier"
          class="activity pt-4"
          :blog="activity"
        />
      </section>
    </main>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ClientOnly from 'vue-client-only'
import LoadingIcon from '@/components/global/LoadingIcon'
import BlogPost from '@/components/global/BlogPost'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { parseTimeUsingMoment } from '~/utils/utility'
import RippleButton from '~/components/global/RippleButton'

export default {
  name: 'Overview',
  components: { RippleButton, BlogPost, LoadingIcon, ClientOnly },
  layout: 'MobileApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Profile Details',
      loadingProfile: true,
      statisticsItem: null,
      recentActivities: [],
      otherUser: null,
      userBlogEndpoint: endpoints.blog.getBlogsByUid,
      followOrUnfollowLoading: false,
      followOrUnfollowWorking: false,
      messageLoading: false,
      messageWorking: false,
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

    await this.setupUser()

    if (this.$route.params.id === this.user.uid) {
      await this.$router.replace(navigationRoutes.Home.Account.Details)
    } else {
      this.loadingProfile = false

      try {
        const data = await this.$axios.$get(
          endpoints.profile_statistics.detail,
          { params: { uid: this.$route.params.id } }
        )
        this.statisticsItem = data.statistics
        this.otherUser = this.statisticsItem.user
        this.otherUser.about = data.userData.about
        this.otherUser.designation = data.userData.designation
      } catch (e) {
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Error while Fetching Data. Please Refresh',
          notificationType: 'alert',
          dismissible: true,
        })
      }
    }
  },

  methods: {
    parseTimeUsingMoment,

    async setupUser() {
      const currentUser = await this.$store.getters['UserManagement/getUser']
      if (!currentUser) {
        this.loadingProfile = true
        await this.$store.dispatch('UserManagement/fetchData')
      }
    },

    async infiniteHandler($state) {
      try {
        const { results, next } = await this.$axios.$get(
          this.userBlogEndpoint,
          { params: { uid: this.$route.params.id } }
        )
        if (results.length) {
          this.userBlogEndpoint = next
          this.recentActivities.push(...results)
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
    .basic-data {
      display: grid;
      grid-template-columns: 1fr 2fr;
      place-items: center;
      position: relative;
      z-index: 2;

      .picture {
        max-width: 100px;
        max-height: 100px;
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 50%;
      }

      .basic-details {
        .name {
          font-size: 24px;
          font-family: $Prata;
          color: white;
          margin-bottom: 12px;
          margin-top: 0;
        }

        .designation {
          margin: 0 0 9px;
          color: #00bcd4;
        }
      }
    }

    .stats {
      margin: 2rem 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      justify-content: space-around;
      align-items: center;
      font-family: $Nunito;

      .item {
        p {
          margin: 0;
        }
      }
    }

    .actions {
      display: grid;
      margin: 1.2rem 0;
      place-items: center;
      padding: 1rem;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 1rem;
    }

    .other-info {
      text-align: left;
    }
  }

  .recent-activity {
    .heading {
      text-align: left;
      font-weight: 400;
      color: #fff;
      font-size: 20px;
      margin-top: 2rem;
      font-family: $Prata;
      margin-bottom: 1rem;
    }

    .content {
      display: grid;
      grid-template-columns: 84px calc(95vw - 84px);
      grid-column-gap: 1rem;
      align-items: center;

      img {
        height: 84px;
        width: 84px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }

  .no-activity {
    color: $muted;
    display: grid;
    place-items: center;
  }
}
</style>
