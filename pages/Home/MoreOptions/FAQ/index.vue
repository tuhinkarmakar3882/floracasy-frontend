<template>
  <AppFeel
    class="faq-page"
    auto-hide
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <QuestionCard
        v-for="(question, index) in questions"
        :key="index"
        class="px-4"
        :content="question"
        :show-default-feedback="true"
      />
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import QuestionCard from '~/pages/Home/MoreOptions/FAQ/QuestionCard'

export default {
  name: 'FAQ',
  middleware: 'isAuthenticated',
  components: { QuestionCard, AppFeel },
  data() {
    return {
      navigationRoutes,
      pageTitle: 'FAQ',
      questions: [
        {
          statement: `How to earn from floracasy?`,
          answer: `There are mainly 3 ways to earn from floracasy. One is earn by
              writing blogs, second one is earn by sharing & third one is
              win prizes on our weekly challenges.`,
        },
        {
          statement: `Earn by writing blogs:-`,
          answer: `If you have a good writing skill & want to start your career
              by content writing then you are at right place. one can earn 5k to
              50k easily in an month by writing contents.`,
        },
        {
          statement: `Earn by sharing :-`,
          answer: `We are the 1st website who offers you earn via sharing . My be
              it's the simplest way of earn. You few simple steps to do, 1st
              share your blogs with you family, friends, neatest people &
              earn a good amount of money`,
        },
        {
          statement: `Earn by winning weekly challenges:-`,
          answer: `In floracasy , we try our best that users can earn as much as
              possible so that we organise a weekly content writing
              competition & give exciting price money to winners.`,
        },
        {
          statement: `How to follow someone?`,
          answer: `One user can easily follow other by pressing "follow" button . you
              can see a "follow" button on any user's profile.`,
        },
        {
          statement: `How to see your payments?`,
          answer: `A user can only see his/her payment details. They can easily go to
              their payment page by pressing "payment" button which can found in
              profile page Or one can go to more action from navigation and
              click on payments . you can see your payment insight view &
              fill you payment details to get payment.`,
        },
        {
          statement: `Why should one follow a blogger?`,
          answer: `If one follow a blogger then he/she can easily get update whenever
              that particular blogger update a blog. If you are blogger then you
              can also follow others to get their best update.`,
        },
        {
          statement: `How can one send massage to others?`,
          answer: `As we all know messaging is the best way to communicate so in this
              case user can communicate with each other. To send message you can
              just press message found in every user's profile & start
              conversation. you can also access you chats from upper right
              corner's chat room.`,
        },
        {
          statement: `How to share your blogs to other?`,
          answer: `One can easily share their blogs from home page , by pressing
              "share" option which is visible in a row containing like , comment
              , share.. just below the blog .`,
        },
        {
          statement: `How to like someone's blog?`,
          answer: `One can easily share their blogs from home page , by pressing
              "share" option which is visible in a row containing like , comment
              , share.. just below the blog.`,
        },
        {
          statement: `How to comment on other's blog?`,
          answer: `One can easily comment in any blog. To add a comment press the
              "comments icon" & you can see a text area open just below,
              type your comment there & simply tap on add . You comment
              will be added generally.`,
        },
        {
          statement: `What is the function of Help & support?`,
          answer: `Help & Support mainly a communication are with Floracasy team.
              You can share you any doubt, any difficulties. We are ready to
              help you 24×7. Go and check out help & support, you may found
              many different solution of your problem.`,
        },
        {
          statement: `How to edit User profile?`,
          answer: `To edit profile go on "More option" from bottom navigation bar &
              you may see Edit profile option .Click on that & simply change
              your display picture; about; designation.`,
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
