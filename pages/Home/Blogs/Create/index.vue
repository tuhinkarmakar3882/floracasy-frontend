<template>
  <div class="draft-blog-page">
    <h5>This is a Creation Tool View</h5>
  </div>
</template>

<script>
export default {
  name: 'BlogCreation',
  layout: 'MobileApp',
  middleware: 'isAuthenticated',
  data() {
    return {
      pageTitle: 'Blog Creation',
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', {
      linkPosition: 2,
    })
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

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
    background-color: $editor-toolbar-background;
    z-index: 1;
    border: none;
    box-shadow: $down-only-box-shadow;
  }

  .test {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 1rem;

    @media only screen and (min-width: $medium) {
      grid-template-columns: 1fr 1fr;
    }

    blockquote,
    ul,
    ol {
      margin: $medium-unit 0 !important;
    }

    h1,
    h2,
    h3,
    h4 {
      position: relative;
      margin: $large-unit 0;

      &::after {
        content: '';
        border-radius: $standard-unit;
        position: absolute;
        bottom: -$micro-unit;
        left: 0;
        height: $nano-unit;
        width: clamp(100px, 20%, 250px);
        background-color: darken($secondary-matte, $lighten-percentage);
      }
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
