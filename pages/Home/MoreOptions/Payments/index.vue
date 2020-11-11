<template>
  <div class="payments-page">
    <h1>This is my Super duper Payments Page</h1>
  </div>
</template>

<script>
export default {
  name: 'Payments',

  data() {
    return {
      pageTitle: 'Payments',
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
