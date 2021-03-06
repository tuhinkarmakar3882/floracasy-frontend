<template>
  <footer class="page-footer">
    <h5 class="text-center my-2">Floracasy</h5>

    <section class="tag-lines">
      <p class="option">Blog</p>
      <p class="option">Community</p>
      <p class="option">Earning</p>
      <p class="option">Socialize</p>
    </section>

    <hr class="faded-divider" />

    <div class="communication">
      <section class="page-links">
        <p class="text-center">Quick Links</p>
        <nuxt-link :to="navigationRoutes.Home.MoreOptions.About">
          About
        </nuxt-link>
        <nuxt-link
          :to="navigationRoutes.Home.MoreOptions.HelpAndSupport.Feedback"
        >
          Support
        </nuxt-link>
      </section>

      <section class="social-links">
        <p class="text-center">Let's Connect</p>
        <aside>
          <i class="mdi mdi-linkedin mdi-48px" />
          <i class="mdi mdi-gmail mdi-48px" />
        </aside>
      </section>
    </div>

    <section class="text-center">
      <button class="secondary-outlined-btn my-4">Sign up or Log in</button>

      <br />
      <a class="no-underline my-4" href="#">
        <i class="mdi mdi-triangle mdi-18px" />
        Back to Top
      </a>
      <br />
      <p class="my-2">
        <small>&copy; Floracasy.com {{ new Date().getFullYear() }}</small>
      </p>
    </section>
  </footer>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'Footer',
  data() {
    return {
      navigationRoutes,
      points: [
        'Enjoy Affordable Pro Perks1',
        'Enjoy Affordable Pro Perks2',
        'Enjoy Affordable Pro Perks3',
        'Enjoy Affordable Pro Perks4',
      ],
      joinUsButtonLoading: false,
    }
  },
  methods: {
    changeIt() {
      this.joinUsButtonLoading = true
      setTimeout(() => {
        this.thisjoinUsButtonLoading = false
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

footer.page-footer {
  background-color: $footer-background;
  width: 100%;

  .tag-lines {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    align-content: center;
  }

  .communication {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;

    .page-links {
      a {
        display: block;
      }
    }

    .social-links {
      display: flex;
      flex-direction: column;

      aside {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
}
</style>
