<template>
  <footer class="page-footer">
    <h5 class="text-center my-2">Floracasy</h5>

    <hr class="reversed-faded-divider" />

    <section class="tag-lines">
      <p class="option">Blog</p>
      <p class="option">Community</p>
      <p class="option">Earning</p>
      <p class="option">Socialize</p>
    </section>

    <hr class="faded-divider" />

    <div class="communication">
      <section class="page-links">
        <p>Quick Links</p>

        <aside class="mt-4">
          <nuxt-link :to="navigationRoutes.Home.MoreOptions.About">
            About
          </nuxt-link>
          <nuxt-link
            :to="navigationRoutes.Home.MoreOptions.HelpAndSupport.Feedback"
          >
            Support
          </nuxt-link>
        </aside>
      </section>

      <section class="social-links">
        <p class="text-right">Let's Connect</p>
        <aside class="text-right">
          <i class="mdi mdi-linkedin mdi-48px" />
          <i class="mdi mdi-gmail mdi-48px" />
        </aside>
      </section>
    </div>

    <section class="text-center">
      <button
        v-ripple
        class="secondary-outlined-btn my-4"
        @click="$router.push(navigationRoutes.Authentication.SignInToContinue)"
      >
        Sign up or Log in
      </button>

      <a class="no-underline my-4" href="#">
        <i class="mdi mdi-triangle mdi-18px" />
        Back to Top
      </a>

      <p>
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

  a {
    display: block;
  }

  .communication {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;

    .social-links {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
