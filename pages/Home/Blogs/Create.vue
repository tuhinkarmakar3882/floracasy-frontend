<template>
  <div class="text-center my-6 py-6 px-4">
    <h1 class="mdi mdi-plus-circle" />
    <h5 class="my-4">This is my super duper Create a new Blog Page</h5>
    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: 'Create',
  layout: 'EditorLayout',
  // middleware: 'protectedRoute',
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 2 })
  },
}
</script>
