<template>
  <div v-ripple class="blog-preview">
    <nuxt-link
      :class="[blog.coverImage && 'has-blog-image']"
      :to="blogDetailsPage"
    >
      <!--      <img v-if="blog.coverImage" :src="blog.coverImage" alt="" />-->

      <header>
        <h6 class="mb-0">{{ blog.title }}</h6>
        <p class="my-2">
          {{
            blog.subtitle ||
            'No Subtitle added. Tip: Add a subtitle to make it more exciting'
          }}
        </p>
        <small> Published {{ getRelativeTime(blog.createdAt) }}</small>
      </header>

      <main>
        <section>
          <i class="mdi mdi-shape primary-light" />
          <p class="white">
            Category:
            <span class="vibrant">{{ blog.category.name }}</span>
          </p>
        </section>

        <section>
          <i class="mdi mdi-currency-usd-circle premium" />
          <p class="white">
            Revenue:
            <span class="vibrant"
              ><strong>{{ earnings }}</strong></span
            >
          </p>
        </section>

        <section>
          <section>
            <i class="mdi mdi-eye" />
            <span class="white">{{ blog.totalViews }} </span>
          </section>

          <section>
            <i class="mdi mdi-incognito" />
            <span class="white">{{ blog.anonymousViews }}</span>
          </section>
        </section>

        <section>
          <section>
            <i class="mdi mdi-heart danger-light" />
            <span class="white">{{ blog.totalLikes }}</span>
          </section>

          <section>
            <i class="mdi mdi-comment success-light" />
            <span class="white">{{ blog.totalComments }}</span>
          </section>

          <section>
            <i class="mdi mdi-share delete-color" />
            <span class="white">{{ blog.totalShares }}</span>
          </section>
        </section>

        <section class="seo">
          <aside>
            <i class="mdi mdi-cloud-search white" />
            <span>SEO Keywords:</span>
            <span v-if="!blog.keywords" class="vibrant">Not Added</span>
          </aside>
          <span class="vibrant keywords">{{ blog.keywords }}</span>
        </section>
      </main>
    </nuxt-link>
  </div>
</template>

<script>
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { getRelativeTime } from '~/utils/utility'

export default {
  name: 'BlogCard',
  components: {},
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loadingError: false,
      loading: true,
      earnings: 'Getting Data...',
    }
  },
  computed: {
    blogDetailsPage() {
      return navigationRoutes.Home.Blogs.Details.replace(
        '{id}',
        this.blog?.identifier
      )
    },
  },
  async mounted() {
    try {
      await this.fetchBlogEarnings()
    } catch (e) {
      this.loadingError = true
    } finally {
      this.loading = false
    }
  },
  methods: {
    getRelativeTime,
    async fetchBlogEarnings() {
      const { earnings } = await this.$axios.$get(
        endpoints.payments.fetchBlogEarnings.replace(
          '{blogId}',
          this.blog?.identifier
        )
      )
      console.log(earnings)
      this.earnings = earnings
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.blog-preview {
  border-radius: $micro-unit;
  background: $card-bg;
  border-left: $nano-unit solid $danger-light;

  img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-top-left-radius: $micro-unit;
    border-top-right-radius: $micro-unit;
  }

  a {
    text-decoration: none;
    @media screen and (min-width: $large-screen) {
      display: grid;
      grid-template-columns: 2fr 1fr;

      //&.has-blog-image {
      //  grid-template-columns: 1fr 2fr;
      //  grid-template-rows: auto auto;
      //}
    }
  }

  header {
    padding: $micro-unit $standard-unit 0;
  }

  main {
    padding: 0 $nano-unit $micro-unit;

    * {
      font-family: $Nunito-Sans;
    }

    section {
      display: flex;
      align-items: center;
      margin: $nano-unit 0;

      &.seo {
        align-items: initial;
        flex-direction: column;

        aside {
          display: flex;
          align-items: center;
        }

        span {
          margin-left: 4px;

          &.keywords {
            max-height: 150px;
            overflow-y: scroll;
          }
        }
      }

      i {
        height: 40px;
        width: 40px;
        font-size: 24px;
        display: grid;
        place-items: center;
      }
    }
  }
}
</style>
