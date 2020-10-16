<template>
  <v-sheet class="categories py-4" color="segment-background">
    <ul class="options">
      <li v-for="category in categories" :key="category.id" class="mx-4">
        <v-btn color="secondary" outlined to="/Home/Blogs/CategoryWise/">
          {{ category.name }}
        </v-btn>
      </li>
    </ul>
  </v-sheet>
</template>
<script>
export default {
  name: 'CategoriesLineUp',
  props: {
    categories: {}
  }
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.categories {

  ul {
    padding: 1rem 0;
    list-style: none;
    display: flex;
    overflow-x: scroll;
  }
}
</style>
