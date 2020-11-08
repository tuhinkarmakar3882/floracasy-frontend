<template>
  <div class="text-center my-6 py-6 px-4">
    <h1 class="mdi mdi-message-text" />
    <h6 class="my-4">This is my super duper Message View Page</h6>
    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: 'Messages',
  middleware: 'isAuthenticated',
  layout: 'MobileApp',
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: -1 })
  },
}
</script>
