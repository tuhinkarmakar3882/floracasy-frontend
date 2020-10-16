<template>
  <div class="dashboard my-6">

    <CategoriesLineUp :categories="categories"/>

    <Carousel :carouselItems="carouselItems"/>

    <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    >
      <v-row
          align="center"
          justify="center"
      >
        <v-col
            class="text-center"
            cols="12"
        >
          <h1 class="display-1 font-weight-thin mb-4">
            Parallax
          </h1>
          <h4 class="subheading">
            Build your application today!
          </h4>
        </v-col>
      </v-row>
    </v-parallax>

    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores aut beatae consequatur cupiditate dicta
      eaque, eligendi et expedita explicabo facere hic itaque laboriosam molestiae nisi perspiciatis provident, qui rem?
    </div>
    <div>Ab atque dolores eaque iste maiores molestiae necessitatibus officia officiis porro quasi qui, quod repellat,
      sint, vel vitae. Aliquam aperiam atque cum ducimus, eligendi maxime officiis quam quia similique totam!
    </div>
    <div>A asperiores autem beatae commodi culpa dicta doloribus ducimus eaque esse in incidunt nam nemo officiis omnis
      optio perferendis perspiciatis, placeat provident quam quibusdam quis repudiandae sunt ullam vero voluptatem?
    </div>
    <div>Modi quam quibusdam sequi ullam? Aliquam, fugiat, possimus! Accusamus consectetur cupiditate dignissimos, illum
      iste itaque magnam magni necessitatibus nihil quos? Corporis earum ipsa laborum, nostrum quas tempora tenetur
      totam! Dicta?
    </div>
    <div>Ad dolore nam quibusdam sapiente suscipit. Ad aspernatur beatae cum eius enim eos iste maiores minima,
      molestias mollitia natus, nihil omnis qui quis saepe sapiente soluta sunt totam velit veniam.
    </div>
    <div>Aut autem cum illum ipsa, laborum obcaecati quam sequi sit. Accusamus ad amet asperiores delectus distinctio
      esse ex exercitationem illo modi nemo, nihil, nulla, porro quae quaerat rem voluptates voluptatibus!
    </div>
    <div>Alias animi consequuntur dicta iste minus numquam odit optio placeat quo veniam. Dolores eum harum id natus? At
      blanditiis doloribus facilis magni minima minus mollitia porro sint sit tenetur. Molestias?
    </div>
    <div>Accusantium aliquam architecto, at autem commodi dolorem ea error, exercitationem illum in minima nemo nihil
      nisi nulla omnis quae quam quas quasi quia quidem, quo saepe temporibus ut voluptates voluptatum.
    </div>
    <div>Amet assumenda consequatur cum possimus quidem temporibus? Ab eveniet iure molestias placeat porro quaerat quod
      reprehenderit voluptatem! Debitis, distinctio ducimus fugit id neque non nostrum provident reiciendis, suscipit
      voluptate voluptatum.
    </div>
    <div>Eaque, non numquam quam quas quod quos ullam. Aut culpa eveniet illum minus natus nobis obcaecati pariatur,
      porro, praesentium quaerat ratione sed tempora vero! Adipisci maiores porro recusandae repellat vero.
    </div>

    <CategoriesLineUp :categories="categories"/>

    <Carousel :carouselItems="carouselItems"/>

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
