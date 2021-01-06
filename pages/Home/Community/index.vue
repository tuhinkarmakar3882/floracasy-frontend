<template>
  <div class="community-page">
    <TopActionBar class="px-4 mt-5 mb-4" />

    <div class="story-updates-container">
      <section class="top-line pl-4">
        <p class="py-2">
          <span class="mdi mdi-party-popper primary-light" />
          Stories
        </p>
        <p v-ripple class="vibrant py-2 px-4">View All</p>
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

    <hr class="faded-divider mt-6 mb-0" />

    <section class="add-a-post px-4 pb-8">
      <p class="py-6" style="font-size: 14px">
        <span class="mdi mdi-plus-circle primary-light" />
        Create new Post
      </p>
      <div class="header mb-6">
        <img
          alt="display-image"
          height="52"
          src="https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
          width="52"
        />

        <section class="user-details ml-4">
          <p class="secondary">Swagata</p>
          <small>Beauty Blogger</small>
        </section>

        <button v-ripple class="vibrant-outlined-btn">New Post</button>
      </div>

      <p class="body py-5 text-center">What's on your mind?</p>

      <div class="actions mt-4">
        <p>
          <span class="mdi mdi-image mdi-24px secondary mr-2" />
          Photos
        </p>
        <p>
          <span class="mdi mdi-headphones mdi-24px secondary mr-2" />
          Audio
        </p>
        <p>
          <span class="mdi mdi-emoticon mdi-24px secondary mr-2" />
          Mood
        </p>
      </div>
    </section>

    <hr class="faded-divider my-0" />

    <FetchCommunityPosts />
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import Story from '~/components/global/Community/Story'
import TopActionBar from '~/components/global/Community/TopActionBar'
import FetchCommunityPosts from '~/components/global/Community/FetchCommunityPosts'

export default {
  name: 'Community',
  components: { FetchCommunityPosts, TopActionBar, Story },
  layout: 'MobileApp',
  // middleware: 'isAuthenticated',

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
  .add-a-post {
    .header {
      display: flex;
      align-items: center;

      $size: 52px;

      img {
        width: $size;
        min-width: $size;
        height: $size;
        min-height: $size;
        border-radius: 50%;
        box-shadow: $default-box-shadow;
        object-fit: cover;
      }

      button {
        min-width: auto;
        font-size: 14px;
        width: 117px;
        height: 32px;
        margin-left: auto;
      }
    }

    .user-details {
      p {
        font-size: 1.2rem;
        font-weight: 500;
      }

      small {
        font-size: 13px;
        font-family: $Nunito-Sans;
        font-weight: 300;
        font-style: italic;
        line-height: 16px;
      }
    }

    .body {
      position: relative;
      color: $vibrant;
      background: $segment-background;
      border-radius: $micro-unit;

      &::after {
        content: '';
        position: absolute;
        left: $milli-unit;
        top: -$x-large-unit;
        border: $standard-unit solid transparent;
        border-bottom-color: $segment-background;
      }
    }

    .actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);

      p {
        display: flex;
        justify-content: center;
        align-items: center;
        color: $muted;
      }

      &:nth-child(2) {
        border-left: 1px solid yellow;
        border-right: 1px solid yellow;
      }
    }
  }

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
