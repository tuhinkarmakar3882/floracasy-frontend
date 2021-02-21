<template>
  <AppFeel
    :on-back="navigationRoutes.Home.Community.index"
    class="community-search-page"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="search-box-container px-4 mt-5 mb-4">
        <div class="search-box">
          <textarea
            id="search-box"
            ref="search"
            v-model="searchQuery"
            autocomplete="off"
            placeholder="Type here to search"
            @blur="showFallback = false"
            @focusin="showFallback = false"
            @focusout="showFallback = false"
            @keyup="searchForPeople"
          />
          <label
            aria-label="Type here to search"
            class="mdi px-4 mdi-24px mdi-magnify"
            for="search-box"
          />
          <span
            v-ripple
            aria-label="Click here to clear the text content"
            class="mdi mdi-close mdi-24px px-4"
            @click="searchQuery = ''"
          />
        </div>

        <!--        <transition name="scale-down">-->
        <!--          <aside v-if="showFallback" class="backdrop">-->
        <!--            <section class="content px-4 text-center">-->
        <!--              <h6>The more, The merrier</h6>-->
        <!--              <p>Search for people across the world to connect</p>-->
        <!--            </section>-->
        <!--          </aside>-->
        <!--        </transition>-->
      </section>

      <pre>You're searching for: {{ searchQuery }}</pre>
      <pre>{{ searchResults }}</pre>
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
      if (this.searchQuery.trim().length > 2) {
        await showUITip(this.$store, 'Searching...')

        this.searchResults = await this.$axios
          .$get(endpoints.follow_system.search, {
            params: { searchQuery: this.searchQuery },
          })
          .catch((e) => console.log(e))
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
      color: rgba($danger-light, 0.7);
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
      line-height: 1;
      padding: 15px 48px;
      resize: none;
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
          color: $danger-light;
        }
      }
    }
  }

  //.backdrop {
  //  position: fixed;
  //  height: 100vh;
  //  width: 100vw;
  //  top: 0;
  //  left: 0;
  //  bottom: 0;
  //  right: 0;
  //  background: rgba($nav-bar-bg, 0.9);
  //  z-index: $bring-to-front - 15;
  //
  //  .content {
  //    margin-top: 4.2 * $xxx-large-unit;
  //  }
  //}
}
</style>
