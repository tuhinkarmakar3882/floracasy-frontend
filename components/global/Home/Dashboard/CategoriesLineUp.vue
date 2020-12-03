<template>
  <section class="categories" :class="classList">
    <h4 class="heading-title">Explore Categories</h4>
    <div v-if="contentIsLoading" class="my-6">
      <LoadingIcon />
    </div>
    <CustomListView v-else>
      <template slot="list-items">
        <li
          v-for="category in categories"
          :key="category.id"
          v-ripple=""
          class="px-4 py-3"
          @click="
            $router.push(
              navigationRoutes.Home.Blogs.CategoryWise.Name.replace(
                '{name}',
                category.name
              )
            )
          "
        >
          <p>
            <img
              :src="category.photo_url"
              :alt="category.name"
              style="border-radius: 50%; max-height: 64px; max-width: 64px"
            />
            <span class="option-name ml-4" style="font-size: 18px">{{
              category.name
            }}</span>
            <span class="mdi mdi-chevron-right arrow-go" />
          </p>
        </li>
      </template>
    </CustomListView>
  </section>
</template>

<script>
import CustomListView from '@/components/global/Layout/CustomListView'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import LoadingIcon from '@/components/global/LoadingIcon'
import { mapGetters } from 'vuex'

export default {
  name: 'CategoriesLineUp',
  components: { LoadingIcon, CustomListView },
  props: {
    classList: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      navigationRoutes,
      contentIsLoading: true,
    }
  },
  computed: {
    ...mapGetters({
      categories: 'CategoriesManagement/getCategories',
    }),
  },

  async mounted() {
    !this.categories &&
      (await this.$store.dispatch('CategoriesManagement/fetchCategories'))
    this.contentIsLoading = false
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.categories {
  img {
    width: 2 * $x-large-unit;
    height: 2 * $x-large-unit;
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
