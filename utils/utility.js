const utility = {
    timeStringParser: function (isoString) {
        let segments = isoString.split(/\D+/);
        return new Date(Date.UTC(segments[0], --segments[1], segments[2], segments[3], segments[4], segments[5], segments[6]));
    },

    blogImageParser: function (blogToBeRendered) {
        const defaultImagePath = '/images/defaultBlogImg.svg'
        if (blogToBeRendered.blog_image.length !== 0) {
            return blogToBeRendered.blog_image[0].image;
        }

        if (blogToBeRendered.blog_image_links.length !== 0) {
            if (blogToBeRendered.blog_image_links[0].content.trim() !== "") {
                return blogToBeRendered.blog_image_links[0].content;
            } else {
                return defaultImagePath;
            }
        }

        return defaultImagePath;
    },
}

export default utility;
