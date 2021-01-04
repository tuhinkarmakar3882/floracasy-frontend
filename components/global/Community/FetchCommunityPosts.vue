<template>
  <div class="fetch-community-posts-component">
    <h6 class="text-center">{ - FetchCommunityPosts - }</h6>
    <FollowSuggestions />
  </div>
</template>

<script>
import FollowSuggestions from '~/components/global/Community/FollowSuggestions'
export default {
  name: 'FetchCommunityPosts',
  components: { FollowSuggestions },
}
</script>
