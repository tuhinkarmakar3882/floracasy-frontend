<template>
  <div class="dashboard my-6">

    <CategoriesLineUp :categories="categories"/>

    <Carousel :carouselItems="carouselItems"/>


    <v-sheet
        v-for="i in [0,1,2,3,4,5,6,7,8,9]"
        :key="i"
        class="pa-3"
        color="grey darken-4"
    >
      <v-skeleton-loader
          class="pb-5"
          type="card-avatar"
      />
      <v-skeleton-loader
          class="pb-4"
          type="article"
      />
      <v-skeleton-loader
          class="pb-4"
          type="actions"
      />
      <v-divider class="my-7" dark/>
    </v-sheet>


  </div>
</template>

<script>
import CategoriesLineUp from "@/components/Home/Dashboard/CategoriesLineUp";

export default {
  name: "DashBoard",
  components: {
    CategoriesLineUp,
    Carousel: () => import("@/components/Home/Dashboard/Carousel"),
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

</style>
