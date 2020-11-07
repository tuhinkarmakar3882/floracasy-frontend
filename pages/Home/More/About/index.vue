<template>
  <AppFeel class="about-page">
    <template slot="app-bar-title"> {{ pageTitle }} </template>

    <template slot="main">
      <main class="my-2 px-4">
        <!--        <Logo :width="84" />-->
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h4>Floracasy</h4>
          <button v-ripple class="primary-outlined-btn">Let's Go</button>
        </div>

        <hr />
        About us Read. write
        <hr />

        <div class="intro">
          <hr />

          More you read More you know

          <br />

          &lt; vector art. &gt;
        </div>

        <br />

        <div class="next part">
          We started Floracasy because we believe that what you read matters and
          that good writing is valuable. We believe that writers, bloggers,
          thinkers, and creatives of every background should be able to pursue
          their curiosity, generating income directly from their own audiences
          and on their own terms. When readers pay writers directly, writers can
          focus on doing the work they care about most. A few hundred paying
          subscribers can support a livelihood. A few thousand makes it
          lucrative.

          <button class="active">Join now</button>
        </div>

        <div class="writer review">
          <h4>What our writer says about us</h4>

          <p>
            A blank page is also a door. At Medium you can walk through it. It's
            easy and free to share your thinking on any topic, connect with an
            audience, express yourself with a range of publishing tools, and
            even earn money for your work.
          </p>
          <button class="active">Start writing</button>
        </div>

        <div class="earning">
          <h4>We create independent environment for earning</h4>

          <p>
            we try to create a great environment so that everyone who have
            willpower to write , can write . By writing everyone can earn a good
            amount of money
          </p>

          <button class="active">start earning</button>
        </div>

        <div class="Get priorie">
          <h4>Get prioritize</h4>

          With special permium pack get full control & explore more

          <button>become premium member</button>
        </div>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
import Logo from '@/components/global/Logo'
export default {
  name: 'About',
  components: { Logo, AppFeel },
  data() {
    return {
      pageTitle: 'About us',
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
