<template>
  <nav class="navigation-bar">

    <div class="brand">
      <Logo :width="100"/>
      <nuxt-link class="brand-name" to="/">Floracasy</nuxt-link>
    </div>

    <ul class="menu-list">
      <li class="menu-list-item">
        <nuxt-link class="menu-list-link" to="/">Go Premium</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link class="menu-list-link" to="/">Write &amp; Earn</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link class="menu-list-link" to="/">Log in</nuxt-link>
      </li>
      <li class="menu-list-item">
        <nuxt-link class="menu-list-link" to="/">Join us</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  components: {
    Logo: () => import('~/components/Logo'),
  },
}
</script>

<style lang="scss" scoped>

.navigation-bar {

  .brand {
    .brand-name {
    }
  }

  .menu-list {
    .menu-list-item {
      .menu-list-link {
      }
    }
  }
}

</style>
