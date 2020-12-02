<template>
  <section class="carousel">
    <article
      v-for="(item, index) in carouselItems"
      :key="index"
      class="item"
      :style="{
        background: 'url(' + item.image + ') no-repeat center',
        backgroundSize: 'cover',
        boxShadow: '0 0 0 100vw rgba(0, 0, 0, 0.6) inset',
        color: 'white',
      }"
    >
      <h3>{{ item.name }}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit at blanditiis.
      </p>
      <button
        v-ripple=""
        class="primary-btn"
        style="min-width: auto"
        @click="sendNotification"
      >
        Go Now
      </button>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    carouselItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async sendNotification() {
      const notificationOptions = {
        body: 'Lorem Ipsum Dolor Sit Amet...',
        icon: '/icon.png',
        image: '/icon.png',
        vibrate: [300, 100, 400, 100, 400, 100, 400],
      }

      if (!('Notification' in window)) {
        alert('This browser does not support desktop notification')
      } else if (Notification.permission === 'granted') {
        const notification = new Notification('Hi there!', notificationOptions)
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'This is a Test Notification',
          notificationType: 'info',
          dismissible: true,
        })
      } else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission()
        if (permission === 'granted') {
          const notification = new Notification(
            'Hi there!',
            notificationOptions
          )
          await this.$store.dispatch('SocketHandler/updateSocketMessage', {
            message: 'This is a Test Notification',
            notificationType: 'info',
            dismissible: true,
          })
        }
      } else {
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: "Can't Create Notification",
          notificationType: 'warning',
          dismissible: true,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.carousel {
  display: flex;
  align-items: center;
  text-align: center;
  overflow: auto !important;
  scroll-snap-type: x mandatory;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  height: 250px;

  article {
    padding: 0 1rem;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    transform-origin: center center;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 100px;

    * {
      z-index: 1;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(black, 0.4);
      content: '';
      z-index: 0;
      backdrop-filter: blur(1px);
    }
  }
}
</style>
