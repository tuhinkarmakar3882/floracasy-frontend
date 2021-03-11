<template>
  <div class="index-page">
    <main v-if="mobileView" class="mobile-view">
      <CustomCarousel :total-items="4" class="carousel-container pt-4">
        <template v-slot:slides>
          <section class="carousel-item px-2">
            <header class="text-center">
              <h1>Floracasy</h1>
              <p class="my-4 muted">
                &lsquo;Where Knowledge Gets Socialized&rdquo;
              </p>
            </header>

            <main class="px-2 step-1">
              <img
                alt="An Illustration where someone is reading a book"
                class="book-lover-image mx-auto my-6"
                height="200"
                src="/images/banner_illustration_logo.svg"
              />
              <aside>
                <KeyPoint
                  v-for="(point, index) in points"
                  :key="index"
                  :point="point"
                  :tick-size="20"
                  class="my-4 keypoint"
                  text-color="#b9b9b9"
                  tick-color="#6DD0BF"
                />
              </aside>
            </main>
          </section>

          <section class="carousel-item px-2">
            <header class="text-center">
              <h2 class="my-4">Let The Knowledge Be Omnidirectional</h2>
              <p class="muted my-6">
                We want to be versatile, starting with you, with an growing
                number of enriching content & categories
              </p>
            </header>
            <main class="step-2">
              <section
                v-for="(option, index) in mobileCategories"
                :key="index"
                class="category"
              >
                <img
                  :alt="option.name"
                  :src="option.image"
                  height="58"
                  width="58"
                />
                <p class="mt-4">{{ option.name }}</p>
              </section>
              <section class="category">
                <i class="mdi mdi-dots-horizontal-circle" />
                <p class="mt-4">More</p>
              </section>
            </main>
          </section>

          <section class="carousel-item px-2">
            <header class="text-center">
              <h2>The More , The Merrier</h2>
              <p class="muted mt-6">
                A platform where people can socialize, share ideas, grow &
                create impact together.
              </p>
            </header>
            <img
              alt="An Illustration where people are socializing"
              class="community-banner-image mx-auto"
              height="200"
              src="/images/community_banner.svg"
            />
          </section>

          <section class="carousel-item px-2">
            <header class="text-center">
              <h3>Get Rewarded For Your Knowledge</h3>
              <p class="muted my-6">
                We understand & value the knowledge you possess & would happily
                love to reward
              </p>
            </header>

            <main class="px-2">
              <KeyPoint
                :tick-size="20"
                class="my-4"
                point="Earn Upto $100 per month Only By writing Blogs"
                tick-color="#6DD0BF"
              />
              <KeyPoint
                :tick-size="20"
                class="my-4"
                point="Earn Floracoins to get extra rewards & enjoy premium features"
                tick-color="#6DD0BF"
              />
            </main>
          </section>
        </template>
      </CustomCarousel>

      <footer>
        <button v-ripple class="secondary-btn">
          <GoogleIcon class="icon" />
          <span>Continue with Google</span>
        </button>
        <button v-ripple class="secondary-outlined-btn">
          <i class="mdi mdi-account-circle mdi-24px" />
          <span class="white">Continue as Guest</span>
        </button>
      </footer>
    </main>

    <main v-else class="desktop-view my-8 text-center py-8">
      <h1>Hello Desktop</h1>
      <LazyHeroContent class="segment" />

      <LazyPromotionalBlogs />

      <LazyCategoriesPreview class="segment" />

      <LazyCommunityPreview class="segment text-center" />

      <LazyEarnWithUs class="segment" />

      <LazyHearTheExperiences v-if="showExperiences" class="segment" />

      <LazyProZone v-if="usePremiumServices" class="segment" />
    </main>
  </div>
</template>

<script>
import { usePremiumServices } from '~/environmentVariables'

export default {
  name: 'LandingPage',
  layout: 'PublicRoutes',
  middleware: 'isNotAuthenticated',

  data() {
    return {
      pageTitle: 'Welcome to Floracasy',
      usePremiumServices,
      showExperiences: false,
    }
  },

  mounted() {},

  methods: {},

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.index-page {
  * {
    transition: all 300ms ease-in-out;
  }

  main {
    .segment {
      position: relative;
      padding: $xx-large-unit $standard-unit;

      &:nth-child(odd):not(:first-child) {
        background-color: $segment-background;
      }
    }
  }
}
</style>
