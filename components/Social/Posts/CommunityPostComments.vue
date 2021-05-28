<template>
  <div class="community-post-comments-component">
    <h4 class="px-4">Comments</h4>

    <main ref="commentStart" class="comments-container">
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
    </main>

    <client-only>
      <div class="pb-8 mb-8">
        <infinite-loading @infinite="fetchComments">
          <template slot="spinner">
            <div class="px-4">
              <section class="sample-response my-4">
                <ImageSkeleton height="40px" radius="50%" width="40px" />
                <LineSkeleton height="100px" />
              </section>
              <section class="sample-response my-4">
                <ImageSkeleton height="40px" radius="50%" width="40px" />
                <LineSkeleton height="100px" />
              </section>
              <section class="sample-response my-4">
                <ImageSkeleton height="40px" radius="50%" width="40px" />
                <LineSkeleton height="100px" />
              </section>
            </div>
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

    <footer>
      <CommentBox class="comment-box">
        <template #text-box>
          <InputField>
            <template #input-field>
              <textarea
                v-model="commentMessage"
                :disabled="isSendingComment"
                placeholder="Say your Thoughts Here!"
                @keyup.shift.enter="addComment"
              />
            </template>
          </InputField>
        </template>

        <template #action-button>
          <i
            :class="[
              canSendComment ? 'vibrant' : 'disabled',
              isSendingComment ? 'mdi-spin mdi-loader' : 'mdi-send',
            ]"
            class="mdi mdi-36px"
            @click="addComment"
          />
        </template>
      </CommentBox>
    </footer>
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
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'

export default {
  name: 'CommunityPostComments',
  components: { LineSkeleton, ImageSkeleton },
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

        this.commentMessage = ''
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

    updateText() {
      this.commentMessage = this.$refs.textBox.innerText
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.community-post-comments-component {
  footer {
    .comment-box {
      max-width: $large-screen;
    }
  }
  section.sample-response {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 16px;
  }
}
</style>
