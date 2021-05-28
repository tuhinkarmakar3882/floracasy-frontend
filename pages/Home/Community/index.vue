<template>
  <div class="community-page">
    <!--  Search Box  -->
    <section
      class="search-box-container px-4 mt-5 mb-4"
      @click="$router.push(navigationRoutes.Home.Community.Search)"
    >
      <div class="search-box">
        <input
          id="search-box"
          ref="search"
          autocomplete="off"
          placeholder="Type here to search"
          readonly
          type="text"
        />
        <label
          aria-label="Type here to search"
          class="mdi px-4 mdi-24px mdi-magnify"
          for="search-box"
        />
        <span
          v-ripple
          aria-label="Click here to start searching"
          class="mdi mdi-check mdi-24px px-4"
        />
      </div>
    </section>

    <!--  Story Updates  -->
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

        <div
          v-if="loadingStories"
          class="mx-4"
          :style="{
            display: 'grid',
            gridAutoFlow: 'column',
            gridGap: '16px',
          }"
        >
          <ImageSkeleton
            class="px-4 py-2 my-2"
            radius="50%"
            height="72px"
            width="72px"
          />
          <ImageSkeleton
            class="px-4 py-2 my-2"
            radius="50%"
            height="72px"
            width="72px"
          />
          <ImageSkeleton
            class="px-4 py-2 my-2"
            radius="50%"
            height="72px"
            width="72px"
          />
          <ImageSkeleton
            class="px-4 py-2 my-2"
            radius="50%"
            height="72px"
            width="72px"
          />
        </div>

        <transition-group name="scale-up" style="display: flex">
          <LazyStory
            v-for="story in stories"
            :key="story.identifier"
            v-ripple
            :story="story"
            class="px-4 py-2"
          />
        </transition-group>
      </section>
    </div>

    <hr class="reversed-faded-divider mt-1" />

    <!--  Add Post Option  -->
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
    <FetchCommunityPosts />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import FetchCommunityPosts from '~/components/Social/Posts/FetchCommunityPosts'

export default {
  name: 'Community',
  components: { FetchCommunityPosts, ImageSkeleton },
  layout: 'ResponsiveApp',
  middleware: 'isAuthenticated',

  data() {
    return {
      isReady: false,
      navigationRoutes,
      pageTitle: 'Community',
      stories: [],
      loadingStories: true,
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

    this.isReady = true
    this.fetchStories()
  },

  methods: {
    async fetchStories() {
      try {
        const { results } = await this.$axios.$get(
          endpoints.community_service.stories.index
        )
        this.stories.push(...results)
        this.loadingStories = false
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
  max-width: $large-screen;
  margin: auto;

  .add-post-preview {
    display: flex;
    background: $body-bg-alternate;
    align-items: center;
    justify-content: flex-start;
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
      background: $secondary-vibrant;
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

  .search-box-container {
    display: flex;
    align-items: center;
    position: relative;

    .search-box {
      position: relative;
      width: 100%;
      z-index: $bring-to-front - 11;

      $custom-muted: #777;
      $custom-input-border: #333;

      span,
      label {
        height: 48px;
        position: absolute !important;
        top: 0;
        display: grid;
        place-items: center;
        border-radius: 2 * $x-large-unit;
        transition: all 0.2s ease-in-out;
      }

      span {
        right: 0;
        opacity: 0;
        transform: scale(0);
        color: $secondary;
      }

      label {
        left: 0;
        color: $custom-muted;
      }

      input {
        transition: all 0.2s ease-in-out;
        border: 1px solid $custom-input-border;
        border-radius: 2 * $x-large-unit;
        height: 48px;
        padding: 0 48px;
        color: $custom-muted;
        font-weight: 300;
        font-family: $Raleway;
        letter-spacing: $single-unit;
        font-size: 1rem;

        &::placeholder {
          color: $custom-muted;
          font-weight: 300;
        }

        &:focus,
        &:not(:placeholder-shown) {
          border: 1px solid $secondary-highlight;

          & ~ label {
            color: $secondary;
          }
        }

        &:not(:placeholder-shown) {
          color: $secondary;
          padding-left: 20px;

          & ~ span {
            transform: scale(1);
            opacity: 1;
          }

          & ~ label {
            width: 0;
            margin: 0;
            padding: 0;
            opacity: 0;
            overflow: hidden;
          }
        }
      }
    }
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
    }
  }

  .font-size-14px {
    font-size: 14px;
  }
}
</style>
