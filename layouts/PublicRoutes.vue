<template>
  <div>
    <NavigationBar />

    <main>
      <nuxt />
    </main>

    <Footer />
  </div>
</template>

<script>
import NavigationBar from '~/components/Layout/PublicRoutes/NavigationBar'
import Footer from '~/components/Layout/PublicRoutes/Footer'

export default {
  components: { Footer, NavigationBar },
  data: () => {
    return {}
  },
}
</script>

<style lang="postcss">
button {
  @apply font-bold py-2 px-4 rounded;
  @apply bg-blue-500 text-white;
  @apply bg-blue-700;
  font-size: 16px;
  padding: 1rem;
  font-weight: 600;
}
</style>
