<template>
  <AppFeel
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
    class="help-and-support-page"
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
            autocomplete="off"
            name="text"
            required
            type="text"
          />
          <label class="material-form-field-label" for="feedback-form">
            Type your feedback here
          </label>
          <small
            v-if="feedbackText.trim().length < 30"
            class="mt-3 hint-text"
            style="display: block; font-weight: 400; font-size: 13px"
          >
            (Hint: At least {{ 30 - feedbackText.trim().length }} more
            characters are required)
          </small>
          <small
            v-if="feedbackText.trim().length >= 30 && !feedbackTextError"
            class="mt-3 secondary-matte"
            style="display: block; font-weight: 400; font-size: 13px"
          >
            <i class="mdi mdi-checkbox-marked-circle-outline" /> Looks good!
          </small>
          <small
            v-if="feedbackTextError"
            class="mt-3 danger-light"
            style="display: block; font-weight: 400; font-size: 13px"
          >
            <i class="mdi mdi-alert-circle-outline" />
            Exceed 300 character limit
          </small>
        </div>

        <div class="text-center mt-7 pt-4">
          <RippleButton
            :disabled="!(isValidFeedbackText && !feedbackTextError)"
            :loading="sendFeedbackLoading"
            :on-click="sendFeedback"
            class="my-6"
            class-list="primary-btn"
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
import { navigationRoutes } from '@/navigation/navigationRoutes'
import endpoints from '~/api/endpoints'

export default {
  name: 'Feedback',
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
  mounted() {},
  methods: {
    async sendFeedback() {
      this.sendFeedbackLoading = true
      try {
        await this.$axios.$post(endpoints.feedback_collection.create, {
          feedback: this.feedbackText,
        })
        await this.$router.replace(
          navigationRoutes.Home.MoreOptions.HelpAndSupport.index
        )
      } catch (e) {
        await this.$store.dispatch('SocketHandler/updateSocketMessage', {
          message: 'Network Error, Please Retry.',
          notificationType: 'alert',
          dismissible: true,
        })
      }
      this.sendFeedbackLoading = false
    },
  },
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
