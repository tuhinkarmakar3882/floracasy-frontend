import Vue from 'vue'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import { sentryDSN } from '~/environmentalVariables'

Sentry.init({
  Vue,
  dsn: sentryDSN,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})
