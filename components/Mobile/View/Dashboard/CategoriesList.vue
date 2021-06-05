<template>
  <section class="categories">
    <aside v-if="contentIsLoading" class="my-8 pb-2 px-4">
      <section class="sample-response my-4">
        <ImageSkeleton height="40px" radius="50%" width="40px" />

        <aside>
          <LineSkeleton width="80%" />

          <LineSkeleton class="my-2" width="40%" />
        </aside>
      </section>
      <section class="sample-response my-4">
        <ImageSkeleton height="40px" radius="50%" width="40px" />

        <aside>
          <LineSkeleton width="80%" />

          <LineSkeleton class="my-2" width="40%" />
        </aside>
      </section>
      <section class="sample-response my-4">
        <ImageSkeleton height="40px" radius="50%" width="40px" />

        <aside>
          <LineSkeleton width="80%" />

          <LineSkeleton class="my-2" width="40%" />
        </aside>
      </section>
      <section class="sample-response my-4">
        <ImageSkeleton height="40px" radius="50%" width="40px" />

        <aside>
          <LineSkeleton width="80%" />

          <LineSkeleton class="my-2" width="40%" />
        </aside>
      </section>
      <section class="sample-response my-4">
        <ImageSkeleton height="40px" radius="50%" width="40px" />

        <aside>
          <LineSkeleton width="80%" />

          <LineSkeleton class="my-2" width="40%" />
        </aside>
      </section>
    </aside>

    <div v-else>
      <transition name="scale-up">
        <div v-show="showSearchBar" class="px-2 py-4 search-box-container">
          <section class="search-box">
            <div
              ref="search"
              class="input-box"
              contenteditable
              @focusin="clearPlaceholderText"
              @focusout="putPlaceholderText"
              @keyup="updateSearchQuery"
              @keyup.esc="toggleSearchBar"
            >
              {{ placeholderText }}
            </div>
            <i class="mdi mdi-magnify prepend-icon" />

            <transition name="scale-up">
              <i
                v-show="!!searchQuery"
                v-ripple
                class="mdi mdi-close append-icon"
                @click="clearSearchContent"
              />
            </transition>
          </section>
        </div>
      </transition>

      <transition name="slide-up">
        <LazyCustomListView>
          <template #heading>
            <h4 class="heading-title">Explore Categories</h4>
          </template>
          <template #list-items>
            <li
              v-for="category in matchCategories"
              :key="category.id"
              v-ripple
              class="px-4 py-3 category-item"
              @click="openCategoryWisePage(category.name)"
            >
              <p>
                <img
                  :alt="category.name"
                  :src="category.photo_url"
                  height="64"
                  width="64"
                />
                <span class="option-name ml-4" style="font-size: 18px">
                  {{ category.name }}
                </span>
                <span class="mdi mdi-chevron-right arrow-go" />
              </p>
            </li>
          </template>
        </LazyCustomListView>
      </transition>

      <transition name="scale-up">
        <section
          v-if="matchCategories.length === 0"
          class="text-center my-6 px-4"
        >
          <img
            alt="category_not_found"
            class="not-found mx-auto my-4"
            src="/images/category_not_found.svg"
          />
          <p class="danger-light">
            No Category Found Based on the Search Query
          </p>
        </section>
      </transition>

      <aside
        v-ripple
        :class="showSearchBar ? 'danger-outlined-btn' : 'info-btn'"
        class="floating-action-button"
        style="bottom: 80px; right: 16px; height: 56px; width: 56px"
        @click="toggleSearchBar"
      >
        <i v-if="showSearchBar" class="mdi mdi-close mdi-24px" />
        <i v-else class="mdi mdi-magnify mdi-24px" />
      </aside>
    </div>
  </section>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import { mapGetters } from 'vuex'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'

export default {
  name: 'CategoriesList',
  components: { ImageSkeleton, LineSkeleton },
  data() {
    return {
      navigationRoutes,
      contentIsLoading: true,
      searchQuery: '',
      showSearchBar: false,
      placeholderText: 'Type here to search',
      matchCategories: [],
    }
  },

  computed: {
    ...mapGetters({
      categories: 'CategoriesManagement/getCategories',
    }),
  },

  watch: {
    searchQuery(newQuery) {
      if (newQuery === '') {
        this.matchCategories = this.categories
        return
      }
      this.matchCategories = this.categories.filter(({ name }) =>
        name.toLowerCase().match(newQuery.toLowerCase())
      )
    },
  },
  async mounted() {
    !this.categories &&
      (await this.$store.dispatch('CategoriesManagement/fetchCategories'))
    this.matchCategories = this.categories
    this.contentIsLoading = false
  },

  methods: {
    async openCategoryWisePage(categoryName) {
      await this.$router.push(
        navigationRoutes.Home.Blogs.CategoryWise.Name.replace(
          '{name}',
          categoryName
        )
      )
    },

    updateSearchQuery() {
      this.searchQuery = this.$refs.search.textContent.trim()
    },

    clearSearchContent() {
      this.searchQuery = ''
      this.$refs.search.textContent = this.placeholderText
    },

    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar
      !this.showSearchBar && this.clearSearchContent()
    },

    clearPlaceholderText() {
      if (this.$refs.search.textContent.trim() === this.placeholderText)
        this.$refs.search.textContent = ''
      this.$refs.search.focus()
    },
    putPlaceholderText() {
      if (this.$refs.search.textContent.trim() === '')
        this.$refs.search.textContent = this.placeholderText
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

$image-dimension: 64px;
.categories {
  img {
    border-radius: 50%;
    object-fit: cover;
    min-height: $image-dimension;
    height: $image-dimension;
    max-height: $image-dimension;
    min-width: $image-dimension;
    width: $image-dimension;
    max-width: $image-dimension;

    &.not-found {
      max-width: unset;
      width: auto;
      height: 200px;
      max-height: 200px;
      border-radius: 0;
    }
  }

  .search-box-container {
    position: fixed;
    top: 56px;
    right: 0;
    z-index: 11;
    background: $body-bg;
    box-shadow: $down-only-box-shadow;
    left: 0;

    @media only screen and (min-width: $small-screen) {
      left: 2 * $xxx-large-unit;
    }

    .search-box {
      position: relative;
      width: 100%;

      $custom-muted: #777;
      $custom-input-border: #333;

      .append-icon,
      .prepend-icon {
        height: 2 * $large-unit;
        position: absolute !important;
        top: 0;
        font-size: 24px;
        padding-left: 16px;
        padding-right: 16px;
        display: grid;
        place-items: center;
        border-radius: 2 * $x-large-unit;
        transition: all 0.2s ease-in-out;
      }

      .append-icon {
        right: 0;
        color: rgba($danger-light, 0.7);
      }

      .prepend-icon {
        left: 0;
        color: $custom-muted;
      }

      .input-box {
        overflow: scroll;
        outline: none 0;
        transition: all 0.2s ease-in-out;
        border: 1px solid $custom-input-border;
        border-radius: 2 * $x-large-unit;
        height: 48px;
        font-family: $Nunito-Sans;
        line-height: 1;
        padding: 15px 48px;
        resize: none;
        color: $custom-muted;
        font-weight: 300;
        letter-spacing: $single-unit;
        font-size: 1rem;

        &::-webkit-scrollbar {
          display: none;
        }

        &:focus {
          color: $secondary-vibrant;
          border: 1px solid $secondary-matte;

          & ~ .prepend-icon {
            color: $secondary-matte;
          }

          & ~ .append-icon {
            color: $danger-light;
          }
        }
      }
    }
  }

  .category-item {
    cursor: pointer;

    &:nth-child(even) {
      background: darken($body-bg, 1%);
    }

    &:hover {
      background: $body-bg-alternate;
    }
  }

  section.sample-response {
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-gap: 16px;
  }
}
</style>
