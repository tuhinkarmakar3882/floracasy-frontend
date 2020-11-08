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
      <div class="test">
        <vue-editor
          id="editor"
          v-model="content"
          class="mb-8"
          :editor-toolbar="customToolbar"
        />
        <vue-editor
          id="content"
          v-model="content"
          class="mb-8 no-border"
          disabled=""
          :editor-toolbar="undefined"
        />
      </div>
    </client-only>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import TextInput from '@/components/global/TextInput'

export default {
  name: 'Create',
  layout: 'EditorLayout',
  // middleware: 'isAuthenticated',
  components: {
    TextInput,
    VueEditor,
  },
  data() {
    return {
      customToolbar: [
        [
          {
            header: [false, 1, 2, 3, 4, 5, 6],
          },
        ],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['image', 'code-block'],
      ],
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
  head() {
    return {
      title: 'Create a new blog',
      meta: [
        {
          // hid: 'description',
          // name: 'description',
          // content: 'My custom description',
        },
      ],
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
