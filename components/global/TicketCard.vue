<template>
  <blockquote
    v-ripple="`${ticket.color}5F`"
    class="px-4 py-3 my-8"
    :style="{ borderLeftColor: ticket.color }"
  >
    <p class="name">{{ ticket.name }}</p>
    <p class="body">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus ad
      dolorem dolores, eius id ipsam iure magnam modi pariatur possimus qui quis
      quo recusandae reiciendis repellendus rerum sed voluptatum?
    </p>
    <small><i class="mdi mdi-home" />3d</small>
    <Chip :background-color="ticket.color">
      <template slot="content">{{ ticket.status }}</template>
    </Chip>
  </blockquote>
</template>

<script>
import Chip from '@/components/global/Chip'
export default {
  name: 'TicketCard',
  components: { Chip },
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

blockquote {
  display: grid;
  grid-template-columns: 0.5fr 4fr 0.5fr;
  grid-column-gap: 1rem;
  align-items: center;
  text-align: left;

  span {
    font-size: clamp(1.6rem, 8vw, 2rem);
  }

  p {
    color: lighten($body-text-default, $lighten-percentage);
    font-size: 1rem;
    width: 100%;
  }

  i {
    font-size: clamp(20px, 8vw, 28px);
    color: #3a3a3a;
  }
}
</style>
