<template>
  <AppFeel
    class="create-new-blog-page"
    :on-back="navigationRoutes.Home.Blogs.Create.index"
  >
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main">
      <div v-if="step === 1" class="step-1">
        <h6 class="heading-title">Basic Details</h6>

        <section class="mx-4 my-4">
          <div class="my-4 form-label-group">
            <input
              id="blog-title"
              v-model="blogTitle"
              type="text"
              placeholder="Enter the Blog Title"
              required
              autofocus
              autocomplete="off"
            />
            <label for="blog-title">Enter the Blog Title</label>
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

          <div class="text-center my-6">
            <button v-ripple class="primary-btn" @click="goToNextStep">
              Next
            </button>
          </div>
        </section>

        <section class="progress-circle mt-auto">
          <span class="active" />
          <span />
        </section>
      </div>

      <div v-if="step === 2">
        <h6 class="heading-title mb-8">Write the Blog below</h6>
        <!--        <client-only>-->
        <!--          <vue-editor />-->
        <!--        </client-only>-->
      </div>
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
      blogCategory: getFromLocalStorageOrReturnDefault('blogCategory'),
      blogSubtitle: getFromLocalStorageOrReturnDefault('blogSubtitle'),
      blogTitle: getFromLocalStorageOrReturnDefault('blogTitle'),
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
  },

  methods: {
    goToNextStep() {
      this.step = 2
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
  .step-1 {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 84px);
  }

  .progress-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    span {
      height: $micro-unit;
      width: $micro-unit;
      background-color: $muted;
      border-radius: 50%;
      margin: 0 $micro-unit;
      box-shadow: $default-box-shadow;

      &.active {
        height: $medium-unit;
        width: $medium-unit;
        background-color: $secondary-highlight;
      }
    }
  }

  .styled-select {
    position: relative;
  }
}
</style>
