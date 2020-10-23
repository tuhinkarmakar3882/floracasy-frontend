<template>
  <h1>This is my super duper blog detail page</h1>
</template>

<script>
export default {
  name: 'Details',
  layout: 'MobileApp',
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: -1 })
  },
}
</script>
