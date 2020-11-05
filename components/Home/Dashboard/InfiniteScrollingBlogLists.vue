<template>
  <div class="my-6 scrollable-blog-list">
    <h2 class="heading-title">{{ mode }} Blogs</h2>

    <LoadingIcon v-if="dataLoading" />

    <article v-for="blog in blogs" v-else :key="blog.id">
      <section v-ripple class="content px-4 pt-8 pb-6">
        <p class="mb-2">
          <nuxt-link to="/Home/Account/Details" class="no-underline">
            {{ blog.author.displayName }}
          </nuxt-link>
          IN
          <nuxt-link to="/Home/Blogs/CategoryWise" class="no-underline">
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
            Read More</nuxt-link
          >
        </p>
      </section>

      <section class="blog-actions px-4 pb-8">
        <div v-ripple class="like" @click="like(blog)">
          <i class="mdi mdi-heart-outline mr-2 inline-block align-middle" />
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
        <div v-ripple class="share" @click="share(blog)">
          <i class="mdi mdi-share-variant mr-2 inline-block align-middle" />
          <span class="value inline-block align-middle">
            {{ blog.totalShares }}
          </span>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import LoadingIcon from '@/components/LoadingIcon'
import endpoints from '@/api/endpoints'
import utility from '@/utils/utility'

export default {
  name: 'InfiniteScrollingBlogLists',
  components: { LoadingIcon },
  props: {
    mode: {
      type: String,
      default: 'All',
    },
  },
  data() {
    return {
      dataLoading: true,
      backendData: null,
      parse: utility.timeStringParser,
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

  async mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 1 })

    this.blogs = await this.$axios
      .$get(endpoints.blog.fetch)
      .then(({ data }) => data)
      .catch((error) => {
        console.error('From IBL', error)
      })

    this.dataLoading = false
  },

  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    like(blog) {
      alert(
        `Wow, I'm amazed to see that you are trying to like ${blog.title}. But, the developer is too lazy to implement that feature. Should we fire this developer?`
      )
    },
    comment(blog) {
      alert(
        `Hmmm... So now you want to comment on ${blog.title}. Wasn't just liking a post satisfactory? The Dev is just overwhelmed by this. Buy him a Chocolate`
      )
    },
    share(blog) {
      alert(
        `Duh? And Now Share??? Like Seriously? Google is not going to pay us. Anyways, here is a consolidation line : You're sharing ${blog.title}`
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.scrollable-blog-list {
  min-height: calc(100vh - 220px);

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
