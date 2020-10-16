<template>
  <div class="dashboard">

    <Carousel :carouselItems="carouselItems"/>

    <h2 class="heading-text my-8"> Browse by Categories </h2>

    <CategoriesLineUp :categories="categories"/>

    <h2 class="heading-text my-9">
      Explore Blogs
    </h2>

    <v-sheet class="pa-3" color="segment-background">
      <v-skeleton-loader class="mx-auto" dark max-width="340"
                         type="card-heading,image, list-item-avatar-three-line, actions "/>
    </v-sheet>
  </div>
</template>

<script>
import CategoriesLineUp from "@/components/Home/Dashboard/CategoriesLineUp";
import Carousel from "@/components/Home/Dashboard/Carousel";

export default {
  name: "DashBoard",
  components: {
    Carousel,
    CategoriesLineUp,
  },
  // middleware: "authenticatedRequest",
  layout: "HomeAppLayout",
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
    };
  },
  mounted() {
    this.$store.commit("BottomNavigation/update", {linkPosition: 0})
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logout")
        console.log(this.$store.state.authUser)
        await this.$router.push("/")
      } catch (e) {
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.dashboard {
  .heading-text {
    text-align: center;
    font-family: $Prata;
    font-weight: 400;
    color: white;
    //margin-bottom: 1rem;
  }
}
</style>
