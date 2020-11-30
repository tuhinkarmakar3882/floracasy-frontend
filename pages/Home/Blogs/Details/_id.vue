<template>
  <AppFeel
    custom-header
    auto-hide
    class="blog-details-page"
    :on-back="navigationRoutes.Home.DashBoard"
  >
    <template slot="app-bar-custom-header">
      <h5
        v-ripple=""
        class="mdi mdi-arrow-left"
        @click="handleBackButtonPress"
      />
      <h6 v-ripple="" class="ml-4">
        <nuxt-link
          class="brand-name no-underline"
          to="/"
          style="color: white !important"
        >
          Floracasy
        </nuxt-link>
      </h6>
      <nuxt-link v-ripple="" to="/Home/Messages" class="ml-auto">
        <h5 class="mdi mdi-message-text" />
      </nuxt-link>
    </template>
    <template slot="main">
      <div v-if="blog" class="my-6">
        <section class="px-4">
          <p class="mb-2" style="display: flex !important">
            <nuxt-link
              :to="navigationRoutes.Home.Account.Overview + blog.author.uid"
              class="no-underline"
            >
              {{ blog.author.displayName }}
            </nuxt-link>
            <strong class="mx-1">IN</strong>
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
          <h3 class="blog-title mb-4">
            {{ blog.title }}
          </h3>
          <small class="timestamp">
            <span class="mdi mdi-clock-time-nine-outline" />
            {{ parseTimeUsingStandardLibrary(blog.createdAt) }}
          </small>

          <img
            v-if="blog.coverImage"
            class="mt-5 blog-intro-image"
            :src="blog.coverImage"
            :alt="blog.title"
            style="width: 100%; object-fit: cover; max-height: 250px"
          />
          <p class="my-4">
            {{ blog.subtitle }}
          </p>
        </section>
        <section class="blog-body pb-8">
          <article class="ql-snow">
            <div
              class="ql-editor"
              v-html="noXSS(blog.content, sanitizationConfig)"
            />
          </article>
        </section>
      </div>
      <div
        v-else
        class="text-center"
        style="display: grid; place-items: center; height: calc(100vh - 120px)"
      >
        <LoadingIcon />
      </div>
    </template>
    <template slot="footer">
      <section class="actions">
        <div v-ripple class="like" @click="like">
          <i
            class="mdi"
            :class="blog.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
          />
        </div>
        <div v-ripple="" class="comment" @click="comment">
          <i class="mdi mdi-message-text" />
        </div>
        <div v-ripple="" class="save" @click="addOrRemoveToSaveBlogs">
          <i
            class="mdi"
            :class="
              blog.isSavedForLater ? 'mdi-bookmark' : 'mdi-bookmark-outline'
            "
          />
        </div>
        <div v-ripple="" class="share" @click="share">
          <i class="mdi mdi-share-variant" />
        </div>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import sanitizeHtml from 'sanitize-html'
import LoadingIcon from '@/components/LoadingIcon'
import endpoints from '@/api/endpoints'
import { parseTimeUsingStandardLibrary, shorten } from '@/utils/utility'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/tomorrow.css'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import AppFeel from '~/components/Layout/AppFeel'

export default {
  name: 'BlogDetails',
  components: { AppFeel, LoadingIcon },
  layout({ store }) {
    return store.state.authState ? '' : 'PublicRoutes'
  },

  async asyncData({ $axios, params, from: prevURL }) {
    const response = await $axios.$get(endpoints.blog.detail, {
      params: { id: params.id },
    })
    return { blog: response, prevURL }
  },

  data() {
    return {
      pageTitle: this.$route.params.name,
      prevURL: null,
      navigationRoutes,
      noXSS: sanitizeHtml,
      sanitizationConfig: {
        allowedTags: [
          'address',
          'article',
          'aside',
          'footer',
          'header',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'hgroup',
          'main',
          'nav',
          'section',
          'blockquote',
          'dd',
          'div',
          'dl',
          'dt',
          'figcaption',
          'figure',
          'hr',
          'li',
          'main',
          'ol',
          'p',
          'pre',
          'ul',
          'a',
          'abbr',
          'b',
          'bdi',
          'bdo',
          'br',
          'cite',
          'code',
          'data',
          'dfn',
          'em',
          'i',
          'kbd',
          'mark',
          'q',
          'rb',
          'rp',
          'rt',
          'rtc',
          'ruby',
          's',
          'samp',
          'small',
          'span',
          'strong',
          'sub',
          'sup',
          'time',
          'u',
          'var',
          'wbr',
          'caption',
          'col',
          'colgroup',
          'table',
          'tbody',
          'td',
          'tfoot',
          'th',
          'thead',
          'tr',
        ],
        disallowedTagsMode: 'discard',
        allowedAttributes: {
          a: ['href', 'name', 'target'],
          h1: ['class', 'style'],
          h2: ['class', 'style'],
          h3: ['class', 'style'],
          h4: ['class', 'style'],
          h5: ['class', 'style'],
          h6: ['class', 'style'],
          p: ['class', 'style'],
          span: ['class', 'style'],
          img: ['src', 'style', 'alt'],
        },
        selfClosing: [
          'img',
          'br',
          'hr',
          'area',
          'base',
          'basefont',
          'input',
          'link',
          'meta',
        ],
        allowedSchemes: ['http', 'https', 'mailto'],
        allowedSchemesByTag: {},
        allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
        allowProtocolRelative: true,
        enforceHtmlBoundary: true,
      },
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: -1 })
  },

  methods: {
    parseTimeUsingStandardLibrary,
    shorten,

    navigateTo(path) {
      this.$router.push(path)
    },
    async like() {
      try {
        const action = await this.$axios
          .$post(endpoints.blog.like, {
            blog_id: this.blog.id,
          })
          .then(({ action }) => action)
        action === 'like' ? this.blog.totalLikes++ : this.blog.totalLikes--
        this.blog.isLiked = !this.blog.isLiked
      } catch (e) {
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Network Error',
          notificationType: 'error',
          dismissible: true,
        })
      }
    },

    async addOrRemoveToSaveBlogs() {
      try {
        await this.$axios.$post(endpoints.blog.addOrRemoveToSaveBlogs, {
          blog_id: this.blog.id,
        })
        this.blog.isSavedForLater = !this.blog.isSavedForLater
      } catch (e) {
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Network Error',
          notificationType: 'error',
          dismissible: true,
        })
      }
    },

    async comment() {
      await this.$router.push(
        navigationRoutes.Home.Blogs.Comments.BlogId.replace(
          '{BlogId}',
          this.blog.id
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
                blog_id: this.blog.id,
              })
              .then(() => {
                this.blog.totalShares++
              })
          } catch (e) {
            this.blog.totalShares--
          }
        } catch (error) {
          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: 'Unable to share',
            notificationType: 'error',
            dismissible: true,
          })
        }
      } else {
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Not Yet Supported on this Browser',
          notificationType: 'warning',
          dismissible: true,
        })
      }
    },

    async handleBackButtonPress() {
      if (this.prevURL) {
        await this.$router.back()
      } else {
        await this.$router.replace({
          path: navigationRoutes.Home.DashBoard,
          query: {
            tabNumber: 2,
          },
        })
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
  .blog-intro-image {
    box-shadow: $down-only-box-shadow;
  }

  .blog-body {
    blockquote,
    ul,
    ol,
    hr {
      margin: $large-unit 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      position: relative;
    }

    h1,
    h2,
    h3 {
      margin: $large-unit 0;
    }

    h4,
    h5,
    h6 {
      margin: $medium-unit 0;
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
}
</style>
