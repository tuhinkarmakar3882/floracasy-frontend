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
          <h4 class="heading-title">How to earn by writing</h4>

          <section>
            <KeyPoint
              class="my-4"
              point="You can easily earn by writing blogs. You can earn a good amount
              of money by being consistent as a writer."
              tick-color="#6DD0BF"
              :tick-size="20"
            />
            <KeyPoint
              class="my-4"
              point="Your earnings will be depend on your Blog engagement"
              tick-color="#6DD0BF"
              :tick-size="20"
            />
            <KeyPoint
              class="my-4"
              point="Consistency is the main policy to be a famous blogger"
              tick-color="#6DD0BF"
              :tick-size="20"
            />
          </section>

          <section class="my-4">
            <h4 class="heading-title">Great Heading</h4>
            <p class="text-justify">
              One can earn $100 to $1000 in a month. we don&#39;t promise that
              every writer can earn that much but yes some of our use can if
              they give their best performance in a consistent way. So don&#39;t
              further a do , start writing now &amp; earn independently. If you
              already been a writer then wish a best of luck so that you can
              continue your writing &amp; earning.
            </p>
          </section>

          <section class="my-4">
            <h4 class="heading-title">Great Heading</h4>
            <p class="text-justify">
              we create an amazing hassle free environment so that you can write
              freely &amp; earn easily. You don&#39;t need to do any complex
              things . Just earn write freely &amp; earn easily.
            </p>
          </section>

          <section class="my-4">
            <h4 class="heading-title">Great Heading</h4>
            <p class="text-justify">
              To get paymen all you need to do is . First verify your mobile
              number &amp; add your a/c details where your earned maney will be
              transferred. But first you need to earn $100 essentially otherwise
              you can&#39;t claim your money.
            </p>
          </section>

          <section class="my-4">
            <h4 class="heading-title">Great Heading</h4>
            <p class="text-justify">
              You can&#39;t write any sexual or bad content . otherwise you will
              be blocked by floracasy team. If you will do any violence then you
              can also get blocked. If you broke our roule then your account
              will be blocked by floracasy team.
            </p>
          </section>
        </div>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import KeyPoint from '@/components/global/KeyPoint'

export default {
  name: 'Earning',
  components: { KeyPoint, AppFeel },
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
