<template>
  <AppFeel class="blog-comment-page" :on-back="navigationRoutes.Home.DashBoard">
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <div ref="commentStart" />
      <section v-if="blog" class="top-section px-4">
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
          <nuxt-link
            :to="navigationRoutes.Home.Account.Overview + blog.author.uid"
            class="no-underline"
          >
            {{ blog.author.displayName }}
          </nuxt-link>
          <strong>IN</strong>
          <nuxt-link
            :to="
              navigationRoutes.Home.Blogs.CategoryWise.Name.replace(
                '{name}',
                blog.category.name
              )
            "
            class="no-underline"
          >
            {{ blog.category.name }}
          </nuxt-link>
        </p>
        <hr class="my-4" />
      </section>

      <main class="px-4 mb-8 pb-4">
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
        <img v-if="user" :src="user.photoURL" alt="profile-image" />
        <input
          v-model="commentMessage"
          type="text"
          placeholder="Add a comment..."
          :disabled="isSendingComment"
          @keyup="sendCommentOnEnter"
        />
        <RippleButton
          :on-click="addComment"
          :disabled="!canSendComment"
          :loading="isSendingComment"
        >
          <span class="mdi mdi-send" />
        </RippleButton>
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
import { mapGetters } from 'vuex'
import RippleButton from '@/components/common/RippleButton'

export default {
  name: 'BlogComments',
  middleware: 'isAuthenticated',
  components: { RippleButton, LoadingIcon, AppFeel, ClientOnly },

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
      commentMessage: '',
      isSendingComment: false,
      canSendComment: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  watch: {
    commentMessage(a) {
      this.canSendComment = a.trim().length > 0
    },
  },

  async created() {
    await this.setupUser()
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: -1 })
    await this.setupUser()
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

    async sendCommentOnEnter(e) {
      if (e.keyCode === 13) {
        await this.addComment()
      }
    },

    async addComment() {
      this.canSendComment = false
      this.isSendingComment = true
      await this.$store.dispatch('SocketHandler/updateSocketMessage', {
        message: 'Adding Comment...',
        notificationType: 'info',
        dismissible: true,
      })
      try {
        await this.$axios.$post(
          endpoints.comment_system.createCommentForBlogId,
          {
            blog_id: this.$route.params.blogId,
            message: this.commentMessage,
          }
        )
        const newComment = {
          id: Date.now(),
          user: {
            photoURL: this.user.photoURL,
            displayName: this.user.displayName,
          },
          createdAt: Date.now(),
          message: this.commentMessage,
        }

        this.comments.unshift(newComment)
        this.commentMessage = ''
        this.isSendingComment = false

        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Comment Added',
          notificationType: 'success',
          dismissible: true,
        })
        this.$refs.commentStart.scrollIntoView()
      } catch (e) {
        this.isSendingComment = false
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Failed to Add Comment. Please Retry',
          notificationType: 'error',
          dismissible: true,
        })
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

    button {
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
