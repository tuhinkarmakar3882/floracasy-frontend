<template>
  <div class="how-to-write-page">
    <AppBarHeader auto-hide>
      <template #title>{{ pageTitle }}</template>
    </AppBarHeader>
    <main class="px-4 my-4">
      <p class="my-8 text-center py-4 px-4">
        We're working hard to prepare a guide in order to help you write blogs,
        faster.
        <br />
        <br />
        Come back Soon to view it :)
      </p>

      <div v-if="false">
        <p>
          Hey! folks, might you face some difficulty to write blog or may be you
          get confused with toolbox that How you can write blog & getting more
          attracted towards your audience.
        </p>

        <h4>B</h4>
        <p>
          B is mainly used to make blod your writing.First select the portion
          you need to make bold,tap on B.Yes this is as simple as this.
        </p>

        <h4>I</h4>
        <p>
          I is mainly used to make Italic your writing.First select the portion
          you need to make italic,tap on I.Yes this is as simple as this.
        </p>

        <h3>U</h3>
        <p>this is mainly used to make underline.</p>

        <h3>_</h3>
        <p>
          It's mainly used to set a devider line. It may work as a separating
          line between 2 segment.
        </p>

        <h3>H1</h3>
        <p>
          It's mainly used to set Heading. Heading has different sizes like H1
          is use to create the largest heading size.
        </p>

        <h3>H2</h3>
        <p>
          It's also used to set Heading. Heading has different sizes, like H2 is
          use to create the larger size than H3 but smaller size than H1.
        </p>

        <h3>H3</h3>
        <p>
          It's also used to set Heading. Heading has different sizes, like H3 is
          use to create the larger size than H4 but smaller size than H2.
        </p>

        <h3>H4</h3>
        <p>
          It's also used to set Heading. Heading has different sizes, like H4 is
          use to create the larger size than H5 but smaller size than H3
        </p>

        <h3>H5</h3>
        <p>
          It's also used to set Heading. Heading has different sizes, like H5 is
          use to create the larger size than h6 but smaller size than h4
        </p>

        <h3>H6</h3>
        <p>It's used to make the smallest Heading size.</p>

        <h3>Alignment</h3>
        <p>
          You can align your words or sentences with the help of this tool. Here
          mainly 3 type of alignment you can use from this toolbox. 1st one is
          mainly used for right alignment. 2nd one is used for center alignment.
          3rd one is for left alignment.
        </p>

        <h3>s</h3>
        <p>
          This tool is mainly used to scratchthrough. Simply select the portion
          you want to scratchthrough and click the option.
        </p>

        <h3>Table</h3>
        <p>
          This tool is used to add table in your blog.You can add 2type of table
          here. 1. Order List:- You can add order list simple tapping the above
          seen icon and yes you list is added. 2. unorder List:- You can add
          unorder list simple tapping the above seen icon and yes you list is
          added.
        </p>

        <h3>Superscript</h3>
        <p>
          when you want to add superscript text, just tap on superscript icon,
          then add the text you want to add as superscript.
        </p>

        <h3>subscript</h3>
        <p>
          when you want to add subscript text, just tap on subscript icon, then
          add the text you want to add as subscript.
        </p>

        <h3>link</h3>
        <p>
          1st Type the word or link name which you want to make a link, then
          select the portion & tap on link icon from toolbox.A window come in
          front of your screen,type your full link IP address and add this. For
          better knowledge please check the below GIF.
        </p>

        <h3>image</h3>
        <p>
          Tap on image icon from toolbox and type your image IP address and
          press the add button. The image is added in your blog.
        </p>

        <h3>Vedio</h3>
        <p>
          Tap on vedio icon from toolbox and type your vedio IP address or vedio
          link and press the add button. The vedio is added in your blog.
        </p>

        <h3>blogquote</h3>
        <p>
          blogquote is mainly use to give a special importance of some specific
          portion. blogquote is super easy to use, just tap the button from
          toolbox & start writing.
        </p>

        <h3>Code</h3>
        <p>
          code is use to write any kind of code in your blog. just tap the code
          button from toolbox & start writing code in your blog
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import { navigationRoutes } from '@/navigation/navigationRoutes'

export default {
  name: 'HowToWrite',
  // middleware: 'isAuthenticated',
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
  }
}
</style>
