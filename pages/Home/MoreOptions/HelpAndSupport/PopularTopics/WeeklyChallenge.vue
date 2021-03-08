<template>
  <AppFeel
    :on-back="
      navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics.index
    "
    class="weekly-challenge-topic-page"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="px-4">
        <article class="my-4 text-center">
          <h3 class="heading-title">What is our weekly challenge!</h3>
          <p>
            We will try our best to give exciting features to our users. So
            basically we thought what new we can do for our users ! a out come
            of our thoughts is &quot;weekly challenge &quot; or you may called
            it &quot; weekly content writing competition&quot;. But you, our
            valuable users need to decide is it a great endeavour or not! only
            you folks can make our assiduity best by participating &amp; win
            exciting prizes.
          </p>
          <img
            alt="showing some photos of challenges"
            src="https://picsum.photos/156"
          />
        </article>

        <article class="my-4 text-center">
          <h3 class="heading-title">What makes it so exciting?</h3>
          <p>
            Mainly this is a content writing competition. users can enroll their
            name in this competition. They can show their commands on content
            writing. Given a few topics to write , competitors who won these
            competition won new &amp; exciting prizes.
          </p>
        </article>

        <article class="my-4 text-center">
          <h3 class="heading-title">How to claim your winning prizes</h3>
          <p>
            one who already won this competition can claim their money by
            submitting their details on a form given by floracasy team. when one
            comes to enroll his/her name for the competition he/she needs to
            give a valid phone number so that we can contact further &amp;
            deliver their prizes &amp; certificate
          </p>
        </article>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { usePopularTopics } from '~/environmentVariables'

export default {
  name: 'WeeklyChallenge',
  middleware: usePopularTopics ? 'isAuthenticated' : 'hidden',
  data() {
    return {
      pageTitle: 'Weekly Challenge',
      navigationRoutes,
    }
  },
  mounted() {},
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
