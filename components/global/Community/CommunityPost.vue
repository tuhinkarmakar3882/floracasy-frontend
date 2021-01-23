<template>
  <div class="community-post-component">
    <!--    <pre>{{ post }}</pre>-->
    <section class="post-header px-4">
      <img
        :alt="post.user.displayName"
        :src="post.user.photoURL"
        class="mr-3"
      />
      <div class="details">
        <p v-ripple class="secondary">{{ post.user.displayName }}</p>
        <small>{{ getRelativeTime(post.createdAt) }}</small>
      </div>
      <i
        v-ripple="'#4f4f4f5F'"
        class="mdi mdi-dots-vertical mr-2 inline-block align-middle ml-auto"
      />
    </section>

    <section v-ripple class="post-body pt-5 pb-3 px-4">
      <p :style="post.style">
        {{ post.body }}
      </p>

      <img v-if="post.images" class="my-4" :src="post.images[0]" alt="image" />
    </section>

    <hr class="faded-divider my-2 px-4" />

    <section class="post-actions px-4">
      <div v-ripple class="like" @click="like()">
        <i
          :class="post.isLiked ? 'mdi-heart' : 'mdi-heart-outline'"
          class="mdi mr-2 inline-block align-middle"
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
  .post-body {
    p {
      font-size: 15px;
    }

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
        font-size: 1.1rem;
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
      font-size: $xxx-large-unit;
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
