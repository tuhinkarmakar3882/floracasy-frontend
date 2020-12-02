<template>
  <div class="dashboard-page">
    <Carousel
      :carousel-items="carouselItems"
      :style="[tabNumber === 2 && { height: 0 }]"
      style="overflow: hidden; transition: all 0.3s ease-in-out"
    />

    <section class="tab-bar">
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
    </section>
    <div ref="tabNavigation"></div>

    <section v-if="tabNumber === 0" v-touch:swipe="swipeHandler">
      <h3 class="heading-title">All Blogs</h3>
      <InfiniteScrollingBlogLists />
    </section>

    <section v-if="tabNumber === 1" v-touch:swipe="swipeHandler">
      <h3 class="heading-title">Trending Blogs</h3>
      <InfiniteScrollingBlogLists />
    </section>

    <div
      v-if="tabNumber === 2"
      v-touch:swipe="swipeHandler"
      style="min-height: calc(100vh - 180px)"
    >
      <CategoriesLineUp />
    </div>
  </div>
</template>

<script>
import CategoriesLineUp from '@/components/Home/Dashboard/CategoriesLineUp'
import InfiniteScrollingBlogLists from '@/components/Home/Dashboard/InfiniteScrollingBlogLists'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import Carousel from '~/components/Home/Dashboard/Carousel'

export default {
  name: 'DashBoard',
  components: {
    CategoriesLineUp,
    InfiniteScrollingBlogLists,
    Carousel,
  },
  middleware: 'isAuthenticated',
  layout: 'MobileApp',

  data() {
    return {
      pageTitle: 'Dashboard',
      tabNumber: parseInt(this.$route.query.tabNumber) || 0,
      carouselItems: [
        {
          name: 'First Item in the carousel',
          image: 'https://picsum.photos/500',
        },
        {
          name: 'Second Item in the carousel',
          image: 'https://picsum.photos/500',
        },
        {
          name: 'Third Item in the carousel',
          image: 'https://picsum.photos/500',
        },
        {
          name: 'Fourth Item in the carousel',
          image: 'https://picsum.photos/500',
        },
        {
          name: 'Fifth Item in the carousel',
          image: 'https://picsum.photos/500',
        },
      ],
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: 0 })
  },

  methods: {
    changeTab(newTabNumber) {
      this.tabNumber = newTabNumber
      this.$nextTick(() => {
        this.$refs.tabNavigation.scrollTop = 0
      })
    },
    async swipeHandler(direction) {
      if (direction === 'left') {
        this.tabNumber === 2
          ? await this.$router.push(navigationRoutes.Home.Account.Details)
          : this.tabNumber++
      }
      if (direction === 'right') {
        this.tabNumber <= 0 ? (this.tabNumber = 0) : this.tabNumber--
      }
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
      background: $card-background;
      transition: all 100ms ease-in-out;
    }
  }
}
</style>
