<template>
  <div class="faq-page">
    <h1>This is my Super duper FAQ Page</h1>
  </div>
</template>

<script>
export default {
  name: 'FAQ',

  data() {
    return {
      pageTitle: 'FAQ',
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
