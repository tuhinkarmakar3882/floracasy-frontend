<template>
  <div class="community-page">
    <TopActionBar class="px-4 mt-5 mb-4" />

    <div class="story-updates-container">
      <section class="top-line pl-4">
        <p class="py-2">Stories</p>
        <p
          v-ripple
          class="vibrant py-2 px-4"
          @click="$router.push(navigationRoutes.Home.Community.Story.index)"
        >
          <span class="mdi mdi-play" />
          View All
        </p>
      </section>

      <section class="stories">
        <div
          v-ripple
          class="add-a-story py-2 text-center"
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
          <small class="vibrant">Add New Story</small>
        </div>

        <transition-group name="scale-up" style="display: flex">
          <Story
            v-for="story in stories"
            :key="story.identifier"
            :story="story"
            class="px-4 py-2"
          />
        </transition-group>
      </section>
    </div>

    <hr class="faded-divider my-6" />

    <!--    <section @click="$router.push(navigationRoutes.Home.Community.Posts.add)">-->
    <!--      <AddPostPreview v-ripple />-->
    <!--    </section>-->
    <!--    <hr class="faded-divider my-4" />-->

    <p class="px-4" style="font-size: 14px">
      <span class="mdi mdi-earth primary-light" />
      Across The World
    </p>
    <FetchCommunityPosts />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import AddPostPreview from '~/components/global/Community/AddPostPreview'
import endpoints from '~/api/endpoints'

export default {
  name: 'Community',
  components: {
    AddPostPreview,
    FetchCommunityPosts: () =>
      import('@/components/global/Community/FetchCommunityPosts'),
    TopActionBar: () => import('@/components/global/Community/TopActionBar'),
    Story: () => import('@/components/global/Community/Story'),
  },

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

    await this.setupUser()
    this.isReady = true
    await this.fetchStories()
  },

  methods: {
    async setupUser() {
      const currentUser = await this.$store.getters['UserManagement/getUser']
      if (!currentUser) {
        this.loadingProfile = true
        await this.$store.dispatch('UserManagement/fetchData')
      }
    },
    async fetchStories() {
      const { results } = await this.$axios.$get(
        endpoints.community_service.stories
      )
      this.stories.push(...results)
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
          height: 74px;
          border-radius: 50%;
          width: 74px;
          object-fit: cover;
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
          z-index: 0;
        }
      }
    }
  }
}
</style>
