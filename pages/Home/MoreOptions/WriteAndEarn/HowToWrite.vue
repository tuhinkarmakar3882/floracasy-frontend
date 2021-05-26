<template>
  <div class="how-to-write-page">
    <AppBarHeader :fallback-page="fallbackPage" :previous-page="previousPage">
      <template #title>{{ pageTitle }}</template>
      <template #action-button>
        <nuxt-link v-ripple :to="navigationRoutes.Home.Blogs.Create.AddBlog">
          <button class="secondary-btn">Create Blog</button>
        </nuxt-link>
      </template>
    </AppBarHeader>

    <div class="main-container">
      <main class="px-4 my-4">
        <div>
          <h1 class="mb-8 text-center">Write your first Blog</h1>
          <hr />

          <p>
            Follow this guide to write your first blog on Floracasy & We hope to
            get you familiarized with the toolbox within a minute or so!
          </p>

          <h2>Get Started</h2>

          <section>
            <p>
              Start with a strong <strong>HEADING</strong> introducing the title
              of your content along with blog category as you can see in the
              image below. They are required fields to get started though you
              can add subtitle and image cover url too to make your blog stand
              alone among others.
            </p>

            <img alt="" src="/images/tutorial/first_blog.png" />
          </section>
          <h2>After clicking on Next</h2>
          <hr />

          <section>
            <h3>Introduction</h3>
            <p>
              Always start your blog with an Introduction or a Goal that defines
              the purpose of the blog.
            </p>
            <img alt="" src="/images/tutorial/Introduction.png" />
          </section>

          <section>
            <h3>Heading Tags</h3>
            <p>
              You can always use different headings, e.g. H1, H2, H3, H4, H5,
              H6, according to your need.
            </p>
            <img alt="" src="/images/tutorial/Headings.png" />
          </section>

          <section>
            <h3>Text Alignments</h3>
            <p>
              Using alignments is an important part of good writing. Always use
              alignments as per need.
            </p>
            <ul>
              <li>1st one is mainly used for left alignment.</li>
              <li>2nd one is used for center alignment.</li>
              <li>3rd one is for right alignment.</li>
            </ul>
            <img alt="" src="/images/tutorial/Alignement.png" />
          </section>

          <section>
            <h3>Text Formats</h3>
            <section>
              <h6>Bold</h6>
              <p>
                B is mainly used to make bold your writing. First select the
                portion you want to make bold, tap on B. (or use
                CTRL+B[windows/linux] or CMD+B[mac])
              </p>
              <img alt="" src="/images/tutorial/Boldtext.png" />
            </section>
            <section>
              <h6>Italic</h6>
              <p>
                I is mainly used to make Italic your writing. First select the
                portion you need to make italic,tap on I. (or use
                CTRL+I[windows/linux] or CMD+I[mac])
              </p>
              <img alt="" src="/images/tutorial/Italic.png" />
            </section>
            <section>
              <h6>UnderLine</h6>
              <p>
                U is mainly used to make underline. First select the portion you
                need to make italic,tap on U. (or use CTRL+U[windows/linux] or
                CMD+U[mac])
              </p>
              <img alt="" src="/images/tutorial/underscore.png" />
            </section>
            <section>
              <h6>Strike Through</h6>
              <p>
                This tool is mainly used to strike-through. Simply select the
                portion you want to strike-through and click the option.
              </p>
              <img alt="" src="/images/tutorial/strike.png" />
            </section>
            <section>
              <h6>Sub Script</h6>
              <p>
                When you want to add subscript text, just tap on subscript icon,
                then add the text you want to add as subscript.
              </p>
              <img alt="" src="/images/tutorial/subscript.png" />
            </section>
            <section>
              <h6>Super Script</h6>
              <p>
                When you want to add superscript text, just tap on superscript
                icon, then add the text you want to add as superscript.
              </p>
              <img alt="" src="/images/tutorial/superscript.png" />
            </section>
          </section>

          <section>
            <h3>Code Snippet</h3>
            <p>
              If you want to use a code snippet in your blog, this is for you.
            </p>
            <img alt="" src="/images/tutorial/code.png" />
          </section>

          <section>
            <h3>Blockquote</h3>
            <p>Use Blockquote to highlight a text.</p>
            <img alt="" src="/images/tutorial/blockquote.png" />
          </section>

          <section>
            <h3>Add Image</h3>
            <p>
              You can also add/upload images to the blog for better explanation.
            </p>
            <img alt="" src="/images/tutorial/add_image.png" />
          </section>

          <section>
            <h3>Add External links</h3>
            <p>
              Want to use external links? use the chain like icon on toolbar.
              You can embed the following as a Rich Content,
            </p>
            <ul>
              <li>Any Youtube Video URL</li>
              <li>Any Vimeo Video URL</li>
              <li>Any CodePen Link</li>
              <li>Any CodeSandbox Link</li>
              <li>Any Instagram Link</li>
              <li>Any Instagram Link</li>
            </ul>
            <p>Anything else, will be added as a Link preview</p>
            <img alt="" src="/images/tutorial/external_link.png" />
          </section>

          <section>
            <h3>Lists</h3>
            <hr />
            <section>
              <h6>Ordered List</h6>
              <img alt="" src="/images/tutorial/ordered_list.png" />
            </section>
            <section>
              <h6>Unordered List</h6>
              <img alt="" src="/images/tutorial/unorder.png" />
            </section>
          </section>

          <section>
            <h3>Divider</h3>
            <p>
              Don't be afraid to use dividers if you're writing a large blog or
              even a small, dividers make readability easy and also adds some
              style to the blog.
            </p>
            <img alt="" src="/images/tutorial/divider.png" />
          </section>

          <section>
            <h3>Clear All Formatting</h3>
            <p>
              In any case you want to undo all or particular text formatting,
              you can use last tool in toolbar.
            </p>
            <img alt="" src="/images/tutorial/undo.png" />
          </section>

          <section>
            <h2>Preview</h2>
            <p>
              You can always preview your blog before publishing the blog. Also
              you have to add keywords matching to your blog content in the
              keyword box it will help your blog to cut the rank and better
              SEO.<br />
              Don't forget to share your blog among your social handles and
              friends it will surely increase your blog reach.
            </p>
            <img alt="" src="/images/tutorial/preview_2.png" />
          </section>
        </div>

        <div>
          <h2 class="text-center">Happy Blogging!</h2>
          <blockquote class="mb-8">
            <p>
              Hope with this knowledge, you can now start to create amazing
              looking articles that are going to create a tremendous Impact!
            </p>
          </blockquote>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'
import AppBarHeader from '~/components/Layout/AppBarHeader'

export default {
  name: 'HowToWrite',
  components: { AppBarHeader },
  middleware: 'isAuthenticated',

  asyncData({ from: previousPage }) {
    return { previousPage }
  },

  data() {
    return {
      previousPage: undefined,
      fallbackPage: navigationRoutes.Home.MoreOptions.WriteAndEarn.index,
      navigationRoutes,
      pageTitle: 'How to Write',
      guidelines: [
        {
          title: 'How to write',
          description: `We mainly give you a guidance so that you can easily create your blog
          with a hassle free experience. If you follow our recommended few steps
          then it will be great to create . The step are write down below please
          go and check it out. Hopefully it will be helpful for you.`,
        },
        {
          title: 'How to add title',
          description: `"Title" is one of the most important & a required part of your blog,
          To add a title, you just need to fill up the input box as shown in the below illustration`,
        },
      ],
    }
  },
  mounted() {},
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.how-to-write-page {
  main {
    max-width: $large-screen;
    margin: auto;

    img {
      margin: 1rem auto 4rem;
      box-shadow: 0 0 4px #4a4a4a;
      border-radius: $micro-unit;
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
