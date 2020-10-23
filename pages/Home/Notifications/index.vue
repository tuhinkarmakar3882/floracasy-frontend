<template>
  <div class="text-center my-6 py-6 px-4">
    <h1 class="mdi mdi-bell" />
    <h6 class="my-4">This is my super duper Notifications View Page</h6>
    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  layout: 'MobileApp',
  middleware: 'protectedRoute',
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 3 })
  },
}
</script>
