<template>
  <div class="blog-details-page py-4">
    <section v-if="blog" class="px-4">
      <p class="mb-2">
        <nuxt-link to="/Home/Account/BlogDetails" class="no-underline">
          {{ blog.author.displayName }}
        </nuxt-link>
        IN
        <nuxt-link to="/Home/Blogs/CategoryWise" class="no-underline">
          {{ blog.category.name }}
        </nuxt-link>
      </p>
      <h3 class="blog-title mb-4">
        {{ blog.title }}
      </h3>
      <small class="timestamp">
        <span class="mdi mdi-clock-time-nine-outline" />
        {{ parse(blog.createdAt) }}
      </small>

      <img
        v-if="blog.coverImage"
        class="my-5 blog-intro-image"
        :src="blog.coverImage"
        :alt="blog.title"
        style="width: 100%; object-fit: cover; max-height: 250px"
      />
      <article
        class="blog-body my-6"
        v-html="noXSS(blog.content, sanitizationConfig)"
      />
    </section>
    <div
      v-else
      class="text-center"
      style="display: grid; place-items: center; height: calc(100vh - 120px)"
    >
      <LoadingIcon />
    </div>
  </div>
</template>

<script>
import sanitizeHtml from 'sanitize-html'
import LoadingIcon from '@/components/LoadingIcon'
import endpoints from '@/api/endpoints'
import utility from '@/utils/utility'

export default {
  name: 'BlogDetails',
  components: { LoadingIcon },
  layout: 'MobileApp',

  async asyncData({ $axios, params }) {
    const response = await $axios.$get(endpoints.blog.detail, {
      params: { id: params.id },
    })
    return { blog: response.details }
  },

  data() {
    return {
      parse: utility.timeStringParser,
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
          h1: ['class'],
          h2: ['class'],
          h3: ['class'],
          h4: ['class'],
          h5: ['class'],
          h6: ['class'],
          p: ['class'],
          span: ['class', 'style'],
          img: ['src'],
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

  head() {
    return {
      title: this.blog.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'My custom description',
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
