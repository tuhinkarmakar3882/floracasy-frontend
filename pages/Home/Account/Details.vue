<template>
  <div class="py-6 details-page">
    <FallBackLoader v-if="loadingProfile" />

    <LoadingError
      v-else-if="loadingError"
      class="px-4"
      error-section="Profile Details"
    />

    <main v-else>
      <section class="user-profile px-1">
        <div class="basic-data text-center">
          <img
            :src="user.photoURL"
            alt="profile-picture"
            class="picture"
            height="100"
            width="100"
          />
          <div class="basic-details">
            <p class="name">{{ user.displayName }}</p>
            <p v-ripple class="designation" @click="editContent">
              <em>{{ user.designation || 'Designation Not Set' }}</em>
            </p>
          </div>
        </div>

        <LazyUserStatistics
          v-if="statisticsItem"
          :statistics-item="statisticsItem"
        />

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

      <UserTimeline :user-uid="user.uid" />
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '@/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { showUITip } from '~/utils/utility'

export default {
  name: 'Details',
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
}
</style>
