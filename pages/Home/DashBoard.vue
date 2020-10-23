<template>
  <div class="dashboard-page">
    <Carousel :carousel-items="carouselItems" />

    <h2 class="heading-title">Recent Blogs</h2>

    <InfiniteScrollingBlogLists />
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/all-variables';

$blog-border-radius: 20px;

.dashboard-page {
  transition: all 0.5s ease-in-out;

  .heading-title {
    text-align: center;
    font-size: 28px;
    position: relative;
    margin: 2rem 0 3rem;
    font-weight: 300;

    &::after {
      content: '';
      position: absolute;
      height: 1px;
      width: 84px;
      bottom: -$standard-space;
      left: calc(50% - 42px);
      background: lighten($primary, $lighten-percentage);
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
}
</script>
