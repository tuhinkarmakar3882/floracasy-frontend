<template>
  <div class="editor-layout">
    <header>
      <h5 class="mdi mdi-arrow-left" @click="$router.back()" />
      <button v-ripple class="primary-btn">Publish</button>
    </header>

    <main>
      <nuxt />
    </main>

    <footer></footer>
  </div>
</template>

<script>
export default {
  name: 'EditorLayout',
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
  }

  main {
    padding-top: 2 * $x-large-unit;
  }

  button {
    min-width: auto;
  }
}
</style>
