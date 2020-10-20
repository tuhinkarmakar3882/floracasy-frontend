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
      <article v-for="blog in blogs" :key="blog.id" class="blog my-5">
        <div class="content">
          <img :src="blog.image" :alt="blog.title" />
          <div class="text-left">
            <h5>{{ blog.title }}</h5>
            <p class="my-4">
              <span class="author">{{ blog.author }}</span>
              IN
              <span class="category">{{ blog.category }}</span>
            </p>
            <small class="timestamp">{{ blog.timestamp }}</small>
          </div>
        </div>
        <section class="blog-actions">
          <p v-ripple @click="like(blog.id)">Like</p>
          <p v-ripple @click="comment(blog.id)">Comment</p>
          <p v-ripple @click="share(blog.id)">Share</p>
        </section>
      </article>
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
        height: 200px;
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
      blogs: [
        {
          id: 0,
          title: 'Love your hair but suffering from Hair fall or hair damage?',
          timestamp: 'Mon 13th Nov, 2018, 12:30 P.M.',
          author: 'Jammie Johnson',
          category: 'Beauty & Makeup',
          image: 'https://picsum.photos/249',
        },
        {
          id: 1,
          title: 'That Great Apple iPhone Review',
          timestamp: 'Mon 12th Nov, 2018, 01:30 P.M.',
          author: 'Annie Parker',
          category: 'Technology',
          image: 'https://picsum.photos/251',
        },
        {
          id: 2,
          title: 'Now its easy to take care your underarms at home.',
          timestamp: 'Mon 11th Nov, 2018, 6:41 P.M.',
          author: 'Swiss Robinson',
          category: 'Technology',
          image: 'https://picsum.photos/252',
        },
        {
          id: 3,
          title: "Bath - Hot water or Cold water? Let's see!",
          timestamp: 'Mon 13th Nov, 2018, 5:59 P.M.',
          author: 'Irina Caperina',
          category: 'Health',
          image: 'https://picsum.photos/253',
        },
        {
          id: 4,
          title: 'That Great Apple Review',
          timestamp: 'Mon 13th Nov, 2018, 6:30 P.M.',
          author: 'Jammie Johnson',
          category: 'Technology',
          image: 'https://picsum.photos/254',
        },
      ],
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
    async like(blogId) {
      await alert(`You've Liked Blog Number => ${blogId}`)
    },
    async comment(blogId) {
      await alert(`You've commented on Blog Number => ${blogId}`)
    },
    async share(blogId) {
      await alert(`You've shared Blog Number => ${blogId}`)
    },
  },
}
</script>
