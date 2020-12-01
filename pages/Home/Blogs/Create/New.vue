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
      <div v-if="step === 1" class="steps px-4 mt-4">
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

      <div v-else-if="step === 2" class="steps px-4 mt-4">
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
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div v-else-if="step === 3" class="steps mt-4">
        <h5 class="heading-title mb-8">Write the Blog below</h5>
        <client-only>
          <div class="blog-body">
            <quill-editor
              ref="editor"
              v-model="content"
              :options="editorOption"
              style="
                position: sticky !important;
                top: 56px !important;
                z-index: 1234567890 !important;
              "
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
        <div class="blog-body">
          <article class="ql-snow">
            <div class="ql-editor" v-html="noXSS(content)" />
          </article>
        </div>
      </div>
      <!--      <section-->
      <!--        :key="'fixed'"-->
      <!--        class="py-5"-->
      <!--        :class="step === 4 ? 'bottom-section-floating' : 'bottom-section'"-->
      <!--      >-->
      <!--        <div class="text-center">-->
      <!--          <button-->
      <!--            v-if="step >= 2"-->
      <!--            v-ripple=""-->
      <!--            class="secondary-outlined-btn mr-4 px-8"-->
      <!--            @click="goToPrevStep"-->
      <!--          >-->
      <!--            Back-->
      <!--          </button>-->

      <!--          <button-->
      <!--            v-if="step <= 2"-->
      <!--            v-ripple=""-->
      <!--            class="secondary-btn px-8"-->
      <!--            @click="goToNextStep"-->
      <!--          >-->
      <!--            Next-->
      <!--          </button>-->

      <!--          <button-->
      <!--            v-if="step === 3"-->
      <!--            v-ripple=""-->
      <!--            class="secondary-btn px-7"-->
      <!--            @click="goToNextStep"-->
      <!--          >-->
      <!--            Preview-->
      <!--          </button>-->

      <!--          <button-->
      <!--            v-if="step === 4"-->
      <!--            v-ripple=""-->
      <!--            class="secondary-btn px-7"-->
      <!--            @click="publish"-->
      <!--          >-->
      <!--            Publish-->
      <!--          </button>-->
      <!--        </div>-->

      <!--        <section class="progress-circle mt-8">-->
      <!--          <span-->
      <!--            v-for="(stepNo, index) in totalSteps"-->
      <!--            :key="index"-->
      <!--            :class="stepNo === step && 'active'"-->
      <!--          />-->
      <!--        </section>-->
      <!--      </section>-->
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '@/api/endpoints'
import sanitizeHtml from 'sanitize-html'
import { parseTimeUsingMoment } from '@/utils/utility'
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

  async asyncData({ $axios, from: prevURL }) {
    const response = await $axios
      .$get(endpoints.categories.fetch)
      .then((response) => response.data)
    return { categories: response, prevURL }
  },

  data() {
    return {
      prevURL: null,
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
      noXSS: sanitizeHtml,
      step: 1,
      pageTitle: 'Create New Blog',
      totalSteps: [1, 2, 3, 4],

      hasTitle: false,
      hasSubtitle: false,
      hasCoverImageUrl: false,
      hasBlogCategory: false,

      blogTitle: getFromLocalStorageOrReturnDefault('blogTitle'),
      blogSubtitle: getFromLocalStorageOrReturnDefault('blogSubtitle'),
      blogCategory: getFromLocalStorageOrReturnDefault('blogCategory'),
      coverImageUrl: getFromLocalStorageOrReturnDefault('coverImageUrl'),
      content: getFromLocalStorageOrReturnDefault(
        'draft',
        `<small>Write your content here...</small>`
      ),
    }
  },

  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },

  watch: {
    content(newContent) {
      localStorage.setItem('draft', newContent)
    },
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
    this.hasTitle = localStorage.getItem('blogTitle')
      ? localStorage.getItem('blogTitle').trim().length > 0
      : false
    this.hasSubtitle = localStorage.getItem('blogSubtitle')
      ? localStorage.getItem('blogSubtitle').trim().length > 0
      : false
    this.hasBlogCategory = localStorage.getItem('blogCategory')
      ? localStorage.getItem('blogCategory').trim().length > 0
      : false
    this.hasCoverImageUrl = localStorage.getItem('coverImageUrl')
      ? localStorage.getItem('coverImageUrl').trim().length > 0
      : false
  },

  beforeDestroy() {},

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
          subtitle: this.blogSubtitle,
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

  .steps {
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
}
</style>
