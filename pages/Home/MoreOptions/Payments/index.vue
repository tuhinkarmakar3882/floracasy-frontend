<template>
  <AppFeel
    class="payments-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <div class="my-4">
        <section class="earning-info-card pl-5 pr-4 py-5">
          <section>
            <h4 class="mt-0 mb-2">At a Glance</h4>
            <p>
              You&rsquo;ve earned <br />
              <span class="amount">$ 100.0</span>
            </p>
          </section>
          <aside></aside>
        </section>

        <section class="claim-your-money-card py-5 px-4">
          <h4 class="mt-4">And to claim it,</h4>
          <div class="promotional-segment">
            <p>
              You need to reach the minimum threshold of
              <strong>$100</strong> dollars. Once you do so, you'll be able to
              claim the money.
            </p>
            <aside>
              <div class="coin">$20</div>
              <p class="need-more-text py-4">More to go</p>
            </aside>
          </div>
        </section>

        <blockquote class="general-info-card">
          <h6 class="mt-0">
            Just have a look to your earning history : Last 6th month
          </h6>

          <section class="graph dbx py-4 text-center">
            <p>This section is for graph but i can&#39;t make this</p>
          </section>
        </blockquote>

        <blockquote class="promotion-card">
          <p>
            To know your every bolg&#39;s insight view; total view and many more
            exciting than usual. please go &amp; check our premium pack
          </p>
          <div style="height: 250px; width: 100%; background: #444" />
          <button v-ripple="" class="primary-btn">go premium</button>
        </blockquote>
      </div>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'Payments',
  middleware: 'isAuthenticated',
  components: { AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Payments',
      points: ['Try Sharing it More', 'Keep Writing Great Content'],
    }
  },
  mounted() {},

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

  .earning-info-card {
    display: grid;
    grid-template-columns: 2fr 1.2fr;
    grid-column-gap: 1rem;

    section {
      align-self: stretch;

      .amount {
        color: $secondary-highlight;
        font-family: $Nunito-Sans;
        font-size: $large-unit;
        font-weight: 500;
        filter: drop-shadow($right-only-box-shadow);
      }
    }

    aside {
      align-self: stretch;
      width: 100%;
      border-bottom: 1px solid greenyellow;
    }
  }

  .claim-your-money-card {
    .promotional-segment {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-column-gap: 1rem;

      aside {
        display: grid;
        height: 100%;
        place-items: center;

        $coin-radius: 96px;

        .coin {
          height: $coin-radius;
          width: $coin-radius;
          border-radius: 50%;
          background: $primary-matte;
          font-size: 32px;
          font-family: $Nunito-Sans;
          display: grid;
          color: #eee;
          place-items: center;
          transition: all ease-in-out;
          box-shadow: 0 0 8px $card-background inset,
            0 0 10px 4px $card-background;
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
