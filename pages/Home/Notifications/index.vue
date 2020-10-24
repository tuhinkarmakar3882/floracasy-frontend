<template>
  <div class="notification-page my-6 px-4">
    <p class="text-right success">Mark all as read</p>
    <section v-for="(notification, index) in notifications" :key="index">
      <h1 :class="`mdi ${notification.icon}`" />
      <p>{{ notification.content }} {{ index }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Notifications',
  layout: 'MobileApp',
  middleware: 'protectedRoute',
  data() {
    return {
      notifications: [
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 0,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },

        {
          id: 1,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 2,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
        {
          id: 3,
          icon: 'mdi mdi-bell-outline',
          type: 'info',
          content: 'This is a sample notification',
          timestamp: Date.now(),
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 3 })
  },
}
</script>

<style lang="scss" scoped>
.notification-page {
  section {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-column-gap: 1rem;
    place-items: center;
  }
}
</style>
