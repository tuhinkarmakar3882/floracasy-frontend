<template>
  <AppFeel
    class="help-and-support-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="px-4 my-4">
        <div class="material-form-field mt-2">
          <input
            id="feedback-message"
            ref="feedbackMessage"
            type="text"
            required
            name="text"
            autocomplete="off"
          />
          <label class="material-form-field-label" for="feedback-message">
            Write your feedback
          </label>
        </div>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
export default {
  name: 'Feedback',
  components: { AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Feedback',
    }
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
