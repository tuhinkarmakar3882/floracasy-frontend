<template>
  <div class="community-page">
    <LazySearchBar
      class="px-4 mt-5 mb-4"
      :detail-screen="navigationRoutes.Home.Community.Search"
    />

    <div class="story-updates-container">
      <section class="top-line pl-4">
        <p class="py-2 font-size-14px">
          <span class="mdi mdi-thought-bubble-outline primary-light" /> Stories
        </p>
        <p
          v-ripple
          class="vibrant py-2 px-4 font-size-14px"
          @click="$router.push(navigationRoutes.Home.Community.Story.index)"
        >
          <span class="mdi mdi-play" />
          View All
        </p>
      </section>

      <section class="stories mt-3">
        <div
          v-ripple
          class="add-a-story py-2 text-center pl-4"
          @click="$router.push(navigationRoutes.Home.Community.Story.add)"
        >
          <transition name="scale-up">
            <img
              v-if="isReady"
              :src="user.photoURL"
              alt="image"
              class="mb-4"
              height="72"
              width="72"
            />
          </transition>
          <span class="mdi mdi-plus" />
          <aside>
            <p class="vibrant">Add New Story</p>
          </aside>
        </div>

        <transition-group name="scale-up" style="display: flex">
          <LazyStory
            v-for="story in stories"
            :key="story.identifier"
            :story="story"
            class="px-4 py-2"
          />
        </transition-group>
      </section>
    </div>

    <hr class="reversed-faded-divider mt-1" />

    <section
      class="add-post-preview px-4 py-6 white"
      @click="$router.push(navigationRoutes.Home.Community.Posts.add)"
    >
      <span class="mdi mdi-pencil-box-multiple-outline mdi-24px mr-3" />
      <p>Share your thoughts or photos or voice</p>
    </section>

    <hr class="faded-divider my-4" />

    <p class="px-4 font-size-14px">
      <span class="mdi mdi-earth primary-light" />
      Across The World
    </p>
    <LazyFetchCommunityPosts />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { setupUser } from '~/utils/utility'

export default {
  name: 'Community',

  layout: 'ResponsiveApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      isReady: false,
      navigationRoutes,
      pageTitle: 'Community',
      stories: [],
    }
  },
  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: 1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })

    await setupUser(this.$store)
    this.isReady = true
    await this.fetchStories()
  },

  methods: {
    async fetchStories() {
      try {
        const { results } = await this.$axios.$get(
          endpoints.community_service.stories
        )
        this.stories.push(...results)
      } catch (e) {}
    },
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
  .add-post-preview {
    display: flex;
    background: $segment-background;
    align-items: center;
    justify-content: flex-start;
  }

  .story-updates-container {
    .top-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
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

        $image-size: 74px;

        img {
          min-height: $image-size;
          height: $image-size;
          min-width: $image-size;
          width: $image-size;
          object-fit: cover;
          box-shadow: $default-box-shadow;
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
          bottom: 60px;
          color: #000;
          height: 24px;
          width: 24px;
          font-size: 14px;
          z-index: 0;
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
  }

  .font-size-14px {
    font-size: 14px;
  }
}
</style>
