<template>
  <div class="community-post-comments-component">
    <pre class="my-4">{{ post }}</pre>
    <hr class="reversed-faded-divider mt-0 mb-2" />
  </div>
</template>

<script>
import { getRelativeTime, shorten } from '@/utils/utility'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'

export default {
  name: 'CommunityPostComments',

  props: {
    post: {
      type: Object,
      required: true,
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
        console.error(e)
      }
    },

    comment() {
      console.log('open comment - page')
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
          console.log('Error sharing:', error)
        }
      } else {
        console.log(
          'Unable to Share. We Only support Chrome for Android as of now. Talk to the Dev'
        )
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
