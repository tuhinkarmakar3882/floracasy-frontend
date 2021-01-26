<template>
  <div class="community-post-comments-component">
    <h4 class="px-4">Comments</h4>

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

    <aside class="bottom-area px-4">
      <img
        v-if="user"
        :src="user.photoURL"
        alt="profile-image"
        width="40"
        height="40"
      />
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
    </aside>
    <pre class="my-4">{{ post }}</pre>
  </div>
</template>

<script>
import { getRelativeTime, processLink, shorten } from '@/utils/utility'
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import RippleButton from '~/components/global/RippleButton'

export default {
  name: 'CommunityPostComments',
  components: { RippleButton },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      navigationRoutes,
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
    isEdited() {
      return (
        new Date(this.post.updatedAt) - new Date(this.post.createdAt) > 5000
      )
    },
  },

  async mounted() {
    await this.setupUser()
  },

  methods: {
    shorten,
    getRelativeTime,

    async viewPostDetails() {
      await this.$router.push(
        navigationRoutes.Home.Community.Posts.detail.replace(
          '{postIdentifier}',
          this.post.identifier
        )
      )
    },

    async setupUser() {
      const currentUser = await this.$store.getters['UserManagement/getUser']
      if (!currentUser) {
        this.loadingProfile = true
        await this.$store.dispatch('UserManagement/fetchData')
      }
    },

    async infiniteHandler($state) {
      await this.setupUser()
      if (!this.fetchCommentsEndpoint) {
        $state.complete()
        return
      }
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
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.community-post-comments-component {
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
}
</style>
