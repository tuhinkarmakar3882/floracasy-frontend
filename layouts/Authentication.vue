<template>
  <main class="modal-style">
    <nuxt />
  </main>
</template>

<script>
export default {
  name: 'Authentication',
}
</script>

<style lang="scss" scoped>
@import 'assets/variables';

.modal-style {
  display: grid;
  place-items: center;
  height: 100vh;
  transition: all 0.5s ease-in-out;
  background-color: darken($body-background, 5%);
}
</style>
