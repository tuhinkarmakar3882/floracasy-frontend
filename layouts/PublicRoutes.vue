<template>
  <div>
    <LazyNavigationBar />

    <main>
      <nuxt />
    </main>

    <LazyFooter />

    <LazyInstallBadge class="install-badge" show-close-button />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.install-badge {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}
</style>
