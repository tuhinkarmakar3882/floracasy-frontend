<template>
  <div class="blog-details-page py-4 px-4">
    <p class="mb-2">
      <nuxt-link to="/Home/Account/Details" class="no-underline">
        blog.author
      </nuxt-link>
      IN
      <nuxt-link to="/Home/Blogs/CategoryWise" class="no-underline">
        blog.category
      </nuxt-link>
    </p>
    <h3 class="blog-title">This is my super duper blog detail page</h3>
    <small class="timestamp mt-3">
      <span class="mdi mdi-clock-time-nine-outline" />
      blog.timestamp
    </small>
    <img
      class="my-5"
      src="https://picsum.photos/200"
      alt="blog.title"
      style="width: 100%; object-fit: cover; max-height: 250px"
    />
    <section class="blog-body my-6">
      <p>
        Fill in the remaining fields and wait for the droplet to be created.
      </p>
      <h1>Preparation of the environment</h1>
      <p>
        <br />
      </p>
      <blockquote>
        <em>
          I assume that at this moment your droplet is already created and you
          have logged in to it by SSH. I also assume that all of the commands in
          the next part of this guide you will run as a no-root user, so we will
          use `sudo` (check&nbsp;
        </em>
        <a
          href="https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04"
          rel="noopener noreferrer"
          target="_blank"
          style="color: inherit"
        >
          <em>this tutorial</em>
        </a>
        <em> &nbsp;if you need more info). Let’s start… </em>
      </blockquote>
      <p><br /></p>
      <p>Update packages list:</p>
      <pre class="ql-syntax" spellcheck="false">sudo apt-get update</pre>
      <p><br /></p>
      <p>Install node.js &amp; npm:</p>
      <pre class="ql-syntax" spellcheck="false">
sudo apt-get install nodejs npm</pre
      >
      <p><br /></p>
      <p>If you want to install yarn, run this commands:</p>
      <pre class="ql-syntax" spellcheck="false">
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update &amp;&amp; sudo apt-get install yarn</pre
      >
      <p><br /></p>
      <p>Now go to your home directory:</p>
      <pre class="ql-syntax" spellcheck="false">cd ~</pre>
      <p><br /></p>
      <p>And create directory for the project:</p>
      <pre class="ql-syntax" spellcheck="false">mkdir ./your-project-name</pre>
      <p><br /></p>
      <p>
        Undoubtedly, you have Nuxt.js project on your local computer, so copy it
        now to this directory. Open a new terminal window and run:
      </p>
      <pre class="ql-syntax" spellcheck="false">
scp -r /path/to/your/local/project/* your-user-name@&lt;droplet-ip-here&gt;:~/your-project-name/</pre
      >
      <p><br /></p>
      <p>
        OK, go back to the terminal where you are connected to the droplet and
        check that files exist in the proper directory:
      </p>
      <pre class="ql-syntax" spellcheck="false">
ls ./your-project-name
      </pre>
      <p><br /></p>
      <p>You should see a list of the project files.</p>
      <h1><br /></h1>
      <h1>Starting Nuxt.js</h1>
      <p>
        Now we have created our server with node.js and our project files. Let’s
        run Nuxt.js!
      </p>
      <p><br /></p>
      <pre class="ql-syntax" spellcheck="false">
cd ./your-project-name

npm run build
npm run nuxt
      </pre>
      <p><br /></p>
      <p>
        The project should run at address:&nbsp;
        <a
          href="http://localhost:3000/"
          rel="noopener noreferrer"
          target="_blank"
          style="color: inherit"
        >
          http://localhost:3000
        </a>
        . Of course, it was only for test and we need more automatization,
        because you will not start your website manually every time.
      </p>
      <p><br /></p>
      <p>We’ll use PM2 — a node.js process manager. Install it:</p>
      <pre class="ql-syntax" spellcheck="false">
sudo npm install pm2 -g
      </pre>
      <p><br /></p>
      <p>And start project by pm2 now:</p>
      <pre class="ql-syntax" spellcheck="false">
pm2 start npm -- start
      </pre>
      <h6>You should see:</h6>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Details',
  layout: 'MobileApp',
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: -1 })
  },
}
</script>
