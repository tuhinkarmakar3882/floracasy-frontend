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
      <header id="toolbar">
        <button
          v-for="(option, index) in toolbar"
          :key="`toolbar-item-${index}`"
          v-ripple
          :aria-label="option.tooltip"
          :class="option.class"
          :title="option.tooltip"
          :value="option.value"
          type="button"
        />
      </header>

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
          <textarea v-model="blog.keywords" rows="5" />
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

    <transition name="scale-down">
      <aside
        v-if="showEmbedContentUI"
        class="loader embed-UI"
        @click="showEmbedContentUI = false"
        @keyup.esc="showEmbedContentUI = false"
      >
        <InputField
          class="input-field mb-4"
          label="Add External Link"
          material
          @click.stop
        >
          <template #input-field>
            <input
              v-model="embeddedURL"
              placeholder="https://example.com"
              required
              type="url"
              @click.stop
              @keyup.enter="embedContent"
            />
          </template>
        </InputField>

        <section @click.stop>
          <button v-ripple class="mx-4 info-btn" @click="embedContent">
            Add
          </button>
          <button
            v-ripple
            class="mx-4 danger-outlined-btn"
            @click="showEmbedContentUI = false"
          >
            Cancel
          </button>
        </section>
      </aside>
    </transition>

    <transition name="scale-down">
      <aside
        v-if="showEmbedImageUI"
        class="loader embed-UI"
        @click="showEmbedImageUI = false"
        @keyup.esc="showEmbedImageUI = false"
      >
        <InputField
          class="input-field mb-4"
          label="Enter Image URL"
          material
          @click.stop
        >
          <template #input-field>
            <input
              v-model="imageUpload.link"
              placeholder="https://picsum.embedPhoto/560"
              required
              type="url"
              @click.stop
            />
          </template>
        </InputField>
        <InputField
          class="input-field mb-4"
          label="Description"
          material
          @click.stop
        >
          <template #input-field>
            <input
              v-model="imageUpload.description"
              placeholder="A Description of the Image"
              required
              type="url"
              @click.stop
            />
          </template>
        </InputField>

        <section @click.stop>
          <button v-ripple class="mx-4 info-btn" @click="embedPhoto">
            Add Image
          </button>
          <button
            v-ripple
            class="mx-4 danger-outlined-btn"
            @click="showEmbedImageUI = false"
          >
            Cancel
          </button>
        </section>
      </aside>
    </transition>
  </div>
</template>

<script>
import '~/assets/override/quill.scss'
import 'quill/dist/quill.snow.css'
import { mapGetters } from 'vuex'
import {
  cleanHTML,
  getEmbeddableLink,
  getRelativeTime,
  showUITip,
} from '~/utils/utility'
import endpoints from '~/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { openDB } from 'idb'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import InputField from '~/components/Common/Tools/InputField'
import axios from 'axios'

// import QuillMarkdown from 'quilljs-markdown'

function createMappingFor(categoryList) {
  const mappingTable = {}
  categoryList.forEach((category) => {
    mappingTable[category.id] = category
  })
  return mappingTable
}

export default {
  name: 'AddBlog',
  components: { InputField, AppBarHeader },
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
        { class: 'ql-image', tooltip: 'Add Photo' },
        { class: 'ql-embedIframe', tooltip: 'Embed External Link' },
        { class: 'ql-blockquote', tooltip: 'Add a Blockquote' },
        { class: 'ql-code-block', tooltip: 'Add Code Block' },
        { class: 'ql-link', tooltip: 'Add External Link' },
        // { class: 'ql-video', tooltip: 'Add Video' },
        { class: 'ql-divider', tooltip: 'Add a Divider' },

        { class: 'ql-bold', tooltip: 'Bold Text' },
        { class: 'ql-italic', tooltip: 'Italic Text' },

        { class: 'ql-header', value: '1', tooltip: 'Heading Level 1' },
        { class: 'ql-header', value: '2', tooltip: 'Heading Level 2' },
        { class: 'ql-header', value: '3', tooltip: 'Heading Level 3' },

        { class: 'ql-underline', tooltip: 'Underline Text' },

        {
          class: 'ql-align ql-active',
          value: '',
          tooltip: 'Left Align Content',
        },
        { class: 'ql-align', value: 'center', tooltip: 'Center Align Content' },
        { class: 'ql-align', value: 'right', tooltip: 'Right Align Content' },

        { class: 'ql-strike', tooltip: 'Strikeout the Text' },
        { class: 'ql-header', value: '4', tooltip: 'Heading Level 4' },
        { class: 'ql-header', value: '5', tooltip: 'Heading Level 5' },
        { class: 'ql-header', value: '6', tooltip: 'Heading Level 6' },

        { class: 'ql-list', value: 'ordered', tooltip: 'Add an Ordered List' },
        { class: 'ql-list', value: 'bullet', tooltip: 'Add an Unordered List' },

        { class: 'ql-script', value: 'sub', tooltip: 'Add a SuperScript Text' },
        { class: 'ql-script', value: 'super', tooltip: 'Add a SubScript Text' },
        { class: 'ql-clean', tooltip: 'Clear All Formatting' },
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

      embeddedURL: '',
      imageUpload: {
        link: '',
        description: '',
      },
      showEmbedContentUI: false,
      showEmbedImageUI: false,

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

    if (this.$route?.params?.draft) {
      const draft = this.$route?.params?.draft
      this.blog = {
        title: draft?.title,
        subtitle: draft?.subtitle,
        category: this.mappingTable[draft?.category],
        coverImage: draft?.coverImage,
        tags: draft?.tags,
        content: draft?.content,
        keywords: draft?.keywords,
      }
      this.uniqueId = draft?.uniqueId
    }

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
    // Common
    cleanHTML,
    getRelativeTime,

    // Draft & AutoSave
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

    // Setup Editor
    setupToolbarOptions() {
      this.toolbarOptions = [
        'bold',
        'italic',
        'underline',
        'divider',
        'embedIframe',
        'image',

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

        'clean',
      ]
    },
    setupIcons() {
      const icons = this.Quill.import('ui/icons')
      icons.bold = '<i class="mdi mdi-format-bold" />'
      icons.divider = '<i class="mdi mdi-minus" />'
      icons.italic = '<i class="mdi mdi-format-italic" />'
      icons.strike = '<i class="mdi mdi-format-strikethrough-variant" />'
      icons.underline = '<i class="mdi mdi-format-underline" />'

      icons.embedIframe = '<i class="mdi mdi-code-tags" />'
      icons.image = '<i class="mdi mdi-image" />'

      icons['code-block'] = '<i class="mdi mdi-code-json" />'
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

      class ImageBlot extends BlockEmbed {
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

      ImageBlot.blotName = 'image'
      ImageBlot.tagName = 'img'
      this.Quill.register(ImageBlot)

      class IframeBlot extends BlockEmbed {
        static create(value) {
          const node = super.create()
          node.setAttribute('src', value.src)
          node.setAttribute('class', 'ql-video')
          node.setAttribute('frameborder', '0')
          node.setAttribute('allowfullscreen', 'true')
          return node
        }

        static value(node) {
          return {
            src: node.getAttribute('src'),
          }
        }
      }

      IframeBlot.blotName = 'embedIframe'
      IframeBlot.tagName = 'iframe'
      this.Quill.register(IframeBlot)

      class LinkPreviewCardBlot extends BlockEmbed {
        static create(value) {
          const node = super.create()
          node.setAttribute('class', 'ql-link-preview-card')

          const anchorTag = document.createElement('a')
          anchorTag.setAttribute('href', value.link)
          anchorTag.setAttribute('target', '_blank')

          const aside = document.createElement('aside')

          const h4 = document.createElement('h4')
          h4.textContent = value.title
          aside.appendChild(h4)

          const p = document.createElement('p')
          p.textContent = value.description
          aside.appendChild(p)

          const span = document.createElement('span')

          const icon = document.createElement('i')
          icon.setAttribute('class', 'mdi mdi-link')
          span.appendChild(icon)

          const small = document.createElement('small')
          small.textContent = value.domain
          span.appendChild(small)

          aside.appendChild(span)

          const img = document.createElement('img')
          img.src = value.img

          anchorTag.appendChild(img)
          anchorTag.appendChild(aside)
          node.appendChild(anchorTag)

          // node.innerHTML = `
          //   <a href="${value.link}">
          //     <img src="${value.img}" alt="Preview Image"/>
          //     <aside>
          //       <h4>${value.title}</h4>
          //       <p>${value.description}</p>
          //       <span>
          //         <i class="mdi mdi-link"></i>
          //         <small>${value.description}</small>
          //       </span>
          //     </aside>
          //   </a>
          // `
          return node
        }

        static value(node) {
          return {
            // Update Values...
            alt: node.getAttribute('alt'),
            url: node.getAttribute('src'),
          }
        }
      }

      LinkPreviewCardBlot.blotName = 'linkPreviewCard'
      LinkPreviewCardBlot.tagName = 'section'
      this.Quill.register(LinkPreviewCardBlot)
    },
    setupCustomHandler() {
      console.log(this.editor.getModule('toolbar'))
      this.editor.getModule('toolbar').addHandler('image', this.showImageModal)
      this.editor
        .getModule('toolbar')
        .addHandler('embedIframe', this.showEmbedModal)
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

      // const markdownOptions = {
      //   tags: {
      //     blockquote: {
      //       pattern: /^(\|){1,6}\s/g,
      //     },
      //   },
      //   /*
      //      ignoreTags: [ 'pre', 'strikethrough'], // @option - if you need to ignore some tags.
      //
      //      tags: { // @option if you need to change for trigger pattern for some tags.
      //         blockquote: {
      //           pattern: /^(\|){1,6}\s/g,
      //         },
      //         bold: {
      //           pattern:  /^(\|){1,6}\s/g,
      //         },
      //         italic: {
      //           pattern: /(\_){1}(.+?)(?:\1){1}/g,
      //         },
      //       },
      //    */
      // }
      // const _ = new QuillMarkdown.MarkdownActivity(this.editor, markdownOptions)

      this.setupCustomHandler()

      this.editor.on('text-change', this.saveAsDraft)
    },

    // Custom Handler for Quill Editor
    showImageModal() {
      this.imageUpload.link = ''
      this.imageUpload.description = ''
      this.showEmbedImageUI = true
    },
    showEmbedModal() {
      this.embeddedURL = ''
      this.showEmbedContentUI = true
    },

    embedToQuill(blotName, payload) {
      const range = this.editor.getSelection(true)
      this.editor.insertText(range.index, '\n', this.Quill.sources.USER)
      this.editor.insertEmbed(
        range.index + 1,
        blotName,
        payload,
        this.Quill.sources.USER
      )
      this.editor.setSelection(range.index + 2, this.Quill.sources.SILENT)
    },

    async embedPhoto() {
      this.embedToQuill('image', {
        url: this.imageUpload.link,
        alt: this.imageUpload.description,
      })
    },
    async embedContent() {
      const { link, unprocessed } = getEmbeddableLink(this.embeddedURL)

      if (unprocessed) {
        await this.embedLinkPreview(link)
        return
      }

      this.embedToQuill('embedIframe', { src: link })
      this.showEmbedContentUI = false
    },
    async embedLinkPreview(link) {
      try {
        const { data: previewData } = await axios.get(
          'http://localhost:3001/server/api/previewLinkUrl',
          {
            params: { link },
          }
        )
        this.embedToQuill('linkPreviewCard', {
          title: previewData.title,
          description: previewData.description,
          domain: previewData.domain,
          img: previewData.img,
          link,
        })
      } catch (e) {
        await showUITip(this.$store, e, 'error')
      } finally {
        this.showEmbedContentUI = false
      }
    },

    // Utils
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

        const tx = this.db.transaction('drafts', 'readwrite')
        await Promise.all([tx.store.delete(this.uniqueId), tx.done])

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

  .embed-UI {
    flex-direction: column;
    background: rgba($black, 0.8);

    .input-field {
      width: 60%;

      input {
        &::placeholder {
          color: $disabled;
        }
      }
    }

    section {
      display: flex;
      justify-content: center;
      align-items: center;

      button {
        width: 100px;
      }
    }
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
