<template>
  <div>
    <LazynstallBadge class="install-badge" show-close-button />
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'FullScreen',
}
</script>

<style scoped>
.install-badge {
  z-index: 1234567890;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
}
</style>
