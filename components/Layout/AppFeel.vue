<template>
  <div class="app">
    <header>
      <h5 v-ripple class="mdi mdi-arrow-left" @click="$router.back()" />
      <p class="ml-6"><slot name="app-bar-title" /></p>
    </header>
    <main>
      <slot name="main"></slot>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AppFeel',
}
</script>

<style lang="scss">
@import 'assets/all-variables';

.app {
  header {
    //position: fixed;
    top: 0;
    left: 0;
    z-index: $bring-to-front;
    display: flex;
    //justify-content: space-between;
    align-items: center;
    padding: 0 $medium-unit;
    height: 2 * $x-large-unit;
    background-color: lighten($nav-bar-bg, $darken-percentage);
    box-shadow: $down-only-box-shadow;

    p {
      font-size: 1.2rem;
      font-weight: 400;
      color: #dadada;
    }
  }

  main {
    //padding-top: $standard-unit;
    background-color: $body-background;
  }

  //button {
  //  min-width: auto;
  //  height: $xxx-large-unit;
  //  width: 3.5 * $xx-large-unit;
  //}
}
</style>
