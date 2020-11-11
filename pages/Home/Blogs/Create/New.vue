<template>
  <AppFeel
    class="create-new-blog-page"
    :on-back="navigationRoutes.Home.Blogs.Create.index"
  >
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main">
      <!--      <transition-group mode="out-in" name="slide-fade">-->
      <div v-if="step === 1" :key="0" class="steps">
        <section class="mx-4 my-4">
          <h6 class="heading-title">What is it about?</h6>
          <div class="my-4 form-label-group">
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
        </section>
      </div>
      <div v-else-if="step === 2" :key="1" class="steps">
        <section class="mx-4 my-4">
          <h6 class="heading-title">Add That</h6>

          <div class="my-6 form-label-group">
            <input
              id="cover-image-url"
              v-model="coverImageUrl"
              type="text"
              placeholder="Enter the Blog Title"
              required
              autocomplete="off"
            />
            <label for="cover-image-url">Enter the Cover Image URL</label>
          </div>

          <div class="my-4">
            <label for="blog-category">Enter the Blog Category</label>
            <div class="styled-select my-5">
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
        </section>
      </div>
      <div v-else-if="step === 3" :key="2" class="steps">
        <section class="mx-4 my-4">
          <h6 class="heading-title mb-8">Write the Blog below</h6>
          <textarea id="blogContent" v-model="content" name="blogContent" />
        </section>
      </div>
      <div v-else-if="step === 4" :key="4" class="steps">
        <section class="mx-4 my-4">
          <h6 class="heading-title mb-8">Preview</h6>
          <div class="my-4" v-html="$md.render(content)" />
        </section>
      </div>
      <!--      </transition-group>-->

      <section :key="'fixed'" class="bottom-section">
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
      totalSteps: [1, 2, 3, 4],
      blogTitle: getFromLocalStorageOrReturnDefault('blogTitle'),
      blogSubtitle: getFromLocalStorageOrReturnDefault('blogSubtitle'),
      blogCategory: getFromLocalStorageOrReturnDefault('blogCategory'),
      coverImageUrl: getFromLocalStorageOrReturnDefault('coverImageUrl'),
      step: 1,
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
      content: getFromLocalStorageOrReturnDefault(
        'draft',
        `<h2>Every Great Blog starts with an Amazing title</h2><p>Your great Blog content goes here...</p>`
      ),
    }
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

  methods: {
    goToNextStep() {
      this.step++
    },
    goToPrevStep() {
      this.step--
    },
    publish() {
      alert('NOT Implemented Yet')
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

.create-new-blog-page {
  .bottom-section {
    height: 130px;
  }

  .steps {
    border: 1px solid transparent;
    height: calc(100vh - 56px - 130px);
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

  //.slide-fade-enter-active,
  //.slide-fade-leave-active {
  //  transition: all 0.4s ease-in-out;
  //}
  //.slide-fade-enter,
  //.slide-fade-leave-to {
  //  transform: translateX(10px);
  //  opacity: 0;
  //}
}
</style>
