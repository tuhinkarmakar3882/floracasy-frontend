<template>
  <div class="count-down-timer">
    <section class="hour">
      <h3>{{ hours }}</h3>
      <p>Hours</p>
    </section>

    <section class="minute">
      <h3>{{ minutes }}</h3>
      <p>Minutes</p>
    </section>

    <section class="seconds">
      <h3>{{ seconds }}</h3>
      <p>Seconds</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CountDownTimer',
  props: {
    targetTime: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    currentTime: Date.now(),
    interval: undefined,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }),

  computed: {
    difference() {
      const timeDifference = Math.floor(
        (this.targetTime - this.currentTime) / 1000
      )
      return timeDifference > 0 ? timeDifference : 0
    },
  },

  mounted() {
    this.interval = setInterval(() => {
      this.currentTime = Date.now()
      this.seconds = (this.difference % 60).toString().padStart(2, '0')
      const minutes = Math.floor(this.difference / 60)
      this.hours = Math.floor(minutes / 60)
        .toString()
        .padStart(2, '0')
      this.minutes = (minutes % 60).toString().padStart(2, '0')
    }, 1000)
  },
  beforeDestroy() {
    this.interval && clearInterval(this.interval)
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.count-down-timer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
  width: 100%;

  section {
    background: $card-bg-alternate;
    padding: 1rem;
    min-width: 100px;
    margin: $micro-unit;
    box-shadow: $default-box-shadow;
    border-radius: $micro-unit;

    h3 {
      margin: 0;
    }
  }
}
</style>
