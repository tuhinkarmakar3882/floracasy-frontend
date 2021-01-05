<template>
  <div class="community-post-component">
    <section class="post-header">
      <img src="https://picsum.photos/100" alt="1234567890" />
      <div class="details">
        <p class="vibrant">{{ post.user.displayName }}</p>
        <small>{{ getRelativeTime(new Date()) }}</small>
      </div>
      <aside>
        <span class="mdi mdi-dots-vertical" />
      </aside>
    </section>

    <section class="post-body">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
        asperiores atque consectetur eos facere hic in ipsa, ipsum laborum
        maiores mollitia natus nemo nihil officiis rerum suscipit voluptate
        voluptates voluptatum!
      </p>
    </section>

    <section class="post-actions px-4 pb-8">
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

<script lang="ts">
import { shorten, getRelativeTime } from '@/utils/utility'

interface User {
  displayName: string
}

interface Post {
  id: number
  user: User
  isLiked: Boolean
  totalLikes: number
  totalComments: number
  totalShares: number
}

export default {
  name: 'CommunityPost',
  props: {
    post: {
      type: Object,
      required: true,
    } as Post,
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
