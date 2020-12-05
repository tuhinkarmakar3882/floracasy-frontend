<template>
  <blockquote
    v-ripple="`${ticket.color}5F`"
    class="px-4 py-3 my-8"
    :style="{ borderLeftColor: ticket.color }"
  >
    <span :class="ticket.icon" class="icon" :style="{ color: ticket.color }" />
    <p class="ticket-name">{{ ticket.name }}</p>
    <i class="mdi mdi-chevron-right arrow-go" />
  </blockquote>
</template>

<script>
export default {
  name: 'TicketCard',
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
