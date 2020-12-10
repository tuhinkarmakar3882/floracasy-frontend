<template>
  <section class="question-card">
    <blockquote :style="{ borderLeft: `4px solid ${borderShade}` }">
      <h5 class="my-0 px-4">{{ content.statement }}</h5>
      <hr class="mx-4" />
      <p class="px-4">
        <span class="secondary">Answer: </span><br />{{ content.answer }}
      </p>
      <hr class="mt-8 mb-7 mx-4" data-v-258ab808="" />

      <aside v-if="showDefaultFeedback" class="pb-8">
        <section v-if="feedback" class="feedback-response">
          <p :class="requestFeedback ? 'danger-light' : 'secondary'">
            <span
              class="mdi"
              :class="
                requestFeedback ? 'mdi-emoticon-cry' : 'mdi-emoticon-cool'
              "
            />
            {{ feedback }}
          </p>
          <nuxt-link
            v-if="requestFeedback"
            :to="navigationRoutes.Home.MoreOptions.HelpAndSupport.Feedback"
          >
            Send Feedback
          </nuxt-link>
        </section>

        <section v-else>
          <p class="text-center mb-6">Did you find it useful?</p>

          <div class="feedback-options">
            <button
              v-ripple=""
              class="secondary-outlined-btn"
              @click="recordPositiveResponse"
            >
              <span class="mdi mdi-emoticon-cool-outline secondary" />
              Yes
            </button>

            <button
              v-ripple=""
              class="danger-outlined-btn"
              @click="recordNegativeResponse"
            >
              <span class="mdi mdi-emoticon-cry-outline danger-light" />
              No
            </button>
          </div>
        </section>
      </aside>
    </blockquote>
  </section>
</template>

<script>
import { navigationRoutes } from '~/navigation/navigationRoutes'

export default {
  name: 'QuestionCard',
  props: {
    content: {
      type: Object,
      required: true,
    },
    showDefaultFeedback: {
      type: Boolean,
      default: false,
    },
    borderShade: {
      type: String,
      default: '#7872ec',
    },
  },

  data() {
    return {
      navigationRoutes,
      feedback: null,
      requestFeedback: false,
    }
  },

  async mounted() {
    // await this.$firebase.analytics().logEvent('page_view')
  },

  methods: {
    recordPositiveResponse() {
      this.feedback = "Great! We'll keep doing the great stuff"
    },
    recordNegativeResponse() {
      this.feedback = "We'd love to know how can we improve."
      this.requestFeedback = true
    },
  },
}
</script>

<style lang="scss" scoped>
.question-card {
  blockquote {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
  }

  aside {
    .feedback-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 2rem;
      width: 208px;
      margin-left: auto;
      margin-right: auto;

      button {
        min-width: auto;
      }
    }

    .feedback-response {
      padding: 0.5rem 1rem;
      text-align: center;

      p {
        display: grid;
        place-items: center;

        span {
          font-size: 24px;
        }
      }

      a {
        display: block;
        margin: 10px 0;
      }
    }
  }
}
</style>
