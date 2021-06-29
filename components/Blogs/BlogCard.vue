<template>
  <div v-ripple class="blog-preview">
    <!--    <nuxt-link :to="blogDetailsPage">-->
    <img v-if="blog" :src="blog.coverImage" alt="" />
    <header>
      <h6 class="mb-0">{{ blog.title }}</h6>
      <p class="my-2">{{ blog.subtitle }}</p>
      <small>Published {{ getRelativeTime(blog.createdAt) }}</small>
    </header>

    <main>
      <section>
        <i class="mdi mdi-shape" />
        <p>
          Category:
          <span class="vibrant">{{ blog.category.name }}</span>
        </p>
      </section>

      <section>
        <i class="mdi mdi-currency-usd-circle" />
        <p>
          Revenue:
          <span class="vibrant">{{ earnings }}</span>
        </p>
      </section>

      <section>
        <i class="mdi mdi-eye" />
        <span class="vibrant">{{ blog.totalViews }} </span>
      </section>

      <section>
        <i class="mdi mdi-incognito" />
        <span class="vibrant">{{ blog.anonymousViews }}</span>
      </section>

      <section>
        <i class="mdi mdi-heart" />
        <p>
          Likes:
          <span class="vibrant">{{ blog.totalLikes }}</span>
        </p>
      </section>

      <section>
        <i class="mdi mdi-comment" />
        <p>
          Comments: <span class="vibrant">{{ blog.totalComments }}</span>
        </p>
      </section>

      <section>
        <i class="mdi mdi-share" />
        <p>
          Shares: <span class="vibrant">{{ blog.totalShares }}</span>
        </p>
      </section>

      <section>
        <i class="mdi mdi-cloud-search" />
        <p>
          SEO Keywords: <span class="vibrant">{{ blog.keywords }}</span>
        </p>
      </section>
    </main>
    <!--    </nuxt-link>-->
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
  border-left: $nano-unit solid $info;
  padding: $micro-unit $standard-unit;

  a {
    text-decoration: none;
    display: flex;
  }

  main {
    * {
      font-family: $Nunito-Sans;
    }
    section {
      display: flex;
      align-items: center;
      margin: $nano-unit 0;

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
