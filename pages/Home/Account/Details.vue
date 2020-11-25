<template>
  <div class="text-center py-6 details-page">
    <main v-if="loadingProfile">
      <div class="pageLoading">
        <LoadingIcon />
        Fetching data from server
      </div>
    </main>
    <main v-else>
      <section class="user-profile">
        <div class="basic-data">
          <img alt="profile-picture" class="picture" :src="user.photoURL" />
          <div class="basic-details">
            <p class="name">{{ user.displayName }}</p>
            <p class="designation">
              <em>{{ user.designation || 'Designation Not Set' }}</em>
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
          <p class="about text-center">{{ user.about || 'About Not Set' }}</p>
        </section>

        <section class="actions">
          <button
            v-ripple=""
            class="primary-btn px-6"
            @click="
              $router.push(navigationRoutes.Home.MoreOptions.Payments.index)
            "
          >
            Payments
          </button>
          <button
            v-ripple=""
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

      <section class="recent-activity">
        <h4 class="heading-title">Recent Activities</h4>

        <section
          v-for="activity in recentActivities"
          :key="activity.id"
          v-ripple
          class="activity py-8 my-4"
          @click="
            $router.push(
              navigationRoutes.Home.Blogs.Details.replace('{id}', activity.id)
            )
          "
        >
          <div class="content">
            <img :alt="activity.title" :src="activity.coverImage" />
            <div class="data text-left">
              <h6>{{ activity.title }}</h6>
              <p>{{ activity.subtitle.substr(0, 30) }}...</p>
              <small style="font-size: 13px">
                {{ parseTimeUsingMoment(activity.createdAt) }}</small
              >
            </div>
          </div>
        </section>

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
                <button
                  v-ripple
                  class="secondary-outlined-btn"
                  @click="$router.push('/Home/Blogs/Create')"
                >
                  Create More
                </button>
              </div>
            </template>
            <template slot="no-results">
              <div class="no-activity">
                <Logo style="width: 56px" />
                <p class="my-5">It's Lonely Here...</p>
                <button
                  v-ripple
                  class="secondary-outlined-btn"
                  @click="$router.push('/Home/Blogs/Create')"
                >
                  Publish Your First Blog Now!
                </button>
              </div>
            </template>
          </infinite-loading>
        </client-only>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '@/api/endpoints'
import LoadingIcon from '@/components/LoadingIcon'
import Logo from '@/components/common/Logo'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { parseTimeUsingMoment } from '~/utils/utility'

export default {
  name: 'Details',
  components: { Logo, LoadingIcon },
  layout: 'MobileApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Profile Details',
      loadingProfile: true,
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
    await this.$store.dispatch('BottomNavigation/update', {
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
      .catch((error) => {
        console.error(error)
      })
  },

  methods: {
    parseTimeUsingMoment,
    async infiniteHandler($state) {
      try {
        const { results, next } = await this.$axios.$get(
          this.userBlogEndpoint,
          { params: { uid: this.user.uid } }
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
  padding: 2rem 0.5rem;

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
        width: clamp(100px, 10vw, 150px);
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
    display: grid;
    place-items: center;
  }
}
</style>
