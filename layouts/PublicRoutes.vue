<template>
  <div>
    <LazyNavigationBar />

    <main class="main-router-content">
      <nuxt />
    </main>

    <LazyFooter class="px-4 py-4" />

    <LazyInstallBadge class="install-badge" show-close-button />
  </div>
</template>

<script>
export default {
  name: 'PublicRoutes',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.install-badge {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  border-radius: $micro-unit $micro-unit 0 0;
}
</style>
