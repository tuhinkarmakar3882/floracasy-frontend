<template>
  <section class="categories py-4">
    <ul class="options">
      <li v-for="category in categories" :key="category.id" class="mx-4">
        <nuxt-link to="/Home/Blogs/CategoryWise/">
          {{ category.name }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'CategoriesLineUp',
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/variables';

.categories {
  ul {
    padding: 1rem 0;
    list-style: none;
    display: flex;
    overflow-x: scroll;
  }
}
</style>
