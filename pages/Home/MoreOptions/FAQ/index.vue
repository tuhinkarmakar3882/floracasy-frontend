<template>
  <div :on-back="navigationRoutes.Home.MoreOptions.index" class="faq-page">
    <AppBarHeader
      :fallback-page="fallbackPage"
      :previous-page="previousPage"
      no-right-padding
    >
      <template #title>{{ pageTitle }}</template>
      <template #action-button>
        <i
          v-ripple
          class="mdi mdi-segment"
          @click="drawerIsOpened = !drawerIsOpened"
        />
      </template>
    </AppBarHeader>

    <main>
      <section v-for="(question, index) in questions" :key="question.statement">
        <QuestionCard
          :id="question.statement"
          :content="question"
          :show-default-feedback="true"
          border-shade="#364075"
          class="px-4"
        />

        <InFeedAd v-if="index % 2" use-small-ads />
      </section>
    </main>

    <footer>
      <CustomListView
        :style="
          drawerIsOpened
            ? {
                width: `clamp(250px, 50%, 350px)`,
                transform: 'translateX(0)',
                overflow: 'scroll',
              }
            : {
                width: `clamp(250px, 50%, 350px)`,
                transform: 'translateX(100%)',
                overflow: 'hidden',
              }
        "
        class="nav-drawer"
      >
        <template slot="list-items">
          <li
            v-for="(question, index) in questions"
            :key="index"
            v-ripple
            class="py-4 px-4"
            @click="drawerIsOpened = false"
          >
            <a
              :href="`#${question.statement}`"
              class="no-underline secondary-matte"
            >
              {{ question.statement }}
            </a>
          </li>
        </template>
      </CustomListView>
    </footer>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import AppBarHeader from '~/components/Layout/AppBarHeader'
import QuestionCard from '~/components/Cards/QuestionCard'
import InFeedAd from '~/components/Common/GoogleAdsense/InFeedAd'
import CustomListView from '~/components/Layout/CustomListView'

export default {
  name: 'FAQ',
  components: { CustomListView, InFeedAd, QuestionCard, AppBarHeader },
  middleware: 'isAuthenticated',

  asyncData({ from: previousPage }) {
    return { previousPage }
  },

  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.MoreOptions.index,
      drawerIsOpened: false,
      navigationRoutes,
      pageTitle: 'FAQ',
      questions: [
        {
          id: 101,
          statement: `What is floracasy?`,
          answer: `Floracasy is a platform, built by Two Individuals - One Developer & One UI/UX.
            The Idea was to create a Lightweight Socio-Blogging Platform where people can get self employed &
            Earn while, learning & communicating.
            `,
        },
        {
          id: 102,
          statement: `How to Earn on Floracasy?`,
          answer: `Earning can be simply done by just writing down decent & engaging Blogs. With decent writing
            skills, it's very easy to earn ample amount of money.`,
        },
        {
          id: 103,
          statement: `How can I improve my earning?`,
          answer: `Simple steps can do a lot here. Try sharing your blogs with you family & friends. Try maintaining a
            consistency in writing. Try engaging with your audience by utilizing the Community Section. May be increase
            the followers?`,
        },
        {
          id: 104,
          statement: `When can I redeem the amount?`,
          answer: `Once you hit the minimum threshold, you can claim the amount. It'll be transferred post your identity
            verification.`,
        },
        {
          id: 105,
          statement: `How to see my earnings?`,
          answer: `You can see your earning details by going to the payment page by pressing "payment" button (which
            can found in profile page) or you can go to "More Options" from the navigation and click on payments.
            There you'll be shown your earnings.`,
        },
        {
          id: 106,
          statement: `How can I follow someone?`,
          answer: `You can follow someone by tapping on the "follow" button, which is available in their profile.`,
        },
        {
          id: 107,
          statement: `How do I share my blogs?`,
          answer: `One can easily share their blogs from either the "Home" page or their account details page,
            by pressing "Share" option which is visible in a row containing like, comment, share
            (just below the blog).`,
        },
        {
          id: 108,
          statement: `Can I Message Someone in Floracasy?`,
          answer: `Yes, we are working to roll out a secure & privacy focused ad-free messaging experience, very soon
            in the near future.`,
        },
        {
          id: 109,
          statement: `How to like/unlike a blog?`,
          answer: `You can hit like/unlike a blog by pressing "HEART SYMBOL" option which is visible in a row below the
            blog.`,
        },
        {
          id: 110,
          statement: `How to comment on a post or a blog?`,
          answer: `To add a comment press the "comments" icon & type your comments in the textbox. Then simply tap on
            send. You comment will be added generally.`,
        },
        {
          id: 111,
          statement: `What is Help & support?`,
          answer: `Help & Support is mainly a communication section with the Floracasy team. You can share your
            questions or any difficulties faced or any bug or feature request or report unsuitable content. We are
            there to help you out in a best possible manner based on that scenario.`,
        },
        {
          id: 112,
          statement: `How to edit your profile?`,
          answer: `To edit your profile go on "More option" from bottom navigation bar &
              tap on Preferences -> Edit profile. Then change whatever you want to change.`,
        },
        {
          id: 113,
          statement: `What is Refer and Earn?`,
          answer: `It is an opportunity where you can earn Flora coins to unlock some
            premium features in the platform such as messaging, audio blogs,
            etc.`,
        },
        {
          id: 114,
          statement: `What is Floracoins?`,
          answer: `It is a virtual currency that can be used within the platform to
            unlock premium features`,
        },
        {
          id: 115,
          statement: `Can I use multiple referral code?`,
          answer: `No, every user gets one referral code and can redeem it by sharing
            and inviting others to the platform`,
        },
        {
          id: 116,
          statement: `Can I use Floracoins to redeem real money?`,
          answer: `Not yet. For now, you can use it to unlock premium features in the platform.`,
        },
        {
          id: 117,
          statement: `How many users can I invite with the referral code?`,
          answer: `As much as you want there is no limit.`,
        },
      ],
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

<style lang="scss" scoped>
.nav-drawer {
  margin: 0;
  position: fixed;
  top: 54px;
  right: 0;
  height: calc(100vh - 54px);
  background-color: #0d0d17;
  box-shadow: 2px 0 4px #0d0d17;
  z-index: 123456789098765;
  transition: all 150ms ease-in-out;
  list-style: none;
}
</style>
