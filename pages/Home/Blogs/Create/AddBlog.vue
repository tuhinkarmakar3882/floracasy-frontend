<template>
  <div class="create-new-blog-screen">
    <AppBarHeader class="app-header">
      <template #title>{{ pageTitle }}</template>

      <template #action-button>
        <button
          v-if="stepNumber === 0"
          v-ripple
          :class="
            hasTitleAndCategory ? 'secondary-outlined-btn' : 'disabled-btn'
          "
          :disabled="!hasTitleAndCategory"
          @click="nextStep"
        >
          Next
        </button>

        <button
          v-else-if="stepNumber === 1"
          v-ripple
          :class="
            hasTitleAndCategory ? 'secondary-outlined-btn' : 'disabled-btn'
          "
          :disabled="!hasTitleAndCategory"
          @click="showPreview"
        >
          Preview
        </button>

        <button
          v-else-if="stepNumber === 2"
          v-ripple
          :class="
            hasBody && hasTitleAndCategory ? 'secondary-btn' : 'disabled-btn'
          "
          :disabled="!hasBody && !hasTitleAndCategory"
          @click="publish"
        >
          Publish
        </button>
      </template>
    </AppBarHeader>

    <main v-if="stepNumber === 0" class="steps px-4 py-4">
      <InputField
        class="my-4"
        hint-text="*Required"
        label="Blog Title"
        material
      >
        <template #input-field>
          <input v-model="blog.title" type="text" />
        </template>
      </InputField>
      <InputField class="my-4" label="Blog Subtitle" material>
        <template #input-field>
          <input v-model="blog.subtitle" type="text" />
        </template>
      </InputField>
      <InputField class="mt-4" label="Blog Cover Image URL" material>
        <template #input-field>
          <input v-model="blog.coverImage" type="text" />
        </template>
      </InputField>
      <InputField class="my-2" hint-text="*Required" label="Blog Category">
        <template #input-field>
          <select v-model="blog.category">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </template>
      </InputField>
    </main>

    <main v-show="stepNumber === 1" class="steps">
      <section id="toolbar">
        <button
          v-ripple
          v-for="(option, index) in toolbar"
          :class="option.class"
          :key="`toolbar-item-${index}`"
          type="button"
          :value="option.value"
        />
      </section>

      <section id="editor" />
    </main>

    <main v-if="stepNumber === 2" class="steps px-4 pt-6">
      <InputField
        class="mb-2"
        hint-text="Multiple Keywords can be Separate it with Comma."
        label="Keywords for the Blog"
        material
      >
        <template #input-field>
          <textarea
            v-model="blog.keywords"
            rows="5"
            @keyup.space="convertToChips"
          />
        </template>
      </InputField>
      <hr />

      <section>
        <p class="mb-2">
          <span class="secondary"> {{ user.displayName }} </span>
          IN
          <span class="secondary">
            {{ mappingTable[blog.category].name }}
          </span>
        </p>
        <h3 class="mb-4">{{ blog.title }}</h3>
        <small>
          <i class="mdi mdi-clock-time-nine-outline" />
          {{ getRelativeTime(new Date()) }}
        </small>
        <img
          v-if="blog.coverImage"
          :alt="blog.title"
          :src="blog.coverImage"
          class="mt-5"
          style="width: 100%; object-fit: cover; max-height: 250px"
        />
        <p class="my-4">
          {{ blog.subtitle }}
        </p>
      </section>

      <section class="pb-4">
        <article class="ql-editor" v-html="cleanHTML(blog.content)" />
      </section>
    </main>

    <transition name="scale-down">
      <aside v-if="sending" class="loader">
        <i class="mdi mdi-loading mdi-spin mdi-48px vibrant" />
      </aside>
    </transition>
  </div>
</template>

<script>
import '~/assets/override/quill.scss'
import 'quill/dist/quill.snow.css'
import { mapGetters } from 'vuex'
import { cleanHTML, getRelativeTime, showUITip } from '~/utils/utility'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { openDB } from 'idb'

function createMappingFor(categoryList) {
  const mappingTable = {}
  categoryList.forEach((category) => {
    mappingTable[category.id] = category
  })
  return mappingTable
}

export default {
  name: 'AddBlog',
  middleware: 'isAuthenticated',

  async asyncData({ $axios, from: prevURL }) {
    const response = await $axios
      .$get(endpoints.categories.fetch)
      .then((response) => response.data)

    const mappingTable = createMappingFor(response)

    return { categories: response, mappingTable, prevURL }
  },

  data() {
    return {
      pageTitle: 'Create Blog',
      Quill: undefined,
      editor: undefined,
      toolbar: [
        { class: 'ql-bold' },
        { class: 'ql-italic' },
        { class: 'ql-underline' },
        { class: 'ql-divider' },
        { class: 'ql-blockquote' },
        { class: 'ql-code-block' },
        { class: 'ql-link' },
        { class: 'ql-header', value: '1' },
        { class: 'ql-header', value: '2' },
        { class: 'ql-header', value: '3' },
        { class: 'ql-photo' },
        { class: 'ql-video' },
        { class: 'ql-align ql-active', value: '' },
        { class: 'ql-align', value: 'center' },
        { class: 'ql-align', value: 'right' },
        { class: 'ql-strike' },
        { class: 'ql-header', value: '4' },
        { class: 'ql-header', value: '5' },
        { class: 'ql-header', value: '6' },
        { class: 'ql-list', value: 'ordered' },
        { class: 'ql-list', value: 'bullet' },
        { class: 'ql-script', value: 'sub' },
        { class: 'ql-script', value: 'super' },
        { class: 'ql-clean' },
      ],
      toolbarOptions: undefined,
      mappingTable: {},
      categories: [],
      blog: {
        title: null,
        subtitle: null,
        category: null,
        coverImage: null,
        tags: null,
        content: undefined,
        keywords: undefined,
      },
      stepNumber: 0,
      sending: false,

      db: undefined,
      uniqueId: Date.now(),
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
    hasTitleAndCategory() {
      return !!this.blog.title && !!this.blog.category
    },
    hasBody() {
      return !!this.blog.content
    },
  },

  watch: {
    stepNumber(value) {
      switch (value) {
        case 0:
          this.pageTitle = 'Create Blog'
          break
        case 1:
          this.pageTitle = 'Write Blog'
          break
        case 2:
          this.pageTitle = 'Preview'
          break
      }
    },
  },

  async mounted() {
    this.$router.beforeEach((to, _, next) => {
      switch (to.hash) {
        case '#1':
          this.stepNumber = 1
          break
        case '#2':
          this.stepNumber = 2
          break
        default:
          this.stepNumber = 0
          break
      }
      next()
    })

    const currentUser = await this.$store.getters['UserManagement/getUser']
    if (!currentUser) {
      this.loadingProfile = true
      await this.$store.dispatch('UserManagement/fetchData')
    }

    await this.createLocalDBIfNotExists()

    this.setupQuillEditor()
  },

  beforeDestroy() {
    this.$router.beforeEach((__, _, next) => {
      next()
    })
  },

  methods: {
    cleanHTML,
    getRelativeTime,
    convertToChips() {},
    async createLocalDBIfNotExists() {
      this.db = await openDB('Blogs', 1, {
        upgrade(db) {
          const store = db.createObjectStore('drafts', {
            keyPath: 'uniqueId',
          })
          store.createIndex('uniqueId', 'uniqueId')
        },
      })
    },

    setupIcons() {
      const icons = this.Quill.import('ui/icons')

      icons.bold = '<i class="mdi mdi-format-bold" />'
      icons.divider = '<i class="mdi mdi-minus" />'
      icons.italic = '<i class="mdi mdi-format-italic" />'
      icons.strike = '<i class="mdi mdi-format-strikethrough-variant" />'
      icons.underline = '<i class="mdi mdi-format-underline" />'
      icons['code-block'] = '<i class="mdi mdi-xml" />'
      icons.header = {
        '': '<i class="mdi mdi-format-paragraph" />',
        1: '<i class="mdi mdi-format-header-1" />',
        2: '<i class="mdi mdi-format-header-2" />',
        3: '<i class="mdi mdi-format-header-3" />',
        4: '<i class="mdi mdi-format-header-4" />',
        5: '<i class="mdi mdi-format-header-5" />',
        6: '<i class="mdi mdi-format-header-6" />',
      }
      icons.blockquote = '<i class="mdi mdi-format-quote-close" />'
      icons.photo = '<i class="mdi mdi-image" />'
      icons.video = '<i class="mdi mdi-video" />'
      icons.link = '<i class="mdi mdi-link" />'
      icons.list = {
        ordered: '<i class="mdi mdi-format-list-numbered" />',
        bullet: '<i class="mdi mdi-format-list-bulleted" />',
        check: '<i class="mdi mdi-check" />',
      }
      icons.script = {
        sub: '<i class="mdi mdi-format-subscript" />',
        super: '<i class="mdi mdi-format-superscript" />',
      }
      icons.align = {
        '': '<i class="mdi mdi-format-align-left" />',
        center: '<i class="mdi mdi-format-align-center" />',
        right: '<i class="mdi mdi-format-align-right" />',
      }
      icons.indent = {
        '+1': '<i class="mdi mdi-format-indent-increase" />',
        '-1': '<i class="mdi mdi-format-indent-decrease" />',
      }
      icons.clean = '<i class="mdi mdi-format-clear" />'
    },
    setupCustomTags() {
      const Block = this.Quill.import('blots/block')
      const BlockEmbed = this.Quill.import('blots/block/embed')

      class DividerBlot extends Block {}
      DividerBlot.blotName = 'divider'
      DividerBlot.tagName = 'hr'
      this.Quill.register(DividerBlot)

      class PhotoBlot extends BlockEmbed {
        static create(value) {
          const node = super.create()
          node.setAttribute('alt', value.alt)
          node.setAttribute('src', value.url)
          return node
        }

        static value(node) {
          return {
            alt: node.getAttribute('alt'),
            url: node.getAttribute('src'),
          }
        }
      }
      PhotoBlot.blotName = 'photo'
      PhotoBlot.tagName = 'img'
      this.Quill.register(PhotoBlot)
    },
    setupCustomHandler() {
      this.editor.getModule('toolbar').addHandler('photo', this.addImage)
    },
    addImage() {
      const range = this.editor.getSelection(true)
      const value = prompt('Enter Image URL: ', 'https://picsum.photos/500')
      this.editor.insertText(range.index, '\n', this.Quill.sources.USER)
      this.editor.insertEmbed(
        range.index + 1,
        'photo',
        {
          alt: 'Image Upload',
          url: value,
        },
        this.Quill.sources.USER
      )
      this.editor.setSelection(range.index + 2, this.Quill.sources.SILENT)
    },
    setupToolbarOptions() {
      this.toolbarOptions = [
        'bold',
        'italic',
        'underline',
        'divider',
        'strike',
        'blockquote',
        'code-block',
        'link',
        { header: '' },
        { header: 1 },
        { header: 2 },
        { header: 3 },
        { header: 4 },
        { header: 5 },
        { header: 6 },
        { list: 'ordered' },
        { list: 'bullet' },
        { script: 'sub' },
        { script: 'super' },
        { indent: '-1' },
        { indent: '+1' },
        { align: '' },
        { align: 'center' },
        { align: 'right' },
        'image',
        'video',
        'clean',
      ]
    },

    setupQuillEditor() {
      this.Quill = require('quill/dist/quill.js')

      this.setupIcons()
      this.setupCustomTags()
      this.setupToolbarOptions()

      this.editor = new this.Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: '#toolbar',
        },
        syntax: true,
        placeholder: `Compose Something great today!\n\nNeed Inspiration? Read the following quote:\n\n“Close the door. Write with no one looking over your shoulder. Don’t try to figure out what other people want to hear from you; figure out what you have to say. It’s the one and only thing you have to offer.”\n- Barbara Kingsolver`,
      })

      this.setupCustomHandler()

      this.editor.on('text-change', this.saveAsDraft)
    },

    async saveAsDraft() {
      const tx = this.db.transaction('drafts', 'readwrite')
      const store = tx.objectStore('drafts')
      await store.put({
        uniqueId: this.uniqueId,
        title: this.blog.title,
        categoryID: this.blog.category,
        coverImage: this.blog.coverImage,
        subtitle: this.blog.subtitle,
        content: this.editor.root.innerHTML,
        keywords: this.blog.keywords,
      })
      await tx.done
    },

    nextStep() {
      this.stepNumber = 1
      this.$router.push('#1')
    },
    showPreview() {
      this.blog.content = this.editor.root.innerHTML
      this.stepNumber = 2
      this.$router.push('#2')
    },
    async publish() {
      this.sending = true
      await showUITip(this.$store, 'Uploading Article...')
      try {
        await this.$axios.$post(endpoints.blog.create, {
          categoryID: this.blog.category,
          coverImage: this.blog.coverImage,
          title: this.blog.title,
          subtitle: this.blog.subtitle,
          content: this.blog.content,
          keywords: this.blog.keywords,
        })
        localStorage.clear()
        await this.$router.replace(navigationRoutes.Home.DashBoard)
      } catch (e) {
        await showUITip(this.$store, 'Network error. Please Retry', 'error')
      } finally {
        this.sending = false
      }
    },
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

$inactive-background: #e8f8f5;
$inactive-color: #5a5a5a;
$active-background: $primary-matte;
$active-color: $white;

.create-new-blog-screen {
  button {
    padding: 0;
    min-width: auto;
  }

  .app-header {
    position: sticky !important;
    top: 0;
    z-index: 1;
  }

  .secondary-outlined-btn,
  .disabled-btn,
  .secondary-btn {
    border-radius: 50px !important;
    width: 7rem !important;
    height: 2.5rem !important;
  }

  main.steps {
    max-width: $large-screen;
    margin: auto;
  }

  #editor {
    border: 1px solid $card-bg;
  }

  #toolbar {
    display: flex;
    vertical-align: middle;
    overflow-x: scroll;
    overflow-y: hidden;
    margin: 0;
    padding: 0;
    align-items: center;
    height: 2 * $x-large-unit;
    background: $inactive-background;
    position: sticky;
    border: none;
    top: 0;
    z-index: 1;

    button {
      height: 56px;
      min-width: 60px;
      display: grid;
      place-items: center;
      border-radius: 0;

      i {
        color: $inactive-color !important;
        font-size: 28px !important;
      }

      &.ql-active {
        background: $active-background;
        outline: 0 none;
        box-shadow: 0 0 4px $card-bg;

        i {
          color: $active-color !important;
          font-size: 28px !important;
        }
      }
    }
  }

  article.ql-editor {
    padding: 0;
  }

  aside.loader {
    position: fixed;
    top: $zero-unit;
    left: $zero-unit;
    right: $zero-unit;
    bottom: $zero-unit;
    z-index: $bring-to-front;
    background: rgba($black, 0.7);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
