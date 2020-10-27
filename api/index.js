import express from 'express'

// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', (req, res) => {
  // if (req.body.username === 'demo' && req.body.password === 'demo') {
  //   req.session.authUser = { username: 'demo' }
  //   return res.json({ username: 'demo' })
  // }
  return res.json({ username: 'demo' })
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser
  res.json({ ok: true })
})

router.get('/getBlogData', (req, res) => {
  // const body = `<p>
  //         Fill in the remaining fields and wait for the droplet to be created.
  //       </p>
  //       <h1>Preparation of the environment</h1>
  //       <p>
  //         <br />
  //       </p>
  //       <blockquote>
  //         <em>
  //           I assume that at this moment your droplet is already created and you
  //           have logged in to it by SSH. I also assume that all of the commands in
  //           the next part of this guide you will run as a no-root user, so we will
  //           use \`sudo\` (check&nbsp;
  //         </em>
  //         <a
  //           href="https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04"
  //           rel="noopener noreferrer"
  //           target="_blank"
  //           style="color: inherit"
  //         >
  //           <em>this tutorial</em>
  //         </a>
  //         <em> &nbsp;if you need more info). Let’s start… </em>
  //       </blockquote>
  //       <p><br /></p>
  //       <p>Update packages list:</p>
  //       <pre class="ql-syntax" spellcheck="false">sudo apt-get update</pre>
  //       <p><br /></p>
  //       <p>Install node.js &amp; npm:</p>
  //       <pre class="ql-syntax" spellcheck="false">
  // sudo apt-get install nodejs npm</pre
  //       >
  //       <p><br /></p>
  //       <p>If you want to install yarn, run this commands:</p>
  //       <pre class="ql-syntax" spellcheck="false">
  // curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  // echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  //
  // sudo apt-get update &amp;&amp; sudo apt-get install yarn</pre
  //       >
  //       <p><br /></p>
  //       <p>Now go to your home directory:</p>
  //       <pre class="ql-syntax" spellcheck="false">cd ~</pre>
  //       <p><br /></p>
  //       <p>And create directory for the project:</p>
  //       <pre class="ql-syntax" spellcheck="false">mkdir ./your-project-name</pre>
  //       <p><br /></p>
  //       <p>
  //         Undoubtedly, you have Nuxt.js project on your local computer, so copy it
  //         now to this directory. Open a new terminal window and run:
  //       </p>
  //       <pre class="ql-syntax" spellcheck="false">
  // scp -r /path/to/your/local/project/* your-user-name@&lt;droplet-ip-here&gt;:~/your-project-name/</pre
  //       >
  //       <p><br /></p>
  //       <p>
  //         OK, go back to the terminal where you are connected to the droplet and
  //         check that files exist in the proper directory:
  //       </p>
  //       <pre class="ql-syntax" spellcheck="false">
  // ls ./your-project-name
  //       </pre>
  //       <p><br /></p>
  //       <p>You should see a list of the project files.</p>
  //       <h1><br /></h1>
  //       <h1>Starting Nuxt.js</h1>
  //       <p>
  //         Now we have created our server with node.js and our project files. Let’s
  //         run Nuxt.js!
  //       </p>
  //       <p><br /></p>
  //       <pre class="ql-syntax" spellcheck="false">
  // cd ./your-project-name
  //
  // npm run build
  // npm run nuxt
  //       </pre>
  //       <p><br /></p>
  //       <p>
  //         The project should run at address:&nbsp;
  //         <a
  //           href="http://localhost:3000/"
  //           rel="noopener noreferrer"
  //           target="_blank"
  //           style="color: inherit"
  //         >
  //           http://localhost:3000
  //         </a>
  //         . Of course, it was only for test and we need more automatization,
  //         because you will not start your website manually every time.
  //       </p>
  //       <p><br /></p>
  //       <p>We’ll use PM2 — a node.js process manager. Install it:</p>
  //       <pre class="ql-syntax" spellcheck="false">
  // sudo npm install pm2 -g
  //       </pre>
  //       <p><br /></p>
  //       <p>And start project by pm2 now:</p>
  //       <pre class="ql-syntax" spellcheck="false">
  // pm2 start npm -- start
  //       </pre>
  //       <h6>You should see:</h6>`
  const body = `<h1> Hello, I am not a good person. </h1> <script>console.error("You're hacked!")</script>`
  const blogsData = [
    {
      id: 0,
      title: 'Love your hair but suffering from Hair fall or hair damage?',
      timestamp: 'Mon 13th Nov, 2018, 12:30 P.M.',
      author: 'Jammie Johnson',
      category: 'Beauty & Makeup',
      image: 'https://picsum.photos/249',
      summary:
        'Explore hundreds of integrations for Ghost to speed up your workflow',
    },
    {
      id: 1,
      title: 'That Great Apple iPhone Review',
      timestamp: 'Mon 12th Nov, 2018, 01:30 P.M.',
      author: 'Annie Parker',
      category: 'Technology',
      image: 'https://picsum.photos/251',
      summary:
        'Explore hundreds of integrations for Ghost to speed up your workflow',
    },
    {
      id: 2,
      title: 'Now its easy to take care your underarms at home.',
      timestamp: 'Mon 11th Nov, 2018, 6:41 P.M.',
      author: 'Swiss Robinson',
      category: 'Technology',
      image: 'https://picsum.photos/252',
      summary:
        'Explore hundreds of integrations for Ghost to speed up your workflow',
    },
    {
      id: 3,
      title: "Bath - Hot water or Cold water? Let's see!",
      timestamp: 'Mon 13th Nov, 2018, 5:59 P.M.',
      author: 'Irina Caperina',
      category: 'Health',
      image: 'https://picsum.photos/253',
      summary:
        'Explore hundreds of integrations for Ghost to speed up your workflow',
    },
    {
      id: 4,
      title: 'That Great Apple Review',
      timestamp: 'Mon 13th Nov, 2018, 6:30 P.M.',
      author: 'Jammie Johnson',
      category: 'Technology',
      image: 'https://picsum.photos/254',
      summary:
        'Explore hundreds of integrations for Ghost to speed up your workflow',
    },
  ]
  const requestedBlogId = 0 // req.query.id
  console.log('requestedBlogId => ', requestedBlogId)
  const response = { ...blogsData[requestedBlogId], body }
  res.json({ response })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router,
}
