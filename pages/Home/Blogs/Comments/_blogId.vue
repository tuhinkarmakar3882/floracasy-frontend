<template>
  <div class="blog-comment-page">
    <AppBarHeader sticky>
      <template #title>
        {{ pageTitle }}
      </template>
    </AppBarHeader>

    <main ref="mainSection" v-if="blog">
      <header class="px-4">
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

      <hr class="my-4 mx-2 faded-divider" />

      <section class="comments-container">
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
      </section>

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
      <section class="bottom-area">
        <img v-if="user" :src="user.photoURL" alt="profile-image" />
        <input
          v-model="commentMessage"
          :disabled="isSendingComment"
          placeholder="Add a comment..."
          type="text"
          @keyup.enter="addComment"
        />
        <RippleButton
          :disabled="!canSendComment"
          :loading="isSendingComment"
          :on-click="addComment"
          style="background: transparent !important"
        >
          <span class="mdi mdi-send" />
        </RippleButton>
      </section>
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
  display: grid;
  grid-template-rows: 56px auto 64px;

  &::-webkit-scrollbar {
    display: none;
  }

  main {
    height: calc(100vh - 120px);
    max-width: $large-screen;
    width: 100%;
    margin: auto;
    overflow: scroll;

    header {
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
  }

  footer {
    width: 100%;
    max-width: $large-screen;
    margin: auto;

    .bottom-area {
      padding: $micro-unit;
      height: 2 * $xx-large-unit;
      display: flex;
      align-items: center;
      background-color: $navigation-bar-color;
      box-shadow: $up-only-box-shadow;

      $size: 2 * $medium-unit;

      img {
        width: $size;
        min-width: $size;
        height: $size;
        min-height: $size;
        object-position: center;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: $default-box-shadow;
      }

      input {
        border: 1px solid #4a4a4a;
        background-color: $body-bg-alternate;
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
        min-width: auto;
        font-size: 26px;
        padding: 0;
        color: $secondary-matte;
      }
    }
  }
}
</style>
