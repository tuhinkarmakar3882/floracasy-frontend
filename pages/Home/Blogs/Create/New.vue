<template>
  <AppFeel
    class="create-new-blog-page"
    :show-back-button="false"
    center-aligned
    :on-back="navigationRoutes.Home.Blogs.Create.index"
  >
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main">
      <!--      <transition-group mode="out-in" name="slide-fade">-->
      <div v-if="step === 1" :key="0" class="steps-bounded px-4 mt-4">
        <h5 class="heading-title mb-8">What is it about?</h5>
        <div class="mt-8 mb-4 form-label-group">
          <label for="blog-title">Enter the Blog Title</label>
          <input
            id="blog-title"
            v-model="blogTitle"
            type="text"
            placeholder="Enter the Blog Title"
            required
            autofocus
            autocomplete="off"
          />
        </div>

        <div class="my-6 form-label-group">
          <input
            id="blog-subtitle"
            v-model="blogSubtitle"
            type="text"
            placeholder="Enter the Blog Title"
            required
            autocomplete="off"
          />
          <label for="blog-subtitle">Enter the Blog Subtitle</label>
        </div>
      </div>
      <div v-else-if="step === 2" :key="1" class="steps-bounded px-4 mt-4">
        <h5 class="heading-title mb-8">Add Details</h5>

        <div class="mt-8 mb-4 form-label-group">
          <input
            id="cover-image-url"
            v-model="coverImageUrl"
            type="url"
            placeholder="Enter the Blog Title"
            required
            autocomplete="off"
          />
          <label for="cover-image-url">Enter the Cover Image URL</label>
        </div>

        <div class="mt-8">
          <label for="blog-category" style="font-size: 20px"
            >Enter the Blog Category</label
          >
          <div class="my-5">
            <select
              id="blog-category"
              v-model="blogCategory"
              name="blog-category"
              autocomplete="off"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div v-else-if="step === 3" :key="2" class="steps-unbounded mt-4">
        <h5 class="heading-title mb-8">Write the Blog below</h5>
        <client-only>
          <div class="blog-body">
            <quill-editor
              ref="editor"
              v-model="content"
              :options="editorOption"
            />
          </div>
        </client-only>
      </div>

      <div v-else-if="step === 4" :key="4" class="steps mt-4">
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
            {{ parse(new Date()) }}
          </small>
          <img
            class="mt-5 blog-intro-image"
            :src="coverImageUrl"
            :alt="blogTitle"
            style="width: 100%; object-fit: cover; max-height: 210px"
          />
        </section>
        <div class="blog-body">
          <article class="ql-snow">
            <div class="ql-editor" v-html="content" />
          </article>
        </div>
      </div>
      <!--      </transition-group>-->

      <section
        :key="'fixed'"
        class="py-5"
        :class="step === 4 ? 'bottom-section-floating' : 'bottom-section'"
      >
        <div class="text-center">
          <button
            v-if="step >= 2"
            v-ripple
            class="secondary-outlined-btn mr-4 px-8"
            @click="goToPrevStep"
          >
            Back
          </button>

          <button
            v-if="step <= 2"
            v-ripple
            class="secondary-btn px-8"
            @click="goToNextStep"
          >
            Next
          </button>

          <button
            v-if="step === 3"
            v-ripple
            class="secondary-btn px-7"
            @click="goToNextStep"
          >
            Preview
          </button>

          <button
            v-if="step === 4"
            v-ripple
            class="secondary-btn px-7"
            @click="publish"
          >
            Publish
          </button>
        </div>

        <section class="progress-circle mt-8">
          <span
            v-for="(stepNo, index) in totalSteps"
            :key="index"
            :class="stepNo === step && 'active'"
          />
        </section>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'
import sanitizeHtml from 'sanitize-html'
import utility from '@/utils/utility'
import { mapGetters } from 'vuex'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/tomorrow.css'
import hljs from 'highlight.js'

function getFromLocalStorageOrReturnDefault(keyName, value) {
  return process.client && localStorage.getItem(keyName)
    ? localStorage.getItem(keyName)
    : value || ''
}

export default {
  name: 'CreateNewBlog',
  middleware: 'isAuthenticated',
  components: {
    AppFeel,
  },

  async asyncData({ $axios }) {
    const response = await $axios
      .$get(endpoints.categories.fetch)
      .then((response) => response.data)
    return { categories: response }
  },

  data() {
    return {
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video'],
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
      navigationRoutes,
      parse: utility.timeStringParser,
      noXSS: sanitizeHtml,
      step: 1,
      pageTitle: 'Create New Blog',
      totalSteps: [1, 2, 3, 4],

      blogTitle: getFromLocalStorageOrReturnDefault('blogTitle'),
      blogSubtitle: getFromLocalStorageOrReturnDefault('blogSubtitle'),
      blogCategory: getFromLocalStorageOrReturnDefault('blogCategory'),
      coverImageUrl: getFromLocalStorageOrReturnDefault('coverImageUrl'),
      content: getFromLocalStorageOrReturnDefault(
        'draft',
        `<h2>Every Great Blog starts with an Amazing title</h2><p>Your great Blog content goes here...</p>`
      ),
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  watch: {
    content: (newContent) => {
      localStorage.setItem('draft', newContent)
    },
    blogCategory: (newContent) => {
      localStorage.setItem('blogCategory', newContent)
    },
    blogSubtitle: (newContent) => {
      localStorage.setItem('blogSubtitle', newContent)
    },
    blogTitle: (newContent) => {
      localStorage.setItem('blogTitle', newContent)
    },
    coverImageUrl: (newContent) => {
      localStorage.setItem('coverImageUrl', newContent)
    },
  },

  async mounted() {
    const currentUser = await this.$store.getters['UserManagement/getUser']
    if (!currentUser) {
      this.loadingProfile = true
      await this.$store.dispatch('UserManagement/fetchData')
    }
    document.addEventListener('backbutton', this.goToPrevStep, false)
  },

  beforeDestroy() {
    document.removeEventListener('backbutton', this.goToPrevStep)
  },

  methods: {
    goToNextStep() {
      this.step++
    },
    goToPrevStep() {
      if (this.step === 1) {
        this.$router.replace(this.navigationRoutes.Home.Blogs.Create.index)
      } else {
        this.step--
      }
    },
    async publish() {
      await this.$axios
        .$post(endpoints.blog.create, {
          category: this.blogCategory,
          coverImage: this.coverImageUrl,
          title: this.blogTitle,
          subtitle: this.blogTitle,
          content: this.content,
        })
        .then(async () => {
          this.cleanupCurrentDraft()
          await this.$router.replace(navigationRoutes.Home.DashBoard)
        })
        .catch(async () => {
          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: 'Network error. Please Retry',
            notificationType: 'error',
            dismissible: true,
          })
        })
    },

    cleanupCurrentDraft() {
      localStorage.removeItem('draft')
      localStorage.removeItem('blogCategory')
      localStorage.removeItem('blogSubtitle')
      localStorage.removeItem('blogTitle')
      localStorage.removeItem('coverImageUrl')
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

  .steps,
  .steps-bounded,
  .steps-unbounded {
    border: 1px solid transparent;
    overflow: auto;

    textarea {
      width: 100%;
      color: white;
      background: #101019;
      border-radius: 16px;
      padding: 1rem;
      height: 430px;
      outline: none;
      box-shadow: $default-box-shadow;

      &:hover,
      &:focus,
      &:focus-visible,
      &:active,
      &:focus-within {
        border-radius: $nano-unit;
        outline: none 0;
        box-shadow: 0 0 $double-unit $single-unit
          darken($white, $darken-percentage);
      }
    }
  }

  .steps {
    margin-bottom: 122px;
  }

  .steps-bounded {
    height: calc(100vh - 56px - 130px);
  }

  .steps-unbounded {
    min-height: calc(100vh - 56px - 130px);
  }

  .progress-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    span {
      height: $micro-unit;
      width: $micro-unit;
      background-color: darken($disabled, $lighten-percentage);
      border-radius: 50%;
      margin: 0 $micro-unit;
      box-shadow: $default-box-shadow;

      &.active {
        height: $micro-unit + $double-unit;
        width: $micro-unit + $double-unit;
        background-color: $secondary-highlight;
      }
    }
  }

  .blog-body {
    blockquote,
    ul,
    ol,
    hr,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      position: relative;
      margin: $large-unit 0;
    }

    .quill-editor {
      .ql-toolbar.ql-snow {
        background-color: wheat !important;
        box-shadow: $default-box-shadow !important;
      }

      .ql-container.ql-snow {
        padding: 0 !important;
      }

      .ql-toolbar.ql-snow,
      .ql-container.ql-snow {
        border: none !important;
      }
    }
  }
}
</style>
