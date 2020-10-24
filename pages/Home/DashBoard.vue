<template>
  <div class="dashboard-page">
    <Carousel :carousel-items="carouselItems" />

    <div class="tab-bar">
      <p
        v-ripple
        :class="tabNumber === 0 ? 'active-tab' : ''"
        @click="changeTab(0)"
      >
        All Blogs
      </p>
      <p
        v-ripple
        :class="tabNumber === 1 ? 'active-tab' : ''"
        @click="changeTab(1)"
      >
        Trending
      </p>
      <p
        v-ripple
        :class="tabNumber === 2 ? 'active-tab' : ''"
        @click="changeTab(2)"
      >
        Categories
      </p>
    </div>

    <div ref="tabNavigation"></div>

    <InfiniteScrollingBlogLists v-if="tabNumber === 0" />

    <InfiniteScrollingBlogLists v-if="tabNumber === 1" mode="Trending" />

    <div v-if="tabNumber === 2">
      <h4>This will be Categories View</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/all-variables';

$blog-border-radius: 20px;

.dashboard-page {
  transition: all 0.5s ease-in-out;

  .tab-bar {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
    position: sticky;
    top: (2 * $x-large-unit) - $double-unit;
    background-color: $nav-bar-bg;
    box-shadow: $down-only-box-shadow;
    z-index: 1;
    transition: all 0.3s ease-in-out;

    * {
      padding: 0.7rem 0;
      font-size: 1rem;
      font-weight: 300;
    }

    .active-tab {
      color: $secondary;
      font-weight: 400;
    }
  }
}
</style>

<script>
import InfiniteScrollingBlogLists from '@/components/Home/Dashboard/InfiniteScrollingBlogLists'
import Carousel from '~/components/Home/Dashboard/Carousel'

export default {
  name: 'DashBoard',
  components: {
    InfiniteScrollingBlogLists,
    Carousel,
  },
  // middleware: 'protectedRoute',
  layout: 'MobileApp',
  data() {
    return {
      tabNumber: 0,
      categories: [
        {
          id: '0',
          name: 'Beauty',
        },
        {
          id: '1',
          name: 'Games',
        },
        {
          id: '2',
          name: 'Technology',
        },
        {
          id: '3',
          name: 'Art',
        },
        {
          id: '4',
          name: 'Music',
        },
      ],
      carouselItems: [
        {
          name: 'First Item in the carousel',
          image: 'http://picsum.photos/500',
        },
        {
          name: 'Second Item in the carousel',
          image: 'http://picsum.photos/500',
        },
        {
          name: 'Third Item in the carousel',
          image: 'http://picsum.photos/500',
        },
        {
          name: 'Fourth Item in the carousel',
          image: 'http://picsum.photos/500',
        },
        {
          name: 'Fifth Item in the carousel',
          image: 'http://picsum.photos/500',
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 0 })
  },
  methods: {
    changeTab(newTabNumber) {
      this.tabNumber = newTabNumber
      this.$nextTick(() => {
        this.$refs.tabNavigation.scrollTop = 0
      })
    },
  },
}
</script>
