<template>
  <div class="community-post-component">
    <pre>
CommunityPost.vue
{{ post }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'CommunityPost',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>
