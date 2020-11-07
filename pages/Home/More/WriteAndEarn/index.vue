<template>
  <AppFeel class="write-and-earn-page">
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main">
      <main class="my-2">
        <ul>
          <li
            v-for="(option, index) in options"
            :key="index"
            v-ripple="`${option.color}5F`"
            class="px-4 py-2"
            @click="$router.push(option.route)"
          >
            <p>
              <span
                class="icon"
                :class="option.icon"
                :style="{ color: option.color }"
              />
              <span class="option-name">{{ option.name }}</span>
              <span class="mdi mdi-chevron-right arrow-go" />
            </p>
          </li>
        </ul>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'

export default {
  name: 'WriteAndEarn',
  components: { AppFeel },
  data() {
    return {
      pageTitle: 'Write And Earn',
      options: [
        {
          name: 'How to Write',
          icon: 'mdi mdi-pencil-circle-outline',
          color: '#6DD0BF',
          route: '/Home/More/WriteAndEarn/HowToWrite',
        },
        {
          name: 'Earn By Writing',
          icon: 'mdi mdi-currency-usd',
          color: '#4fca4f',
          route: '/Home/More/WriteAndEarn/Earning',
        },
      ],
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          // hid: 'description',
          // name: 'description',
          // content: 'My custom description',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.write-and-earn-page {
  main {
    ul {
      list-style: none;

      li {
        p {
          display: grid;
          grid-template-columns: 1fr 4fr 0.5fr;
          grid-column-gap: 1rem;
          place-items: center;
          text-align: left;

          .icon {
            font-size: clamp(1.6rem, 8vw, 2rem);
          }

          .option-name {
            color: lighten($body-text-default, $lighten-percentage);
            font-size: clamp(1.1rem, 8vw, 1.2rem);
            width: 100%;
          }

          .arrow-go {
            font-size: clamp(20px, 8vw, 28px);
            color: #3a3a3a;
          }
        }
      }
    }
  }
}
</style>
