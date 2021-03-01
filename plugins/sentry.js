import Vue from 'vue'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import { sentryDSN } from '~/environmentalVariables'

Sentry.init({
  Vue,
  dsn: sentryDSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})
