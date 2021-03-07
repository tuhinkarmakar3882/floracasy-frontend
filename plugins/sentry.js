import Vue from 'vue'
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import { sentryDSN } from '~/environmentVariables'

Sentry.init({
  Vue,
  dsn: sentryDSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.1,
})
