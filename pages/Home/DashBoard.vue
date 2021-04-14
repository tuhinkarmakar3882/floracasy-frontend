<template>
  <div class="dashboard-page">
    <LazyCarousel
      v-if="showCarousel"
      class="carousel"
      :total-items="8"
      absolute-mode
      :class="tabNumber === 2 && 'stay-hidden'"
      :style="{ height: carouselHeight }"
    >
      <template #slides>
        <section
          v-for="item in carouselItems"
          :key="item.id"
          class="carousel-item"
          v-ripple
          @click="navigateTo(item.route)"
        >
          <img
            :alt="item.name"
            :src="item.image"
            style="object-fit: cover"
            height="720"
            width="1280"
          />
        </section>
      </template>
    </LazyCarousel>

    <section ref="tabNavigation" class="tab-bar">
      <p
        v-ripple
        :class="tabNumber === 0 ? 'active-tab' : ''"
        @click="changeTab(0)"
      >
        <span class="mdi mdi-all-inclusive" />
        All Blogs
      </p>
      <p
        v-ripple
        :class="tabNumber === 1 ? 'active-tab' : ''"
        @click="changeTab(1)"
      >
        <span class="mdi mdi-fire" />
        Trending
      </p>
      <p
        v-ripple
        :class="tabNumber === 2 ? 'active-tab' : ''"
        @click="changeTab(2)"
      >
        <span class="mdi mdi-shape" />
        Categories
      </p>
    </section>

    <InfiniteScrollingBlogLists
      v-if="tabNumber === 0"
      :key="tabNumber"
      class="consume-full-height"
      show-follow-suggestions
    />

    <LazyInfiniteScrollingBlogLists
      v-else-if="tabNumber === 1"
      :key="tabNumber"
      class="consume-full-height"
      show-follow-suggestions
      trending-mode
    />

    <CategoriesList v-else :key="tabNumber" class="consume-full-height" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'DashBoard',
  layout: 'ResponsiveApp',

  data() {
    return {
      pageTitle: 'Dashboard',
      tabNumber: 0,
      carouselItems: [
        {
          id: 0,
          name: 'Explore a Growing Number of Articles',
          body:
            'With Writers & Readers, joining almost each day, We’re growing Bigger starting with you. ',
          image: '/images/Frame_0.jpg',
          buttonText: 'Explore Articles',
          route: navigationRoutes.Home.DashBoard,
        },
        {
          id: 1,
          name: 'Connect Better with People Across the World',
          body:
            'Connecting with the audience and with your friend circle is just as important as anything else. use our community section for that & meanwhile, we’re working hard to add messaging!',
          image: '/images/Frame_1.jpg',
          buttonText: 'Explore People',
          route: navigationRoutes.Home.Community.index,
        },
        {
          id: 2,
          name: 'Create Disappearing Stories with Filters',
          body:
            'Sometimes, we might want to better connect with our fellow followers & readers. Hence, We got you covered with stories! Let it be Text, Photo or even Audio!',
          image: '/images/Frame_2.jpg',
          buttonText: 'Create Story',
          route: navigationRoutes.Home.Community.Story.add,
        },
        {
          id: 3,
          name: 'Get Rewarded for Writing Quality Content',
          body:
            'The Articles that you write are the ones you get paid back from. With a higher number of audiences, and a consistent writing pattern can boost your revenue!',
          image: '/images/Frame_3.jpg',
          buttonText: 'Start Now',
          route: navigationRoutes.Home.Blogs.Create.index,
        },
        {
          id: 4,
          name: 'Audio Blogs & More Features Coming Soon!',
          body:
            'As always, we are continuously working hard, to add features, stabilize the platform & make it accessible to the wide community!',
          image: '/images/Frame_4.jpg',
          buttonText: 'Create Story',
          route: navigationRoutes.Home.DashBoard,
        },
        {
          id: 5,
          name: 'Customize Your Profile, for a Better Reach!',
          body:
            'A well versed profile can have a significantly higher exploration rate. Share your mood, what are you upto, etc.. with your chosen community!',
          image: '/images/Frame_5.jpg',
          buttonText: 'Edit Profile',
          route: navigationRoutes.Home.MoreOptions.Preferences.EditProfile,
        },
        {
          id: 6,
          name: 'Enable Notifications for a Seamless Experience!',
          body:
            'Being a socio-blogging platform, it’s good to have the notifications enabled. So that you never miss an update from your fellow mates!',
          image: '/images/Frame_6.jpg',
          buttonText: 'Check Now',
          route: navigationRoutes.Home.Notifications.index,
        },
        {
          id: 7,
          name: 'Facing Issues while Using? Let Us Know!',
          body:
            'And, Sometimes, there are thunderstorms instead of sunny days. We understand that. And hence we’re just a tap away! Connect to the support team for any assistance!',
          image: '/images/Frame_7.jpg',
          buttonText: 'Report Now',
          route: navigationRoutes.Home.MoreOptions.HelpAndSupport.index,
        },
      ],
      carouselHeight: '200px',
      showCarousel: false,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: 0,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })

    this.$router.beforeEach((to, _, next) => {
      switch (to.hash) {
        case '#1':
          this.tabNumber = 1
          break
        case '#2':
          this.tabNumber = 2
          break
        default:
          this.tabNumber = 0
          break
      }
      next()
    })

    this.updateCarouselHeight()
    window.onresize = this.updateCarouselHeight
  },
  beforeDestroy() {
    this.$router.beforeEach((__, _, next) => {
      next()
    })
    window.onresize = () => {}
  },

  methods: {
    changeTab(newTabNumber) {
      this.tabNumber = newTabNumber
      this.$refs.tabNavigation.scrollTop = 0
      this.$router.push('#' + newTabNumber)
    },
    updateCarouselHeight() {
      this.showCarousel = window.innerWidth < 992
      this.carouselHeight = `${window.innerWidth * 0.5625}px`
    },
    async navigateTo(route) {
      await this.$router.push(route)
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

$blog-border-radius: 20px;

.dashboard-page {
  max-width: $large-screen;
  margin: auto;

  * {
    transition: all 300ms ease-in-out;
  }

  .carousel {
    transition: all 200ms ease-in-out;
    overflow-y: hidden;
    @media only screen and (min-width: $large-screen) {
      display: none;
    }
    &.stay-hidden {
      height: 0 !important;
      overflow: hidden;
      transform: translateY(-100px);
      opacity: 0;
    }
  }

  .tab-bar {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
    position: sticky;
    top: 56px;
    background-color: $navigation-bar-color;
    box-shadow: $down-only-box-shadow;
    z-index: 3;
    transition: all 0.3s ease-in-out;

    * {
      padding: 0.7rem 0;
      font-size: 1rem;
      font-weight: 300;
    }

    .active-tab {
      color: $white;
      font-weight: 400;
      background: $active-gradient;
      transition: all 0.1s ease-in-out;
    }
  }

  .consume-full-height {
    min-height: calc(100vh - 250px);
  }
}
</style>
