<template>
  <div class="message-page mb-6">
    <section class="message-thread-list">
      <div
        v-for="(messageThread, index) in messageThreads"
        :key="index"
        v-ripple=""
        class="message-thread px-4 py-8"
      >
        <img :src="messageThread.image" :alt="messageThread.name" />
        <section class="">
          <p class="name">{{ messageThread.name.substr(0, 17) }}</p>
          <p class="message-body mb-3">
            {{ messageThread.body.substr(0, 50) }}
          </p>
          <small class="time-stamp">
            <span class="mdi mdi-clock-time-nine-outline" />
            {{ parse(messageThread.updatedAt) }}
          </small>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import utility from '@/utils/utility'

export default {
  name: 'Messages',
  middleware: 'isAuthenticated',
  layout: 'MobileApp',

  data() {
    return {
      pageTitle: 'Messages',
      parse: utility.parseTimeUsingMoment,
      messageThreads: [
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Alice Milli',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
        {
          name: 'Larrisa Cheverson',
          updatedAt: '2020-11-18T18:28:08.798261+05:30',
          image:
            'https://images.unsplash.com/photo-1521117177129-ca6b2e68cb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=2190&q=80',
          body:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad corporis cupiditate error illo ipsam ipsum iure minus molestias nobis nostrum nulla provident, quae quisquam rerum tempora. Blanditiis, ipsam?',
        },
      ],
    }
  },

  async mounted() {
    await this.$store.dispatch('BottomNavigation/update', { linkPosition: -1 })
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

$image-size: 84px;

.message-page {
  .message-thread {
    display: grid;
    grid-column-gap: $large-unit;
    grid-template-columns: $image-size auto;
    align-items: center;

    img {
      width: $image-size;
      height: $image-size;
      object-fit: cover;
      object-position: center;
      border-radius: 50%;
      box-shadow: $default-box-shadow;
    }

    .name {
      color: #ededed;
      font-family: $Prata;
      font-size: 22px;
    }

    .message-body {
      font-size: 15px;
    }

    .time-stamp {
      font-size: 13px;
      display: flex;
      align-items: center;
      color: darken($muted, $lighten-percentage);
      text-transform: capitalize;
    }

    &:nth-child(even) {
      background-color: #08081f;
    }
  }
}
</style>
