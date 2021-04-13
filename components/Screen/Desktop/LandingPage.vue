<template>
  <div class="desktop-landing-page">
    <nav>Floracasy</nav>
  </div>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { LogAnalyticsEvent } from '~/utils/utility'

export default {
  name: 'LandingPage',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Welcome to Floracasy',
      points: [
        'Explore enriching articles',
        'Discover people around the world',
        'Get paid for your knowledge',
        'Go Premium with Floracoins',
        'And much more!',
      ],
    }
  },
  methods: {
    async continueAsGuest() {
      LogAnalyticsEvent('anonymous_login')
      await this.$router.push(navigationRoutes.Home.DashBoard)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

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
</style>
