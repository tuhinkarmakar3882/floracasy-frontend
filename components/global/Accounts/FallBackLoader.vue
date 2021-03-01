<template>
  <div class="fallback-loader">
    <LoadingIcon class="mb-8" />
    <slot name="fallback">Fetching data from server</slot>
  </div>
</template>

<script>
export default {
  name: 'FallBackLoader',
}
</script>
