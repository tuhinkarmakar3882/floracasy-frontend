<template>
  <client-only>
    <AppFeel
      class="create-new-blog-page"
      :on-back="navigationRoutes.Home.Blogs.Create.index"
    >
      <template slot="app-bar-title">
        {{ pageTitle }}
      </template>
      <template slot="main" class="my-4">
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
      </template>
    </AppFeel>
  </client-only>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import TextInput from '@/components/global/TextInput'
import { VueEditor } from 'vue2-editor'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'CreateNewBlog',

  components: {
    AppFeel,
    TextInput,
    VueEditor,
  },

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Create New Blog',
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

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
