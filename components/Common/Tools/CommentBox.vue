<template>
  <div class="comment-box">
    <!--    <img v-if="user" :src="user.photoURL" alt="profile-image" />-->

    <main><slot name="text-box" /></main>

    <aside v-ripple><slot name="action-button" /></aside>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CommentBox',
  computed: {
    ...mapGetters({
      user: 'UserManagement/getUser',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.comment-box {
  position: fixed !important;
  background: $navigation-bar-color;
  bottom: 0;
  z-index: 1;
  width: 100%;
  padding: 0 0 0 $micro-unit;
  box-shadow: $up-only-box-shadow;
  display: grid;
  grid-template-columns: auto 64px;
  align-items: center;
  justify-content: stretch;

  $size: 2 * $medium-unit;

  img {
    width: $size;
    min-width: $size;
    height: $size;
    min-height: $size;
    object-position: center;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: $default-box-shadow;
  }

  aside {
    i {
      cursor: pointer;
      display: grid;
      align-items: center;
      justify-content: center;
      height: 120px;
      width: 64px;
    }
  }
}
</style>
