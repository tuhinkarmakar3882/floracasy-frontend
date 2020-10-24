<template>
  <div class="create-blog-page">
    <!--    <header>-->
    <!--      <h5 class="mdi mdi-arrow-left" @click="$router.back()" />-->
    <!--      <button v-ripple class="primary-btn">Publish</button>-->
    <!--    </header>-->

    <!--    <main>-->
    <client-only placeholder="loading...">
      <vue-editor v-model="content" />
    </client-only>
    <!--    </main>-->

    <!--    <footer></footer>-->
  </div>
</template>

<style lang="scss">
@import 'assets/all-variables';

.create-blog-page {
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
    //top: 2 * $x-large-unit;
    background-color: #f5deb3;
    z-index: 1;
    border: none;
    box-shadow: $down-only-box-shadow;
  }

  .ql-container.ql-snow {
    border: none;

    .ql-editor {
      padding: 2vh 2vw;
      border: none;
    }
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
      content: localStorage.getItem('draft')
        ? localStorage.getItem('draft')
        : `<h2>Every Great Blog starts with an Amazing title</h2><p>Your great Blog content goes here...</p>`,
    }
  },
  watch: {
    content: (newContent, oldContent) => {
      console.log('old => ', oldContent)
      console.log('new => ', newContent)
      localStorage.setItem('draft', newContent)
    },
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 2 })
  },
}
</script>
