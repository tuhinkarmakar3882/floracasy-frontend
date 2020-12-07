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

    <section v-if="tabNumber === 0">
      <h3 class="heading-title">All Blogs</h3>
      <InfiniteScrollingBlogLists />
    </section>

    <section v-if="tabNumber === 1">
      <h3 class="heading-title">Trending Blogs</h3>
      <InfiniteScrollingBlogLists />
    </section>

    <div v-if="tabNumber === 2" style="min-height: calc(100vh - 180px)">
      <CategoriesLineUp />
    </div>
  </div>
</template>

<script>
import CategoriesLineUp from '@/components/global/Home/Dashboard/CategoriesLineUp'
import InfiniteScrollingBlogLists from '@/components/global/Home/Dashboard/InfiniteScrollingBlogLists'
import Carousel from '@/components/global/Home/Dashboard/Carousel'
import { mapGetters } from 'vuex'

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
          body: 'This is a body Text',
          image: 'https://picsum.photos/501',
        },
        {
          name: 'Second Item in the carousel',
          body: 'This is a body Text',
          image: 'https://picsum.photos/502',
        },
        {
          name: 'Third Item in the carousel',
          body: 'This is a body Text',
          image: 'https://picsum.photos/503',
        },
        {
          name: 'Fourth Item in the carousel',
          body: 'This is a body Text',
          image: 'https://picsum.photos/504',
        },
        {
          name: 'Fifth Item in the carousel',
          body: 'This is a body Text',
          image: 'https://picsum.photos/505',
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
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: 0 })
    await this.setupUser()
  },
  methods: {
    async setupUser() {
      const currentUser = await this.$store.getters['UserManagement/getUser']
      if (!currentUser) {
        this.loadingProfile = true
        await this.$store.dispatch('UserManagement/fetchData')
      }
    },
    changeTab(newTabNumber) {
      this.tabNumber = newTabNumber
      this.$nextTick(() => {
        this.$refs.tabNavigation.scrollTop = 0
      })
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
