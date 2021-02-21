<template>
  <section class="categories">
    <div v-if="contentIsLoading" class="my-6">
      <LoadingIcon />
    </div>

    <div v-else>
      <transition name="scale-up">
        <section v-show="showSearchBar" class="px-2 py-4 search-box-container">
          <div class="search-box">
            <textarea
              id="search-box"
              v-model="searchQuery"
              autocomplete="off"
              placeholder="Type here to search"
              rows="1"
              @keyup.esc="hideSearchBar"
            />
            <label
              aria-label="Type here to search for category"
              class="mdi px-4 mdi-24px mdi-magnify"
              for="search-box"
            />
            <span
              v-ripple
              aria-label="Click here to clear the search"
              class="mdi mdi-close mdi-24px px-4"
              @click="searchQuery = ''"
            />
          </div>
        </section>
      </transition>

      <LazyCustomListView>
        <template v-slot:heading>
          <h4 class="heading-title">Explore Categories</h4>
        </template>
        <template v-slot:list-items>
          <li
            v-for="category in matchCategories"
            :key="category.id"
            v-ripple
            class="px-4 py-3"
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

export default {
  name: 'CategoriesLineUp',

  data() {
    return {
      navigationRoutes,
      contentIsLoading: true,
      searchQuery: '',
      showSearchBar: false,
      matchCategories: [],
    }
  },

  computed: {
    ...mapGetters({
      categories: 'CategoriesManagement/getCategories',
    }),
  },

  watch: {
    searchQuery(newValue) {
      this.matchCategories = this.categories.filter(({ name }) =>
        name.toLowerCase().match(newValue.trim().toLowerCase())
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
    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar
      !this.showSearchBar && this.hideSearchBar()
    },
    hideSearchBar() {
      this.showSearchBar = false
      this.searchQuery = ''
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
    top: 104px;
    right: 0;
    z-index: 1;
    background: $body-background;
    box-shadow: $down-only-box-shadow;
    left: 0;

    @media only screen and (min-width: $small) {
      left: 2 * $xxx-large-unit;
    }

    .search-box {
      position: relative;
      width: 100%;

      $custom-muted: #777;
      $custom-input-border: #333;

      span,
      label {
        height: 2 * $large-unit;
        position: absolute !important;
        top: 0;
        display: grid;
        place-items: center;
        border-radius: 2 * $x-large-unit;
        transition: all 0.2s ease-in-out;
      }

      span {
        right: 0;
        opacity: 0;
        transform: scale(0);
        color: $secondary;
      }

      label {
        left: 0;
        color: $custom-muted;
      }

      textarea {
        transition: all 0.2s ease-in-out;
        border: 1px solid $custom-input-border;
        border-radius: 2 * $x-large-unit;
        height: 48px;
        padding: 12px 48px;
        color: $custom-muted;
        font-weight: 300;
        font-family: $Raleway;
        letter-spacing: $single-unit;
        font-size: 1rem;

        &::placeholder {
          color: $custom-muted;
          font-weight: 300;
        }

        &:focus,
        &:not(:placeholder-shown) {
          border: 1px solid $vibrant;

          & ~ label {
            color: $secondary;
          }
        }

        &:not(:placeholder-shown) {
          color: $secondary;
          padding-left: 20px;

          & ~ span {
            transform: scale(1);
            opacity: 1;
          }

          & ~ label {
            width: 0;
            margin: 0;
            padding: 0;
            opacity: 0;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
