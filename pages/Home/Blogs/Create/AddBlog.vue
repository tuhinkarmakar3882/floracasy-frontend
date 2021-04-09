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
      <InputField class="my-2" label="Blog Category" hint-text="*Required">
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
      <div id="toolbar">
        <button v-ripple class="ql-bold" type="button">
          <i class="mdi mdi-format-bold"></i>
        </button>
        <button v-ripple class="ql-italic" type="button">
          <i class="mdi mdi-format-italic"></i>
        </button>
        <button v-ripple class="ql-underline" type="button">
          <i class="mdi mdi-format-underline"></i>
        </button>

        <button v-ripple class="ql-divider" type="button">
          <i class="mdi mdi-minus"></i>
        </button>

        <button v-ripple class="ql-blockquote" type="button">
          <i class="mdi mdi-format-quote-close"></i>
        </button>
        <button v-ripple class="ql-code-block" type="button">
          <i class="mdi mdi-xml"></i>
        </button>
        <button v-ripple class="ql-link" type="button">
          <i class="mdi mdi-link"></i>
        </button>

        <button v-ripple class="ql-header ql-active" type="button" value="">
          <i class="mdi mdi-format-paragraph"></i>
        </button>
        <button v-ripple class="ql-header" type="button" value="1">
          <i class="mdi mdi-format-header-1"></i>
        </button>
        <button v-ripple class="ql-header" type="button" value="2">
          <i class="mdi mdi-format-header-2"></i>
        </button>
        <button v-ripple class="ql-header" type="button" value="3">
          <i class="mdi mdi-format-header-3"></i>
        </button>

        <button v-ripple class="ql-photo" type="button">
          <i class="mdi mdi-image"></i>
        </button>
        <button v-ripple class="ql-video" type="button">
          <i class="mdi mdi-video"></i>
        </button>

        <button v-ripple class="ql-align ql-active" type="button" value="">
          <i class="mdi mdi-format-align-left"></i>
        </button>
        <button v-ripple class="ql-align" type="button" value="center">
          <i class="mdi mdi-format-align-center"></i>
        </button>
        <button v-ripple class="ql-align" type="button" value="right">
          <i class="mdi mdi-format-align-right"></i>
        </button>

        <button v-ripple class="ql-strike" type="button">
          <i class="mdi mdi-format-strikethrough-variant"></i>
        </button>

        <button v-ripple class="ql-header" type="button" value="4">
          <i class="mdi mdi-format-header-4"></i>
        </button>
        <button v-ripple class="ql-header" type="button" value="5">
          <i class="mdi mdi-format-header-5"></i>
        </button>
        <button v-ripple class="ql-header" type="button" value="6">
          <i class="mdi mdi-format-header-6"></i>
        </button>

        <button v-ripple class="ql-list" type="button" value="ordered">
          <i class="mdi mdi-format-list-numbered"></i>
        </button>
        <button v-ripple class="ql-list" type="button" value="bullet">
          <i class="mdi mdi-format-list-bulleted"></i>
        </button>

        <button v-ripple class="ql-indent" type="button" value="-1">
          <i class="mdi mdi-format-indent-decrease"></i>
        </button>
        <button v-ripple class="ql-indent" type="button" value="+1">
          <i class="mdi mdi-format-indent-increase"></i>
        </button>

        <button v-ripple class="ql-script" type="button" value="sub">
          <i class="mdi mdi-format-subscript"></i>
        </button>
        <button v-ripple class="ql-script" type="button" value="super">
          <i class="mdi mdi-format-superscript"></i>
        </button>

        <button v-ripple class="ql-clean" type="button">
          <i class="mdi mdi-format-clear"></i>
        </button>
      </div>

      <div id="editor" />
    </main>

    <main v-if="stepNumber === 2" class="steps px-4 pt-6">
      <InputField
        class="mb-2"
        material
        label="Keywords for the Blog"
        hint-text="Keywords helps your article to reach more potential audience. Multiple Keywords can be Separate it with Comma."
      >
        <template #input-field>
          <textarea v-model="blog.keywords" @keyup.space="convertToChips" />
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
      icons.image = '<i class="mdi mdi-image" />'
      icons.photo = '<i class="mdi mdi-image-album" />'
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
      class DividerBlot extends Block {}

      DividerBlot.blotName = 'divider'
      DividerBlot.tagName = 'hr'

      this.Quill.register(DividerBlot)

      const BlockEmbed = this.Quill.import('blots/block/embed')
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
      window.editor = this.editor
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
    max-width: $large;
    margin: auto;
  }

  #editor {
    border: 1px solid $card-background;
  }

  #toolbar {
    display: flex;
    vertical-align: middle;
    overflow: scroll;
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
        color: $inactive-color;
        font-size: 28px;
      }

      &.ql-active {
        background: $active-background;
        outline: 0 none;
        box-shadow: 0 0 4px $card-background;

        i {
          color: $active-color;
          font-size: 28px;
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
    z-index: 1;
    background: rgba($black, 0.7);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &.soft-error {
      background: linear-gradient(
          45deg,
          transparent 0%,
          $nav-bar-bg 12.5%,
          $segment-background 25%,
          $card-background 37.5%,
          $footer-background 50%,
          $card-background 62.5%,
          $segment-background 75%,
          $nav-bar-bg 87.5%,
          transparent 100%
        )
        right no-repeat;
      background-size: 400%;
      animation: shift-background 20s infinite alternate-reverse ease-in-out;
    }
  }
}
</style>
