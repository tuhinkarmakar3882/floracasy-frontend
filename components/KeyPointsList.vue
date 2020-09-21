<template>
  <ul>
    <li v-for="point in points">
      <Tick :tickColor="tickColor" :tickSize="tickSize"/>
      {{ point }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "KeyPoints",
  props: {
    tickColor: {
      type: String,
      required: true
    },
    tickSize: {
      type: Number,
      required: true
    },
    points: {
      type: Array,
      required: true
    },
  },
  components: {
    Tick: () => import('@/components/Tick')
  }
}
</script>

<style lang="scss" scoped>

ul {
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 300;
    margin: 12px 0;
  }
}

</style>
