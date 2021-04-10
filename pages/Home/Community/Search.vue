<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    class="community-search-page"
  >
    <template #app-bar-title> {{ pageTitle }}</template>

    <template #main>
      <section class="search-box-container px-4 mt-5 mb-4">
        <div class="search-box">
          <input
            id="search-box"
            ref="search"
            v-model="searchQuery"
            autocomplete="off"
            placeholder="Type here to search"
            @keyup.enter="searchForPeople"
            @keyup.esc="$refs.search.blur()"
          />
          <label
            aria-label="Type here to search"
            class="mdi px-4 mdi-24px mdi-magnify"
            for="search-box"
          />
          <span
            v-ripple
            aria-label="Click here to start the search"
            class="mdi mdi-check mdi-24px px-4"
            @click="searchForPeople"
          />
        </div>

        <transition name="scale-down">
          <aside v-if="showFallback" class="backdrop">
            <section class="content px-4 text-center">
              <LazyLoadingIcon class="mx-auto my-4" />
              <h6>Sometimes it's worth waiting.</h6>
              <p>Hold on, While we search for the awesome person!</p>
            </section>
          </aside>
        </transition>
      </section>

      <section class="search-results-container">
        <p v-if="searchQuery.trim().length === 0" class="text-center my-8 py-8">
          Please tap enter to see results (^-^)
        </p>
        <p
          v-else-if="noResultsFound"
          class="text-center danger-light my-8 py-8"
        >
          We didn't found anyone with that search query
        </p>

        <UserSearchResult
          v-for="result in searchResults.results"
          :key="result.userUID"
          :userdata="result"
          class="px-4 py-4 search-result"
        />
      </section>

      <transition name="scale-down">
        <LazyFollowSuggestions
          v-if="!searchResults.results || noResultsFound"
        />
      </transition>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'
import { showUITip } from '~/utils/utility'

export default {
  name: 'Search',
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Search',
      searchQuery: '',
      showFallback: false,
      searchResults: [],
      noResultsFound: false,
    }
  },

  async mounted() {
    await this.$store.dispatch('NavigationState/updateBottomNavActiveLink', {
      linkPosition: -1,
    })
    await this.$store.dispatch('NavigationState/updateTopNavActiveLink', {
      linkPosition: -1,
    })
    this.$refs.search.focus()
  },

  methods: {
    async searchForPeople() {
      if (this.searchQuery.trim().length) {
        this.showFallback = true
        this.searchResults = []
        await showUITip(this.$store, 'Searching...')

        try {
          this.searchResults = await this.$axios.$get(
            endpoints.follow_system.search,
            {
              params: { searchQuery: this.searchQuery },
            }
          )
        } catch (e) {
          // console.log(e)
        } finally {
          this.showFallback = false
          this.noResultsFound = this.searchResults?.results?.length === 0
        }
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

.community-search-page {
  .search-box-container {
    display: flex;
    align-items: center;
    position: relative;

    .search-box {
      position: relative;
      width: 100%;
      z-index: $bring-to-front - 11;

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
        color: rgba($secondary-highlight, 0.7);
      }

      label {
        left: 0;
        color: $custom-muted;
      }

      input {
        transition: all 0.2s ease-in-out;
        border: 1px solid $custom-input-border;
        border-radius: 2 * $x-large-unit;
        height: 48px;
        line-height: 1;
        padding: 15px 48px;
        color: $custom-muted;
        font-weight: 300;
        font-family: $Raleway;
        letter-spacing: $single-unit;
        font-size: 1rem;

        &::-webkit-scrollbar {
          display: none;
        }

        &::placeholder {
          color: $custom-muted;
          font-weight: 300;
        }

        &:not(:placeholder-shown) {
          color: $secondary-matte;
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

        &:focus {
          color: $vibrant;
          border: 1px solid $secondary-matte;

          & ~ label {
            color: $secondary-matte;
          }

          & ~ span {
            color: $secondary-highlight;
          }
        }
      }
    }

    .backdrop {
      position: fixed;
      height: 100vh;
      width: 100vw;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: rgba($nav-bar-bg, 0.9);
      z-index: $bring-to-front - 15;

      .content {
        margin-top: 4.2 * $xxx-large-unit;
      }
    }
  }

  .search-results-container {
    .search-result {
      &:nth-child(even) {
        background: $segment-background;
      }
    }
  }
}
</style>
