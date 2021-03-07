<template>
  <div class="fallback-loader">
    <LoadingIcon class="mb-8" />
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
