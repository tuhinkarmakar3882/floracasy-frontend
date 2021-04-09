<template>
  <div class="index-page">
    <main class="mobile-view">
      <LazyCustomCarousel :total-items="4" class="carousel-container pt-4">
        <template #slides>
          <section class="carousel-item px-6">
            <header class="text-center">
              <h1 class="my-4">Floracasy</h1>
              <p class="my-4 muted">
                &lsquo;Where Knowledge Gets Socialized&rdquo;
              </p>
            </header>

            <main class="step-1">
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
                  text-color="#dadada"
                  tick-color="#6DD0BF"
                />
              </aside>
            </main>
          </section>

          <section class="carousel-item px-6">
            <header class="text-center">
              <h2 class="my-4">Omnidirectional Knowledge</h2>
              <p class="my-4 muted">
                We want to be versatile, starting with you, with a growing
                number of enriching content & categories
              </p>
            </header>
            <main class="step-2">
              <section
                v-for="option in mobileCategories.slice(0, 2)"
                :key="option.name"
                class="category first-line"
              >
                <img
                  :alt="option.name"
                  :src="option.image"
                  height="58"
                  width="58"
                />
                <p class="white mt-4">{{ option.name }}</p>
              </section>
              <section
                v-for="option in mobileCategories.slice(2, 5)"
                :key="option.name"
                class="category second-line"
              >
                <img
                  :alt="option.name"
                  :src="option.image"
                  height="58"
                  width="58"
                />
                <p class="white mt-4">{{ option.name }}</p>
              </section>
              <section
                v-for="option in mobileCategories.slice(5, 9)"
                :key="option.name"
                class="category third-line"
              >
                <img
                  :alt="option.name"
                  :src="option.image"
                  height="58"
                  width="58"
                />
                <p class="white mt-4">{{ option.name }}</p>
              </section>
              <section class="category">
                <i class="mdi mdi-dots-horizontal-circle-outline" />
                <p class="mt-4">More</p>
              </section>
            </main>
          </section>

          <section class="carousel-item px-6">
            <header class="text-center">
              <h2 class="my-4">The More , The Merrier</h2>
              <p class="my-4 muted">
                A platform where people can socialize, share ideas, grow &
                create impact together.
              </p>
            </header>

            <main class="step-3">
              <img
                alt="An Illustration where people are socializing"
                class="community-banner-image mx-auto"
                height="200"
                src="/images/friends_illustration.svg"
              />

              <aside>
                <KeyPoint
                  :tick-size="20"
                  class="my-4"
                  point="Connect with the People that Matter to you"
                  text-color="#dadada"
                  tick-color="#6DD0BF"
                />
                <KeyPoint
                  :tick-size="20"
                  class="my-4"
                  point="Discover Amazing Minds around the World"
                  text-color="#dadada"
                  tick-color="#6DD0BF"
                />
              </aside>
            </main>
          </section>

          <section class="carousel-item px-6">
            <header class="text-center">
              <h3>Get Rewarded For Your Knowledge</h3>
              <p class="muted my-6">
                We understand & value the knowledge you possess & would happily
                love to reward
              </p>
            </header>

            <main class="step-4">
              <img
                alt="An Illustration where people are getting paid"
                class="reward-banner-image mx-auto"
                height="200"
                src="/images/reward_illustration.svg"
              />

              <aside>
                <KeyPoint
                  :tick-size="20"
                  class="my-4"
                  point="Earn Upto $100 per month Only By writing Blogs"
                  text-color="#dadada"
                  tick-color="#6DD0BF"
                />
                <KeyPoint
                  :tick-size="20"
                  class="my-4"
                  point="Earn Floracoins to get extra rewards & enjoy premium features"
                  text-color="#dadada"
                  tick-color="#6DD0BF"
                />
              </aside>
            </main>
          </section>
        </template>
      </LazyCustomCarousel>

      <footer>
        <GoogleSignInButton class="secondary-btn" />
        <button
          v-ripple
          class="secondary-outlined-btn guest-btn"
          @click="continueAsGuest"
        >
          <i class="mdi mdi-account-circle mdi-24px mx-4" />
          <span class="white">Continue as Guest</span>
        </button>
      </footer>
    </main>
  </div>
</template>

<script>
import { usePremiumServices } from '~/environmentVariables'
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { LogAnalyticsEvent } from '~/utils/utility'

export default {
  name: 'WelcomePage',
  layout: 'FullScreen',
  middleware: 'isNotAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Welcome to Floracasy',
      usePremiumServices,
      showExperiences: false,
      points: [
        'Explore enriching articles',
        'Discover people around the world',
        'Get paid for your knowledge',
        'Go Premium with Floracoins',
        'And much more!',
      ],
      mobileCategories: [
        {
          name: 'Programming',
          image:
            'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          name: 'Food',
          image:
            'https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          name: 'Automobile',
          image:
            'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          name: 'History',
          image:
            'https://images.unsplash.com/photo-1612010863676-468979bb49af?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=80',
        },
        {
          name: 'Gaming',
          image:
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          name: 'Finance',
          image:
            'https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          name: 'Beauty',
          image:
            'https://images.unsplash.com/photo-1599847987657-881f11b92a75?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        },
        {
          name: 'Education',
          image:
            'https://images.unsplash.com/photo-1527384025924-f30fc2ac98e3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=300&q=80',
        },
      ],
    }
  },

  computed: {
    mobileView() {
      if (process.server) return true
      return window.innerWidth < 768
    },
  },

  mounted() {},

  methods: {
    async continueAsGuest() {
      LogAnalyticsEvent('anonymous_login')
      await this.$router.push(navigationRoutes.Home.DashBoard)
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

.index-page {
  * {
    transition: all 300ms ease-in-out;
  }

  .desktop-view {
    .segment {
      position: relative;
      padding: $xx-large-unit $standard-unit;

      &:nth-child(odd):not(:first-child) {
        background-color: $segment-background;
      }
    }
  }

  .mobile-view {
    position: relative;
    height: 100vh;
    border-top: 1px solid #050513;
    border-bottom: 1px solid #00283f;
    background: linear-gradient(180deg, #050513 50%, #00283f 100%);

    .carousel-container {
      overflow: scroll;

      section.carousel-item {
        main.step-1 {
          .book-lover-image {
            height: 200px;
            object-fit: scale-down;
            display: none;

            @media only screen and (min-height: 810px) {
              display: block;
            }
          }

          aside {
            padding: 20px;

            @media only screen and (min-height: 710px) {
              margin: 32px 0;
            }

            @media only screen and (min-height: 810px) {
              padding: 0;
              margin: 0;

              .keypoint {
                margin: 20px 0;
              }
            }
          }
        }

        main.step-2 {
          display: none;
          margin-top: 7%;

          @media only screen and (min-height: 450px) {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            place-items: center;
            grid-row-gap: 20px;
          }

          .category {
            text-align: center;

            $image-size: 58px;

            img {
              margin: auto;
              max-height: $image-size;
              height: $image-size;
              min-height: $image-size;
              max-width: $image-size;
              width: $image-size;
              min-width: $image-size;
              border-radius: 50%;
              object-fit: cover;
            }

            p {
              font-size: 14px;
            }

            i::before {
              font-size: 58px;
              line-height: 1;
            }
          }

          .second-line {
            display: none;
            @media only screen and (min-height: 650px) {
              display: block;
            }
          }

          .third-line {
            display: none;
            @media only screen and (min-height: 793px) {
              display: block;
            }
          }
        }

        main.step-3 {
          $break-point: 670px;

          margin-top: 7%;

          .community-banner-image {
            height: clamp(200px, 33vh, 300px);
            object-fit: scale-down;
            display: none;

            @media only screen and (min-height: $break-point) {
              display: block;
            }
          }

          aside {
            @media only screen and (min-height: $break-point) {
              display: none;
            }
          }
        }

        main.step-4 {
          $break-point: 670px;

          margin-top: 7%;

          .reward-banner-image {
            height: clamp(200px, 31vh, 300px);
            object-fit: scale-down;
            display: none;

            @media only screen and (min-height: $break-point) {
              display: block;
            }
          }

          aside {
            @media only screen and (min-height: $break-point) {
              display: none;
            }
          }
        }
      }
    }

    footer {
      position: fixed;
      bottom: 0;
      height: 212px;
      left: 0;
      right: 0;
      padding: 16px;
      display: flex;
      justify-content: center;
      align-content: center;
      align-items: center;
      flex-direction: column;
      background: linear-gradient(0deg, #050514, transparent);

      button {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 48px;
        margin: 16px 0;

        span {
          justify-self: flex-start;
        }
      }
    }
  }
}
</style>
