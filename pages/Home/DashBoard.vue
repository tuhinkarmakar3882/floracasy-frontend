<template>
  <div class="dashboard-page">
    <Carousel :carousel-items="carouselItems" />
    <!--    <Carousel :loop="true">-->
    <!--      <Slide-->
    <!--        v-for="(item, index) in carouselItems"-->
    <!--        :key="index"-->
    <!--        class="item"-->
    <!--        :style="{ backgroundColor: item.color, color: 'white' }"-->
    <!--      >-->
    <!--        <h3>{{ item.name }}</h3>-->
    <!--      </Slide>-->
    <!--        </Carousel>-->
    <h3 class="text-center my-6">Browse by Categories</h3>

    <CategoriesLineUp :categories="categories" class-list="my-4" />
    <hr class="my-6" />

    <h2 class="my-9 text-center">Explore Blogs</h2>

    <section class="my-6 px-2">
      <div class="blog my-5">
        <div class="content">
          <img src="http://picsum.photos/255" alt="" />
          <div class="body">
            <h6>That Apple Eye-Pads Review, Once again</h6>
            <p class="my-4">
              <span class="author">Maria Bentley</span>
              IN
              <span class="category">Technology</span>
            </p>
            <small class="timestamp">Mon 28th Nov, 2018, 11:42 P.M.</small>
          </div>
        </div>
        <div class="blog-actions">
          <p v-ripple>Like</p>
          <p v-ripple>Comment</p>
          <p v-ripple>Share</p>
        </div>
      </div>
      <div class="blog my-5">
        <div class="content">
          <img src="http://picsum.photos/251" alt="" />
          <div class="body">
            <h6>Now its easy to take care your underarms at home.</h6>
            <p class="my-4">
              <span class="author">Maria Bentley</span>
              IN
              <span class="category">Technology</span>
            </p>
            <small class="timestamp">Mon 28th Nov, 2018, 11:42 P.M.</small>
          </div>
        </div>
        <div class="blog-actions">
          <p v-ripple>Like</p>
          <p v-ripple>Comment</p>
          <p v-ripple>Share</p>
        </div>
      </div>
      <div class="blog my-5">
        <div class="content">
          <img src="http://picsum.photos/252" alt="" />
          <div class="body">
            <h6>Love your hair but suffering from Hair fall or hair damage?</h6>
            <p class="my-4">
              <span class="author">Maria Bentley</span>
              IN
              <span class="category">Technology</span>
            </p>
            <small class="timestamp">Mon 28th Nov, 2018, 11:42 P.M.</small>
          </div>
        </div>
        <div class="blog-actions">
          <p v-ripple>Like</p>
          <p v-ripple>Comment</p>
          <p v-ripple>Share</p>
        </div>
      </div>
      <div class="blog my-5">
        <div class="content">
          <img src="http://picsum.photos/255" alt="" />
          <div class="body">
            <h6>That Apple Eye-Pads Review, Once again</h6>
            <p class="my-4">
              <span class="author">Maria Bentley</span>
              IN
              <span class="category">Technology</span>
            </p>
            <small class="timestamp">Mon 28th Nov, 2018, 11:42 P.M.</small>
          </div>
        </div>
        <div class="blog-actions">
          <p v-ripple>Like</p>
          <p v-ripple>Comment</p>
          <p v-ripple>Share</p>
        </div>
      </div>
    </section>

    <div class="text-center mt-12">
      <RippleButton class-list="danger-outlined-btn" :on-click="logout">
        Logout
      </RippleButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/all-variables';

.dashboard-page {
  transition: all 0.5s ease-in-out;

  .blog {
    background-color: $card-background;
    padding: 0.8rem;
    border-radius: 10px;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      grid-column-gap: $standard-space;

      img {
        width: 100%;
        object-fit: cover;
        margin-bottom: 1rem;
      }

      .author {
        color: $secondary-highlight;
      }

      .category {
        color: $secondary-highlight;
      }
    }

    .blog-actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      text-align: center;
      margin-top: 1rem;
      p {
        height: 100%;
      }
    }
  }
}
</style>

<script>
import CategoriesLineUp from '@/components/Home/Dashboard/CategoriesLineUp'
import RippleButton from '~/components/global/RippleButton'
import Carousel from '~/components/Home/Dashboard/Carousel'

export default {
  name: 'DashBoard',
  components: {
    Carousel,
    RippleButton,
    CategoriesLineUp,
  },
  // middleware: 'protectedRoute',
  layout: 'MobileApp',
  data() {
    return {
      categories: [
        {
          id: '0',
          name: 'Beauty',
        },
        {
          id: '1',
          name: 'Games',
        },
        {
          id: '2',
          name: 'Technology',
        },
        {
          id: '3',
          name: 'Art',
        },
        {
          id: '4',
          name: 'Music',
        },
      ],
      carouselItems: [
        {
          name: 'First Item in the carousel',
          color: 'red',
        },
        {
          name: 'Second Item in the carousel',
          color: 'teal',
        },
        {
          name: 'Third Item in the carousel',
          color: 'green',
        },
        {
          name: 'Fourth Item in the carousel',
          color: 'blue',
        },
        {
          name: 'Fifth Item in the carousel',
          color: 'grey',
        },
      ],
      attrs: {
        class: 'mb-6',
        // boilerplate: true,
        elevation: 2,
      },
    }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', { linkPosition: 0 })
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('logout')
        // console.log(this.$store.state.authUser)
        await this.$router.push('/')
      } catch (e) {}
    },
  },
}
</script>
