<template>
  <div class="blog-details-page">
    <AppBarHeader
      :fallback-page="fallbackPage"
      :previous-page="previousPage"
      no-right-padding
    >
      <template #title>
        <h6>
          <nuxt-link
            :to="navigationRoutes.Home.DashBoard"
            class="brand-name no-underline"
            style="color: white !important"
          >
            Floracasy
          </nuxt-link>
        </h6>
      </template>

      <template #action-button>
        <nuxt-link
          v-if="useMessageService"
          v-ripple
          :to="navigationRoutes.Home.Messages.index"
          class="ml-auto px-6"
          style="height: 56px; display: flex; align-items: center"
        >
          <h5 class="mdi mdi-message-text-outline" />
        </nuxt-link>
      </template>
    </AppBarHeader>

    <FallBackLoader v-if="!blog && !contentLoaded" class="my-8">
      <template #fallback>
        <p class="text-center">Loading Article</p>
      </template>
    </FallBackLoader>

    <transition v-else-if="quotaIsExhausted && !user" name="scale-up">
      <aside class="quota-exhausted">
        <h1>Keep the Flow Going!</h1>
        <p class="my-4">
          Hope you're having a good time here!<br />
          Since you've exhausted your anonymous free reads, Let's get you signed
          up!
        </p>

        <section class="mt-2 mb-4">
          <KeyPoint
            :tick-size="20"
            class="keypoint"
            point="Unlimited Articles"
            text-color="white"
            tick-color="#9c9aff"
          />
          <KeyPoint
            :tick-size="20"
            class="keypoint"
            point="Discover People"
            text-color="white"
            tick-color="#9c9aff"
          />
          <KeyPoint
            :tick-size="20"
            class="keypoint"
            point="Meet & Communicate"
            text-color="white"
            tick-color="#9c9aff"
          />
          <KeyPoint
            :tick-size="20"
            class="keypoint"
            point="And a Lot More!"
            text-color="white"
            tick-color="#9c9aff"
          />
        </section>

        <GoogleSignInButton class="secondary-btn" style="width: 290px" />
      </aside>
    </transition>

    <main v-else class="my-6 blog">
      <header class="px-4 pt-4">
        <p>
          <nuxt-link v-ripple :to="userAccountLink" class="no-underline">
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

        <h1>{{ blog.title }}</h1>

        <small class="muted">
          <i class="mdi mdi-clock-time-nine-outline" />
          {{ parseTimeUsingStandardLibrary(blog.createdAt) }}
        </small>

        <div class="extra-info mt-4">
          <section>
            <i class="mdi mdi-eye mdi-18px mr-2" />
            <small>{{ blog.totalViews }}</small>
          </section>
        </div>

        <hr class="faded-divider my-4" />

        <section>
          <i class="mdi mdi-book-open-variant mr-2" />
          <small>Approx {{ approxReadingTime }} min read</small>
        </section>

        <hr v-if="!blog.coverImage" class="faded-divider" />

        <img
          v-if="blog.coverImage"
          :alt="blog.title"
          :src="blog.coverImage"
          class="mt-5 cover-photo"
        />

        <p v-if="blog.subtitle" class="my-4">
          {{ blog.subtitle }}
        </p>
      </header>

      <section class="blog-body pb-8 mb-4">
        <InFeedAd key="Top-Ad" />

        <article
          ref="articleContent"
          class="my-6 pb-4 px-4 ql-editor"
          v-html="preprocess(blog.content)"
        />

        <InFeedAd key="Bottom-Ad" />
      </section>
    </main>

    <footer v-if="!quotaIsExhausted || user" class="actions">
      <i v-ripple :class="blogLikeStatus" class="mdi like" @click="like" />

      <i
        v-ripple
        class="mdi mdi-message-text comment"
        @click="openCommentPage"
      />

      <i
        v-ripple
        :class="blogSavedStatus"
        class="mdi save"
        @click="updateSavedBlogPreference"
      />

      <i v-ripple :class="dynamicShareClass" class="mdi share" @click="share" />

      <transition name="slide-up">
        <ShareFallbackForDesktop
          v-if="useShareFallBack"
          :description="blog.title"
          :handle-close="hideFallback"
          :link-url="`https://floracasy.com/Home/Blogs/Details/${blog.identifier}`"
          fixed-mode
        />
      </transition>
    </footer>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'
import '~/assets/override/quill.scss'
import 'quill/dist/quill.snow.css'
import hljs from 'highlight.js/lib/core'

import {
  cleanHTML,
  parseTimeUsingStandardLibrary,
  shorten,
  showUITip,
} from '@/utils/utility'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { mapGetters } from 'vuex'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import shell from 'highlight.js/lib/languages/shell'
import yaml from 'highlight.js/lib/languages/yaml'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import java from 'highlight.js/lib/languages/java'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import vbscriptHtml from 'highlight.js/lib/languages/vbscript-html'
import AppBarHeader from '~/components/Layout/AppBarHeader'

const { useMessageService } = require('~/environmentVariables')

export default {
  name: 'BlogDetails',
  components: { AppBarHeader },
  layout: 'FullScreen',

  async asyncData({ $axios, redirect, params, from: previousPage }) {
    try {
      const response = await $axios.$get(endpoints.blog.detail, {
        params: { identifier: params.id },
      })
      return { blog: response, previousPage }
    } catch (e) {
      redirect('/error')
    }
  },

  data() {
    return {
      pageTitle: this.$route.params.name,
      useMessageService,
      previousPage: null,
      fallbackPage: navigationRoutes.Home.DashBoard,
      navigationRoutes,
      blog: null,
      playbackStarted: false,
      useShareFallBack: false,
      approxReadingTime: 0,
      quotaIsExhausted: false,
      contentLoaded: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
    userAccountLink() {
      if (!this.blog) return null
      return navigationRoutes.Home.Account.Overview.replace(
        '{userUID}',
        this.blog.author.uid
      )
    },
    dynamicShareClass() {
      return this.useShareFallBack
        ? 'mdi-close danger-light'
        : 'mdi-share-variant'
    },
    blogSavedStatus() {
      return this.blog.isSavedForLater ? 'mdi-bookmark' : 'mdi-bookmark-outline'
    },
    blogLikeStatus() {
      return this.blog.isLiked ? 'mdi-heart' : 'mdi-heart-outline'
    },
  },

  watch: {
    contentLoaded() {
      this.calculateReadingTime()
      this.pushAds()
    },
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })

    await this.checkForQuotaExhaustion()
    await this.incrementViewCount()
    await this.calculateReadingTime()

    this.setupHighlighting()
  },

  methods: {
    cleanHTML,
    parseTimeUsingStandardLibrary,
    shorten,

    setupHighlighting() {
      hljs.registerLanguage('javascript', javascript)
      hljs.registerLanguage('bash', bash)
      hljs.registerLanguage('typescript', typescript)
      hljs.registerLanguage('python', python)
      hljs.registerLanguage('java', java)
      hljs.registerLanguage('c', c)
      hljs.registerLanguage('cpp', cpp)
      hljs.registerLanguage('vbscriptHtml', vbscriptHtml)
      hljs.registerLanguage('json', json)
      hljs.registerLanguage('css', css)
      hljs.registerLanguage('scss', scss)
      hljs.registerLanguage('shell', shell)
      hljs.registerLanguage('yaml', yaml)

      setTimeout(() => {
        document.querySelectorAll('pre').forEach((block) => {
          hljs.highlightBlock(block)
        })
      }, 3000)
    },
    pushAds() {
      try {
        const totalAdBlocks = document.querySelectorAll('ins').length - 2
        for (let adblock = 0; adblock < totalAdBlocks; adblock++) {
          ;(window.adsbygoogle || []).push({})
        }
      } catch (e) {}
    },

    preprocess(html) {
      setTimeout(this.pushAds, 3000)
      return this.cleanHTML(html).replaceAll(
        `<p><br /></p><p><br /></p>`,
        `<p><br /></p><p><br /></p> <ins class="adsbygoogle" data-ad-client="ca-pub-9863542606738743" data-ad-format="fluid" data-ad-layout-key="-50+c6-23-9g+y5" data-ad-slot="2010436071" style="display: block"></ins>`
      )
    },

    async incrementViewCount() {
      if (this.user) {
        await this.$axios.$post(
          endpoints.blog.updateViewCount.replace(
            '{identifier}',
            this.$route.params.id
          )
        )
      }
    },

    async navigateTo(path) {
      await this.$router.push(path)
    },

    async calculateReadingTime() {
      this.approxReadingTime = Math.ceil(
        this.$refs?.articleContent?.textContent?.split(' ')?.length / 220
      )
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
              this.blog?.title +
              ' - ' +
              this.blog?.subtitle?.substr(0, 40) +
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

    async checkForQuotaExhaustion() {
      let quota = this.$cookies.get('anonymous_read_quota')

      if (quota === undefined) {
        await this.$cookies.set('anonymous_read_quota', 2)
        return
      }

      if (quota > 0 && quota <= 2) {
        --quota
        await this.$cookies.set('anonymous_read_quota', quota)
        return
      }

      this.quotaIsExhausted = true
      this.contentLoaded = true
    },
  },

  head() {
    return {
      title: this.blog.title,
      description: this.blog?.subtitle || 'Where Knowledge Gets Socialized',
      meta: [
        {
          name: 'title',
          content: this.blog?.title,
        },
        {
          name: 'keywords',
          content:
            this.blog?.title +
            ',' +
            this.blog?.category?.name +
            this.blog?.keywords?.split(',')?.reduce((acc, elm) => {
              return `${acc}, ${elm}`
            }, ''),
        },
        {
          name: 'description',
          content: this.blog?.subtitle,
        },
        {
          name: 'author',
          content: this.blog?.author?.displayName || 'Floracasy Team',
        },

        {
          name: 'og:type',
          content: 'website',
        },
        {
          name: 'og:url',
          content: this.$route.fullPath,
        },
        {
          name: 'og:title',
          content: this.blog?.title,
        },
        {
          name: 'og:description',
          content: this.blog?.subtitle,
        },
        {
          name: 'og:image',
          content: this.blog?.coverImage || 'https://floracasy.com/icon.png',
        },

        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:url',
          content: this.$route.fullPath,
        },
        {
          name: 'twitter:title',
          content: this.blog?.title,
        },
        {
          name: 'twitter:description',
          content: this.blog?.subtitle,
        },
        {
          name: 'twitter:image',
          content: this.blog?.coverImage || 'https://floracasy.com/icon.png',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.blog-details-page {
  main.blog {
    max-width: $large-screen;
    margin: auto;
    word-break: break-word;
    position: relative;

    header {
      p:first-child {
        display: flex;
        flex-wrap: wrap;
      }

      img.cover-photo {
        box-shadow: $down-only-box-shadow;
        border-radius: 4px;
        width: 100%;
        object-fit: cover;
        max-height: 250px;
      }

      .extra-info {
        display: flex;

        section {
          display: flex;
          align-items: center;

          * {
            display: block;
          }

          &:first-child {
            margin-right: $micro-unit;
          }
        }
      }
    }
  }

  aside.quota-exhausted {
    height: calc(100vh - 56px);
    background: $body-bg;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    padding: $standard-unit;
  }

  footer.actions {
    position: fixed;
    width: 100%;
    z-index: $bring-to-front;
    bottom: 0;
    background-color: $navigation-bar-color;
    height: 2 * $x-large-unit;
    box-shadow: $up-only-box-shadow;
    display: flex;
    align-items: center;
    flex: 1 1 100%;

    $large-break-point: $large-screen + (3 * $xxx-large-unit);

    @media screen and (min-width: $large-break-point) {
      position: fixed;
      top: calc(50% - 10.5rem);
      bottom: unset;
      left: 0;
      flex-direction: column;
      height: 21rem;
      width: 2 * $x-large-unit;
      background: $card-bg-alternate;
      border-top-right-radius: $standard-unit;
      border-bottom-right-radius: $standard-unit;
      box-shadow: $right-only-box-shadow;
    }

    i {
      font-size: $large-unit;
      color: $secondary;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 2 * $x-large-unit;

      @media screen and (min-width: $large-break-point) {
        height: 5.5rem;
      }
    }
  }

  ins {
    margin: 1rem auto;
  }
}
</style>
