<template>
  <AppFeel
    class="about-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="my-4">
        <section class="banner">
          <Logo class="mr-4" />
          <h4>Floracasy</h4>
        </section>

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

        <div v-if="activeTab === 0">
          <h1 class="text-center">Tab {{ activeTab }}</h1>
        </div>

        <div v-else-if="activeTab === 1" class="the-story px-4">
          <section>
            <h4 class="heading-title">We try to deliver more knowledge</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              aliquid at delectus distinctio dolor eligendi ipsum laboriosam,
              laborum magnam mollitia obcaecati sequi, soluta temporibus.
              Aperiam cum deleniti eveniet nam reprehenderit.
            </p>
          </section>
          <section>
            <h4 class="heading-title">How it all started</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              aliquid at delectus distinctio dolor eligendi ipsum laboriosam,
              laborum magnam mollitia obcaecati sequi, soluta temporibus.
              Aperiam cum deleniti eveniet nam reprehenderit.
            </p>
          </section>
          <section>
            <h4 class="heading-title">The Problem</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              aliquid at delectus distinctio dolor eligendi ipsum laboriosam,
              laborum magnam mollitia obcaecati sequi, soluta temporibus.
              Aperiam cum deleniti eveniet nam reprehenderit.
            </p>
          </section>
          <section>
            <h4 class="heading-title">The Solution</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              aliquid at delectus distinctio dolor eligendi ipsum laboriosam,
              laborum magnam mollitia obcaecati sequi, soluta temporibus.
              Aperiam cum deleniti eveniet nam reprehenderit.
            </p>
          </section>
        </div>

        <div v-else-if="activeTab === 2">
          <h1 class="text-center">Tab {{ activeTab }}</h1>
        </div>
      </main>

      <Footer class="px-4 my-0 py-6" />
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import Logo from '@/components/global/Logo'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import Footer from '~/components/global/Layout/PublicRoutes/Footer'

export default {
  name: 'About',
  components: { Footer, Logo, AppFeel },
  // middleware: 'isAuthenticated',
  data() {
    return {
      activeTab: 1,
      pageTitle: 'About us',
      navigationRoutes,
      tabs: ['Pro Zone', 'Our Story', 'The Vision'],
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

<!--<style lang="scss" scoped>-->
<!--@import 'assets/all-variables';-->

<!--$blog-border-radius: 20px;-->

<!--.about-page {-->
<!--  transition: all 0.5s ease-in-out;-->

<!--  main {-->
<!--    .banner {-->
<!--      display: flex;-->
<!--      align-items: center;-->
<!--      justify-content: center;-->

<!--      h4 {-->
<!--        margin: $standard-unit 0;-->
<!--      }-->
<!--    }-->

<!--    .tab-bar {-->
<!--      display: grid;-->
<!--      text-align: center;-->
<!--      grid-template-columns: repeat(3, 1fr);-->
<!--      position: sticky;-->
<!--      top: (2 * $x-large-unit) - $double-unit;-->
<!--      background-color: $nav-bar-bg;-->
<!--      box-shadow: $down-only-box-shadow;-->
<!--      z-index: 1;-->
<!--      transition: all 0.3s ease-in-out;-->

<!--      * {-->
<!--        padding: 0.7rem 0;-->
<!--        font-size: 1rem;-->
<!--        font-weight: 300;-->
<!--      }-->

<!--      .active-tab {-->
<!--        color: $secondary;-->
<!--        font-weight: 400;-->
<!--        background: $card-background;-->
<!--        transition: all 100ms ease-in-out;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
