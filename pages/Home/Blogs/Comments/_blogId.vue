<template>
  <AppFeel custom-header class="blog-comment-page" on-back="/">
    <template slot="app-bar-custom-header">
      <h5
        v-ripple
        class="px-5 mdi mdi-arrow-left"
        style="height: 56px; display: flex; align-items: center"
        @click="
          prevURL
            ? $router.back()
            : $router.replace(navigationRoutes.Home.DashBoard)
        "
      />
      <p>{{ pageTitle }}</p>
    </template>

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
                navigationRoutes.Home.Blogs.Details.replace(
                  '{id}',
                  blog.identifier
                )
              )
            "
          >
            View Blog
          </div>
        </div>
        <p>
          <nuxt-link
            :to="
              navigationRoutes.Home.Account.Overview.replace(
                '{userUID}',
                blog.author.uid
              )
            "
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
                {{ getRelativeTime(comment.createdAt) }}
              </span>
            </p>
            <p class="message-body">{{ comment.message }}</p>
          </div>
        </section>
      </main>

      <client-only>
        <div class="pb-8 mb-8">
          <infinite-loading @infinite="infiniteHandler">
            <template slot="spinner">
              <LoadingIcon class="mt-4 mb-6" />
              <p class="text-center">Fetching Comments...</p>
            </template>
            <template slot="error">
              <p class="danger-light mb-8">Network Error</p>
            </template>
            <template slot="no-more">
              <p class="mb-8">No More Comments</p>
            </template>
            <template slot="no-results">
              <p class="mb-8">Be the first to comment on this!</p>
            </template>
          </infinite-loading>
        </div>
      </client-only>

      <section class="bottom-area px-4">
        <img v-if="user" :src="user.photoURL" alt="profile-image" />
        <input
          v-model="commentMessage"
          type="text"
          placeholder="Add a comment..."
          :disabled="isSendingComment"
          @keyup.enter="addComment"
        />
        <RippleButton
          :on-click="addComment"
          :disabled="!canSendComment"
          :loading="isSendingComment"
          style="background: transparent !important"
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
import AppFeel from '@/components/global/Layout/AppFeel'
import ClientOnly from 'vue-client-only'
import LoadingIcon from '@/components/global/LoadingIcon'
import { getRelativeTime, processLink } from '@/utils/utility'
import { mapGetters } from 'vuex'
import RippleButton from '@/components/global/RippleButton'

export default {
  name: 'BlogComments',
  middleware: 'isAuthenticated',
  components: { RippleButton, LoadingIcon, AppFeel, ClientOnly },

  async asyncData({ $axios, params, from: prevURL }) {
    const blog = await $axios.$get(endpoints.blog.info, {
      params: { identifier: params.blogId },
    })
    return { blog, prevURL }
  },

  data() {
    return {
      prevURL: null,
      blog: null,
      navigationRoutes,
      pageTitle: 'Comments',
      comments: [],
      fetchCommentsEndpoint: endpoints.comment_system.fetchByBlogId,
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
    commentMessage(msg) {
      this.canSendComment = msg.trim().length > 0
    },
  },

  async created() {
    await this.setupUser()
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
    await this.setupUser()
  },

  methods: {
    getRelativeTime,
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
        const { results, next } = await this.$axios.$get(
          this.fetchCommentsEndpoint,
          { params: { blogIdentifier: this.$route.params.blogId } }
        )
        if (results.length) {
          this.fetchCommentsEndpoint = processLink(next)
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

    async addComment() {
      if (this.canSendComment) {
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
              blogIdentifier: this.$route.params.blogId,
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
