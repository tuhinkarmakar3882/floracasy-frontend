<template>
  <div class="fetch-community-posts-component">
    <CommunityPost v-for="(post, index) in posts" :key="index" :post="post" />
    <FollowSuggestions />
  </div>
</template>

<script>
import FollowSuggestions from '~/components/global/Community/FollowSuggestions'
import CommunityPost from '~/components/global/Community/CommunityPost'

export default {
  name: 'FetchCommunityPosts',
  components: { CommunityPost, FollowSuggestions },
  data() {
    return {
      posts: [
        {
          id: 1,
        },
      ],
    }
  },
}
</script>
