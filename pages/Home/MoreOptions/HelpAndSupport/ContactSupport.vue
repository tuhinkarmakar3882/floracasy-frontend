<template>
  <AppFeel
    class="help-and-support-page"
    :on-back="navigationRoutes.Home.MoreOptions.HelpAndSupport.index"
  >
    <template slot="app-bar-title"> {{ pageTitle }}</template>

    <template slot="main">
      <section class="px-4 my-4">
        <h5 class="heading-title">Tell us more about it</h5>

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
        </div>

        <div class="text-center mt-8">
          <RippleButton
            class="my-6"
            class-list="primary-btn"
            :on-click="raiseTicket"
            :loading="raiseTicketLoading"
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
      isValidForm: true,
      issueTitle: '',
      issueDetails: '',
    }
  },
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
