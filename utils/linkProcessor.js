const codePenTransform = (url) => ({ link: url.replace('/pen/', '/embed/') })

const codeSandboxTransform = (url) => ({
  link: `https://codesandbox.io/embed/${url.substr(
    25
  )}?fontsize=14&hidenavigation=1&theme=dark`,
})

const githubGistTransform = (url) => ({
  link: `data:text/html;charset=UTF-8,<body> <script src="${url}.js"></script> </body>`,
})

const vimeoTransform = (url) => ({
  link: `https://player.vimeo.com/video/${url.substr(18)}`,
})

const youtubeTransform = (url) => ({
  link: `${url.substr(0, 20)}embed/${url.substr(28)}`,
})

const mobileYoutubeTransform = (url) => ({
  link: `https://youtube.com/embed/${url.substr(30)}`,
})
const shortenYoutubeTransform = (url) => ({
  link: `https://youtube.com/embed/${url.substr(17)}`,
})

const wwwYoutubeTransform = (url) => ({
  link: `${url.substr(0, 24)}embed/${url.substr(32)}`,
})

const instagramTransform = (url) => ({ link: `${url.split('?')[0]}embed/` })

export const supportedDomains = [
  {
    url: 'https://codepen.io/',
    applyTransform: codePenTransform,
  },
  {
    url: 'https://codesandbox.io/s/',
    applyTransform: codeSandboxTransform,
  },
  {
    url: 'https://gist.github.com/',
    applyTransform: githubGistTransform,
  },
  {
    url: 'https://vimeo.com/',
    applyTransform: vimeoTransform,
  },
  {
    url: 'https://youtube.com/',
    applyTransform: youtubeTransform,
  },
  {
    url: 'https://m.youtube.com/',
    applyTransform: mobileYoutubeTransform,
  },
  {
    url: 'https://youtu.be/',
    applyTransform: shortenYoutubeTransform,
  },
  {
    url: 'https://www.youtube.com/',
    applyTransform: wwwYoutubeTransform,
  },
  {
    url: 'https://instagram.com/',
    applyTransform: instagramTransform,
  },
  {
    url: 'https://www.instagram.com/',
    applyTransform: instagramTransform,
  },
]
