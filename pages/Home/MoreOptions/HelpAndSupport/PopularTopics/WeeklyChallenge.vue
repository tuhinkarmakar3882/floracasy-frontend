<template>
  <AppFeel
    class="weekly-challenge-topic-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <h3>What is our weekly challenge!</h3>

      <h5>
        We will try our best to give exciting features to our users. So
        basically we thought what new we can do for our users ! a out come of
        our thoughts is &quot;weekly challange&quot; or you may called it
        &quot;weekly content writing competition&quot;. But you, our valuable
        users need to decide is it a great endeavour or not! only you folks can
        make our assiduity best by perticipating &amp; win exciting prizes.
      </h5>

      <img
        src="https://picsum.photos/156"
        alt="showing some photos of challenges"
      />

      <h3>What makes it so exciting?</h3>

      <h5>
        Mainly this is a content writing competition. users can enroll their
        name in this competition. They can show their commands on content
        writing. Given a few topics to write , competitors who won these
        competition won new &amp; exciting prizes.
      </h5>

      <h3>How to claim your winning prizes</h3>

      <h5>
        one who already won this competition can claim their money by submitting
        their details on a form given by floracasy team. when one comes to
        enroll his/her name for the competition he/she needs to give a valid
        phone number so that we can contact further &amp; deliver their prizes
        &amp; certificate
      </h5>

      <label> enter your name </label>
      <input type="text" />
      <button>shout out</button>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '~/components/global/Layout/AppFeel'
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'WeeklyChallenge',
  middleware: 'isAuthenticated',
  components: { AppFeel },
  data() {
    return {
      pageTitle: 'Weekly Challenge',
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
