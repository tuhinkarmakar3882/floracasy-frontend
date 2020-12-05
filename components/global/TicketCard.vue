<template>
  <blockquote
    v-ripple="`${ticket.color}5F`"
    class="px-4 py-3 my-8"
    :style="{ borderLeftColor: ticket.color }"
  >
    <h6 class="name">{{ ticket.name }}</h6>
    <p class="body">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus ad
      dolorem dolores, eius id ipsam iure magnam modi pariatur possimus qui quis
      quo recusandae reiciendis repellendus rerum sed voluptatum?
    </p>
    <section class="bottom">
      <small> <i class="mdi mdi-clock-time-nine-outline" />3 days ago </small>
      <Chip :background-color="ticket.color">
        <template slot="content">{{ ticket.status }}</template>
      </Chip>
    </section>
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
  text-align: left;

  span {
    font-size: clamp(1.6rem, 8vw, 2rem);
  }

  .name {
    color: #dadada;
    font-size: 1rem;
    width: 100%;
  }

  .body {
    color: #959595;
    font-size: 0.9rem;
    width: 100%;
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    small {
      display: grid;
      place-items: center;
    }
  }

  i {
    font-size: clamp(20px, 8vw, 28px);
    color: #3a3a3a;
  }
}
</style>
