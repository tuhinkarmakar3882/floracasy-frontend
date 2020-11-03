<template>
  <div>
    <NavigationBar />

    <main class="py-4">
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
