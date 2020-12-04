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
import NavigationBar from '@/components/global/Layout/PublicRoutes/NavigationBar'
import Footer from '@/components/global/Layout/PublicRoutes/Footer'

export default {
  components: { Footer, NavigationBar },
  data: () => {
    return {}
  },
}
</script>
