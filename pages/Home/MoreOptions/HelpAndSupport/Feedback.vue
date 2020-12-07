<template>
  <AppFeel
    class="help-and-support-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="px-4 my-4">
        <h5 class="heading-title">We'd love to hear from you!</h5>
        <p class="text-center pb-8">
          We're working tirelessly to bring the best possible experience to you,
          your opinions are really valuable for us.
        </p>

        <div class="material-form-field">
          <input
            id="feedback-form"
            ref="feedbackTitle"
            v-model="feedbackText"
            type="text"
            required
            name="text"
            autocomplete="off"
          />
          <label class="material-form-field-label" for="feedback-form">
            Type your feedback here
          </label>
          <small
            v-if="feedbackText.trim().length < 30"
            style="display: block; font-weight: 400; font-size: 13px"
            class="mt-3 hint-text"
          >
            (Hint: At least {{ 30 - feedbackText.trim().length }} more
            characters are required)
          </small>
          <small
            v-if="feedbackText.trim().length >= 30 && !feedbackTextError"
            style="display: block; font-weight: 400; font-size: 13px"
            class="mt-3 secondary-matte"
          >
            <i class="mdi mdi-checkbox-marked-circle-outline" /> Looks good!
          </small>
          <small
            v-if="feedbackTextError"
            style="display: block; font-weight: 400; font-size: 13px"
            class="mt-3 danger-light"
          >
            <i class="mdi mdi-alert-circle-outline" />
            Exceed 300 character limit
          </small>
        </div>

        <div class="text-center mt-7 pt-4">
          <RippleButton
            class="my-6"
            class-list="primary-btn"
            :on-click="sendFeedback"
            :loading="sendFeedbackLoading"
            :disabled="!(isValidFeedbackText && !feedbackTextError)"
            style="width: 212px"
          >
            Send Feedback
          </RippleButton>
        </div>
      </section>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'
import RippleButton from '~/components/global/RippleButton'

export default {
  name: 'Feedback',
  components: { RippleButton, AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
      navigationRoutes,
      pageTitle: 'Send Feedback',
      sendFeedbackLoading: false,

      feedbackText: '',
      isValidFeedbackText: false,
      feedbackTextError: null,
    }
  },
  watch: {
    feedbackText(newValue) {
      const contentLength = newValue.trim().length
      const minAllowedLength = 30
      const maxAllowedLength = 300
      this.isValidFeedbackText =
        contentLength >= minAllowedLength && contentLength <= maxAllowedLength
      this.feedbackTextError = contentLength > maxAllowedLength
    },
  },
  methods: {
    sendFeedback() {
      this.sendFeedbackLoading = true
      setTimeout(() => {
        this.sendFeedbackLoading = false
      }, 2000)
    },
  },
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
