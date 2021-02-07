<template>
  <div class="showcase my-4 py-6 text-center">
    <LazySegmentTitle
      leading-paragraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own
          custom integrations with our open source developer SDK"
      title="Explore a Wide Range of Categories"
      topic="Categories"
    />
    <div v-if="items" class="grid-container py-12">
      <div v-for="item in items" :key="item.id" class="grid-col">
        <img :src="item.photo_url" alt="item.name" />
        <p class="my-4">
          {{ item.name }}
        </p>
      </div>

      <div class="grid-col">
        <span class="mdi mdi-dots-horizontal mdi-48px" />
        <p class="my-4">More</p>
      </div>
    </div>

    <nuxt-link :to="navigationRoutes.Authentication.SignInToContinue">
      <LazyRippleButton
        :loading="categoriesButtonLoading"
        :on-click="changeIt"
        class="my-6 btn"
      >
        Start Reading
      </LazyRippleButton>
    </nuxt-link>
  </div>
</template>

<script>
import endpoints from '@/api/endpoints'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'CategoriesShowcase',

  data() {
    return {
      navigationRoutes,
      categoriesButtonLoading: false,
      items: false,
    }
  },

  async mounted() {
    const { data } = await this.$axios.$get(endpoints.categories.fetch)
    this.items = data
  },
  methods: {
    changeIt() {
      this.categoriesButtonLoading = true
      setTimeout(() => {
        this.categoriesButtonLoading = false
      }, 5000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.showcase {
  background-color: $segment-background;

  .grid-container {
    display: grid;
    justify-content: center;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: $standard-unit;

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
    }
  }

  .show-reel {
    p {
      font-weight: 400;
      color: $muted;
    }
  }
}
</style>
