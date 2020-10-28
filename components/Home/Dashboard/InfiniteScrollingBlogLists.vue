<template>
  <div class="my-6 scrollable-blog-list">
    <h2 class="heading-title">{{ mode }} Blogs</h2>

    <LoadingIcon v-if="dataLoading" />

    <article v-for="blog in blogs" v-else :key="blog.id">
      <section v-ripple class="content px-4 pt-8 pb-6">
        <p class="mb-2">
          <nuxt-link to="/Home/Account/Details" class="no-underline">
            {{ blog.author }}
          </nuxt-link>
          IN
          <nuxt-link to="/Home/Blogs/CategoryWise" class="no-underline">
            {{ blog.category }}
          </nuxt-link>
        </p>

        <h5 @click="navigateTo(`/Home/Blogs/${blog.id}`)">{{ blog.title }}</h5>

        <small class="timestamp mt-3">
          <span class="mdi mdi-clock-time-nine-outline" />
          {{ blog.timestamp }}
        </small>

        <img
          class="my-5"
          :src="blog.image"
          :alt="blog.title"
          @click="navigateTo(`/Home/Blogs/${blog.id}`)"
        />

        <p>
          {{ blog.summary }}...
          <nuxt-link :to="`/Home/Blogs/${blog.id}`"> Read More</nuxt-link>
        </p>
      </section>

      <section class="blog-actions px-4 pb-8">
        <div v-ripple class="like" @click="like(blog)">
          <i class="mdi mdi-heart-outline mr-2 inline-block align-middle" />
          <span class="value inline-block align-middle">365</span>
        </div>
        <div v-ripple class="comment" @click="comment(blog)">
          <i class="mdi mdi-message-text mr-2 inline-block align-middle" />
          <span class="value inline-block align-middle">527</span>
        </div>
        <div v-ripple class="share" @click="share(blog)">
          <i class="mdi mdi-share-variant mr-2 inline-block align-middle" />
          <span class="value inline-block align-middle">209</span>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import LoadingIcon from '@/components/LoadingIcon'

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
      dataLoading: false,
      blogs: [
        {
          id: 0,
          title: 'Love your hair but suffering from Hair fall or hair damage?',
          timestamp: 'Mon 13th Nov, 2018, 12:30 P.M.',
          author: 'Jammie Johnson',
          category: 'Beauty & Makeup',
          image: 'https://picsum.photos/249',
          summary:
            'Explore hundreds of integrations for Ghost to speed up your workflow',
        },
        {
          id: 1,
          title: 'That Great Apple iPhone Review',
          timestamp: 'Mon 12th Nov, 2018, 01:30 P.M.',
          author: 'Annie Parker',
          category: 'Technology',
          image: 'https://picsum.photos/251',
          summary:
            'Explore hundreds of integrations for Ghost to speed up your workflow',
        },
        {
          id: 2,
          title: 'Now its easy to take care your underarms at home.',
          timestamp: 'Mon 11th Nov, 2018, 6:41 P.M.',
          author: 'Swiss Robinson',
          category: 'Technology',
          image: 'https://picsum.photos/252',
          summary:
            'Explore hundreds of integrations for Ghost to speed up your workflow',
        },
        {
          id: 3,
          title: "Bath - Hot water or Cold water? Let's see!",
          timestamp: 'Mon 13th Nov, 2018, 5:59 P.M.',
          author: 'Irina Caperina',
          category: 'Health',
          image: 'https://picsum.photos/253',
          summary:
            'Explore hundreds of integrations for Ghost to speed up your workflow',
        },
        {
          id: 4,
          title: 'That Great Apple Review',
          timestamp: 'Mon 13th Nov, 2018, 6:30 P.M.',
          author: 'Jammie Johnson',
          category: 'Technology',
          image: 'https://picsum.photos/254',
          summary:
            'Explore hundreds of integrations for Ghost to speed up your workflow',
        },
      ],
    }
  },
  watch: {
    mode: {
      handler() {
        this.dataLoading = true
        setTimeout(() => {
          this.dataLoading = false
        }, 2000)
      },
      deep: true,
    },
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
