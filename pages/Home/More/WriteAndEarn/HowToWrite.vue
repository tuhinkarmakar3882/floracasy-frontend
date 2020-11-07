<template>
  <AppFeel class="how-to-write-page">
    <template slot="app-bar-title">
      {{ pageTitle }}
    </template>
    <template slot="main" class="my-4">
      <main class="px-4 my-4">
        <h4 class="heading-title">How to write</h4>

        <p class="#">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
          dolore, explicabo incidunt libero mollitia neque possimus sapiente sit
          tenetur! Accusamus aut error facilis fugiat harum incidunt inventore
          neque quae veniam.
        </p>

        <div class="adding title">
          <h4 class="heading-title">How to add title</h4>

          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into

          <img src="img_screenshort" alt="gify demonstrate adding title" />
        </div>

        <div class="adding subtitles">
          <h4 class="heading-title">How to add sub title</h4>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur dolore, explicabo incidunt libero mollitia neque
            possimus sapiente sit tenetur! Accusamus aut error facilis fugiat
            harum incidunt inventore neque quae veniam.
          </p>
          <img src="img_screenshort" alt="gify to demostrate add sub title" />
        </div>

        <div class="catagory adding">
          <h4 class="heading-title">How to choose a catagory</h4>
          <p>
            why catagory is important by these line we will going to demonstrate
            why a caatagory is important &how to add category in your blog ,
            otherwise your blog will not published .

            <label for="category">Choose a category:</label>

            <select id="category" name="category">
              <option value="category">Options</option>
              <option value="music">Music</option>
              <option value="Technology ">Technology</option>
              <option value="Gaming">Gaming</option>
              <option value="Cooking">Cooking</option>
            </select>
          </p>
        </div>

        <div class="Toolbox">
          <h4 class="heading-title">Function of Toolbox</h4>

          <p>
            why toolbox is important & its uses.these line we will going to
            demonstrate why a caatagory is important
          </p>

          <h4 class="heading-title">"Normal :"</h4>

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
          <p>"B" stands for "Bold" so its use to make bold your words</p>

          <h3>I :</h3>
          <p>"I" stands for "Italic" so its use to make Italic your words</p>

          <h3>U :</h3>
          <p>"U" stands for "Underline" so its use to get Underline</p>

          <h3>$(sorry i couldn't find the exact icon):</h3>

          <p>"$" stands for scratch through ..so its use for it.</p>

          <h3>Alignments</h3>

          <img src="#" alt=" screenshort or gify" />

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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur dolore, explicabo incidunt libero mollitia neque
            possimus sapiente sit tenetur! Accusamus aut error facilis fugiat
            harum incidunt inventore neque quae veniam.
          </p>

          <img src="#" alt="screen recording" />

          <ul>
            <li>
              Unorder list (icon) : Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Consequuntur dolore, explicabo incidunt libero
              mollitia neque possimus sapiente sit tenetur! Accusamus aut error
              facilis fugiat harum incidunt inventore neque quae veniam.
            </li>
            <br />

            <li>
              Order list (icon): Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Consequuntur dolore, explicabo incidunt libero
              mollitia neque possimus sapiente sit tenetur! Accusamus aut error
              facilis fugiat harum incidunt inventore neque quae veniam.
            </li>

            <br />

            <li>
              Normal list (icon ) : Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Consequuntur dolore, explicabo incidunt libero
              mollitia neque possimus sapiente sit tenetur! Accusamus aut error
              facilis fugiat harum incidunt inventore neque quae veniam.
            </li>
            <br />
          </ul>

          <h3>How to set position</h3>

          <img src="#" alt="screenshorts" />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur dolore, explicabo incidunt libero mollitia neque
            possimus sapiente sit tenetur! Accusamus aut error facilis fugiat
            harum incidunt inventore neque quae veniam.
          </p>

          <h3>How to add colour</h3>

          <h4 class="heading-title">Use of A (icon)</h4>

          <p>
            This tool is mainly use to add colour your text. this is a good idea
            to have a look forward to seeing you on the way to get the best way
            .
          </p>

          <img src="#" alt=" screenshort" />

          <h3>link (icon)</h3>

          <p>Its mainly use to add link in your contant .</p>

          <h3>Image (icon)</h3>
          <p>its mainly use to add image in your contant.</p>

          <h3>last (icon)</h3>

          <p>i don't know it's use only developer can explain this</p>
        </div>

        <hr />
      </main>
    </template>
  </AppFeel>
</template>

<script>
import AppFeel from '@/components/Layout/AppFeel'
export default {
  name: 'HowToWrite',
  components: { AppFeel },
  data() {
    return {
      pageTitle: 'How to Write',
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          // hid: 'description',
          // name: 'description',
          // content: 'My custom description',
        },
      ],
    }
  },
}
</script>
