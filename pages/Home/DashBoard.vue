<template>
  <div class="dashboard-page">
    <LazyCarousel
      :carousel-items="carouselItems"
      :style="[
        tabNumber === 2 && { padding: 0 },
        { height: tabNumber === 2 ? 0 : '250px' },
      ]"
      auto-scroll
      image-carousel
      style="overflow: hidden; transition: all 0.3s ease-in-out"
    />

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
    <div ref="tabNavigation"></div>

    <InfiniteScrollingBlogLists
      v-if="tabNumber === 0"
      :key="tabNumber"
      class="consume-full-height"
    />

    <LazyInfiniteScrollingBlogLists
      v-else-if="tabNumber === 1"
      :key="tabNumber"
      class="consume-full-height"
      trending-mode
    />

    <LazyCategoriesLineUp v-else :key="tabNumber" class="consume-full-height" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'DashBoard',
  middleware: 'isAuthenticated',

  layout: 'ResponsiveApp',

  data() {
    return {
      pageTitle: 'Dashboard',
      tabNumber: parseInt(this.$route.hash.substr(1, 1)) || 0,
      carouselItems: [
        {
          id: 0,
          name: 'Listen on the Go',
          body:
            'Now you can continue to listen to your favourite articles whenever you want to',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          buttonText: 'Avail Premium',
          route: navigationRoutes.Home.MoreOptions.Payments.index,
        },
        {
          id: 1,
          name: 'Second Item in the carousel',
          body: 'This is a body Text',
          image:
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 2,
          name: 'Third Item in the carousel',
          body: 'This is a body Text',
          image:
            'https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 3,
          name: 'Fourth Item in the carousel',
          body: 'This is a body Text',
          image:
            'https://images.unsplash.com/photo-1562184242-2b39bde0ab6f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 4,
          name: 'Fifth Item in the carousel',
          body: 'This is a body Text',
          image:
            'https://images.unsplash.com/photo-1527283646354-d874f249ea2b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80',
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

.dashboard-page {
  transition: all 0.5s ease-in-out;

  .tab-bar {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
    position: sticky;
    top: 56px;
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
