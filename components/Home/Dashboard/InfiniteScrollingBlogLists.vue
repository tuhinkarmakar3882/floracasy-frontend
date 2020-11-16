<template>
  <div class="my-6 scrollable-blog-list">
    <!--    <h2 class="heading-title">{{ category }} Blogs</h2>-->

    <section v-if="blogs">
      <article v-for="(blog, index) in blogs" :key="blog.id">
        <section v-ripple class="content px-4 pt-8 pb-6">
          <p class="mb-2">
            <nuxt-link
              :to="navigationRoutes.Home.Account.Overview + blog.author.uid"
              class="no-underline"
            >
              {{ blog.author.displayName }}
            </nuxt-link>
            IN
            <nuxt-link
              :to="navigationRoutes.Home.Blogs.CategoryWise"
              class="no-underline"
            >
              {{ blog.category.name }}
            </nuxt-link>
          </p>

          <h5 @click="navigateTo(`/Home/Blogs/Details/${blog.id}`)">
            {{ blog.title }}
          </h5>

          <small class="timestamp mt-3">
            <span class="mdi mdi-clock-time-nine-outline" />
            {{ parse(blog.createdAt) }}
          </small>

          <img
            class="my-5"
            :src="blog.coverImage"
            :alt="blog.title"
            @click="navigateTo(`/Home/Blogs/Details/${blog.id}`)"
          />

          <p>
            {{ blog.subtitle }}...
            <nuxt-link :to="`/Home/Blogs/Details/${blog.id}`">
              Read More
            </nuxt-link>
          </p>
        </section>

        <section class="blog-actions px-4 pb-8">
          <div v-ripple class="like" @click="like(blog, index)">
            <i
              class="mdi mr-2 inline-block align-middle"
              :class="blog.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
            />
            <span class="value inline-block align-middle">
              {{ blog.totalLikes }}
            </span>
          </div>
          <div v-ripple class="comment" @click="comment(blog)">
            <i class="mdi mdi-message-text mr-2 inline-block align-middle" />
            <span class="value inline-block align-middle">
              {{ blog.totalComments }}
            </span>
          </div>
          <div v-ripple class="share" @click="share(blog, index)">
            <i class="mdi mdi-share-variant mr-2 inline-block align-middle" />
            <span class="value inline-block align-middle">
              {{ blog.totalShares }}
            </span>
          </div>
        </section>
      </article>
    </section>

    <client-only>
      <infinite-loading spinner="bubbles" @infinite="infiniteHandler">
        <template v-slot:error>
          <p class="danger-light my-6">Network Error</p>
        </template>
        <template v-slot:no-more>
          <p class="success my-6">That's all for now :)</p>
        </template>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'
import utility from '@/utils/utility'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'InfiniteScrollingBlogLists',
  props: {
    category: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      navigationRoutes,
      blogs: [],
      parse: utility.timeStringParser,
      page: 1,
    }
  },

  computed: {},

  watch: {
    mode: {
      handler() {
        this.dataLoading = true
        setTimeout(() => {
          this.dataLoading = false
        }, 1500)
      },
      deep: true,
    },
  },

  mounted() {},

  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    async like(blog, index) {
      await this.$axios
        .$post(endpoints.blog.like, {
          blog_id: blog.id,
        })
        .then((response) => {
          response.action === 'like'
            ? this.blogs[index].totalLikes++
            : this.blogs[index].totalLikes--
          this.blogs[index].isLiked = !this.blogs[index].isLiked
        })
        .catch((e) => {
          console.error(e)
        })
    },
    comment(blog) {
      alert(
        `Hmmm... So now you want to comment on ${blog.title}. Wasn't just liking a post satisfactory? The Dev is just overwhelmed by this. Buy him a Chocolate`
      )
    },
    share(blog, index) {
      if (navigator.share) {
        navigator
          .share({
            title: blog.title + '- Floracasy',
            text: blog.subtitle,
            url: navigationRoutes.Home.Blogs.Details.replace('{id}', blog.id),
          })
          .then(async () => {
            await this.$axios
              .$post(endpoints.blog.share, {
                blog_id: blog.id,
              })
              .then(() => {
                this.blogs[index].totalShares++
              })
              .catch((e) => {
                this.blogs[index].totalShares--
                console.error(e)
              })
            console.log('Successful share')
          })
          .catch((error) => console.log('Error sharing:', error))
      } else {
        alert(
          'Unable to Share. We Only support Chrome for Android as of now. Talk to the Dev'
        )
      }
    },

    async infiniteHandler($state) {
      try {
        const { results } = await this.$axios
          .get(endpoints.blog.fetch, {
            params: {
              page: this.page,
              category_id: this.category,
            },
          })
          .then(({ data }) => data)
        if (results.length) {
          this.page += 1
          this.blogs.push(...results)
          $state.loaded()
        } else {
          $state.complete()
        }
      } catch (e) {
        $state.complete()
        // $state.error()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.scrollable-blog-list {
  //min-height: calc(100vh - 220px);

  article {
    .content {
      img {
        width: 100%;
        object-fit: cover;
        height: 155px;
        box-shadow: $default-box-shadow;
        border-radius: $double-unit;
      }

      small {
        color: $muted;
      }
    }

    .blog-actions {
      font-family: $Nunito-Sans;
      color: $secondary;
      font-size: 1.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        display: flex;
        justify-content: center;
        height: 2 * $large-unit;
        width: 100%;
        align-items: center;

        .value {
          color: $muted;
          font-size: 1rem;
        }
      }
    }

    &:nth-child(even) {
      background: $nav-bar-bg;
      box-shadow: $default-box-shadow;
    }
  }
}
</style>
