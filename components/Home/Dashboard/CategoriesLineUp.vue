<template>
  <section class="categories" :class="classList">
    <ul class="options">
      <li v-for="category in categories" :key="category.id" class="mx-4">
        <nuxt-link to="/Home/Blogs/CategoryWise/">
          <RippleButton class-list="secondary-outlined-btn">
            {{ category.name }}
          </RippleButton>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>
<script>
import RippleButton from '~/components/global/RippleButton'
export default {
  name: 'CategoriesLineUp',
  components: { RippleButton },
  props: {
    categories: {
      type: Array,
      required: true,
    },
    classList: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.categories {
  ul {
    padding: 1rem 0;
    list-style: none;
    display: flex;
    overflow-x: scroll;
  }
  button {
    width: auto;
  }
}
</style>
