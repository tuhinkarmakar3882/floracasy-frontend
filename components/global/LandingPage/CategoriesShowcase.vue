<template>
  <div class="showcase my-4 py-6 text-center">
    <div>
      <SegmentTitle
        leading-paragraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own
          custom integrations with our open source developer SDK"
        title="Explore a Wide Range of Categories"
        topic="Categories"
      />
      <div class="grid-container py-12">
        <div v-for="item in items" :key="item.name" class="grid-col">
          <img :alt="item.name" :src="item.photo_url" />
          <p class="my-4">
            {{ item.name }}
          </p>
        </div>

        <div class="grid-col">
          <img
            alt="item.name"
            src="https://picsum.photos/151?random"
            style="width: 100%; object-fit: cover; border-radius: 50%"
          />
          <p class="my-4">More</p>
        </div>
      </div>

      <nuxt-link to="/Authentication/SignInToContinue">
        <RippleButton
          :loading="categoriesButtonLoading"
          class="my-6 btn"
          to="/Authentication/SignInToContinue"
          :on-click="changeIt"
        >
          Start Reading
        </RippleButton>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import RippleButton from '@/components/global/RippleButton'
import endpoints from '@/api/endpoints'

export default {
  name: 'CategoriesShowcase',
  components: {
    RippleButton,
    SegmentTitle: () => import('@/components/global/LandingPage/SegmentTitle'),
  },

  data() {
    return {
      categoriesButtonLoading: false,
      items: [],
    }
  },

  async mounted() {
    const response = await this.$axios.$get(endpoints.categories.fetch)
    this.items = response.data
  },
  methods: {
    changeIt() {
      this.categoriesButtonLoading = true
      setTimeout(() => {
        this.categoriesButtonLoading = false
      }, 2000)
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
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: $standard-unit;
    grid-row-gap: $standard-unit;

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

    font-size: 20px;
    text-align: center;

    .grid-col {
      width: clamp(100px, 40vw, 150px);

      img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 50%;
      }
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
