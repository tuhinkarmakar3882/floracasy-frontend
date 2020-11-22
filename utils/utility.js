import moment from 'moment'

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: '1 min',
    mm: '%d mins',
    h: '1 hr',
    hh: '%d hrs',
    d: '1 d',
    dd: '%d d',
    w: '1 w',
    ww: '%d w',
    M: 'a m',
    MM: '%d m',
    y: 'a yr',
    yy: '%d yrs',
  },
})

export const parseTimeUsingMoment = (timeString) => {
  return moment(timeString).fromNow(true)
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
