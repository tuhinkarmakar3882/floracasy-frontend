<template>
  <div
    class="chip"
    style="text-align: center; border-radius: 50px; padding: 4px 16px"
    :style="{ backgroundColor: backgroundColor }"
  >
    <p style="font-size: 12px; font-weight: 500" :style="{ color: color }">
      <slot name="content" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    backgroundColor: {
      type: String,
      default: '#65db65',
    },
    color: {
      type: String,
      default: '#000',
    },
  },
}
</script>
