<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.WriteAndEarn"
    class="earning-page"
  >
    <template v-slot:app-bar-title>
      {{ pageTitle }}
    </template>
    <template v-slot:main>
      <main>
        <h4 class="heading-title my-6 px-4">Tips to Improve Your Earnings</h4>

        <section class="py-4 px-4">
          <LazyKeyPoint
            v-for="(point, index) in points"
            :key="index"
            :point="point"
            :tick-size="20"
            class="my-4"
            tick-color="#6DD0BF"
          />
        </section>

        <section
          v-for="(segment, index) in segments"
          :key="index"
          class="py-8 px-4 segment"
        >
          <h4>{{ segment.title }}</h4>
          <hr class="faded-divider" />
          <p
            v-for="(paragraph, paragraphIndex) in segment.body"
            :key="`${segment.title}-${paragraphIndex}`"
            class="my-4"
          >
            {{ paragraph }}
          </p>

          <InFeedAd
            v-if="index % 3 === 0"
            :key="'earning-ad-' + index"
            use-small-ads
          />
        </section>
      </main>
    </template>
    <template v-slot:footer>
      <InFeedAd class="my-4" use-small-ads />
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'Earning',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Earn By Writing',
      points: [
        'Try to be a Consistent Blog Writer on the Platform',
        'Great content, keeps your readers engaged',
        'Try engaging with your community via our Social Section',
        'Remember, Consistency is the key to be Successful',
      ],
      segments: [
        {
          title: 'Get Paid for Your Knowledge 💰💰💰',
          body: [
            `One can earn easily at least $100/month with a decent amount of content.
            Though, it can take sometime to build your own community, We surely believe that,
            your knowledge is worth of that reward.`,
            `So without a further do, start writing now & create an impact out of your passion.`,
          ],
        },
        {
          title: 'Claim Your Earning 🥳',
          body: [
            `Once you reach the minimum threshold, you can claim the money that your have earned.
             So, Just keep on engaging with your community now.`,
            `Rest assured, We'll keep you informed & make sure that your reward reaches to you
            without any hassle.`,
          ],
        },
        {
          title: 'Socialize the Knowledge Around You 🧑‍🤝‍🧑👭👬👫',
          body: [
            `The world is full of awesome people. And we all have some knowledge in us.
             Lets talk about our valuable knowledge and create awesome Impact around the world!`,
          ],
        },
        {
          title: `Great Power Comes with Great Responsibility`,
          body: [
            `Though, the community is open-minded, We hope & appreciate that you will not misuse the power &
            will refrain from posting & creating anything that is not community-friendly.`,
            `We expect you to follow our community guidelines to keep this place safe for you & others around
            the world. In case of posting or creating any harmful or disrespectful or any form of abusive
            content, your a/c may be strictly banned & necessary steps will be taken to protect the wellness of
            the community.`,
          ],
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
@import 'assets/all-variables';

.segment {
  &:nth-child(odd) {
    background: $segment-background;
  }
}
</style>
