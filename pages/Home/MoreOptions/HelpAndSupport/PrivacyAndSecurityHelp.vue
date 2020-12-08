<template>
  <AppFeel
    class="privacy-and-security-help-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="px-4 my-4">
        <h3>How to use floracasy ?</h3>

        <p>
          Floracasy give equality to both readers &amp; writes. Readers can get
          a hassle free super reading experience &amp; writers can get a
          independently writing &amp; earning experience. Firs after opening
          floracasy website one can see our landing page after sign in or login
          you can directly come into our home . By using our bottom navigation
          bar one can navigate easily. 1st option of our<strong>
            &quot;home&quot; </strong
          >,here you can exprole unlimited blogs. 2nd option in our bottom nav
          bar is<strong> &quot;profile&quot; </strong>, here you can easily
          explore his/ her profile &amp; many more into this. 3rd option is
          <strong>create blogs </strong>, here you can easily create your blogs,
          write your contents. 4th one is
          <strong>notification section </strong>, you can see your any realted
          notification . 5th and most interesting one is
          <strong>&quot;more option&quot;</strong> ,you can explore many option
          like edit your profile , send feedback, user manual, rise help tickets
          and many more.
        </p>

        <h3>How to block user</h3>

        <h5>
          If you have some genuine problem with any user you can block his /her
          profile . To block an user from your profile you need to rise a help
          ticket( more option-&gt; help &amp; support -&gt; contact support ) by
          sharing your problem &amp; floracasy team will Consider a fair trial.
        </h5>

        <h3>Managing payments</h3>

        <h5>
          As you can know payment is a very secure service. so we keet it very
          confidential. You can clam your payment once your earning reaches to
          100 dollars. To clam you payment you can just click below button &amp;
          after varification you can easily receive your payment.
        </h5>

        <button>claim payment</button>
        <button>overview</button>

        <h5>
          one can also see thier each blog&#39;s view count , total view , total
          like &amp; many more but for this you just need to join our premium
          pack . not only this you will get may other exciting features in our
          premium pack.
        </h5>

        <button>join premium</button>

        <h3>Account &amp; Notification privacy</h3>

        <p>
          To change any details of your profile you can easily go into
          <strong> preference </strong>
          option &amp; change your profile picture, about, designation.
        </p>

        <p>
          To get notification all time Firstly press the the allow notification
          from your notification page , if you have already pressed may be later
          from your notification page don&#39;t worry just easily go into your
          preference<strong> (more options -&gt; preference) </strong> page
          &amp; turn on <strong> notification status toggle button </strong>
        </p>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'PrivacyAndSecurityHelp',
  components: { AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Privacy & Security Help',
    }
  },
  methods: {},
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
