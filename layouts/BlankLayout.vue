<template>
  <div class="editor-layout">
    <!--    <header>-->
    <!--      <h5 class="mdi mdi-arrow-left" @click="$router.back()" />-->
    <!--      <button v-ripple class="primary-btn">Publish</button>-->
    <!--    </header>-->

    <!--    <main>-->
    <nuxt />
    <!--    </main>-->

    <!--    <footer></footer>-->
  </div>
</template>

<script>
export default {
  name: 'BlankLayout',
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.editor-layout {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 $medium-unit;
    height: 2 * $x-large-unit;
    background-color: $nav-bar-bg;
    box-shadow: $down-only-box-shadow;
  }

  main {
    padding-top: $standard-unit;
  }

  button {
    min-width: auto;
    height: $xxx-large-unit;
    width: 4 * $xx-large-unit;
  }
}
</style>
