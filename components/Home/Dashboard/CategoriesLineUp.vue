<template>
  <section class="categories" :class="classList">
    <CustomListView>
      <template slot="list-items">
        <li
          v-for="category in categories"
          :key="category.id"
          v-ripple=""
          class="px-4 py-2"
        >
          <p>
            <img
              :src="category.photo_url"
              :alt="category.name"
              style="border-radius: 50%; max-height: 64px; max-width: 64px"
            />
            <span class="option-name ml-4">{{ category.name }}</span>
            <span class="mdi mdi-chevron-right arrow-go" />
          </p>
        </li>
      </template>
    </CustomListView>
  </section>
</template>
<script>
import endpoints from '@/api/endpoints'
import CustomListView from '@/components/Layout/CustomListView'

export default {
  name: 'CategoriesLineUp',
  components: { CustomListView },
  props: {
    classList: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      categories: [],
    }
  },

  async mounted() {
    const response = await this.$axios.$get(endpoints.categories.fetch)
    this.categories = response.data
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.categories {
  display: flex;
  flex-wrap: wrap;

  button {
    display: flex;

    img {
      width: 2 * $x-large-unit;
      height: 2 * $x-large-unit;
      border-radius: 50%;
      object-fit: cover;
    }

    min-width: auto;
  }
}
</style>
