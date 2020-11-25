<template>
  <AppFeel
    custom-header
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
        <section class="blog-body">
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
  </AppFeel>
</template>

<script>
import sanitizeHtml from 'sanitize-html'
import LoadingIcon from '@/components/LoadingIcon'
import endpoints from '@/api/endpoints'
import { parseTimeUsingStandardLibrary } from '@/utils/utility'
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
      margin: $large-unit 0;

      //&::after {
      //  content: '';
      //  border-radius: $standard-unit;
      //  position: absolute;
      //  bottom: -$micro-unit;
      //  left: 0;
      //  height: $nano-unit;
      //  width: clamp(100px, 20%, 250px);
      //  background-color: darken($secondary-matte, $lighten-percentage);
      //}
    }
  }
}
</style>
