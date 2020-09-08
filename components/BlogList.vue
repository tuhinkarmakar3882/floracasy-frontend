<template>
  <div>
    <h1 class="sectionTitle my-5">{{ heading }}</h1>

    <section id="blogPreview" class="container py-5 my-5" data-max-blog="2">

      <template v-if="loadingStatus">
        <LoadingAnimation/>
      </template>

      <template v-else>
        <template v-if="errorWhileLoading">
          <h1 class="text-center">Ran into some error</h1>
          <v-btn color="primary" @click="reloadBlogs">Retry</v-btn>
        </template>

        <template v-else>
          <h1 class="text-center">Replace Me with real Implementation</h1>
        </template>
      </template>


    </section>
  </div>
</template>
<script>

export default {
  name: 'LatestArticles',
  props: {
    heading: String,
    blogsPerPage: Number
  },
  data() {
    return {
      loadingStatus: true,
      errorWhileLoading: true,
    };
  },
  components: {
    LoadingAnimation: () => import("@/components/LoadingAnimation"),
  },
  mounted() {
    setTimeout(() => {
      this.loadingStatus = false;
      this.errorWhileLoading = true;
    }, 2000)
  },
  methods: {
    reloadBlogs() {
      console.log("yay")
      this.$data.loadingStatus = true;
      this.$data.errorWhileLoading = false;
      this.fetchDataFromServer();
    },

    fetchDataFromServer() {
      console.log("more yay")
      setTimeout(() => {
        this.$data.loadingStatus = false;
      }, 3000)
    },
  }
}
</script>
