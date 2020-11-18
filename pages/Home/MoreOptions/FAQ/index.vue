<template>
  <AppFeel
    class="preferences-page"
    :on-back="navigationRoutes.Home.MoreOptions.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }} </template>

    <template slot="main">
      <div class="px-4">
        <h3>How to earn from floracasy?</h3>
        <p>
          There are mainly 3 ways to earn from floracasy. One is earn by writing
          blogs, second one is earn by sharing &amp; third one is win prizes on
          our weekly challenges.
        </p>
        <h2>Earn by writing blogs:-</h2>
        <p>
          If you have a good writing skill &amp; want to start your career by
          content writing then you are at right place. one can earn 5k to 50k
          easily in an month by writing contents.
        </p>
        <h2>Earn by sharing :-</h2>
        <p>
          We are the 1st website who offers you earn via sharing . My be it's
          the simplest way of earn. You few simple steps to do, 1st share your
          blogs with you family, friends, neatest people &amp; earn a good
          amount of money ðŸ¤‘ðŸ’°.
        </p>
        <h3>Earn by winning weekly challenges:-</h3>
        <p>
          In floracasy , we try our best that users can earn as much as possible
          so that we organise a weekly content writing competitio&amp; give
          exciting price money to winner's.
        </p>
        <h3>How to follow someone?</h3>
        <p>
          One user can easily follow other by pressing "follow" button . you can
          see a "follow" button on any user's profile.
        </p>
        <h3>How to see your payments ?</h3>
        <p>
          A user can only see his/her payment details. They can easily go to
          their payment page by pressing "payment" button which can found in
          profile page Or one can go to more action from navigation and click on
          payments . you can see your payment insight view &amp; fill you
          payment details to get payment.
        </p>
        <h3>Why should one follow a blogger ?</h3>
        <p>
          If one follow a blogger then he/she can easily get update whenever
          that particular blogger update a blog. If you are blogger then you can
          also follow others to get their best update.
        </p>
        <h3>How can one send massage to others?</h3>
        <p>
          As we all know messaging is the best way to communicate so in this
          case user can communicate with each other. To send message you can
          just press message found in every user's profile &amp; start
          conversation. you can also access you chats from upper right corner's
          chat room.
        </p>
        <h3>How to share your blogs to other?</h3>
        <p>
          one can easily share their blogs from home page , by pressing "share"
          option which is visible in a row contaning like , comment , share..
          just below the blog .
        </p>
        <h3>How to like someone's blog?</h3>
        <p>
          one can easily like other's blog , by pressing "like icon" option
          which is visible in a row contaning like , comment , share.. just
          below the blog .
        </p>
        <h3>How to comment on other's blog?</h3>
        <p>
          One can easily comment in any blog . To add a comment press the
          "comments icon" &amp; you can see a text area open just below ,type
          your comment there &amp; simply tap on add . You comment will be added
          generally.
        </p>
        <h3>What is the function of Help &amp; support?</h3>
        <p>
          Help &amp; Support mainly a communication are with Floracasy team. You
          can share you any doubt, any difficulties. We are ready to help you
          24×7. Go and check out help &amp; support, you may found many
          different solution of your problem.
        </p>
        <h3>How to edit User profile?</h3>
        <p>
          To edit profile go on "More option" from bottom navigation bar &amp;
          you may see Edit profile option .Click on that &amp; simply change
          your display picture; about; designation.
        </p>
        <p><a href="#"> How to create a blog </a></p>
      </div>
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
