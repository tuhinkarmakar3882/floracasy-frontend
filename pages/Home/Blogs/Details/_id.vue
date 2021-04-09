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
        v-if="useMessageService"
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
        <section class="px-4 pt-4">
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

          <h1 class="blog-title mb-4">
            {{ blog.title }}
          </h1>

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

        <section class="blog-body pb-8">
          <InArticleAd key="Top-Ad" />
          <article
            ref="articleContent"
            class="my-6 px-4 ql-editor"
            v-html="cleanHTML(blog.content)"
          />
          <InArticleAd key="Bottom-Ad" />
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
          <i
            :class="
              useShareFallBack ? 'mdi-close danger-light' : 'mdi-share-variant'
            "
            class="mdi"
          />
        </div>
      </section>

      <transition name="slide-up">
        <ShareFallbackForDesktop
          v-if="useShareFallBack"
          :description="blog.title"
          :handle-close="hideFallback"
          :link-url="`https://floracasy.com/Home/Blogs/Details/${blog.identifier}`"
          fixed-mode
        />
      </transition>
    </template>
  </AppFeel>
</template>

<script>
import endpoints from '@/api/endpoints'
import '~/assets/override/quill.scss'

import {
  cleanHTML,
  parseTimeUsingStandardLibrary,
  shorten,
  showUITip,
} from '@/utils/utility'
import 'highlight.js/styles/monokai.css'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { mapGetters } from 'vuex'

const { useMessageService } = require('~/environmentVariables')

export default {
  name: 'BlogDetails',
  layout: 'FullScreen',

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
      useMessageService,
      prevURL: null,
      navigationRoutes,
      blog: null,
      playbackStarted: false,
      useShareFallBack: false,
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
    cleanHTML,
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
            text:
              this.blog.title +
              ' - ' +
              this.blog.subtitle.substr(0, 40) +
              '... Read More on Floracasy',
            url: navigationRoutes.Home.Blogs.Details.replace(
              '{id}',
              this.blog.identifier
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
        this.useShareFallBack = !this.useShareFallBack
      }
    },
    hideFallback() {
      this.useShareFallBack = false
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
          name: 'keywords',
          content:
            this?.blog?.title +
            ',' +
            this?.blog?.category?.name +
            this?.blog?.keywords?.split(',')?.reduce((acc, elm) => {
              return `${acc}, ${elm}`
            }, ''),
        },
        {
          name: 'description',
          content: this?.blog?.subtitle,
        },
        {
          name: 'og:title',
          content: this?.blog?.title,
        },
        {
          name: 'og:description',
          content: this?.blog?.subtitle,
        },
        {
          name: 'og:image',
          content: this?.blog?.coverImage || 'https://floracasy.com/icon.png',
        },
        {
          name: 'author',
          content: this?.blog?.author?.displayName || 'Floracasy Team',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.blog-details-page {
  .blog {
    max-width: $large;
    margin: auto;
    word-break: break-word;

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
      }
    }

    .blog-title {
      font-size: 1.8rem;
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

  .floating-action-button {
    bottom: 64px;
    min-width: auto;
  }
}
</style>
