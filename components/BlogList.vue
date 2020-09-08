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
          <section v-for="blog in blogsData" :key="blog.id">

            <article class="trendingBlock px-0 my-4 px-md-5">
              <div class="row">
                <div class="col-12 d-none d-md-block col-md-4 col-lg-3 my-2">
                  <img :src="utility.blogImageParser(blog)" alt="trendingBlogImage"
                       class="lazyload my-sm-3 trendingBlogImage w-100 my-4" loading="lazy">
                </div>

                <div class="col-12 col-lg-9 col-md-8 my-2">
                  <nuxt-link :to="blog.blog_link_name">
                    <h2 class="trendingTitle mb-4">
                      {{ blog.blog_title }}
                    </h2>
                  </nuxt-link>
                  <p class="trendingPostTime text-muted">
                    {{ utility.timeStringParser(blog.last_updated) }}
                  </p>

                  <div class="trendingBody">
                    <p class="trendingText">
                      {{ blog.blog_subtitle }}
                      <span class="dotDotDot">...</span>
                    </p>
                    <nuxt-link :to="blog.blog_link_name" class="btn accentButton px-4">Read More</nuxt-link>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </template>
      </template>


    </section>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints.json'
import utility from '@/utils/utility'

export default {
  name: 'LatestArticles',
  props: {
    heading: String,
    blogsPerPage: Number
  },
  data() {
    return {
      loadingStatus: true,
      errorWhileLoading: false,
      blogsData: [],
      utility: utility,
    };
  },
  components: {
    LoadingAnimation: () => import("@/components/LoadingAnimation"),
  },
  mounted() {
    this.fetchBlogDataFromServer();
  },
  methods: {
    reloadBlogs() {
      console.log("yay")
      this.$data.loadingStatus = true;
      this.$data.errorWhileLoading = false;
      this.fetchBlogDataFromServer();
    },

    fetchBlogDataFromServer() {
      this.loadingStatus = true;
      this.errorWhileLoading = true;

      this.$axios.get(endpoints.get_blog_overview)
          .then((response) => {
            this.blogsData = response.data.blog_data;
            this.loadingStatus = false;
            this.errorWhileLoading = false;
          })
          .catch((error) => {
            this.errorWhileLoading = true;
          });
    },

  },
  computed: {
    getImageLinkFrom(blog) {
      return '...';
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/blogHome';

</style>
