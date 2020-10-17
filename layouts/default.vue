<template>
  <div>
    <NavigationBar/>

    <div>
      <nuxt/>
    </div>

    <div>
      <Footer/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    NavigationBar: () => import('~/components/global/NavigationBar.vue'),
    Footer: () => import('~/components/global/Footer'),
  },
  data: () => {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/variables';
</style>
