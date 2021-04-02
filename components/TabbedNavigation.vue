<template>
  <div class="tab-bar">
    <p>Explore</p>
    <p>Categories</p>
  </div>
</template>

<script>
export default {
  name: 'TabbedNavigation',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.tab-bar {
  display: grid;
  text-align: center;
  grid-template-columns: repeat(2, 1fr);
  position: sticky;
  top: 2 * $x-large-unit;
  background-color: $card-background;
  z-index: 1;

  p {
    padding: 1rem 0;
    font-size: 1.2rem;
  }
}
</style>
