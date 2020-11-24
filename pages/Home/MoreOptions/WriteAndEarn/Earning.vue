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
        <div>
          <h4>How to earn by writing</h4>

          <ul>
            <li>
              You can easily earn by writing blogs. You can earn a good amount
              of money by being consistent as a writer.
            </li>

            <li>your earnings will be depend on your Blog engagement</li>

            <li>Consistency is the main policy to be a famous blogger</li>
          </ul>

          <h5>
            One can earn $100 to $1000 in a month. we don&#39;t promise that
            every writer can earn that much but yes some of our use can if they
            give their best performance in a consistent way. So don&#39;t
            further a do , start writing now &amp; earn independently. If you
            already been a writer then wish a best of luck so that you can
            continue your writing &amp; earning.
          </h5>

          <h5>
            we create an amazing hassle free environment so that you can write
            freely &amp; earn easily. You don&#39;t need to do any complex
            things . Just earn write freely &amp; earn easily.
          </h5>

          <h5>
            To get paymen all you need to do is . First verify your mobile
            number &amp; add your a/c details where your earned maney will be
            transferred. But first you need to earn $100 essentially otherwise
            you can&#39;t claim your money.
          </h5>

          <h5>
            You can&#39;t write any sexual or bad content . otherwise you will
            be blocked by floracasy team. If you will do any violence then you
            can also get blocked. If you broke our roule then your account will
            be blocked by floracasy team.
          </h5>
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
    }
  },
}
</script>
