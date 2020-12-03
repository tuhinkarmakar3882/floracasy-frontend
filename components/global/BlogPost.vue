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
          v-ripple="'#4f4f4f5F'"
          class="mdi mdi-dots-vertical mr-2 inline-block align-middle"
          @click="showOptions = !showOptions"
        />
      </p>

      <transition name="gray-shift">
        <div v-if="showOptions" class="options">
          <ul>
            <li v-ripple="" class="close-btn" @click="showOptions = false">
              &times;
            </li>
            <li
              v-ripple="'#6DD0BF5F'"
              class="py-2 px-6"
              @click="addOrRemoveToSaveBlogs"
            >
              <span
                class="icon mdi"
                :class="
                  blog.isSavedForLater ? 'mdi-bookmark' : 'mdi-bookmark-outline'
                "
                style="color: #6dd0bf"
              />
              {{ !blog.isSavedForLater ? 'Save for later' : 'Saved' }}
            </li>
            <li
              v-for="(optionItem, index) in dropdownOptionItems"
              :key="index"
              v-ripple="`${optionItem.color}5F`"
              class="py-2 px-6"
            >
              <span
                class="icon mdi"
                :class="optionItem.icon"
                :style="{ color: optionItem.color }"
              />
              {{ optionItem.text }}
            </li>
          </ul>
        </div>
      </transition>

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
      dropdownOptionItems: [
        {
          text: 'Not Interested',
          icon: 'mdi-cancel',
          color: '#f5a049',
        },
        {
          text: 'Report Blog',
          icon: 'mdi-alert-octagon',
          color: '#ff8282',
        },
      ],
      showOptions: false,
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
          console.log('Error sharing:', error)
        }
      } else {
        console.log(
          'Unable to Share. We Only support Chrome for Android as of now. Talk to the Dev'
        )
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
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';
@import 'assets/transitions-and-animations';

.blog-post-component {
  transition: all 150ms ease-in-out;

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
        right: -7px;
        font-size: $x-large-unit - $double-unit;
        top: -$standard-unit;
        height: 2 * $xx-large-unit;
        width: 2 * $medium-unit;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $secondary;
        border-radius: $nano-unit;
      }
    }

    .options {
      position: absolute;
      background: $card-background;
      border-radius: $nano-unit;
      right: $medium-unit;
      box-shadow: $down-only-box-shadow;
      max-width: 300px;
      min-width: 232px;
      z-index: $bring-to-front - 100;
      transition: all 150ms ease-in-out;

      ul {
        list-style: none;
        padding: $xxx-large-unit 0 0;

        li {
          display: flex;
          align-items: center;
          color: #dadada;
        }

        .close-btn {
          position: absolute !important;
          border-radius: $nano-unit;
          top: $zero-unit;
          right: $zero-unit;
          color: $danger-light;
          font-size: $x-large-unit;
          padding: 0 14px;
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
