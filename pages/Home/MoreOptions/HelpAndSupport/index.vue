<template>
  <div class="help-and-support-page">
    <h1>This is my Super duper Help and Support Page</h1>
  </div>
</template>

<script>
export default {
  name: 'HelpAndSupport',
  data() {
    return {
      pageTitle: 'Help And Support',
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
