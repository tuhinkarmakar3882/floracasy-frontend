<template>
  <AppFeel class="blog-comment-page" :on-back="navigationRoutes.Home.DashBoard">
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="top-section px-4">
        <div class="introduction">
          <h6>This is Another Great Apple Eye-Pads Review</h6>
          <div v-ripple="'#52B2A25F'" class="view-blog py-4">View Blog</div>
        </div>
        <p>
          <span class="secondary">Tuhin Karmakar</span>
          <strong>IN</strong>
          <span class="secondary">Technology</span>
        </p>
        <hr class="my-4" />
      </section>

      <main class="px-4">
        <section v-for="comment in comments" :key="comment.id" class="comment">
          <img :src="comment.user.photoURL" alt="profile-image" />
          <div class="comment-message-container">
            <p class="top-line">
              <span class="username secondary">{{
                comment.user.displayName
              }}</span>
              <span class="timestamp">
                <span class="mdi mdi-clock-time-nine-outline" />
                {{ parseTimeUsingMoment(comment.createdAt) }}
              </span>
            </p>
            <p class="message-body">{{ comment.message }}</p>
          </div>
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
          <template slot="no-more" />
          <template slot="no-results">
            <div class="no-activity">
              <p class="my-5">Be the first to comment on this!</p>
            </div>
          </template>
        </infinite-loading>
      </client-only>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'
import AppFeel from '@/components/Layout/AppFeel'
import ClientOnly from 'vue-client-only'
import LoadingIcon from '@/components/LoadingIcon'
import { parseTimeUsingMoment } from '@/utils/utility'

export default {
  components: { LoadingIcon, AppFeel, ClientOnly },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Comments',
      comments: [],
      page: 1,
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: -1 })
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
      await this.setupUser()
      try {
        const { data: results } = await this.$axios.get(
          endpoints.comment_system.fetchByBlogId,
          { params: { page: this.page, blog_id: this.$route.params.blogId } }
        )
        console.log(results)
        if (results.length) {
          this.page += 1
          this.comments.push(...results)
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

.blog-comment-page {
  .top-section {
    .introduction {
      display: flex;
      align-items: center;

      h6 {
        width: 100%;
      }

      .view-blog {
        text-align: center;
        width: 5 * $xxx-large-unit;
        color: $secondary;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          height: 1px;
          width: 84px;
          bottom: 0;
          left: calc(50% - 42px);
          background: $secondary-matte;
        }
      }
    }
  }

  main {
    .comment {
      display: flex;

      img {
        width: 2 * $x-large-unit;
        height: 2 * $x-large-unit;
        object-position: center;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: $default-box-shadow;
      }

      .comment-message-container {
        width: 100%;
        margin-left: $standard-unit;
        background-color: darken(#232340, $darken-percentage);
        padding: $nano-unit $standard-unit $standard-unit;
        border-radius: $micro-unit;
        box-shadow: $default-box-shadow;

        .top-line {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          margin-bottom: $micro-unit;

          .username {
            font-size: 18px;
          }

          .timestamp {
            font-family: $Nunito-Sans;
            font-size: 14px;
            color: $muted;
          }
        }

        .message-body {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
