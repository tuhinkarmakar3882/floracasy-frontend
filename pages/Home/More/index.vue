<template>
  <div class="text-center my-6 py-6 px-4">
    <h1 class="mdi mdi-dots-horizontal-circle" />
    <h6 class="my-4">This is my super duper More Options Page</h6>
    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: 'MoreOptions',
  middleware: 'protectedRoute',
  layout: 'MobileApp',
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 4 })
  },
}
</script>
