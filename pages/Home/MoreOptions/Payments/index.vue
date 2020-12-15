<template>
  <AppFeel
    class="payments-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <div class="mb-4">
        <section class="earning-info-card pl-5 pr-4 py-8">
          <h4 class="heading-title" style="margin-top: 0 !important">
            Earning at a Glance
          </h4>
          <div class="grid-container">
            <div>
              <p class="amount secondary-highlight">$25 Earned So far</p>
              <p class="danger-light amount my-4">$75 more to go</p>
            </div>
            <aside>
              <canvas
                id="earning-info-chart"
                style="width: 100%"
                height="100"
              />
            </aside>
          </div>
        </section>

        <section class="claim-your-money-card py-8 px-4">
          <h4>This is a big line more line</h4>
          <div class="promotional-segment">
            <p>
              You need to reach the minimum threshold of
              <strong>$100</strong> dollars.
            </p>
            <aside>
              <section class="stage">
                <figure class="ball bubble"></figure>
              </section>
              <div class="coin">$20</div>
              <p class="need-more-text py-4">More to go</p>
            </aside>
          </div>
        </section>

        <section class="general-info-card py-8 px-4">
          <h6 class="mt-0">Earning Summary</h6>

          <aside class="graph py-4 text-center">
            <trend
              :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
              :gradient="['#66b5fa', '#42b983', '#2c3e50']"
              auto-draw
              smooth
            />
          </aside>
        </section>

        <section class="go-premium-card py-8">
          <div class="px-4">
            <h5>Need more analytics?</h5>
            <p>
              To know your every bolg&#39;s insight view; total view and many
              more exciting than usual. please go &amp; check our premium pack
            </p>
            <ul>
              <li v-for="(point, index) in points" :key="index">
                <KeyPoint tick-color="#d8ff00" :tick-size="24" :point="point" />
              </li>
            </ul>
          </div>
          <div class="text-center mt-6">
            <button
              v-ripple=""
              class="premium-btn mx-2 my-4"
              style="width: 150px"
            >
              Buy Premium
            </button>
            <button
              v-ripple=""
              class="premium-outlined-btn mx-2 my-4"
              style="width: 150px"
              @click="$router.push(navigationRoutes.Home.MoreOptions.GoPremium)"
            >
              Learn More
            </button>
          </div>
        </section>
      </div>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import KeyPoint from '@/components/global/KeyPoint'
import Trend from 'vuetrend'
import Chart from 'chart.js'

export default {
  name: 'Payments',
  middleware: 'isAuthenticated',
  components: { KeyPoint, AppFeel, Trend },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Payments',
      points: [
        'Get Detailed Insights',
        'Premium Interface',
        'Audible Blogs',
        'Reach More People Faster',
        'Get Messaging Functionality',
        'Avail Faster Customer Support',
        'And Much More!',
      ],
      chartType: 'doughnut',
      chartData: {
        datasets: [
          {
            data: [25, 75],
            backgroundColor: ['#6DD0BF', '#3a3a3a'],
            borderWidth: 1,
            borderColor: '#000',
          },
        ],

        labels: ['Money Earned', 'Money Needed'],
      },
      chartOptions: {
        animation: {
          duration: 2800,
          easing: 'easeOutQuart',
          animateScale: true,
          animateRotate: true,
        },
        title: {
          display: false,
          text: 'caption2',
          fontColor: '#FFF',
          fontSize: 25,
          fontStyle: '',
          lineHeight: 1.3,
        },
        legend: {
          display: false,
          labels: {
            fontColor: 'rgb(255, 255, 255)',
            fontStyle: 'italic',
          },
        },
        responsive: true,
        responsiveAnimationDuration: 2000,
      },
    }
  },
  mounted() {
    this.drawChart()
  },

  methods: {
    drawChart() {
      const ctx = document.getElementById('earning-info-chart').getContext('2d')
      const myChart = new Chart(ctx, {
        data: this.chartData,
        type: this.chartType,
        options: this.chartOptions,
      })
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

.payments-page {
  section {
    &:nth-child(odd) {
      background: $segment-background;
    }
  }

  .go-premium-card {
    ul {
      list-style: none;

      section {
        background: $body-background;
      }
    }
  }

  .earning-info-card {
    .grid-container {
      display: grid;
      grid-column-gap: 1rem;
      place-items: center;
      grid-template-columns: 1fr 1fr;
      @media only screen and (min-width: $small) {
        grid-template-columns: 1fr 1fr;
      }

      section {
        align-self: stretch;
      }

      aside {
        align-self: stretch;
        width: 100%;
      }

      div {
        p {
          font-family: $Nunito-Sans;
          font-size: $medium-unit;

          .amount {
            font-weight: 500;
            filter: drop-shadow($right-only-box-shadow);
          }
        }
      }
    }
  }

  .claim-your-money-card {
    .promotional-segment {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1rem;

      aside {
        display: grid;
        height: 100%;
        place-items: center;

        $coin-radius: 72px;

        .coin {
          height: $coin-radius;
          width: $coin-radius;
          border-radius: 50%;
          background: #ce9a00;
          font-size: 20px;
          font-family: $Nunito-Sans;
          display: grid;
          color: #eee;
          place-items: center;
          transition: all ease-in-out;
          box-shadow: 0 0 8px 0 $nav-bar-bg inset, 0 0 10px 4px $card-background;
          animation: spin-it 0.5s ease-in-out forwards;

          @keyframes spin-it {
            from {
              transform: translateX(30px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          .need-more-text {
            text-align: center;
            width: 100%;
            color: $secondary;
            position: relative;

            &::after {
              content: '';
              position: absolute;
              height: 1px;
              width: 84px;
              bottom: 0;
              left: calc(50% - 42px);
              background: $secondary-matte;
            }
          }
        }
      }
    }
  }
}
</style>
