<template>
  <div class="py-6 details-page">
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
        <BasicUserData :user="user" />

        <section>
          <LazyUserStatistics
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
          <p v-ripple class="about text-center" @click="editContent">
            {{ user.about || 'About Not Set' }}
          </p>
        </section>

        <section class="actions">
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
      </section>

      <LazyUserTimeline :user-uid="user.uid" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '@/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { showUITip } from '~/utils/utility'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import BasicUserData from '~/components/Accounts/BasicUserData'
import LoadingError from '~/components/Common/Tools/LoadingError'

export default {
  name: 'Details',
  components: {
    LoadingError,
    BasicUserData,
    ImageSkeleton,
    LineSkeleton,
  },
  layout: 'ResponsiveApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Profile Details',
      loadingProfile: true,
      loadingError: false,
      statisticsItem: null,
      recentActivities: [],
      userBlogEndpoint: endpoints.blog.getBlogsByUid,
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
      linkPosition: 1,
    })

    const currentUser = await this.$store.getters['UserManagement/getUser']
    if (!currentUser) {
      this.loadingProfile = true
      await this.$store.dispatch('UserManagement/fetchData')
    }
    this.loadingProfile = false

    this.statisticsItem = await this.$axios
      .$get(endpoints.profile_statistics.detail, {
        params: { uid: this.user.uid },
      })
      .then(({ statistics }) => statistics)
      .catch(async () => {
        await showUITip(this.$store, 'Unable to Retrieve Information', 'error')
      })
  },

  methods: {
    async editContent() {
      await this.$router.push(
        navigationRoutes.Home.MoreOptions.Preferences.EditProfile
      )
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
  max-width: $large-screen;
  margin: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;

  button {
    min-width: auto;
    width: auto;
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
      font-family: $Nunito-Sans;

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
