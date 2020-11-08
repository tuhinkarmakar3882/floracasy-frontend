<template>
  <AppFeel class="about-page">
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="my-4">
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          "
        >
          <Logo :width="84" />
          <h4 class="my-4">Floracasy</h4>
        </div>

        <div class="tab-bar">
          <p
            v-ripple
            :class="tabNumber === 0 ? 'active-tab' : ''"
            @click="changeTab(0)"
          >
            About us
          </p>
          <p
            v-ripple
            :class="tabNumber === 1 ? 'active-tab' : ''"
            @click="changeTab(1)"
          >
            Read
          </p>
          <p
            v-ripple
            :class="tabNumber === 2 ? 'active-tab' : ''"
            @click="changeTab(2)"
          >
            Write
          </p>
        </div>
        <div ref="tabNavigation"></div>

        <section class="px-4">
          <div class="intro">
            More you read More you know

            <br />

            &lt; vector art. &gt;
          </div>

          <br />

          <div class="next part">
            We started Floracasy because we believe that what you read matters
            and that good writing is valuable. We believe that writers,
            bloggers, thinkers, and creatives of every background should be able
            to pursue their curiosity, generating income directly from their own
            audiences and on their own terms. When readers pay writers directly,
            writers can focus on doing the work they care about most. A few
            hundred paying subscribers can support a livelihood. A few thousand
            makes it lucrative.

            <button class="active">Join now</button>
          </div>

          <div class="writer review">
            <h4>What our writer says about us</h4>

            <p>
              A blank page is also a door. At Medium you can walk through it.
              It's easy and free to share your thinking on any topic, connect
              with an audience, express yourself with a range of publishing
              tools, and even earn money for your work.
            </p>
            <button class="active">Start writing</button>
          </div>

          <div class="earning">
            <h4>We create independent environment for earning</h4>

            <p>
              we try to create a great environment so that everyone who have
              willpower to write , can write . By writing everyone can earn a
              good amount of money
            </p>

            <button class="active">start earning</button>
          </div>

          <div class="Get priorie">
            <h4>Get prioritize</h4>

            With special permium pack get full control & explore more

            <button>become premium member</button>
          </div>
        </section>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import Logo from '@/components/global/Logo'

export default {
  name: 'About',
  components: { Logo, AppFeel },
  data() {
    return {
      tabNumber: 0,
      pageTitle: 'About us',
    }
  },
  methods: {
    changeTab(newTabNumber) {
      this.tabNumber = newTabNumber
      this.$nextTick(() => {
        this.$refs.tabNavigation.scrollTop = 0
      })
    },
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          // hid: 'description',
          // name: 'description',
          // content: 'My custom description',
        },
      ],
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
    .tab-bar {
      display: grid;
      text-align: center;
      grid-template-columns: repeat(3, 1fr);
      position: sticky;
      top: (2 * $x-large-unit) - $double-unit;
      background-color: $nav-bar-bg;
      box-shadow: $down-only-box-shadow;
      z-index: 1;
      border: 1px solid #161727;
      border-left: none;
      border-right: none;
      transition: all 0.3s ease-in-out;

      * {
        padding: 0.7rem 0;
        font-size: 1rem;
        font-weight: 300;
      }

      .active-tab {
        color: $secondary;
        font-weight: 400;
      }
    }
  }
}
</style>
