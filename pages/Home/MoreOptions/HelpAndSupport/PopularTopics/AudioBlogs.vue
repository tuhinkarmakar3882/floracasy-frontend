<template>
  <AppFeel
    :on-back="
      navigationRoutes.Home.MoreOptions.HelpAndSupport.PopularTopics.index
    "
    class="audio-blogs-topic-page"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="px-4">
        <article class="my-4 text-center">
          <h3 class="heading-title">What is audio-blog?</h3>
          <p>
            Audio reading is our new invention. we offer this special feature to
            our special users means our prime user. By using this feature you
            can hear the total blog content . you don&#39;t need to read the
            whole content line by line , what you need to do is keep leasing .
          </p>
        </article>

        <article class="my-4 text-center">
          <h3 class="heading-title">
            What you need to do for this special features
          </h3>
          <p>
            Don&#39;t worry we, are here to give you the best features in a
            hassle free way. Because for us priority matters. So you just need
            press the below &quot;join&quot; button.
          </p>
          <button class="success-outlined-btn my-4">Join</button>
        </article>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'
import { usePopularTopics } from '~/environmentVariables'

export default {
  name: 'AudioBlogs',
  middleware: usePopularTopics ? 'isAuthenticated' : 'hidden',
  data() {
    return {
      pageTitle: 'Audio Blogs',
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
