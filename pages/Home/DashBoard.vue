<template>
  <div class="dashboard-page">
    <Carousel :carousel-items="carouselItems" />

    <h2 class="heading-title">Recent Blogs</h2>

    <section class="my-6 px-4">
      <article v-for="blog in blogs" :key="blog.id" class="blog my-5">
        <p class="my-4">
          <span class="author">{{ blog.author }}</span>
          IN
          <span class="category">{{ blog.category }}</span>
        </p>
        <h5>{{ blog.title }}</h5>
        <small class="timestamp">{{ blog.timestamp }}</small>
        <img :src="blog.image" :alt="blog.title" />
        <p>
          {{ blog.summary }}
          <a href="#"> ...Read More </a>
        </p>
        <section class="blog-actions">
          <RippleButton
            v-ripple
            class-list="success-outlined-btn"
            :on-click="like.bind(null, blog)"
          >
            Like
          </RippleButton>
          <RippleButton
            v-ripple
            class-list="success-outlined-btn"
            :on-click="comment.bind(null, blog)"
          >
            Comment
          </RippleButton>
          <RippleButton
            v-ripple
            class-list="success-outlined-btn"
            :on-click="share.bind(null, blog)"
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

  .heading-title {
    text-align: center;
    font-size: 28px;
    position: relative;
    margin: 2rem 0 3rem;
    font-weight: 300;

    &::after {
      content: '';
      position: absolute;
      height: 1px;
      width: 84px;
      bottom: -$standard-space;
      left: calc(50% - 42px);
      background: lighten($primary, $lighten-percentage);
    }
  }
}
</style>

<script>
import RippleButton from '~/components/global/RippleButton'
import Carousel from '~/components/Home/Dashboard/Carousel'

export default {
  name: 'DashBoard',
  components: {
    Carousel,
    RippleButton,
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
          image: 'http://picsum.photos/500',
        },
        {
          name: 'Second Item in the carousel',
          image: 'http://picsum.photos/500',
        },
        {
          name: 'Third Item in the carousel',
          image: 'http://picsum.photos/500',
        },
        {
          name: 'Fourth Item in the carousel',
          image: 'http://picsum.photos/500',
        },
        {
          name: 'Fifth Item in the carousel',
          image: 'http://picsum.photos/500',
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
        await this.$router.push('/')
      } catch (e) {}
    },
    like(blog) {
      alert(
        `Wow, I'm amazed to see that you are trying to like ${blog.title}. But, the developer is too lazy to implement that feature. Should we fire this developer?`
      )
    },
    comment(blog) {
      alert(
        `Hmmm... So now you want to comment on ${blog.title}. Wasn't just liking a post satisfactory? The Dev is just overwhelmed by this. Buy him a Chocolate`
      )
    },
    share(blog) {
      alert(
        `Duh? And Now Share??? Like Seriously? Google is not going to pay us. Anyways, here is a consolidation line : You're sharing ${blog.title}`
      )
    },
  },
}
</script>
