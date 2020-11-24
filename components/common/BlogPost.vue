<template>
  <div class="blog-post-component">
    <section class="content pt-8">
      <p class="px-4 mb-2 top-line">
        <nuxt-link
          v-ripple=""
          :to="navigationRoutes.Home.Account.Overview + blog.author.uid"
          class="no-underline"
        >
          {{ blog.author.displayName }}
        </nuxt-link>
        <strong class="mx-1">IN</strong>
        <nuxt-link
          v-ripple=""
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
        <i
          v-ripple=""
          class="mdi mdi-dots-vertical mr-2 inline-block align-middle"
          @click="showOptions"
        />
      </p>
      <div class="options">
        <ul>
          <li v-ripple="'#f5a0495F'" class="py-2 px-6" style="color: #f5a049">
            <span class="icon mdi mdi-bookmark" />
            Save for Later
          </li>
          <li v-ripple="'#ff82825F'" class="py-2 px-6" style="color: #ff8282">
            <span class="icon mdi mdi-alert-octagon" />
            Report Post
          </li>
        </ul>
      </div>

      <div
        v-ripple=""
        class="px-4 pb-6"
        @click="navigateTo(`/Home/Blogs/Details/${blog.id}`)"
      >
        <h5>
          {{ blog.title }}
        </h5>

        <small class="timestamp mt-3">
          <span class="mdi mdi-clock-time-nine-outline" />
          {{ parseTimeUsingStandardLibrary(blog.createdAt) }}
        </small>

        <img class="my-5" :src="blog.coverImage" :alt="blog.title" />
        <p>
          {{ blog.subtitle }}...
          <span class="secondary"> Read More </span>
        </p>
      </div>
    </section>

    <section class="blog-actions px-4 pb-8">
      <div v-ripple class="like" @click="like()">
        <i
          class="mdi mr-2 inline-block align-middle"
          :class="blog.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
        />
        <span class="value inline-block align-middle">
          {{ shorten(blog.totalLikes) }}
        </span>
      </div>
      <div v-ripple class="comment" @click="comment()">
        <i class="mdi mdi-message-text mr-2 inline-block align-middle" />
        <span class="value inline-block align-middle">
          {{ shorten(blog.totalComments) }}
        </span>
      </div>
      <div v-ripple class="share" @click="share()">
        <i class="mdi mdi-share-variant mr-2 inline-block align-middle" />
        <span class="value inline-block align-middle">
          {{ shorten(blog.totalShares) }}
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import { parseTimeUsingStandardLibrary, shorten } from '~/utils/utility'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'BlogPost',
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      navigationRoutes,
    }
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
        console.error(e)
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
            url: navigationRoutes.Home.Blogs.Details.replace('{id}', blog.id),
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
          console.log('Error sharing:', error)
        }
      } else {
        console.log(
          'Unable to Share. We Only support Chrome for Android as of now. Talk to the Dev'
        )
      }
    },

    showOptions() {
      console.log('opening Modal')
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.blog-post-component {
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

    .top-line {
      display: flex !important;
      position: relative;

      i {
        position: absolute !important;
        right: -$medium-unit;
        font-size: $x-large-unit - $double-unit;
        top: -$standard-unit;
        height: 2 * $xx-large-unit;
        width: 2 * $xx-large-unit;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: $secondary;
      }
    }

    .options {
      position: absolute;
      background: $card-background;
      border-radius: $nano-unit;
      right: $medium-unit;
      box-shadow: $down-only-box-shadow;

      ul {
        list-style: none;
        padding: 0;

        li {
          display: flex;
          align-items: center;
        }
      }

      .icon {
        font-size: $large-unit;
        margin-right: $micro-unit;
      }
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
}
</style>
