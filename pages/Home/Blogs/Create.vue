<template>
  <div class="create-blog-page py-3">
    <h6 class="heading-title">Add the Details</h6>
    <section class="mx-4">
      <TextInput
        id="blog-title"
        input-type="text"
        label="Enter the Blog Title"
        placeholder="Enter the Blog Title"
        class="my-4"
        :required="true"
        :autofocus="true"
      />
      <TextInput
        id="blog-subtitle"
        input-type="text"
        label="Enter the Blog Subtitle"
        placeholder="Enter the Blog Subtitle"
        class="my-4"
        :required="true"
        :autofocus="true"
      />
      <TextInput
        id="blog-category"
        input-type="text"
        label="Enter the Blog Category"
        placeholder="Enter the Blog Category"
        class="my-4"
        :required="true"
        :autofocus="true"
      />
      <h6 class="heading-title mb-8">Write the Blog below</h6>
    </section>
    <client-only placeholder="loading...">
      <vue-editor v-model="content" class="mb-8" />
    </client-only>
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
    background-color: $editor-toolbar-background;
    z-index: 1;
    border: none;
    box-shadow: $down-only-box-shadow;
  }

  .ql-container.ql-snow {
    border: none;

    .ql-editor {
      padding: $standard-unit;
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
import TextInput from '@/components/global/TextInput'

export default {
  name: 'Create',
  layout: 'EditorLayout',
  middleware: 'protectedRoute',
  components: {
    TextInput,
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
    content: (newContent) => {
      localStorage.setItem('draft', newContent)
    },
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 2 })
  },
}
</script>
