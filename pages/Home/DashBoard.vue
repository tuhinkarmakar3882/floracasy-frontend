<template>
  <div class="dashboard-page">
    <Carousel :carousel-items="carouselItems" />
    <!--    <Carousel :loop="true">-->
    <!--      <Slide-->
    <!--        v-for="(item, index) in carouselItems"-->
    <!--        :key="index"-->
    <!--        class="item"-->
    <!--        :style="{ backgroundColor: item.color, color: 'white' }"-->
    <!--      >-->
    <!--        <h3>{{ item.name }}</h3>-->
    <!--      </Slide>-->
    <!--        </Carousel>-->
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
import RippleButton from '~/components/global/RippleButton'
import Carousel from '~/components/Home/Dashboard/Carousel'

export default {
  name: 'DashBoard',
  components: {
    Carousel,
    RippleButton,
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
          name: 'First Item in the carousel',
          color: 'red',
        },
        {
          name: 'Second Item in the carousel',
          color: 'teal',
        },
        {
          name: 'Third Item in the carousel',
          color: 'green',
        },
        {
          name: 'Fourth Item in the carousel',
          color: 'blue',
        },
        {
          name: 'Fifth Item in the carousel',
          color: 'grey',
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
  .item {
    height: 100px;
  }
}
</style>
