<template>
  <div class="text-center py-6 details-page">
    <main v-if="loadingProfile">
      <div class="pageLoading">
        <LoadingIcon />
        Fetching data from server
      </div>
    </main>
    <main v-else>
      <section v-if="otherUser" class="user-profile">
        <div class="basic-data">
          <img
            alt="profile-picture"
            class="picture"
            :src="otherUser.photoURL"
          />
          <div class="basic-details">
            <p class="name">{{ otherUser.displayName }}</p>
            <p v-if="otherUser.designation" class="designation">
              {{ otherUser.designation }}
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
          <button v-ripple class="primary-btn px-6">Follow</button>
          <button v-ripple class="primary-outlined-btn px-6">Messages</button>
        </section>
      </section>

      <section v-if="!loadingRecentActivities" class="recent-activity">
        <h4 class="heading-title">Recent Activities</h4>

        <div v-if="recentActivities">
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
                  {{ parse(activity.createdAt) }}</small
                >
              </div>
            </div>
          </section>
        </div>

        <div v-else class="no-activity">
          <p class="my-5">No Activities</p>
        </div>
      </section>

      <section v-else class="recent-activity">
        <h4 class="heading-title">Recent Activities</h4>

        <section class="text-center my-8">
          <LoadingIcon class="mt-4 mb-6" />
          <p>Loading Recent Activities Data...</p>
        </section>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '~/api/endpoints'
import LoadingIcon from '~/components/LoadingIcon'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import utility from '~/utils/utility'

export default {
  name: 'Overview',
  components: { LoadingIcon },
  layout: 'MobileApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Profile Details',
      loadingProfile: true,
      statisticsItem: null,
      recentActivities: null,
      loadingRecentActivities: null,
      otherUser: null,
      parse: utility.timeStringParser,
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: -1 })

    const currentUser = await this.$store.getters['UserManagement/getUser']
    if (!currentUser) {
      this.loadingProfile = true
      await this.$store.dispatch('UserManagement/fetchData')
    }

    if (this.$route.params.id === this.user.uid) {
      await this.$router.replace(navigationRoutes.Home.Account.Details)
    } else {
      this.loadingProfile = false
      this.loadingRecentActivities = true

      const data = await this.$axios
        .$get(endpoints.profile_statistics.detail, {
          params: { uid: this.$route.params.id },
        })
        .catch((error) => {
          console.error(error)
        })

      this.statisticsItem = data.statistics

      this.otherUser = this.statisticsItem.user
      this.otherUser.about = data.userData.about
      this.otherUser.designation = data.userData.designation

      this.recentActivities = await this.$axios
        .$get(endpoints.blog.getBlogsByUid, {
          params: { uid: this.$route.params.id },
        })
        .then(({ details }) => details)
        .catch((error) => {
          console.error(error)
        })

      this.loadingRecentActivities = false
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
      grid-template-columns: 1fr 3fr;
      grid-column-gap: 1rem;
      place-items: center;

      img {
        height: 84px;
        width: 100%;
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
