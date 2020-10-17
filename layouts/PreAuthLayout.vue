<template>
  <div>
    <div class="div">
      <div class="modal-style">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreAuthLayout',
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
