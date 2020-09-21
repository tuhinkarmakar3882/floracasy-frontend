<template>
  <nav>

    <div class="brand">
      <Logo :width="45"/>
      <nuxt-link class="brand-name" to="/">Floracasy</nuxt-link>
    </div>

    <ul>
      <li>
        <nuxt-link to="/">Go Premium</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">Write &amp; Earn</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">Log in</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">Join us</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  components: {
    Logo: () => import('@/components/Logo'),
  },
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 64px;

  .brand {
    display: flex;
    align-items: center;

    .brand-name {
      margin-left: 12px;
      font-size: 24px;
      color: $white;
      text-decoration: none;
      font-family: $Prata;
    }
  }

  ul {
    list-style: none;
    display: flex;

    li {
      margin: 0 36px;
      font-size: 20px;
      font-family: $Montaga;

      a {
        display: block;
        color: $white;
        text-decoration: none;
      }
    }
  }
}
</style>
