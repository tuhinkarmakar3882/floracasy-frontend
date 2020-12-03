<template>
  <AppFeel
    class="how-to-write-page"
    :on-back="navigationRoutes.Home.MoreOptions.WriteAndEarn"
  >
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main" class="my-4">
      <main class="px-4 my-4">
        <section v-for="(guideline, index) in guidelines" :key="index">
          <h4 class="heading-title">{{ guideline.title }}</h4>
          <p>{{ guideline.description }}</p>
          <img
            v-if="guideline.image"
            :src="guideline.image"
            :alt="guideline.title"
          />
        </section>

        <div>
          <h4 class="heading-title">How to add sub title</h4>

          <p>
            Subtitles are as important as title. It's a must to add a subtitle
            otherwise your blog is not going to publish. To add a subtitle, To
            add a title, you just need to fill up the input box as shown in the
            below illustration.
          </p>
          <img
            src="http://img_screenshort"
            alt="gify to demostrate add sub title"
          />
        </div>

        <div>
          <h4 class="heading-title">How to choose a category</h4>
          <p>
            Category is a important part of your blog &amp; also its mandatory
            to choose a category according to your blog. You can also add a
            category if you want but for this you need show a specific reason
            that why you are going to add a new category , our team will you out
            in that case.

            <label>Choose a category:</label>

            <select name="category">
              <option value="category">Options</option>
              <option value="music">Music</option>
              <option value="Technology ">Technology</option>
              <option value="Gaming">Gaming</option>
              <option value="Cooking">Cooking</option>
            </select>
          </p>
        </div>

        <div>
          <h4 class="heading-title">Function of Toolbox</h4>

          <p>
            Toolbox mainly give a styling to your content . By using toolbox you
            can style your containt . you can add list ; colour ; alignment
            &amp; many more whatever you want . each &amp; every element of
            toolbox will describe below.
          </p>

          <h4 class="heading-title">Types of Headings</h4>

          <p>
            This is mainly use for headline .you can use this tool to chng your
            text headline
          </p>

          <ul>
            <li>Normal headline : this is mainly use for normal use</li>
            <li>H1 heading: The size of this heading is biggest</li>
            <li>H2 heading: This heading size is bigger than H3</li>
            <li>H3 heading: This heading size is bigger than H4</li>
            <li>H4 heading:This heading size is bigger than H5</li>
            <li>H5 heading: This heading size is bigger than H6</li>
            <li>H6 heading: This heading size is smallest</li>
          </ul>

          <h3>B :</h3>
          <p>
            &quot;B&quot; stands for &quot;Bold&quot; so its use to make bold
            your words
          </p>

          <h3>I :</h3>
          <p>
            &quot;I&quot; stands for &quot;Italic&quot; so its use to make
            Italic your words
          </p>

          <h3>U :</h3>
          <p>
            &quot;U&quot; stands for &quot;Underline&quot; so its use to get
            Underline
          </p>

          <h3>$(sorry i couldn&#39;t find the exact icon):</h3>

          <p>&quot;$&quot; stands for scratch through ..so its use for it.</p>

          <h3>Alignments</h3>

          <img src="#0.1_" alt=" screenshort or gify" />

          <p>
            You can easily change your alignment by using these tools. These are
            4 alignment type:
          </p>

          <ul>
            <li>Left alignment (icon)</li>
            <li>Right alignment (icon)</li>
            <li>Centre Alignment (icon)</li>
            <li>Alignment (icon)</li>
          </ul>

          <h1 class="mdi mdi-format-quote-open" />

          <p>This is a Blockquote</p>

          <br />

          <h3>this icon &lt;/&gt;</h3>

          <p>you may use this tool to write codes</p>

          <h3>How to create list in your content</h3>

          <p>
            This element is use to add list in your content . you can add
            verious type of list in your blog . we will describe types of list
            which you can add below
          </p>

          <img src="#0.1_" alt="screen recording" />

          <ul>
            <li>
              Unorder list (icon) : you can add a ordered list simple by using
              this element. we will add picture so that you can use it without
              any hassle.
            </li>
            <br />

            <li>
              Order list (icon) : you can add a Unordered list simple by using
              this element. we will add picture so that you can use it without
              any hassle.
            </li>

            <br />

            <li>
              Normal list (icon ) : you can add a ordered list simple by using
              this element. we will add picture so that you can use it without
              any hassle.
            </li>
            <br />
          </ul>

          <h3>How to set position</h3>

          <img src="#0.1_" alt="screenshorts" />

          <p>
            You can simply set your position by using this particular element
            from toolbox.
          </p>

          <h3>How to add colour</h3>

          <h4 class="heading-title">Use of A (icon)</h4>

          <p>
            This tool is mainly use to add colour your text. this is a good idea
            to have a look forward to seeing you on the way to get the best way
            .
          </p>

          <img src="#0.1_" alt=" screenshort" />

          <h3>link (icon)</h3>

          <p>Its mainly use to add link in your contant .</p>

          <h3>Image (icon)</h3>
          <p>its mainly use to add image in your contant.</p>

          <h3>last (icon)</h3>

          <p>i don&#39;t know it&#39;s use only developer can explain this</p>
        </div>
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/global/Layout/AppFeel'
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'HowToWrite',
  components: { AppFeel },
  middleware: 'isAuthenticated',
  data() {
    return {
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
  head() {
    return {
      title: this.pageTitle,
    }
  },
}
</script>
