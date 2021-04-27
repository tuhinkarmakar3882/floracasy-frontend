import sanitizeHtml from 'sanitize-html'
import { sanitizationConfig } from '~/config/sanitizationConfig'
import { supportedDomains } from '~/utils/linkProcessor'

const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
const updateLocale = require('dayjs/plugin/updateLocale')
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: 'Just now',
    m: '1 min',
    mm: '%d mins',
    h: '1 hr',
    hh: '%d hrs',
    d: '1 day',
    dd: '%d days ago',
    M: '1 month ago',
    MM: '%d months',
    y: '1 year ago',
    yy: '%d years ago',
  },
})

export const getRelativeTime = (timeString) => {
  return dayjs().to(dayjs(timeString))
}
export const getStandardTime = (timeString) => {
  return dayjs(timeString).format('h:mm A')
}

export const shorten = (value) => {
  if (value < 1000) return value
  let suffix
  if (value >= 1000) {
    value /= 1000
    suffix = 'k'
  }
  if (value >= 1000) {
    value /= 1000
    suffix = 'm'
  }
  if (value >= 1000) {
    value /= 1000
    suffix = 'b'
  }
  value = Math.round(value * 100) / 100
  return `${value}${suffix}`
}

export const showUITip = async (
  store,
  message = '',
  type = 'info',
  dismissible = true,
  timeout = 2500
) => {
  if (store === undefined) throw new Error('No State Found')
  await store.dispatch('SocketHandler/updateSocketMessage', {
    message,
    notificationType: type || 'info',
    dismissible,
    timeout,
  })
}

export const setupUser = async (store) => {
  if (store === undefined) throw new Error('No State Found')

  const currentUser = await store.getters['UserManagement/getUser']
  if (!currentUser) {
    await store.dispatch('UserManagement/fetchData').catch(() => {})
  }
}

export const parseTimeUsingStandardLibrary = (timeString) => {
  return new Date(timeString)
}

export const convertIntoMilliseconds = (duration) => {
  const years = duration?.years ? duration?.years : 0
  const months = years * 12 + (duration?.months ? duration?.months : 0)
  const days = months * 30 + (duration?.days ? duration?.days : 0)
  const hours = days * 24 + (duration?.hours ? duration?.hours : 0)
  const minutes = hours * 60 + (duration?.minutes ? duration?.minutes : 0)
  const seconds = minutes * 60 + (duration?.seconds ? duration?.seconds : 0)
  return seconds * 1000
}

export const blogImageParser = (blogToBeRendered) => {
  const defaultImagePath = '/images/default.svg'
  if (blogToBeRendered.blog_image.length !== 0) {
    return blogToBeRendered.blog_image[0].image
  }

  if (blogToBeRendered.blog_image_links.length !== 0) {
    if (blogToBeRendered.blog_image_links[0].content.trim() !== '') {
      return blogToBeRendered.blog_image_links[0].content
    } else {
      return defaultImagePath
    }
  }

  return defaultImagePath
}

export const processLink = (link, authenticationMode = true) => {
  const prefix = authenticationMode ? 'allow_authenticated' : 'allow_any'
  return link ? `${prefix}${link.substr(21)}` : null
}

export const getFormattedTime = (decimalTimeInSeconds) => {
  if (decimalTimeInSeconds === Infinity) return 'Calculating...'

  const roundedSeconds = Math.round(decimalTimeInSeconds)
  const seconds = roundedSeconds % 60
  const minutes = Math.floor(roundedSeconds / 60)

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

export const LogAnalyticsEvent = (eventType = '', payload = {}) => {
  window.gtag('event', eventType, payload)
}

export const destroySetup = (stream, arrayMode = false) => {
  if (!stream) {
    return
  }

  if (arrayMode) {
    for (const i of stream) {
      const tracks = i.getTracks()
      tracks.forEach(function (track) {
        track.stop()
      })
    }
    return
  }

  try {
    const tracks = stream.getTracks()
    tracks.forEach(function (track) {
      track.stop()
    })
  } catch (e) {}
}

export const cleanHTML = (rawHTML) => {
  return sanitizeHtml(rawHTML, sanitizationConfig)
}

export const getEmbeddableLink = (url) => {
  for (const domain of supportedDomains) {
    const domainLength = domain.url.length
    if (url.substr(0, domainLength) === domain.url) {
      return domain.applyTransform(url)
    }
  }
  return { link: url, unprocessed: true }
}
