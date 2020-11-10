<template>
  <AppFeel
    class="earning-page"
    :on-back="navigationRoutes.Home.MoreOptions.WriteAndEarn"
  >
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main">
      <main class="px-4 my-4">
        <div class="why write">
          <h3>Why write with us & how to earn by writing</h3>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur dolore, explicabo incidunt libero mollitia neque
            possimus sapiente sit tenetur! Accusamus aut error facilis fugiat
            harum incidunt inventore neque quae veniam.
          </p>
        </div>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
export default {
  name: 'Earning',
  components: { AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Earn By Writing',
      options: [
        {
          name: 'How to Write',
          icon: 'mdi mdi-pencil',
          color: '#f5a049',
          route: '/Home/MoreOptions/WriteAndEarn/HowToWrite',
        },
        {
          name: 'Earn By Writing',
          icon: 'mdi mdi-currency-usd',
          color: '#4fca4f',
          route: '/Home/MoreOptions/WriteAndEarn',
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
