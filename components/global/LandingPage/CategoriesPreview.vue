<template>
  <div class="categories-preview-component">
    <LazySegmentTitle
      leading-icon="mdi mdi-shape"
      leading-paragraph="We want to be versatile, starting with you. Our collections are growing each day with more enriching content, Along with an ever growing list of categories"
      title="Let the Knowledge be Omnidirectional"
      topic="Categories"
      use-divider
    />

    <section v-if="items" class="grid-container py-8">
      <div
        v-for="item in items"
        :key="item.id"
        v-ripple
        class="grid-col"
        @click="openSignInPage"
      >
        <img :src="item.photo_url" alt="item.name" />
        <p class="my-4">
          {{ item.name }}
        </p>
      </div>

      <div v-ripple class="grid-col" @click="openSignInPage">
        <span class="mdi mdi-dots-horizontal mdi-48px" />
        <p class="my-4">More</p>
      </div>
    </section>

    <aside class="text-center">
      <button class="primary-btn mb-6" @click="openSignInPage">
        Start Reading
      </button>
    </aside>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'CategoriesPreview',

  data() {
    return {
      navigationRoutes,
      items: null,
    }
  },

  mounted() {
    this.$axios.$get(endpoints.categories.fetch).then(({ data }) => {
      this.items = data
    })
  },

  methods: {
    async openSignInPage() {
      await this.$router.push(navigationRoutes.Authentication.SignInToContinue)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.categories-preview-component {
  .grid-container {
    display: grid;
    text-align: center;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: $milli-unit;

    @media only screen and (min-width: $small) {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 32px;
      grid-row-gap: 32px;
    }
    @media only screen and (min-width: $medium) {
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 36px;
      grid-row-gap: 36px;
    }
    @media only screen and (min-width: $large) {
      grid-template-columns: repeat(5, 1fr);
      grid-column-gap: 36px;
      grid-row-gap: 36px;
    }

    img {
      width: 64px;
      min-width: 64px;
      height: 64px;
      min-height: 64px;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 50%;
    }

    .grid-col {
      display: grid;
      place-items: center;
      text-align: center;
    }

    .show-reel {
      p {
        font-weight: 400;
        color: $muted;
      }
    }
  }
}
</style>
