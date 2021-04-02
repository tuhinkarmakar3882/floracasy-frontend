<template>
  <div class="fallback-loader">
    <div class="text-center">
      <LoadingIcon class="mb-8" />
    </div>
    <slot name="fallback">
      <p class="text-center">Fetching data from server</p>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'FallBackLoader',
}
</script>
