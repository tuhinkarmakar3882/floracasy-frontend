<template>
  <div class="community-post-component">
    <section class="post-header px-4 mb-2">
      <img
        :alt="post.user.displayName"
        :src="post.user.photoURL"
        class="mr-3"
      />
      <div class="details">
        <p v-ripple class="secondary">
          <nuxt-link
            v-ripple=""
            :to="
              navigationRoutes.Home.Account.Overview.replace(
                '{userUID}',
                post.user.uid
              )
            "
            class="no-underline"
          >
            {{ post.user.displayName }}
          </nuxt-link>
        </p>
        <small>
          <em>
            {{ getRelativeTime(post.createdAt) }}
          </em>
          <span v-if="isEdited" class="dot ml-2 mr-1" />
          <span v-if="isEdited" class="mdi muted">Edited </span>
        </small>
      </div>
      <i
        v-ripple="'#4f4f4f5F'"
        class="mdi mdi-dots-vertical mr-2 inline-block align-middle ml-auto"
      />
    </section>

    <section v-ripple class="post-body py-4 px-4" @click="viewPostDetails">
      <p v-if="post.body" :style="post.style">
        {{
          expanded
            ? post.body
            : `${post.body.substr(0, 100)} ${
                post.body.length > 99 ? '...' : ''
              }`
        }}
      </p>

      <img v-if="post.image" :src="post.image" alt="image" class="mt-4" />
    </section>

    <hr class="faded-divider mt-2 mb-0" />

    <section class="post-actions px-4">
      <div v-if="showLikeOption" v-ripple class="like" @click="like">
        <i
          :class="post.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
          class="mdi mr-2 inline-block align-middle"
        />
        <span class="value inline-block align-middle">
          {{ shorten(post.totalLikes) }}
        </span>
      </div>

      <div
        v-if="showCommentOption"
        v-ripple
        class="comment"
        @click="viewPostDetails"
      >
        <i class="mdi mdi-message-text mr-2 inline-block align-middle" />
        <span class="value inline-block align-middle">
          {{ shorten(post.totalComments) }}
        </span>
      </div>

      <div v-if="showShareOption" v-ripple class="share" @click="share">
        <i class="mdi mdi-share-variant mr-2 inline-block align-middle" />
        <span class="value inline-block align-middle">
          {{ shorten(post.totalShares) }}
        </span>
      </div>
    </section>

    <hr class="reversed-faded-divider mt-0 mb-2" />
  </div>
</template>

<script>
import { getRelativeTime, shorten, showUITip } from '@/utils/utility'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'

export default {
  name: 'CommunityPost',

  props: {
    post: {
      type: Object,
      required: true,
    },
    showCommentOption: {
      type: Boolean,
      default: true,
    },
    showLikeOption: {
      type: Boolean,
      default: true,
    },
    showShareOption: {
      type: Boolean,
      default: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      navigationRoutes,
    }
  },

  computed: {
    isEdited() {
      return (
        new Date(this.post.updatedAt) - new Date(this.post.createdAt) > 5000
      )
    },
  },

  methods: {
    shorten,
    getRelativeTime,

    async viewPostDetails() {
      await this.$router.push(
        navigationRoutes.Home.Community.Posts.detail.replace(
          '{postIdentifier}',
          this.post.identifier
        )
      )
    },

    async like() {
      try {
        const action = await this.$axios
          .$post(endpoints.community_service.posts.like, {
            identifier: this.post.identifier,
          })
          .then(({ action }) => action)
        action === 'like-post' ? this.post.totalLikes++ : this.post.totalLikes--
        this.post.isLiked = !this.post.isLiked
      } catch (e) {
        await showUITip(this.$store, 'Unable to Like Post', 'warning')
      }
    },

    async share() {
      if (navigator.share) {
        try {
          await navigator.share({
            title: this.post.title + '- Floracasy',
            text: this.post.subtitle,
            url: navigationRoutes.Home.Community.Posts.detail.replace(
              '{postIdentifier}',
              this.post.identifier
            ),
          })
          try {
            await this.$axios
              .$post(endpoints.post.share, {
                identifier: this.post.identifier,
              })
              .then(() => {
                this.post.totalShares++
              })
          } catch (e) {
            this.post?.totalShares && this.post.totalShares--
          }
        } catch (error) {
          await showUITip(this.$store, 'Network Error', 'error')
        }
      } else {
        await showUITip(this.$store, 'Feature Not Supported', 'warning')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.community-post-component {
  .post-body {
    img {
      border-radius: 0 20px;
      height: 250px;
      width: 100%;
      object-fit: cover;
      box-shadow: $default-box-shadow;
    }
  }

  .post-header {
    display: flex;
    position: relative;

    $image-size: 3.1rem;

    img {
      min-width: $image-size;
      min-height: $image-size;
      height: $image-size;
      width: $image-size;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
    }

    .details {
      p {
        font-weight: 500;
        line-height: 23px;
        margin-bottom: 0.5rem;
      }

      small {
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        line-height: 16px;

        .dot {
          display: inline-block;
          height: $nano-unit;
          width: $nano-unit;
          background: $muted;
          border-radius: 50%;
        }
      }
    }

    i {
      position: absolute !important;
      right: -8px;
      top: 0;
      height: 100%;
      font-size: $x-large-unit;
      width: 2 * $large-unit;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      color: $muted;
      border-radius: $nano-unit;
    }
  }

  .post-actions {
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
