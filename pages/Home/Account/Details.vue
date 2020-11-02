<template>
  <div class="text-center py-6 details-page">
    <section class="user-profile">
      <div class="basic-data">
        <img alt="profile-picture" class="picture" :src="user.photoURL" />
        <div class="basic-details">
          <p class="name">{{ user.displayName }}</p>
          <p class="designation">Beauty Blogger</p>
        </div>
      </div>

      <section v-if="statisticsItem" class="stats">
        <div class="item">
          <span class="number">{{ statisticsItem['totalBlogs'] }}</span>
          <p class="type">Blogs</p>
        </div>
        <div class="item">
          <span class="number">{{ statisticsItem['totalEngagements'] }}</span>
          <p class="type">Engagements</p>
        </div>
        <div class="item">
          <span class="number">{{ statisticsItem['totalFollowers'] }}</span>
          <p class="type">Followers</p>
        </div>
      </section>
      <section v-else class="text-center">
        <p>Loading Profile Data...</p>
      </section>

      <section class="other-info">
        <p class="about text-center">
          Hey I'm using this email: {{ user.email }}
        </p>
      </section>

      <section class="actions">
        <button v-ripple class="primary-btn px-6">Payments</button>
        <button v-ripple class="primary-outlined-btn px-6">Saved Blogs</button>
      </section>
    </section>

    <section class="recent-activity">
      <h4 class="heading-title">Recent Activities</h4>

      <div v-if="recentActivities">
        <section
          v-for="activity in recentActivities"
          :key="activity.id"
          class="activity my-8"
        >
          <div class="content">
            <img :alt="activity.title" :src="activity.coverImage" />
            <div class="data text-left">
              <h6>{{ activity.title }}</h6>
              <p>{{ activity.subtitle }}</p>
              <small> {{ activity.createdAt }}</small>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="no-activity">
        <GoogleIcon style="width: 56px" />
        <p class="my-5">It's Lonely Here...</p>
        <button
          v-ripple
          class="secondary-outlined-btn"
          @click="$router.push('/Home/Blogs/Create')"
        >
          Publish Your First Blog Now!
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import endpoints from '@/api/endpoints'
import performTokenHandshake from '@/plugins/tokenInterceptor'
import GoogleIcon from '@/components/Icons/GoogleIcon'

export default {
  name: 'Details',
  components: { GoogleIcon },
  layout: 'MobileApp',
  middleware: 'protectedRoute',

  data() {
    return {
      backendData: null,
      statisticsItem: null,
      recentActivities: null,
    }
  },

  computed: {
    ...mapGetters({
      user: 'getAuthUser',
    }),
  },

  async mounted() {
    performTokenHandshake(this.$store, this.$axios)
    this.$store.commit('BottomNavigation/update', { linkPosition: 1 })

    this.backendData = await this.$axios
      .$get(endpoints.health_check.test)
      .then((response) => {
        return response
      })
      .catch((error) => {
        console.error(error)
      })

    this.statisticsItem = await this.$axios
      .$get(endpoints.profile_statistics.detail, {
        params: { uid: this.$store.getters.getAuthUser.uid },
      })
      .then(({ details }) => details)
      .catch((error) => {
        console.error(error)
      })

    this.recentActivities = await this.$axios
      .$get(endpoints.blog.getBlogsByUid, {
        params: { uid: this.$store.getters.getAuthUser.uid },
      })
      .then(({ details }) => details)
      .catch((error) => {
        console.error(error)
      })
  },

  head() {
    return {
      title: 'Profile Details',
      meta: [
        {
          // hid: 'description',
          // name: 'description',
          // content: 'My custom description',
        },
      ],
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
