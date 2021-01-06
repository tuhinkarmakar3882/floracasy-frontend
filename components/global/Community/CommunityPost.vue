<template>
  <div class="community-post-component">
    <section class="post-header">
      <img src="https://picsum.photos/100" alt="1234567890" class="mr-3" />
      <div class="details">
        <p class="vibrant">{{ post.user.displayName }}</p>
        <small>{{ getRelativeTime(1609867645646) }}</small>
      </div>
      <i
        v-ripple="'#4f4f4f5F'"
        class="mdi mdi-dots-vertical mr-2 inline-block align-middle ml-auto"
      />
    </section>

    <section class="post-body pt-5 pb-3">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
        asperiores atque consectetur eos facere hic in ipsa, ipsum laborum!
      </p>
    </section>

    <section class="post-actions pb-8">
      <div v-ripple class="like" @click="like()">
        <i
          class="mdi mr-2 inline-block align-middle"
          :class="post.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
        />
        <span class="value inline-block align-middle">
          {{ shorten(post.totalLikes) }}
        </span>
      </div>
      <div v-ripple class="comment" @click="comment()">
        <i class="mdi mdi-message-text mr-2 inline-block align-middle" />
        <span class="value inline-block align-middle">
          {{ shorten(post.totalComments) }}
        </span>
      </div>
      <div v-ripple class="share" @click="share()">
        <i class="mdi mdi-share-variant mr-2 inline-block align-middle" />
        <span class="value inline-block align-middle">
          {{ shorten(post.totalShares) }}
        </span>
      </div>
    </section>
  </div>
</template>

<script>
import { getRelativeTime, shorten } from '@/utils/utility'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'CommunityPost',
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
  methods: {
    shorten,
    getRelativeTime,
    like() {},
    comment() {},
    share() {},
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.community-post-component {
  .post-header {
    display: flex;
    position: relative;

    $image-size: 3.4rem;

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
        font-size: 1.15rem;
        font-weight: 500;
        line-height: 23px;
        margin-bottom: 0.5rem;
      }

      small {
        font-size: 0.8rem;
        font-style: italic;
        line-height: 16px;
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
      align-items: center;
      color: $secondary;
      border-radius: $nano-unit;
    }
  }

  .post-body {
    text-align: justify;
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
