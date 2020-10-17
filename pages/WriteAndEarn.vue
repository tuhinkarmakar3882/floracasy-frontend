<template>
  <div class="text-center my-6 py-6 px-4">
    <span> mdi-heart </span>

    <h1 class="my-4">This is my super duper Write and Earn Page</h1>

    <p class="my-4">And I love it</p>
  </div>
</template>

<script>
export default {
  name: 'WriteAndEarn',
  middleware: 'notAuthenticatedRequest',
}
</script>

<style scoped></style>
