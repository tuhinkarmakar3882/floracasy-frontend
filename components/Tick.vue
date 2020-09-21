<template>
  <svg :width="tickSize" fill="none" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
    <path
        :fill="tickColor"
        d="M23.9306 10.8595L13.3902 21.4C13.2973 21.4928 13.147 21.4928 13.0544 21.4L7.06947 15.4149C6.97684 15.3225 6.97684 15.1721 7.06947 15.0793L8.52372 13.6251C8.61656 13.5324 8.76689 13.5324 8.85951 13.6251L13.2225 17.9878L22.1408 9.06947C22.2339 8.97684 22.3838 8.97684 22.4766 9.06947L23.9306 10.5237C24.0235 10.6163 24.0235 10.7665 23.9306 10.8595Z"/>
    <circle :stroke="tickColor" cx="15" cy="15" r="14.25" stroke-width="2"/>
  </svg>
</template>

<script>
export default {
  name: "Tick",
  props: {
    tickColor: {
      type: String,
      required: true
    },
    tickSize: {
      type: Number,
      required: true
    }
  },
}
</script>

<style scoped>
svg {
  margin-right: 24px;
}
</style>
