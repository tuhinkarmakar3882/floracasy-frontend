<template>
  <div class="dashboard my-6 px-4">
    <section class="categories">
      <h2> Browse by Categories </h2>
      <ul class="options">
        <li v-for="category in categories" :key="category.id" class="mx-4">
          <v-btn color="secondary" outlined to="/Home/Blogs/CategoryWise/">
            {{ category.name }}
          </v-btn>
        </li>
      </ul>
    </section>
    <Carousel :carouselItems="carouselItems"/>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  components: {
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
  .categories {
    h2 {
      text-align: center;
      font-family: $Prata;
      font-weight: 400;
      color: white;
      margin-bottom: 1rem;
    }

    ul {
      padding: 1rem 0;
      list-style: none;
      display: flex;
      overflow-x: scroll;
    }
  }
}
</style>
