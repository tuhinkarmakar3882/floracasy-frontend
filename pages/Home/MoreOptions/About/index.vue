<template>
  <AppFeel
    class="about-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <main class="my-4">
        <section class="banner">
          <div class="logo">
            <Logo class="mr-4" />
            <h4>Floracasy</h4>
          </div>
        </section>

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
import AppFeel from '@/components/global/Layout/AppFeel'
import Logo from '@/components/global/Logo'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'About',
  components: { Logo, AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      tabNumber: 0,
      pageTitle: 'About us',
      navigationRoutes,
    }
  },
  async mounted() {
    await this.$firebase.analytics().logEvent('page_view')
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
    .banner {
      .logo {
        display: flex;
        align-items: center;
        justify-content: center;

        h4 {
          margin: $standard-unit 0;
        }
      }

      small {
        color: $muted;
      }
    }
  }
}
</style>
