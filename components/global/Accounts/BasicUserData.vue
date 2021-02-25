<template>
  <section class="basic-user-data">
    <img
      :src="user.photoURL"
      alt="profile-picture"
      class="picture"
      height="100"
      width="100"
    />
    <div class="basic-details">
      <p class="name">{{ user.displayName }}</p>
      <p v-if="user.designation" class="designation">
        <em>{{ user.designation }}</em>
      </p>
    </div>
  </section>
</template>
<script>
export default {
  name: 'BasicUserData',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.basic-user-data {
  display: grid;
  grid-template-columns: 1fr 2fr;
  place-items: center;
  position: relative;
  z-index: 2;

  .picture {
    max-width: 100px;
    max-height: 100px;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }

  .basic-details {
    .name {
      font-size: 24px;
      font-family: $Prata;
      color: white;
      margin-bottom: 12px;
      margin-top: 0;
    }

    .designation {
      margin: 0 0 9px;
      color: #00bcd4;
    }
  }
}
</style>
