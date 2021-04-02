<template>
  <div v-if="statisticsItem" class="stats text-center">
    <section class="item">
      <span class="number">{{ statisticsItem['totalBlogs'] }}</span>
      <p class="type">Blogs</p>
    </section>
    <section class="item">
      <span class="number">{{
        statisticsItem.peopleSharedMyBlogs + statisticsItem.peopleLikedMyBlogs
      }}</span>
      <p class="type">Engagements</p>
    </section>
    <section class="item">
      <span class="number">{{ statisticsItem['totalFollowers'] }}</span>
      <p class="type">Followers</p>
    </section>
  </div>

  <aside v-else class="text-center my-8">
    <LoadingIcon class="mb-6" />
    <p>Loading Profile Data...</p>
  </aside>
</template>
<script>
export default {
  name: 'UserStatistics',
  props: {
    statisticsItem: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'assets/all-variables';
.basic-data {
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

.stats {
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-around;
  align-items: center;
  font-family: $Nunito-Sans;

  .item {
    p {
      margin: 0;
    }
  }
}
</style>
