import moment from 'moment'

const utility = {
  timeStringParser(timeString) {
    return moment(timeString).fromNow()
  },
  convertIntoMilliseconds(duration) {
    const years = duration?.years ? duration?.years : 0
    const months = years * 12 + (duration?.months ? duration?.months : 0)
    const days = months * 30 + (duration?.days ? duration?.days : 0)
    const hours = days * 24 + (duration?.hours ? duration?.hours : 0)
    const minutes = hours * 60 + (duration?.minutes ? duration?.minutes : 0)
    const seconds = minutes * 60 + (duration?.seconds ? duration?.seconds : 0)
    return seconds * 1000
  },
  blogImageParser(blogToBeRendered) {
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
  },
}

export default utility
