<template>
  <AppFeel
    class="help-and-support-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section v-if="$route.query.type === 'Post'" class="px-4 my-4">
        <h5 class="heading-title">Tell us more about it</h5>
        <blockquote>Show Post Preview Here</blockquote>
        <pre>{{ $route.query.identifier }}</pre>
      </section>
      <section v-else-if="$route.query.type === 'Blog'" class="px-4 my-4">
        <h5 class="heading-title">Tell us more about it</h5>
        <blockquote>Show Blog Preview Here</blockquote>
        <pre>{{ $route.query.identifier }}</pre>
      </section>

      <section v-else class="px-4 my-4">
        <h5 class="heading-title">We're here to help!</h5>
        <p class="mb-6">
          We're sorry to hear that you had any issues while using this platform.
          Tell us more about it & we'll try out best to get it resolved in the
          best possible manner as per our guidelines.
        </p>
      </section>

      <section class="px-4">
        <client-only>
          <v-select
            autocomplete="off"
            class="my-4 dropdown"
            placeholder="Choose a Blog Category"
          />
        </client-only>
        <div class="material-form-field">
          <input
            id="issue-title"
            ref="issueTitle"
            v-model="issueTitle"
            type="text"
            required
            name="text"
            autocomplete="off"
          />
          <label class="material-form-field-label" for="issue-title">
            Issue Title
          </label>
          <small
            v-if="issueTitle.trim().length < 10"
            style="display: block; font-weight: 400; font-size: 13px"
            class="mt-3 hint-text"
          >
            (Hint: At least {{ 10 - issueTitle.trim().length }} more characters
            are required)
          </small>
          <small
            v-if="issueTitle.trim().length >= 10 && !issueTitleError"
            style="display: block; font-weight: 400; font-size: 13px"
            class="mt-3 secondary-matte"
          >
            <i class="mdi mdi-checkbox-marked-circle-outline" /> Looks good!
          </small>
          <small
            v-if="issueTitleError"
            style="display: block; font-weight: 400; font-size: 13px"
            class="mt-3 danger-light"
          >
            <i class="mdi mdi-alert-circle-outline" />
            Exceed 300 character limit
          </small>
        </div>

        <div class="material-form-field mt-2">
          <input
            id="issue-details"
            ref="issueDetails"
            v-model="issueDetails"
            type="text"
            required
            name="text"
            autocomplete="off"
          />
          <label class="material-form-field-label" for="issue-details">
            Issue Details
          </label>
          <small
            v-if="issueDetails.trim().length < 60"
            style="display: block; font-weight: 400; font-size: 13px"
            class="mt-3 hint-text"
          >
            (Hint: At least {{ 60 - issueDetails.trim().length }} more
            characters are required)
          </small>
          <small
            v-if="issueDetails.trim().length >= 60 && !issueDetailsError"
            style="display: block; font-weight: 400; font-size: 13px"
            class="mt-3 secondary-matte"
          >
            <i class="mdi mdi-checkbox-marked-circle-outline" /> Looks good!
          </small>
          <small
            v-if="issueDetailsError"
            style="display: block; font-weight: 400; font-size: 13px"
            class="mt-3 danger-light"
          >
            <i class="mdi mdi-alert-circle-outline" />
            Exceed 1500 character limit
          </small>
        </div>

        <div class="text-center mt-8">
          <RippleButton
            class="my-6"
            class-list="primary-btn"
            :on-click="raiseTicket"
            :loading="raiseTicketLoading"
            :disabled="
              !(
                isValidIssueTitle &&
                isValidIssueDetails &&
                !issueDetailsError &&
                !issueTitleError
              )
            "
            style="width: 212px"
          >
            Raise Support Ticket
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
import endpoints from '~/api/endpoints'
export default {
  name: 'ContactSupport',
  components: { RippleButton, AppFeel },
  middleware: 'isAuthenticated',

  data() {
    return {
      navigationRoutes,
      pageTitle: 'Contact Support',
      raiseTicketLoading: false,

      issueTitle: '',
      isValidIssueTitle: false,
      issueTitleError: null,

      issueDetails: '',
      isValidIssueDetails: false,
      issueDetailsError: null,
    }
  },
  watch: {
    issueTitle(newValue) {
      const contentLength = newValue.trim().length
      const minAllowedLength = 10
      const maxAllowedLength = 300
      this.isValidIssueTitle =
        contentLength >= minAllowedLength && contentLength <= maxAllowedLength
      this.issueTitleError = contentLength > maxAllowedLength
    },
    issueDetails(newValue) {
      const contentLength = newValue.trim().length
      const minAllowedLength = 60
      const maxAllowedLength = 1500
      this.isValidIssueDetails =
        contentLength >= minAllowedLength && contentLength <= maxAllowedLength
      this.issueDetailsError = contentLength > maxAllowedLength
    },
  },
  mounted() {},
  methods: {
    async raiseTicket() {
      this.raiseTicketLoading = true
      try {
        await this.$axios.$post(endpoints.help_and_support.create, {
          title: this.issueTitle,
          issue: this.issueDetails,
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
      this.raiseTicketLoading = false
    },
  },

  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
