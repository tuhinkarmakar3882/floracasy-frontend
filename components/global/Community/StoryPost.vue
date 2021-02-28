<template>
  <div>
    <section v-ripple class="story-post px-4 py-4" @click="openImmersiveView">
      <span class="total-stories">{{ storyCount || '--' }}</span>

      <section class="user-details">
        <img
          :src="story.user.photoURL"
          alt="img"
          class="mr-2"
          height="40"
          width="40"
        />
        <p>{{ story.user.displayName }}</p>
      </section>
    </section>
    <aside class="pl-2 my-2">
      <small>
        Last Updated on <br />
        {{ getRelativeTime(story.updatedAt) }}
      </small>
    </aside>

    <transition name="scale-up">
      <ImmersiveView v-if="immersiveMode">
        <template v-slot:close-button>
          <button class="danger-outlined-btn" @click="closeImmersiveView">
            Close
          </button>
        </template>
      </ImmersiveView>
    </transition>
  </div>
</template>

<script>
import { getRelativeTime } from '@/utils/utility'

export default {
  name: 'StoryPost',
  props: {
    story: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      immersiveMode: false,
    }
  },

  computed: {
    storyCount() {
      return this.story?.story_count?.length > 9
        ? '9+'
        : this.story?.story_count
    },
  },
  methods: {
    getRelativeTime,

    async openImmersiveView() {
      this.immersiveMode = true
      await this.$router.push('#immersive')
    },
    async closeImmersiveView() {
      this.immersiveMode = false
      await this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

$card-height: 250px;
$circle-size: 32px;
$img-size: 40px;
$color-first: #93ffe5;

.story-post {
  position: relative;
  height: $card-height;
  display: grid;
  place-items: center;
  border-radius: $micro-unit;
  box-shadow: $default-box-shadow;
  background: url('https://images.unsplash.com/photo-1613906711001-0290595725dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80')
    no-repeat center;
  background-size: cover;

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    border-radius: $micro-unit;
    background: linear-gradient(
      180deg,
      rgba(104, 103, 153, 0.52) 0%,
      #0e0424 100%
    );
  }

  .total-stories {
    position: absolute;
    top: $nano-unit;
    right: $micro-unit;
    width: $circle-size;
    height: $circle-size;
    z-index: 2;
    border: 1px solid $color-first;
    color: $color-first;
    border-radius: 50%;
    display: grid;
    line-height: 1;
    font-size: 14px;
    place-items: center;
    font-family: $Nunito-Sans;
  }

  .user-details {
    z-index: 2;
    position: absolute;
    bottom: $standard-unit;
    left: $micro-unit;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      min-height: $img-size;
      min-width: $img-size;
      max-height: $img-size;
      max-width: $img-size;
      height: $img-size;
      width: $img-size;
      object-fit: cover;
      border-radius: 50%;
    }

    p {
      font-weight: 400;
      line-height: 1.5;
      color: #bdffef;
    }
  }
}
</style>
