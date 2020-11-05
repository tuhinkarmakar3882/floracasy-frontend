const utility = {
  timeStringParser(timeString) {
    return new Date(timeString)
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
