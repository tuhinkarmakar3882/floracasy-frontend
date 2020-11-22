<template>
  <AppFeel class="blog-comment-page" :on-back="navigationRoutes.Home.DashBoard">
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="top-section px-4">
        <div class="introduction">
          <h6>{{ blog.title }}</h6>
          <div
            v-ripple="'#52B2A25F'"
            class="view-blog py-4"
            @click="
              $router.push(
                navigationRoutes.Home.Blogs.Details.replace('{id}', blog.id)
              )
            "
          >
            View Blog
          </div>
        </div>
        <p>
          <span class="secondary">{{ blog.author.displayName }}</span>
          <strong>IN</strong>
          <span class="secondary">{{ blog.category.name }}</span>
        </p>
        <hr class="my-4" />
      </section>

      <main class="px-4">
        <section
          v-for="comment in comments"
          :key="comment.id"
          class="comment my-6"
        >
          <img :src="comment.user.photoURL" alt="profile-image" />
          <div class="comment-message-container">
            <p class="top-line">
              <span class="username secondary">{{
                getInitials(comment.user.displayName)
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
          <template slot="no-more">
            <p class="my-8">No More Comments</p>
          </template>
          <template slot="no-results">
            <p class="my-8">Be the first to comment on this!</p>
          </template>
        </infinite-loading>
      </client-only>

      <section class="bottom-area px-4">
        <img src="https://picsum.photos/100" alt="profile-image" />
        <input type="text" placeholder="Add a comment..." />
        <span v-ripple="" class="mdi mdi-send" />
      </section>
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

  async asyncData({ $axios, params }) {
    const response = await $axios.$get(endpoints.blog.info, {
      params: { id: params.blogId },
    })
    return { blog: response }
  },

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

    getInitials(name) {
      return name.split(' ')[0]
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

  .bottom-area {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2 * $xx-large-unit;
    display: flex;
    align-items: center;
    background-color: $nav-bar-bg;
    box-shadow: $up-only-box-shadow;

    img {
      width: 2 * $medium-unit;
      height: 2 * $medium-unit;
      object-position: center;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
    }

    input {
      border: 1px solid #4a4a4a;
      background-color: $segment-background;
      width: 100%;
      margin: 0 $micro-unit;
      height: 2 * $medium-unit;
      padding: 0 $micro-unit;
      border-radius: $micro-unit;

      &::placeholder {
        color: darken($muted, $darken-percentage);
      }

      &:not(:placeholder-shown) {
        color: $secondary-matte;
        border: 1px solid $secondary-matte;
      }
    }

    span {
      font-size: 26px;
      padding: 0;
      color: $secondary-matte;
    }
  }

  main {
    .comment {
      display: flex;

      img {
        width: 2 * $medium-unit;
        height: 2 * $medium-unit;
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
