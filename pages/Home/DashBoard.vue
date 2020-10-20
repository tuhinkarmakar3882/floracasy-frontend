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

    <section class="my-6 px-4">
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
          <RippleButton
            v-ripple
            class-list="success-outlined-btn"
            :on-click="like.bind(null, blog.id)"
          >
            Like
          </RippleButton>
          <RippleButton
            v-ripple
            class-list="success-outlined-btn"
            :on-click="comment.bind(null, blog.id)"
          >
            Comment
          </RippleButton>
          <RippleButton
            v-ripple
            class-list="success-outlined-btn"
            :on-click="share.bind(null, blog.id)"
          >
            Share
          </RippleButton>
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

$blog-border-radius: 20px;

.dashboard-page {
  transition: all 0.5s ease-in-out;

  button {
    min-width: auto;
    border-radius: 0;
  }

  .blog {
    background-color: lighten($card-background, 5%);
    border-radius: $blog-border-radius;
    padding-bottom: 1rem;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      grid-column-gap: $standard-space;

      img {
        height: 200px;
        width: 100%;
        object-fit: cover;
        margin-bottom: 1rem;
        border-top-left-radius: $blog-border-radius;
        border-top-right-radius: $blog-border-radius;
      }

      div {
        padding: 0.5rem 0.8rem;

        span {
          color: $secondary-highlight;
        }

        small {
          font-family: $Nunito;
        }
      }
    }

    .blog-actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      text-align: center;
      margin-top: 1rem;
      padding: 0 0.3rem;

      button {
        &:nth-child(1) {
          border: none;
        }

        &:nth-child(2) {
          border-top: none;
          border-bottom: none;
        }

        &:nth-child(3) {
          border: none;
        }
      }

      //p {
      //  height: 100%;
      //}
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
  middleware: 'protectedRoute',
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
    like(blogId) {
      console.log(`You've Liked Blog Number => ${blogId}`)
    },
    comment(blogId) {
      console.log(`You've commented on Blog Number => ${blogId}`)
    },
    share(blogId) {
      console.log(`You've shared Blog Number => ${blogId}`)
    },
  },
}
</script>
