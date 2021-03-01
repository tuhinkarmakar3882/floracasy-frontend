<template>
  <div class="blog-post-component">
    <section class="content">
      <p class="px-4 mb-2 top-line">
        <nuxt-link
          v-ripple
          :to="
            navigationRoutes.Home.Account.Overview.replace(
              '{userUID}',
              blog.author.uid
            )
          "
          class="no-underline"
        >
          {{ blog.author.displayName }}
        </nuxt-link>
        <strong class="mx-1">IN</strong>
        <nuxt-link
          v-ripple
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
          v-if="!hideMoreOptionsButton"
          v-ripple="'#4f4f4f5F'"
          class="mdi mdi-dots-vertical mr-2 inline-block align-middle"
          @click="showOptions = !showOptions"
        />
      </p>

      <transition name="gray-shift">
        <div v-if="showOptions" class="options">
          <ul>
            <li
              v-ripple="'#6DD0BF5F'"
              class="py-2 px-6"
              @click="addOrRemoveToSaveBlogs"
            >
              <span
                :class="
                  blog.isSavedForLater
                    ? 'mdi-bookmark-check'
                    : 'mdi-bookmark-outline'
                "
                class="icon mdi"
                style="color: #6dd0bf"
              />
              {{ !blog.isSavedForLater ? 'Save for later' : 'Saved' }}
            </li>
            <li v-ripple="`#ff82825F`" class="py-2 px-6" @click="reportBlog">
              <span class="icon mdi mdi-alert-octagon danger-light" />
              Report Blog
            </li>
            <li class="my-0 py-2 px-4" style="display: block">
              <hr class="my-0" style="background-color: #464646" />
            </li>
            <li v-ripple="`#ff82815f`" class="py-2 px-4">
              <p
                class="danger-light text-center my-0"
                style="width: 100%"
                @click="showOptions = false"
              >
                Close
              </p>
            </li>
          </ul>
        </div>
      </transition>

      <div v-ripple class="px-4 pb-6" @click="openBlogDetails">
        <h5>{{ blog.title }}</h5>

        <small class="timestamp mt-3">
          <span class="mdi mdi-clock-time-nine-outline" />
          {{ parseTimeUsingStandardLibrary(blog.createdAt) }}
        </small>

        <img
          v-if="blog.coverImage"
          :alt="blog.title"
          :src="blog.coverImage"
          class="my-5"
        />
        <p :class="!blog.coverImage && 'my-5'">
          <span v-if="blog.subtitle">
            {{ blog.subtitle.substr(0, 100) }}...
          </span>
          <span class="secondary"> Read More </span>
        </p>
      </div>
    </section>

    <section v-if="!hideBlogActions" class="blog-actions px-4 pb-8">
      <div v-ripple class="like" @click="like">
        <i
          :class="blog.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
          class="mdi mr-2 inline-block align-middle"
        />
        <span class="value inline-block align-middle">
          {{ shorten(blog.totalLikes) }}
        </span>
      </div>
      <div v-ripple class="comment" @click="comment">
        <i class="mdi mdi-message-text mr-2 inline-block align-middle" />
        <span class="value inline-block align-middle">
          {{ shorten(blog.totalComments) }}
        </span>
      </div>
      <div v-ripple class="share" @click="share">
        <i class="mdi mdi-share-variant mr-2 inline-block align-middle" />
        <span class="value inline-block align-middle">
          {{ shorten(blog.totalShares) }}
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import {
  parseTimeUsingStandardLibrary,
  shorten,
  showUITip,
} from '~/utils/utility'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'BlogPost',
  props: {
    blog: {
      type: Object,
      required: true,
    },
    hideBlogActions: {
      type: Boolean,
      default: false,
    },
    hideMoreOptionsButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      navigationRoutes,
      showOptions: false,
    }
  },
  methods: {
    parseTimeUsingStandardLibrary,
    shorten,

    async like() {
      try {
        const action = await this.$axios
          .$post(endpoints.blog.like, {
            identifier: this.blog.identifier,
          })
          .then(({ action }) => action)
        action === 'like' ? this.blog.totalLikes++ : this.blog.totalLikes--
        this.blog.isLiked = !this.blog.isLiked
      } catch (e) {
        await showUITip(this.$store, 'Network Error', 'error')
      }
    },

    async comment() {
      await this.$router.push(
        navigationRoutes.Home.Blogs.Comments.BlogId.replace(
          '{BlogId}',
          this.blog.identifier
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
              this.blog.identifier
            ),
          })

          await this.$axios
            .$post(endpoints.blog.share, {
              identifier: this.blog.identifier,
            })
            .then(() => {
              this.blog.totalShares++
            })
            .catch(() => {
              this.blog.totalShares--
            })
        } catch (error) {
          await showUITip(this.$store, 'Network Error', 'error')
        }
      } else {
        await showUITip(this.$store, 'Feature Not Supported', 'warning')
      }
    },

    async addOrRemoveToSaveBlogs() {
      this.showOptions = false
      try {
        await this.$axios.$post(endpoints.blog.addOrRemoveToSaveBlogs, {
          identifier: this.blog.identifier,
        })
        this.blog.isSavedForLater = !this.blog.isSavedForLater
      } catch (e) {
        await showUITip(this.$store, 'Network Error', 'error')
      }
    },

    async reportBlog() {
      await this.$router.push({
        path: navigationRoutes.Home.MoreOptions.HelpAndSupport.ContactSupport,
        query: {
          type: 'Blog',
          identifier: this.blog.identifier,
        },
      })
    },

    async openBlogDetails() {
      await this.$router.push(
        navigationRoutes.Home.Blogs.Details.replace(
          '{id}',
          this.blog.identifier
        )
      )
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
        margin: 0;
        padding: $micro-unit 0;

        li {
          display: flex;
          align-items: center;
          color: #dadada;
          margin: 0;
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
