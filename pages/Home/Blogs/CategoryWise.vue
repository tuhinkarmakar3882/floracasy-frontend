<template>
  <div class="text-center my-6 py-6 px-4">
    <span> mdi-apps </span>
    <h1 class="my-4">This is my super duper Category View Page</h1>
    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: 'CategoryWise',
  layout: 'MobileApp',
  middleware: 'protectedRoute',
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 0 })
  },
}
</script>
