<template>
  <div class="editor-layout">
    <header>
      <h5 class="mdi mdi-arrow-left" @click="$router.back()" />
      <button v-ripple class="primary-btn">Publish</button>
    </header>

    <main>
      <client-only placeholder="loading...">
        <vue-editor v-model="content" />
      </client-only>
    </main>

    <footer></footer>
  </div>
</template>

<style lang="scss">
@import 'assets/all-variables';

.editor-layout {
  button {
    min-width: auto;
    height: auto;
    width: auto;
  }

  .ql-picker-label.ql-active {
    width: 110px;
  }
  .ql-toolbar.ql-snow {
    position: sticky;
    top: 0;
    background-color: wheat;
    z-index: 1;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 $medium-unit;
    height: 2 * $x-large-unit;
    background-color: $nav-bar-bg;
    box-shadow: $down-only-box-shadow;

    button {
      min-width: auto;
      height: $xxx-large-unit;
      width: 4 * $xx-large-unit;
    }
  }

  main {
    padding-top: $standard-unit;
  }
}
</style>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'Create',
  layout: 'BlankLayout',
  // middleware: 'protectedRoute',
  components: {
    VueEditor,
  },

  data() {
    return {
      content: `<h2>Every Great Blog starts with an Amazing title</h2><p>Your great Blog content goes here...</p>`,
    }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 2 })
  },
}
</script>
