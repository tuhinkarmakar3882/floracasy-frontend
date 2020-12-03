<template>
  <AppFeel
    custom-header
    class="create-new-blog-page"
    :on-back="navigationRoutes.Home.Blogs.Create.index"
  >
    <template slot="app-bar-custom-header">
      <h5
        v-ripple=""
        class="mdi mdi-arrow-left"
        @click="handleBackButtonPress"
      />
      <p v-ripple="" class="ml-4" style="font-size: 1.1rem">{{ pageTitle }}</p>
      <div class="ml-auto">
        <button
          v-if="step === 1"
          v-ripple=""
          class="px-8"
          :class="!(hasTitle && hasSubtitle) ? 'disabled-btn' : 'secondary-btn'"
          :disabled="!(hasTitle && hasSubtitle)"
          @click="goToNextStep"
        >
          Next
        </button>

        <button
          v-if="step === 2"
          v-ripple=""
          class="px-8"
          :class="
            !(hasCoverImageUrl && hasCoverImageUrl)
              ? 'disabled-btn'
              : 'secondary-btn'
          "
          :disabled="!(hasCoverImageUrl && hasCoverImageUrl)"
          @click="goToNextStep"
        >
          Next
        </button>

        <button
          v-if="step === 3"
          v-ripple=""
          class="secondary-btn px-7"
          @click="goToNextStep"
        >
          Preview
        </button>

        <button
          v-if="step === 4"
          v-ripple=""
          class="secondary-btn px-7"
          @click="publish"
        >
          Publish
        </button>
      </div>
    </template>

    <template slot="main">
      <div v-if="step === 1" class="px-4 mt-4">
        <h5 class="heading-title mb-8">What is it about?</h5>
        <div class="material-form-field mt-8">
          <input
            id="blog-title"
            ref="blogTitle"
            v-model="blogTitle"
            type="text"
            required
            name="text"
            autocomplete="off"
            @keyup.enter="
              () => {
                $refs.blogSubtitle.focus()
                $refs.blogSubtitle.scrollIntoView()
              }
            "
          />
          <label class="material-form-field-label" for="blog-title">
            Title
          </label>
        </div>
        <div class="material-form-field mt-2">
          <input
            id="blog-subtitle"
            ref="blogSubtitle"
            v-model="blogSubtitle"
            type="text"
            required
            name="text"
            autocomplete="off"
          />
          <label class="material-form-field-label" for="blog-subtitle">
            Subtitle
          </label>
        </div>
      </div>

      <div v-else-if="step === 2" class="px-4 mt-4">
        <h5 class="heading-title mb-8">Add Details</h5>

        <div class="material-form-field mt-2">
          <input
            id="cover-image-url"
            ref="coverImageUrl"
            v-model="coverImageUrl"
            type="text"
            required
            name="text"
            autocomplete="off"
            @keyup.enter="
              () => {
                $refs.blogCategory.focus()
                $refs.blogCategory.scrollIntoView()
              }
            "
          />
          <label class="material-form-field-label" for="cover-image-url">
            Cover Photo URL
          </label>
        </div>

        <div class="mt-8">
          <label for="blog-category" style="font-size: 20px"
            >Enter the Blog Category</label
          >
          <div class="my-5">
            <select
              id="blog-category"
              ref="blogCategory"
              v-model="blogCategory"
              name="blog-category"
              autocomplete="off"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.id }} | {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <pre>{{ categories }}</pre>
      </div>

      <div v-else-if="step === 3">
        <h5 class="heading-title mb-8">Write the Blog below</h5>
        <client-only>
          <div class="editor">
            <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
              <div class="menubar">
                <!--Basic-->
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.bold() }"
                  @click="commands.bold"
                >
                  <i class="mdi mdi-format-bold" />
                </button>
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.italic() }"
                  @click="commands.italic"
                >
                  <i class="mdi mdi-format-italic" />
                </button>
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.strike() }"
                  @click="commands.strike"
                >
                  <i class="mdi mdi-format-strikethrough-variant" />
                </button>
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.underline() }"
                  @click="commands.underline"
                >
                  <i class="mdi mdi-format-underline" />
                </button>

                <!--inline code-->
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.code() }"
                  @click="commands.code"
                >
                  <i class="mdi mdi-code-tags" />
                </button>

                <!--Paragraph-->
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.paragraph() }"
                  @click="commands.paragraph"
                >
                  <i class="mdi mdi-format-paragraph" />
                </button>

                <!--Heading Tags-->
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                  @click="commands.heading({ level: 1 })"
                >
                  <i class="mdi mdi-format-header-1" />
                </button>
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                  @click="commands.heading({ level: 2 })"
                >
                  <i class="mdi mdi-format-header-2" />
                </button>
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                  @click="commands.heading({ level: 3 })"
                >
                  <i class="mdi mdi-format-header-3" />
                </button>
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 4 }) }"
                  @click="commands.heading({ level: 4 })"
                >
                  <i class="mdi mdi-format-header-4" />
                </button>
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 5 }) }"
                  @click="commands.heading({ level: 5 })"
                >
                  <i class="mdi mdi-format-header-5" />
                </button>
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 6 }) }"
                  @click="commands.heading({ level: 6 })"
                >
                  <i class="mdi mdi-format-header-6" />
                </button>

                <!--UL-->
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.bullet_list() }"
                  @click="commands.bullet_list"
                >
                  <i class="mdi mdi-format-list-bulleted" />
                </button>

                <!--OL-->
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.ordered_list() }"
                  @click="commands.ordered_list"
                >
                  <i class="mdi mdi-format-list-numbered" />
                </button>

                <!--BlockQuote-->
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.blockquote() }"
                  @click="commands.blockquote"
                >
                  <i class="mdi mdi-format-quote-close" />
                </button>

                <!--Code-->
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  :class="{ 'is-active': isActive.code_block() }"
                  @click="commands.code_block"
                >
                  <i class="mdi mdi-xml" />
                </button>

                <!--HR-->
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  @click="commands.horizontal_rule"
                >
                  <i class="mdi mdi-minus" />
                </button>

                <!--Undo + Redo-->
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  @click="commands.undo"
                >
                  <i class="mdi mdi-undo" />
                </button>
                <button
                  v-ripple="'#0000005f'"
                  class="menubar__button"
                  @click="commands.redo"
                >
                  <i class="mdi mdi-redo" />
                </button>

                <!--Table-->
                <button
                  v-if="isActive.table()"
                  class="menubar__button"
                  @click="commands.deleteTable"
                >
                  <span class="mdi mdi-table-large-remove" />
                </button>
                <button
                  class="menubar__button"
                  @click="
                    commands.createTable({
                      rowsCount: 3,
                      colsCount: 3,
                      withHeaderRow: false,
                    })
                  "
                >
                  <span class="mdi mdi-table-large-plus" />
                </button>
                <button
                  v-if="isActive.table()"
                  class="menubar__button"
                  @click="commands.addColumnBefore"
                >
                  <span class="mdi mdi-table-column-plus-after" />
                </button>
                <button
                  v-if="isActive.table()"
                  class="menubar__button"
                  @click="commands.addColumnAfter"
                >
                  <span class="mdi mdi-table-column-plus-before" />
                </button>
                <button
                  v-if="isActive.table()"
                  class="menubar__button"
                  @click="commands.deleteColumn"
                >
                  <span class="mdi mdi-table-column-remove" />
                </button>
                <button
                  v-if="isActive.table()"
                  class="menubar__button"
                  @click="commands.addRowBefore"
                >
                  <span class="mdi mdi-table-row-plus-after" />
                </button>
                <button
                  v-if="isActive.table()"
                  class="menubar__button"
                  @click="commands.addRowAfter"
                >
                  <span class="mdi mdi-table-row-plus-before" />
                </button>
                <button
                  v-if="isActive.table()"
                  class="menubar__button"
                  @click="commands.deleteRow"
                >
                  <span class="mdi mdi-table-column-remove" />
                </button>
                <button
                  v-if="isActive.table()"
                  class="menubar__button"
                  @click="commands.toggleCellMerge"
                >
                  <span class="mdi mdi-table-merge-cells" />
                </button>
              </div>
            </editor-menu-bar>

            <editor-content
              class="editor__content px-4 pt-4"
              :editor="editor"
            />
          </div>
        </client-only>
      </div>

      <div v-else-if="step === 4" class="steps mt-4">
        <h5 class="heading-title mb-8">Preview</h5>
        <section class="px-4 blog-body">
          <p class="mb-2">
            <nuxt-link
              :to="navigationRoutes.Home.Blogs.Create.New"
              class="no-underline"
            >
              {{ user.displayName }}
            </nuxt-link>
            IN
            <nuxt-link
              :to="navigationRoutes.Home.Blogs.Create.New"
              class="no-underline"
            >
              {{ categories[blogCategory - 1].name }}
            </nuxt-link>
          </p>
          <h3 class="blog-title mb-4">
            {{ blogTitle }}
          </h3>
          <small class="timestamp">
            <span class="mdi mdi-clock-time-nine-outline" />
            {{ parseTimeUsingMoment(new Date()) }}
          </small>
          <img
            class="mt-5 blog-intro-image"
            :src="coverImageUrl"
            :alt="blogTitle"
            style="width: 100%; object-fit: cover; max-height: 250px"
          />
          <p class="my-4">
            {{ blogSubtitle }}
          </p>
        </section>
        <section class="blog-body px-4 pb-8">
          <article v-html="noXSS(content, sanitizationConfig)" />
        </section>
      </div>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'
import sanitizeHtml from 'sanitize-html'
import { parseTimeUsingMoment } from '@/utils/utility'
import { mapGetters } from 'vuex'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { sanitizationConfig } from '@/config/sanitizationConfig'
import {
  Blockquote,
  Bold,
  BulletList,
  Code,
  CodeBlock,
  CodeBlockHighlight,
  HardBreak,
  Heading,
  History,
  HorizontalRule,
  Image,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Placeholder,
  Strike,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TrailingNode,
  Underline,
} from 'tiptap-extensions'
// import { supportedLanguages } from '~/config/code-hightlighting'
// import 'highlight.js/styles/tomorrow.css'

export default {
  name: 'CreateNewBlog',
  middleware: 'isAuthenticated',
  components: {
    AppFeel,
    EditorContent,
    EditorMenuBar,
  },

  async asyncData({ $axios, from: prevURL }) {
    const response = await $axios
      .$get(endpoints.categories.fetch)
      .then((response) => response.data)
    console.log(response)
    return { categories: response, prevURL }
  },

  data() {
    return {
      editor: null,
      previewEditor: null,
      prevURL: null,
      navigationRoutes,
      noXSS: sanitizeHtml,
      sanitizationConfig,
      step: 1,
      pageTitle: 'Create New Blog',
      totalSteps: [1, 2, 3, 4],

      hasTitle: false,
      hasSubtitle: false,
      hasCoverImageUrl: false,
      hasBlogCategory: false,

      blogTitle: null,
      blogSubtitle: null,
      blogCategory: null,
      coverImageUrl: null,
      content: null,
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  watch: {
    blogCategory(newContent) {
      localStorage.setItem('blogCategory', newContent)
      this.hasBlogCategory = newContent.length > 0
    },
    blogSubtitle(newContent) {
      localStorage.setItem('blogSubtitle', newContent)
      this.hasSubtitle = newContent.trim().length > 0
    },
    blogTitle(newContent) {
      localStorage.setItem('blogTitle', newContent)
      this.hasTitle = newContent.trim().length > 0
    },
    coverImageUrl(newContent) {
      localStorage.setItem('coverImageUrl', newContent)
      this.hasCoverImageUrl = newContent.trim().length > 0
    },
  },

  async mounted() {
    const currentUser = await this.$store.getters['UserManagement/getUser']
    if (!currentUser) {
      this.loadingProfile = true
      await this.$store.dispatch('UserManagement/fetchData')
    }
    this.blogTitle = localStorage.getItem('blogTitle')
    this.blogSubtitle = localStorage.getItem('blogSubtitle')
    this.blogCategory = localStorage.getItem('blogCategory')
    this.coverImageUrl = localStorage.getItem('coverImageUrl')

    this.hasTitle = this.blogTitle ? this.blogTitle.trim().length > 0 : false
    this.hasSubtitle = this.blogSubtitle
      ? this.blogSubtitle.trim().length > 0
      : false
    this.hasBlogCategory = this.blogCategory
      ? this.blogCategory.trim().length > 0
      : false
    this.hasCoverImageUrl = this.coverImageUrl
      ? this.coverImageUrl.trim().length > 0
      : false

    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new CodeBlockHighlight({
          // languages: supportedLanguages,
        }),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
        new HorizontalRule(),
        new Image(),
        new ListItem(),
        new OrderedList(),
        new Table({
          resizable: true,
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),

        new Placeholder({
          emptyEditorClass: 'is-editor-empty',
          emptyNodeClass: 'is-empty',
          emptyNodeText:
            '[Placeholder] Your Writing Journey Restarts from here...[ Just Start Typing ]',
          showOnlyWhenEditable: true,
          showOnlyCurrent: false,
        }),
        new TrailingNode({
          node: 'paragraph',
          notAfter: ['paragraph'],
        }),
      ],
      autoFocus: true,
      content: this.content,
      onUpdate: ({ getHTML }) => {
        this.content = getHTML()
      },
    })
  },

  beforeDestroy() {
    this.editor && this.editor.destroy()
  },

  methods: {
    async handleBackButtonPress() {
      if (this.step === 1) {
        this.prevURL
          ? await this.$router.back()
          : await this.$router.replace(navigationRoutes.Home.Blogs.Create.index)
      } else {
        this.step--
      }
    },

    parseTimeUsingMoment,

    goToNextStep() {
      this.step++
    },
    publish() {
      console.log(this.content)
      // await this.$axios
      //   .$post(endpoints.blog.create, {
      //     category: this.blogCategory,
      //     coverImage: this.coverImageUrl,
      //     title: this.blogTitle,
      //     subtitle: this.blogSubtitle,
      //     content: this.content,
      //   })
      //   .then(async () => {
      //     this.cleanupCurrentDraft()
      //     await this.$router.replace(navigationRoutes.Home.DashBoard)
      //   })
      //   .catch(async () => {
      //     await this.$store.dispatch('SocketHandler/updateSocketMessage', {
      //       message: 'Network error. Please Retry',
      //       notificationType: 'error',
      //       dismissible: true,
      //     })
      //   })
    },
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

.create-new-blog-page {
  button {
    min-width: auto;
    font-size: 14px;
    width: auto;
    height: auto;
    padding: 8px 20px;
  }

  .bottom-section {
    height: 130px;
  }

  .bottom-section-floating {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1;
    background: rgba(5, 5, 21, 0.9);
    box-shadow: 0 -2px 4px #050515;
  }

  .editor {
    p.is-editor-empty:first-child::before {
      content: attr(data-empty-text);
      color: #555;
      pointer-events: none;
      height: 0;
      font-style: italic;
    }

    .menubar {
      text-align: center;
      background: wheat;
      position: sticky;
      top: 56px;
      z-index: 12345678909876543;
      color: black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 120px;
      flex-wrap: wrap;
      overflow: auto;
      width: 100%;
      margin: 0;
      padding: 0;

      .menubar__button {
        margin: 0;
        padding: 0;
        border-radius: 0;
        width: 60px;
        font-size: 28px;
        height: 60px;

        &.is-active {
          color: red;
        }
      }
    }

    .editor__content {
      background: #000;

      .ProseMirror {
        min-height: calc(100vh - 220px);

        &.ProseMirror-focused {
          outline: none 0 !important;
          border: none;
        }
      }
    }
  }
}
</style>
