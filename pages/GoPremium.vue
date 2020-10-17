<template>
  <div class="text-center my-6 py-6 px-4">
    <span color="gold-tone" size="100"> mdi-crown </span>
    <h1 class="my-4">This is my super duper Go Premium Page</h1>
    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: 'GoPremium',
  middleware: 'notAuthenticatedRequest',
}
</script>

<style scoped></style>
