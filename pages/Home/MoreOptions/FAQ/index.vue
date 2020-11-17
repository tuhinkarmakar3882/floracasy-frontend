<template>
  <AppFeel
    class="preferences-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }} </template>

    <template slot="main">
      <h3 class="heading-title">Frequently Ask Questions</h3>

      <section v-for="(question, index) in questions" :key="index">
        <h4>{{ question.title }}</h4>
        <p>
          {{ question.answer }}
        </p>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
// import CustomListView from '@/components/Layout/CustomListView'
export default {
  name: 'FAQ',
  components: { AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'FAQ',
      questions: [
        {
          title: 'How To Get paid ?',
          answer: `Hello everyone..Welcome to our community . By sign in you already been
          a floracasian. So website we give an opportunity to earn money with
          out any hassle. Now earn independently by just write a blog .`,
        },

        {
          title: 'Earn By write a Blog',
          answer: `Its probably the most simplest method of earning . You just write a
          blog ,on the basic of engagement of your blogs you earn money. If you
          don't know how to write a blog you can go and easily check out our
          guide so that you can easily start earning by writing blogs. One can
          easily earn 5k to 50k per month without any hassle. You just create
          your account & start creating blogs. By adding attractive content
          enhance you blog engagement. Share`,
        },
      ],
    }
  },

  head() {
    return {
      navigationRoutes,
      title: this.pageTitle,
    }
  },
}
</script>
