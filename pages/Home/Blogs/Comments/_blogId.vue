<template>
  <div class="blog-comment-page">
    <AppBarHeader :previous-page="previousPage" :fallback-page="fallbackPage">
      <template #title>
        {{ pageTitle }}
      </template>
    </AppBarHeader>

    <header v-if="blog" class="px-4 pb-6" ref="mainSection">
      <section>
        <h6>{{ blog.title }}</h6>

        <nuxt-link v-ripple :to="blogDetailsPage" class="view-blog py-4">
          View Blog
        </nuxt-link>
      </section>

      <p>
        <nuxt-link :to="authorDetailsPage" class="no-underline">
          {{ blog.author.displayName }}
        </nuxt-link>

        <strong>IN</strong>

        <nuxt-link :to="exploreMorePage" class="no-underline">
          {{ blog.category.name }}
        </nuxt-link>
      </p>
    </header>

    <hr class="my-0 faded-divider" />

    <main class="comments-container">
      <transition-group name="slide-up">
        <Comment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :owner-uid="blog.author.uid"
          class="my-6 px-4"
          comment-type="Blog"
        />
      </transition-group>
      <aside>
        <client-only>
          <infinite-loading @infinite="fetchComments">
            <template #spinner>
              <FallBackLoader>
                <template #fallback>
                  <p class="text-center">Fetching Comments...</p>
                </template>
              </FallBackLoader>
            </template>

            <template #error>
              <p class="danger-light mb-8">Network Error</p>
            </template>

            <template #no-more>
              <p class="mb-8">No More Comments</p>
            </template>

            <template #no-results>
              <p class="mb-8">Be the first to comment on this!</p>
            </template>
          </infinite-loading>
        </client-only>
      </aside>
    </main>

    <footer>
      <CommentBox>
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
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'
import { getRelativeTime, processLink, showUITip } from '@/utils/utility'
import { mapGetters } from 'vuex'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import FallBackLoader from '~/components/Common/Tools/FallBackLoader'

export default {
  name: 'BlogComments',
  components: { FallBackLoader, AppBarHeader },
  middleware: 'isAuthenticated',

  async asyncData({ $axios, params, from: previousPage }) {
    const blog = await $axios.$get(endpoints.blog.info, {
      params: { identifier: params.blogId },
    })
    return { blog, previousPage }
  },

  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.MoreOptions.index,
      blog: null,
      navigationRoutes,
      pageTitle: 'Comments',
      comments: [],
      fetchCommentsEndpoint: endpoints.comment_system.blog.fetch,
      commentMessage: '',
      isSendingComment: false,
      canSendComment: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
    blogDetailsPage() {
      return navigationRoutes.Home.Blogs.Details.replace(
        '{id}',
        this.blog?.identifier
      )
    },
    authorDetailsPage() {
      return navigationRoutes.Home.Account.Overview.replace(
        '{userUID}',
        this.blog?.author?.uid
      )
    },
    exploreMorePage() {
      return navigationRoutes.Home.Blogs.CategoryWise.Name.replace(
        '{name}',
        this.blog?.category?.name
      )
    },
  },

  watch: {
    commentMessage(msg) {
      this.canSendComment = msg.trim().length > 0
    },
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  methods: {
    getRelativeTime,

    async fetchComments($state) {
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

    async addComment() {
      if (!this.canSendComment) return

      this.canSendComment = false
      this.isSendingComment = true
      await showUITip(this.$store, 'Adding Comment...', 'info')

      try {
        const { commentIdentifier } = await this.$axios.$post(
          endpoints.comment_system.blog.create,
          {
            blogIdentifier: this.$route.params.blogId,
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
          blogIdentifier: this.$route.params.blogId,
          commentIdentifier,
        }

        this.comments.unshift(newComment)
        this.commentMessage = ''

        await showUITip(this.$store, 'Comment Added', 'success')

        this.$refs.mainSection.scrollIntoView()
      } catch (e) {
        await showUITip(
          this.$store,
          'Failed to Add Comment. Please Retry',
          'error'
        )
      } finally {
        this.isSendingComment = false
      }
    },
  },

  head() {
    return {
      title: this.blog?.title || this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.blog-comment-page {
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }

  header {
    max-width: $large-screen;
    margin: auto;

    section {
      display: flex;
      align-items: center;

      h6 {
        width: 100%;
      }

      .view-blog {
        text-align: center;
        text-decoration: none;
        width: 5 * $xxx-large-unit;
        color: $secondary;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          height: $single-unit;
          width: 84px;
          bottom: 0;
          left: calc(50% - 42px);
          background: $secondary-matte;
        }
      }
    }
  }

  hr {
    max-width: $large-screen;
    margin-left: auto;
    margin-right: auto;
    box-shadow: $down-only-box-shadow;
  }

  main {
    max-width: $large-screen;
    width: 100%;
    overflow: scroll;
    margin: auto auto 120px;
  }
}
</style>
