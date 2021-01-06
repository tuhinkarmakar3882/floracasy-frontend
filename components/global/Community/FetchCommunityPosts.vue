<template>
  <div class="fetch-community-posts-component">
    <CommunityPost
      v-for="(post, index) in posts"
      :key="index"
      :post="post"
      class="community-post px-4 py-8"
    />
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
          user: {
            displayName: 'Tuhin Karmakar',
            photoURL:
              'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=550&q=80',
          },
          body:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          isLiked: true,
          totalLikes: 35,
          totalShares: 428,
          totalComments: 48,
          createdAt: 1609867645646,
        },
        {
          id: 2,
          user: {
            displayName: 'Swagata Biswas',
            photoURL:
              'https://images.unsplash.com/photo-1557296387-5358ad7997bb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
          },
          body:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          isLiked: false,
          totalLikes: 345,
          totalShares: 42821,
          totalComments: 681,
          createdAt: 1609877848646,
        },
        {
          id: 3,
          user: {
            displayName: 'Tracy Parker',
            photoURL: 'https://picsum.photos/561',
          },
          body:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          isLiked: true,
          totalLikes: 245,
          totalShares: 428,
          totalComments: 48,
          createdAt: 1609867645646,
        },
        {
          id: 4,
          user: {
            displayName: 'Tony Stark',
            photoURL: 'https://picsum.photos/562',
          },
          body:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          isLiked: true,
          totalLikes: 12345,
          totalShares: 428,
          totalComments: 48,
          createdAt: 1609867645646,
        },
        {
          id: 5,
          user: {
            displayName: 'Steve Rodgers',
            photoURL: 'https://picsum.photos/563',
          },
          body:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          isLiked: true,
          totalLikes: 278,
          totalShares: 428,
          totalComments: 48,
          createdAt: 1609867645646,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.fetch-community-posts-component {
  .community-post {
    &:nth-child(even) {
      background: $nav-bar-bg;
      box-shadow: $default-box-shadow;
    }
  }
}
</style>
