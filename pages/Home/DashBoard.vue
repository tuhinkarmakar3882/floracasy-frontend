<template>
  <div class="dashboard-page">
    <Carousel :carousel-items="carouselItems" />

    <h3 class="text-center">Browse by Categories</h3>

    <CategoriesLineUp :categories="categories" class-list="my-4" />

    <h2 class="my-9">Explore Blogs</h2>
    <div class="text-center">
      <RippleButton class-list="danger-outlined-btn" :on-click="logout">
        Logout
      </RippleButton>
    </div>
  </div>
</template>

<script>
import CategoriesLineUp from '@/components/Home/Dashboard/CategoriesLineUp'
import Carousel from '@/components/Home/Dashboard/Carousel'
import RippleButton from '~/components/global/RippleButton'

export default {
  name: 'DashBoard',
  components: {
    RippleButton,
    Carousel,
    CategoriesLineUp,
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
          name: 'First',
          color: 'indigo',
        },
        {
          name: 'Second',
          color: 'warning',
        },
        {
          name: 'Third',
          color: 'pink darken-2',
        },
        {
          name: 'Fourth',
          color: 'red lighten-1',
        },
        {
          name: 'Fifth',
          color: 'deep-purple accent-4',
        },
      ],
      attrs: {
        class: 'mb-6',
        // boilerplate: true,
        elevation: 2,
      },
    }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 0 })
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        // console.log(this.$store.state.authUser)
        await this.$router.push('/')
      } catch (e) {}
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.dashboard-page {
  transition: all 0.5s ease-in-out;
}
</style>
