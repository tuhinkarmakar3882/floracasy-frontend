<template>
  <blockquote
    v-ripple="`${ticket.color}5F`"
    class="px-3 py-3"
    :style="{ borderLeftColor: ticket.color }"
  >
    <h6 class="name my-0">{{ ticket.title }}</h6>
    <p class="mt-2 mb-3" :style="{ color: ticket.color, fontWeight: 500 }">
      {{ ticket.status }}
    </p>
    <p class="body">{{ ticket.issue.substr(0, 50) }}...</p>
    <section class="text-right">
      <small>{{ parseTimeUsingMoment(ticket.updatedAt) }}</small>
    </section>
  </blockquote>
</template>

<script>
import { parseTimeUsingMoment } from '@/utils/utility'

export default {
  name: 'TicketCard',
  props: {
    ticket: {
      type: Object,
      required: true,
    },
  },
  methods: {
    parseTimeUsingMoment,
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

blockquote {
  text-align: center;

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

  i {
    font-size: clamp(20px, 8vw, 28px);
    color: #3a3a3a;
  }
}
</style>
