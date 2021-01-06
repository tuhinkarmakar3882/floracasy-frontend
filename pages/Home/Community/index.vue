<template>
  <div class="community-page">
    <TopActionBar class="px-4 mt-5 mb-4" />

    <div class="story-updates-container">
      <section class="top-line pl-4">
        <p class="py-2">
          <!--          <span class="mdi mdi-party-popper primary" />-->
          Stories
        </p>
        <p v-ripple class="vibrant py-2 px-4">
          <span class="mdi mdi-play" />
          View All
        </p>
      </section>

      <section class="stories">
        <div v-ripple class="add-a-story py-2 text-center">
          <img
            alt="image"
            class="mb-4"
            height="72"
            src="https://picsum.photos/100"
            width="72"
          />
          <span class="mdi mdi-plus" />
          <small class="vibrant">Add New Story</small>
        </div>

        <Story
          v-for="(story, index) in stories"
          :key="index"
          :story="story"
          class="px-4 py-2"
        />
      </section>
    </div>

    <hr class="faded-divider my-6" />

    <p class="px-4" style="font-size: 14px">
      <span class="mdi mdi-earth primary-light" />
      Across The World
    </p>
    <FetchCommunityPosts />
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'Community',
  components: {
    AddPostPreview: () =>
      import('@/components/global/Community/AddPostPreview'),
    FetchCommunityPosts: () =>
      import('@/components/global/Community/FetchCommunityPosts'),
    TopActionBar: () => import('@/components/global/Community/TopActionBar'),
    Story: () => import('@/components/global/Community/Story'),
  },

  layout: 'MobileApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Community',
      stories: [
        {
          user: {
            photoURL: 'https://picsum.photos/101',
            displayName: 'Swagata Biswas',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/102',
            displayName: 'Dipti Mondal',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/103',
            displayName: 'Somlata Dey',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/104',
            displayName: 'Mosa Kamrachhe',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/105',
            displayName: 'Tistua Bekar',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/106',
            displayName: 'Thennarasu WandaVision',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/107',
            displayName: 'Harry Potter',
          },
        },
        {
          user: {
            photoURL: 'https://picsum.photos/108',
            displayName: 'Tuhin Karmakar',
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
  .story-updates-container {
    .top-line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h6 {
        margin: 0;
        position: relative;

        &::after {
          content: '';
          height: 2px;
          width: 24px;
          background: $primary-light;
          bottom: 4px;
          left: 0;
          position: absolute;
        }
      }

      p {
        font-size: 14px;
      }
    }

    .stories {
      display: flex;
      width: 100%;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .add-a-story {
        display: grid;
        min-width: 100px;
        place-items: center;
        position: relative;
        border-radius: 8px;

        img {
          size: 74px;
          border-radius: 50%;
        }

        span {
          position: absolute;
          display: grid;
          align-items: center;
          justify-items: center;
          place-items: center;
          border-radius: 50%;
          background: $vibrant;
          right: 12px;
          bottom: 64px;
          color: #000;
          height: 24px;
          width: 24px;
          font-size: 14px;
          z-index: 1;
        }
      }
    }
  }
}
</style>
