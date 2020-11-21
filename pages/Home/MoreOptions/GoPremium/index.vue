<template>
  <AppFeel
    class="go-premium-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main" class="my-4">
      <section v-for="pack in premiumPacks" :key="pack.id" class="px-4">
        <div :class="pack.class">
          <h3 class="heading-title">{{ pack.title }}</h3>
          <p>{{ pack.details }}</p>
          <ul>
            <li v-for="point in pack.points" :key="point.id">
              <KeyPoint
                :tick-color="point.color"
                :tick-size="point.size"
                :point="point.text"
              />
            </li>
          </ul>
          <div class="text-center my-4">
            <button :class="pack.buttonClass">{{ pack.buttonText }}</button>
          </div>
        </div>
        <hr class="mt-8" />
      </section>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import KeyPoint from '@/components/common/KeyPoint'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'GoPremium',
  components: { KeyPoint, AppFeel },
  data() {
    return {
      pageTitle: 'Go Premium',
      premiumPacks: [
        {
          id: 0,
          class: 'eco-pack',
          title: 'Eco Pack',
          details:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque, debitis delectus dolorem dolores eius eos esse eum, facilis fuga nemo non obcaecati odio quasi, quidem recusandae sapiente vitae voluptatibus.',
          points: [
            {
              id: 0,
              color: '#ff00ff',
              size: 24,
              text: 'This is a 1st Point for Eco Pack',
            },
            {
              id: 1,
              color: '#ff00ff',
              size: 24,
              text: 'This is a 2nd Point for Eco Pack',
            },
          ],
          buttonClass: 'primary-btn',
          buttonText: 'Join Eco Pack',
        },
        {
          id: 1,
          class: 'gold-pack',
          title: 'Gold Pack',
          details:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque, debitis delectus dolorem dolores eius eos esse eum, facilis fuga nemo non obcaecati odio quasi, quidem recusandae sapiente vitae voluptatibus.',
          points: [
            {
              id: 0,
              color: '#ffff00',
              size: 24,
              text: 'This is a 1st Point for Gold Pack',
            },
            {
              id: 1,
              color: '#ffff00',
              size: 24,
              text: 'This is a 2nd Point for Gold Pack',
            },
          ],
          buttonClass: 'success-btn',
          buttonText: 'Join Gold Pack',
        },
        {
          id: 2,
          class: 'platinum-pack',
          title: 'Premium Pack',
          details:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium atque, debitis delectus dolorem dolores eius eos esse eum, facilis fuga nemo non obcaecati odio quasi, quidem recusandae sapiente vitae voluptatibus.',
          points: [
            {
              id: 0,
              color: '#6DD0BF',
              size: 24,
              text: 'This is a 1st Point for Premium Pack',
            },
            {
              id: 1,
              color: '#6DD0BF',
              size: 24,
              text: 'This is a 2nd Point for Premium Pack',
            },
          ],
          buttonClass: 'secondary-btn',
          buttonText: 'Join Premium Pack',
        },
      ],
      navigationRoutes,
    }
  },
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
.go-premium-page {
  main {
    button {
      min-width: auto;
    }

    ul {
      list-style: none;

      li {
        padding: 1rem 0;
      }
    }
  }
}
</style>
