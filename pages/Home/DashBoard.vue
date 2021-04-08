<template>
  <div class="dashboard-page">
    <!--    <LazyCarousel-->
    <!--      :carousel-items="carouselItems"-->
    <!--      image-carousel-->
    <!--      use-floating-carousel-->
    <!--    />-->

    <section class="tab-bar">
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
    <div id="abc" ref="tabNavigation"></div>

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
      tabNumber: parseInt(this.$route.hash.substr(1, 1)) || 0,
      carouselItems: [
        {
          id: 0,
          name: 'Simplified Experience',
          body:
            'Now you can continue to listen to your favourite articles whenever you want to',
          image: '/images/Frame_0.jpg',
          buttonText: 'Avail Premium',
          route: navigationRoutes.Home.MoreOptions.Payments.index,
        },
        {
          id: 1,
          name: 'Avail',
          body: 'This is a body Text',
          image: '/images/Frame_1.jpg',
        },
        {
          id: 2,
          name: 'Third Item in the carousel',
          body: 'This is a body Text',
          image: '/images/Frame_2.jpg',
        },
        {
          id: 3,
          name: 'Fourth Item in the carousel',
          body: 'This is a body Text',
          image: '/images/Frame_3.jpg',
        },
        {
          id: 4,
          name: 'Fifth Item in the carousel',
          body: 'This is a body Text',
          image: '/images/Frame_4.jpg',
        },
      ],
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
  },

  methods: {
    changeTab(newTabNumber) {
      this.tabNumber = newTabNumber
      this.$refs.tabNavigation.scrollTop = 0
      this.$router.push('#' + newTabNumber)
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
.carousel-container {
  border: 1px solid red;

  @media only screen and (min-width: $small) {
    border: 1px solid greenyellow;
    width: calc(100vw - 4.5rem);
  }

  .carousel-item {
    border: 1px solid red;
    max-width: $large;
    align-self: stretch;
  }
}

.dashboard-page {
  max-width: $large;
  margin: auto;

  * {
    transition: all 300ms ease-in-out;
  }

  .tab-bar {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
    position: sticky;
    top: 56px;
    background-color: $nav-bar-bg;
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
