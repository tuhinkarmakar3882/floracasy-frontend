<template>
  <div v-ripple class="story-component">
    <main class="story" @click="openImmersiveView">
      <section class="wrapper mb-4" :class="story.contains_unseen && 'unseen'">
        <img
          :alt="story.user.photoURL"
          :src="story.user.photoURL"
          height="72"
          width="72"
        />
      </section>

      <aside>
        <p>
          {{
            story.user.displayName.length > 14
              ? `${story.user.displayName.substr(0, 14)}...`
              : story.user.displayName
          }}
        </p>
      </aside>
    </main>

    <transition name="scale-up">
      <ImmersiveView
        v-if="immersiveMode"
        :on-click-function="closeImmersiveView"
        :story="story"
      />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Story',
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

  mounted() {
    this.$router.beforeEach((to, _, next) => {
      if (to.hash === '') {
        this.immersiveMode = false
      }
      next()
    })
  },

  beforeDestroy() {
    this.$router.beforeEach((__, _, next) => {
      next()
    })
  },

  methods: {
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

.story-component {
  .story {
    display: grid;
    place-items: center;
    border-radius: 8px;

    $wrapper-size: 74px;
    $image-size: 64px;

    .wrapper {
      text-align: center;
      position: relative;
      min-height: $wrapper-size;
      min-width: $wrapper-size;
      display: grid;
      place-items: center;

      img {
        min-height: $wrapper-size;
        height: $wrapper-size;
        min-width: $wrapper-size;
        width: $wrapper-size;
        object-fit: cover;
        box-shadow: $default-box-shadow;
        border-radius: 50%;
      }
    }

    .unseen {
      position: relative;

      img {
        min-height: $image-size;
        height: $image-size;
        min-width: $image-size;
        width: $image-size;
        object-fit: cover;
        box-shadow: $default-box-shadow;
        border-radius: 50%;
      }

      &::before {
        content: '';
        position: absolute;
        height: $wrapper-size;
        width: $wrapper-size;
        top: 0;
        left: 0;
        z-index: -1;
        border-radius: 50%;
        border: 2px solid $secondary;
      }
    }

    aside {
      align-self: flex-start;
      width: 100%;
      height: 4ch;
      overflow: hidden;

      p {
        font-weight: 300;
        text-align: center;
        font-size: 14px;
        line-height: 1.48;
      }
    }
  }
}
</style>
