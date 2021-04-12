<template>
  <div class="community-post-comments-component">
    <h4 class="px-4">Comments</h4>

    <main ref="commentStart">
      <section class="comments-container">
        <transition-group name="scale-down">
          <Comment
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
            :owner-uid="post.userUID"
            class="my-6 px-4"
            comment-type="Post"
          />
        </transition-group>
      </section>
    </main>

    <client-only>
      <div class="pb-8 mb-8">
        <infinite-loading @infinite="fetchComments">
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
        height="40"
        width="40"
      />
      <div
        ref="textBox"
        class="text-box"
        contenteditable
        @focusin="showPlaceholder = false"
        @focusout="showPlaceholder = true"
        @keyup="updateText"
        @keyup.enter="addComment"
      >
        <transition name="scale-up">
          <label
            v-if="commentMessage.length === 0 && showPlaceholder"
            class="muted"
          >
            Type your comment here...
          </label>
        </transition>
      </div>
      <RippleButton
        :disabled="!canSendComment"
        :loading="isSendingComment"
        :on-click="addComment"
        style="background: transparent !important"
      >
        <span class="mdi mdi-send mdi-36px" />
      </RippleButton>
    </aside>
  </div>
</template>

<script>
import {
  getRelativeTime,
  processLink,
  shorten,
  showUITip,
} from '@/utils/utility'
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'

export default {
  name: 'CommunityPostComments',
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
      fetchCommentsEndpoint: endpoints.comment_system.post.fetch,
      commentMessage: '',
      isSendingComment: false,
      canSendComment: false,
      showPlaceholder: true,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  watch: {
    commentMessage(newValue, _) {
      this.canSendComment = newValue.trim().length > 0
    },
  },

  mounted() {},

  methods: {
    shorten,
    getRelativeTime,

    async fetchComments($state) {
      if (!this.fetchCommentsEndpoint) {
        $state.complete()
        return
      }
      try {
        const { results, next } = await this.$axios.$get(
          this.fetchCommentsEndpoint,
          { params: { postIdentifier: this.post.identifier } }
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

    async sendComment() {
      try {
        const { commentIdentifier } = await this.$axios.$post(
          endpoints.comment_system.post.create,
          {
            postIdentifier: this.post.identifier,
            message: this.commentMessage,
          }
        )

        const newComment = {
          id: Date.now(),
          userUID: this.user.uid,
          user: {
            photoURL: this.user.photoURL,
            displayName: this.user.displayName,
          },
          createdAt: Date.now(),
          message: this.commentMessage,
          postIdentifier: this.post.identifier,
          commentIdentifier,
        }
        this.comments.unshift(newComment)

        this.clearCommentInput()
        this.$refs.commentStart.scrollIntoView()

        await showUITip(this.$store, 'Comment Added', 'success')
      } catch (e) {
        await showUITip(this.$store, 'Network Error', 'error')
      } finally {
        this.isSendingComment = false
      }
    },

    async addComment() {
      if (this.canSendComment) {
        this.canSendComment = false
        this.isSendingComment = true

        await showUITip(this.$store, 'Adding Comment...', 'info')

        await this.sendComment()
      }
    },

    clearCommentInput() {
      this.commentMessage = ''
      this.$refs.textBox.textContent = ''
    },

    updateText() {
      this.commentMessage = this.$refs.textBox.textContent
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.community-post-comments-component {
  .comment {
    display: flex;

    img {
      width: 2 * $medium-unit;
      min-width: 2 * $medium-unit;
      height: 2 * $medium-unit;
      min-height: 2 * $medium-unit;
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

  .bottom-area {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: 4 * $xxx-large-unit;
    padding: $micro-unit;
    display: flex;
    align-items: center;
    background-color: $navigation-bar-color;
    box-shadow: $up-only-box-shadow;

    $image-size: 2 * $medium-unit;

    img {
      min-width: $image-size;
      width: $image-size;
      min-height: $image-size;
      height: $image-size;
      object-position: center;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
      aspect-ratio: 1;
    }

    .text-box {
      border: 1px solid #4a4a4a;
      background-color: $body-bg-alternate;
      width: 100%;
      word-break: break-all;
      margin: 0 $micro-unit;
      min-height: 2 * $x-large-unit;
      max-height: 3 * $xxx-large-unit;
      padding: $micro-unit $milli-unit;
      border-radius: $micro-unit;
      overflow: scroll;
      outline: 0 none;
      display: flex;
      align-items: center;

      &:focus(:placeholder-shown) {
        color: $secondary-matte;
        border: 1px solid $secondary-matte;
      }
    }

    button {
      padding: 0;
      color: $secondary-matte;
      min-width: auto;
      width: 64px;
      min-height: 2 * $x-large-unit;
      height: auto;
    }
  }
}
</style>
