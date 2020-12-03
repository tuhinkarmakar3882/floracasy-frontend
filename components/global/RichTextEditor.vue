<template>
  <div class="editor">
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <div class="menubar">
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

        <button
          v-ripple="'#0000005f'"
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <i class="mdi mdi-code-tags" />
        </button>

        <button
          v-ripple="'#0000005f'"
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <i class="mdi mdi-format-paragraph" />
        </button>

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

        <button
          v-ripple="'#0000005f'"
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <i class="mdi mdi-format-list-bulleted" />
        </button>

        <button
          v-ripple="'#0000005f'"
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <i class="mdi mdi-format-list-numbered" />
        </button>

        <button
          v-ripple="'#0000005f'"
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <i class="mdi mdi-format-quote-close" />
        </button>

        <button
          v-ripple="'#0000005f'"
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <i class="mdi mdi-xml" />
        </button>

        <button
          v-ripple="'#0000005f'"
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <i class="mdi mdi-minus" />
        </button>

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
      </div>
    </editor-menu-bar>

    <editor-content
      class="editor__content px-4 pt-4"
      :editor="editor"
      style="outline: none 0 !important"
    />
  </div>
</template>

<script>
import 'highlight.js/styles/tomorrow.css'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
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
  TodoItem,
  TodoList,
  TrailingNode,
  Underline,
} from 'tiptap-extensions'
import { supportedLanguages } from '~/config/code-hightlighting'

export default {
  name: 'RichTextEditor',
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      content: ``,
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new CodeBlockHighlight({
          languages: supportedLanguages,
        }),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
        new HorizontalRule(),
        new Image(),
        new ListItem(),
        new OrderedList(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new TodoItem(),
        new TodoList(),
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
            '[Placeholder] Your Writing Journey Restarts from here...',
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
    })
  },
  beforeDestroy() {
    this.editor && this.editor.destroy()
  },
}
</script>

<style lang="scss">
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
    display: grid;
    grid-auto-flow: column;
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
</style>
