<template>
  <div class="community-page">
    <section class="story-updates py-2">
      <div v-for="(story, index) in stories" :key="index" class="wrapper mx-4">
        <img
          :src="story.user.photoURL + index"
          :alt="story.user.photoURL"
          height="64"
          width="64"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'Community',
  layout: 'MobileApp',
  // middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Community',
      stories: [
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/10',
          },
        },
      ],
    }
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: 1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.community-page {
  .story-updates {
    display: flex;
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    $wrapper-size: 74px;
    $image-size: 64px;

    .wrapper {
      position: relative;
      min-height: $wrapper-size;
      min-width: $wrapper-size;
      display: grid;
      place-items: center;

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
        border: 2px solid $secondary-highlight;
      }
    }
  }
}
</style>
