<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.index"
    :prev-url-path="prevURL"
    class="about-page"
    dynamic-back
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="my-4">
        <div class="top-area mb-4">
          <section class="logo">
            <LazyLogo class="mr-4" />
            <h4>Floracasy</h4>
          </section>
          <aside class="text-center">
            <small> Version: {{ versionNumber }} </small>
          </aside>
        </div>

        <section class="tab-bar">
          <p
            v-for="(tab, index) in tabs"
            :key="index"
            v-ripple
            :class="index === activeTab ? 'active-tab' : ''"
            @click="setActiveTabTo(index)"
          >
            {{ tab }}
          </p>
        </section>

        <div ref="tabNavigation"></div>

        <section v-if="activeTab === 0" class="the-pro-zone px-4">
          <aside class="my-8 py-8 text-center">
            <h4>Coming soon</h4>
            <p>Watch this space for more information...</p>
          </aside>
        </section>

        <section v-else-if="activeTab === 1" class="the-vision px-4">
          <article class="my-4">
            <h5 class="heading-title mt-4 mb-6">
              The World can be a Better Place
            </h5>
            <p class="my-4">
              Though, the pandemic has taken away a lot of jobs, We understand
              that, each one of us is a bearer of a potential amount of
              knowledge. In this platform, we encourage you to come & share that
              knowledge to the world, and get rewarded for that.
            </p>
            <p class="my-4">
              With proper knowledge, we believe that, it can make a great
              positive impact on the world.
            </p>
          </article>

          <article class="my-4">
            <h5 class="heading-title mt-4 mb-6">The Knowledge is Valuable</h5>
            <p class="my-4">
              And, yet many people still don't quite have enough access to it.
              Here, we want to bridge the gap with just a little help from you.
            </p>
          </article>
        </section>

        <section v-else-if="activeTab === 2" class="the-story px-4">
          <article class="my-4">
            <h5 class="heading-title mt-4 mb-6">Who are we?</h5>
            <p class="my-4">
              We are a duo of self motivated enthusiasts (One Developer & One
              UX-Designer), doing our best to do our part for a platform where
              people can communicate, collaborate & socialize their knowledge &
              create great positive impact.
            </p>
            <p class="my-4">
              We saw a lot of people losing jobs & some of them wanted to switch
              careers. But, sometimes they don't really get that proper
              resources; sometimes they don't even have access to that. We want
              to bridge the gap & open up a whole platform full of opportunities
              :)
            </p>
          </article>
        </section>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import * as packageJson from '@/package.json'
export default {
  name: 'About',

  asyncData({ from: prevURL }) {
    return { prevURL }
  },

  data() {
    return {
      versionNumber: packageJson.version,
      prevURL: null,
      activeTab: 1,
      pageTitle: 'About us',
      navigationRoutes,
      tabs: ['Pro Zone', 'The Vision', 'Our Story'],
    }
  },
  mounted() {},

  methods: {
    setActiveTabTo(newTabNumber) {
      this.activeTab = newTabNumber
      this.$nextTick(() => {
        this.$refs.tabNavigation.scrollTop = 0
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

$blog-border-radius: 20px;

.about-page {
  transition: all 0.5s ease-in-out;

  main {
    .top-area {
      .logo {
        display: flex;
        align-items: center;
        justify-content: center;

        h4 {
          margin: $standard-unit 0;
        }
      }
    }

    .tab-bar {
      display: grid;
      text-align: center;
      grid-template-columns: repeat(3, 1fr);
      position: sticky;
      top: (2 * $x-large-unit) - $double-unit;
      background-color: $navigation-bar-color;
      box-shadow: $down-only-box-shadow;
      z-index: 1;
      transition: all 0.3s ease-in-out;

      * {
        padding: 0.7rem 0;
        font-size: 1rem;
        font-weight: 300;
      }

      .active-tab {
        color: $white;
        font-weight: 400;
        background: $active-gradient;
        transition: all 100ms ease-in-out;
      }
    }
  }
}
</style>
