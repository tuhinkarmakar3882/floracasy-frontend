<template>
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
</style>
