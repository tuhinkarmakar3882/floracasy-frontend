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

    <section class="carousel my-5">
      <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
      >
        <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
        >
          <v-sheet
              :color="colors[i]"
              height="100%"
          >
            <v-row
                align="center"
                class="fill-height"
                justify="center"
            >
              <div class="display-3">
                {{ slide }} Slide
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </section>

    <section class="carousel my-5">
      <v-divider dark/>
      <h1 class="text-center my-4">Recent Blogs</h1>
      <v-divider dark/>
    </section>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
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
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
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
