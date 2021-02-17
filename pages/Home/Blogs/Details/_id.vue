<template>
  <AppFeel
    :on-back="navigationRoutes.Home.DashBoard"
    auto-hide
    class="blog-details-page"
    custom-header
  >
    <template slot="app-bar-custom-header">
      <h5
        v-ripple
        class="px-5 mdi mdi-arrow-left"
        style="height: 56px; display: flex; align-items: center"
        @click="handleBackButtonPress"
      />
      <h6 v-ripple>
        <nuxt-link
          :to="navigationRoutes.index"
          class="brand-name no-underline"
          style="color: white !important"
        >
          Floracasy
        </nuxt-link>
      </h6>
      <nuxt-link
        v-if="FeatureToggleMessageService"
        v-ripple
        :to="navigationRoutes.Home.Messages.index"
        class="ml-auto px-6"
        style="height: 56px; display: flex; align-items: center"
      >
        <h5 class="mdi mdi-message-text" />
      </nuxt-link>
    </template>

    <template slot="main">
      <div v-if="blog" class="my-6 blog">
        <section class="px-4">
          <p class="mb-1" style="display: flex !important">
            <nuxt-link
              v-ripple
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
            <strong class="mx-1">IN</strong>
            <nuxt-link
              v-ripple
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
          <h3 class="blog-title mb-4">
            {{ blog.title }}
          </h3>
          <small class="timestamp">
            <span class="mdi mdi-clock-time-nine-outline" />
            {{ parseTimeUsingStandardLibrary(blog.createdAt) }}
          </small>

          <div class="view-count mt-4">
            <section>
              <i class="mdi mdi-eye mdi-18px mr-2" />
              <small>{{ blog.totalViews }}</small>
            </section>
            <!--            <section class="ml-4 pl-4">-->
            <!--              <i class="mdi mdi-clock mdi-18px mr-2" />-->
            <!--              <small>5 min</small>-->
            <!--            </section>-->
          </div>

          <hr v-if="!blog.coverImage" class="faded-divider" />

          <img
            v-if="blog.coverImage"
            :alt="blog.title"
            :src="blog.coverImage"
            class="mt-5 blog-intro-image"
            style="width: 100%; object-fit: cover; max-height: 250px"
          />
          <p v-if="blog.subtitle" class="my-4">
            {{ blog.subtitle }}
          </p>
        </section>

        <section class="blog-body px-4 pb-8">
          <article v-html="noXSS(blog.content, sanitizationConfig)" />
        </section>
      </div>

      <aside v-else class="loading-container">
        <LoadingIcon />
      </aside>
    </template>

    <template slot="footer">
      <section v-if="blog" class="actions">
        <div v-ripple class="like" @click="like">
          <i
            :class="blog.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
            class="mdi"
          />
        </div>
        <div v-ripple class="comment" @click="openCommentPage">
          <i class="mdi mdi-message-text" />
        </div>
        <div v-ripple class="save" @click="updateSavedBlogPreference">
          <i
            :class="
              blog.isSavedForLater ? 'mdi-bookmark' : 'mdi-bookmark-outline'
            "
            class="mdi"
          />
        </div>
        <div v-ripple class="share" @click="share">
          <i class="mdi mdi-share-variant" />
        </div>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import sanitizeHtml from 'sanitize-html'
import AppFeel from '@/components/global/Layout/AppFeel'
import LoadingIcon from '@/components/global/LoadingIcon'
import endpoints from '@/api/endpoints'

import {
  parseTimeUsingStandardLibrary,
  shorten,
  showUITip,
} from '@/utils/utility'
import 'highlight.js/styles/monokai.css'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { sanitizationConfig } from '@/config/sanitizationConfig'
import { mapGetters } from 'vuex'

const { FeatureToggleMessageService } = require('~/environmentalVariables')

export default {
  name: 'BlogDetails',
  components: { AppFeel, LoadingIcon },

  async asyncData({ $axios, redirect, params, from: prevURL }) {
    try {
      const response = await $axios.$get(endpoints.blog.detail, {
        params: { identifier: params.id },
      })
      return { blog: response, prevURL }
    } catch (e) {
      redirect('/error')
    }
  },

  data() {
    return {
      pageTitle: this.$route.params.name,
      FeatureToggleMessageService,
      prevURL: null,
      navigationRoutes,
      noXSS: sanitizeHtml,
      blog: null,
      sanitizationConfig,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
    await this.incrementViewCount()
  },

  methods: {
    parseTimeUsingStandardLibrary,
    shorten,

    async incrementViewCount() {
      if (this.user) {
        await this.$axios.$post(
          endpoints.blog.updateViewCount.replace(
            '{identifier}',
            this.$route.params.id
          ),
          {},
          {
            withCredentials: true,
          }
        )
      }
    },

    async navigateTo(path) {
      await this.$router.push(path)
    },

    async sendLikeRequest() {
      try {
        const action = await this.$axios
          .$post(endpoints.blog.like, {
            identifier: this.blog.identifier,
          })
          .then(({ action }) => action)

        action === 'like' ? this.blog.totalLikes++ : this.blog.totalLikes--

        this.blog.isLiked = !this.blog.isLiked
      } catch (e) {
        await showUITip(this.$store, 'Network Error', 'error', true)
      }
    },
    async sendUpdateSavedBlogRequest() {
      try {
        await this.$axios.$post(endpoints.blog.addOrRemoveToSaveBlogs, {
          identifier: this.blog.identifier,
        })
        this.blog.isSavedForLater = !this.blog.isSavedForLater
      } catch (e) {
        await showUITip(this.$store, 'Network Error', 'error', true)
      }
    },

    async like() {
      if (this.user) {
        await this.sendLikeRequest()
      } else {
        await this.navigateTo(navigationRoutes.Authentication.SignInToContinue)
      }
    },

    async updateSavedBlogPreference() {
      if (this.user) {
        await this.sendUpdateSavedBlogRequest()
      } else {
        await this.navigateTo(navigationRoutes.Authentication.SignInToContinue)
      }
    },

    async openCommentPage() {
      await this.$router.push(
        navigationRoutes.Home.Blogs.Comments.BlogId.replace(
          '{BlogId}',
          this.blog.identifier
        )
      )
    },

    async share() {
      if (navigator.share) {
        try {
          await navigator.share({
            title: this.blog.title + '- Floracasy',
            text: this.blog.subtitle,
            url: navigationRoutes.Home.Blogs.Details.replace(
              '{id}',
              this.blog.id
            ),
          })
          try {
            await this.$axios
              .$post(endpoints.blog.share, {
                identifier: this.blog.identifier,
              })
              .then(() => {
                this.blog.totalShares++
              })
          } catch (e) {
            this.blog.totalShares--
          }
        } catch (error) {
          await showUITip(this.$store, 'Unable to share', 'error')
        }
      } else {
        await showUITip(
          this.$store,
          'Not Yet Supported on this Browser',
          'warning',
          true
        )
      }
    },

    async handleBackButtonPress() {
      if (this.prevURL) {
        await this.$router.back()
      } else {
        await this.$router.replace(navigationRoutes.index)
      }
    },
  },

  head() {
    return {
      title: this.blog.title,
      meta: [
        {
          hid: 'description',
          name: this.blog.title,
          content: this.blog.subtitle,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
@import 'assets/all-variables';

.blog-details-page {
  .blog {
    max-width: $max-width;
    word-break: break-word;
    margin-left: auto;
    margin-right: auto;

    .blog-intro-image {
      box-shadow: $down-only-box-shadow;
      border-radius: 4px;
    }

    .view-count {
      display: flex;

      * {
        display: block;
      }

      section {
        display: flex;
        align-items: center;

        &:nth-child(2) {
          border-left: 1px solid $primary;
        }
      }
    }
  }

  .actions {
    border-radius: 0;
    position: fixed;
    width: 100%;
    z-index: $bring-to-front;
    bottom: 0;
    background-color: $nav-bar-bg;
    height: 56px;
    font-family: $Nunito-Sans;
    color: $secondary;
    box-shadow: $up-only-box-shadow;
    font-size: $large-unit;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 2 * $large-unit;
      width: 100%;
    }
  }

  .loading-container {
    text-align: center;
    display: grid;
    place-items: center;
    height: calc(100vh - 120px);
  }
}
</style>
