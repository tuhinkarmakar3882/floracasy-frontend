<template>
  <div class="my-6 scrollable-blog-list">
    <article v-for="blog in blogs" :key="blog.id" class="blog px-4 py-8">
      <section v-ripple="'rgba(255, 255, 255, .25)'" class="content">
        <p class="mb-2">
          <span class="author">{{ blog.author }}</span>
          IN
          <span class="category">{{ blog.category }}</span>
        </p>

        <h5>{{ blog.title }}</h5>

        <small class="timestamp mt-3">{{ blog.timestamp }}</small>

        <img class="my-5" :src="blog.image" :alt="blog.title" />

        <p>
          {{ blog.summary }}...
          <a href="#"> Read More </a>
        </p>
      </section>
      <section class="blog-actions mt-6">
        <div v-ripple="'rgba(255, 255, 255, .25)'" class="like">
          <i class="mdi mdi-heart-outline mr-2" />
          <span class="value">365</span>
        </div>
        <div v-ripple="'rgba(255, 255, 255, .25)'" class="comment">
          <i class="mdi mdi-message-text mr-2" />
          <span class="value">527</span>
        </div>
        <div v-ripple="'rgba(255, 255, 255, .25)'" class="share">
          <i class="mdi mdi-share-variant mr-2" />
          <span class="value">209</span>
        </div>
      </section>
      <!--      <hr class="my-8" />-->
      <!--        <RippleButton-->
      <!--          v-ripple-->
      <!--          class-list="success-outlined-btn"-->
      <!--          :on-click="like.bind(null, blog)"-->
      <!--        >-->
      <!--          Like-->
      <!--        </RippleButton>-->
      <!--        <RippleButton-->
      <!--          v-ripple-->
      <!--          class-list="success-outlined-btn"-->
      <!--          :on-click="comment.bind(null, blog)"-->
      <!--        >-->
      <!--          Comment-->
      <!--        </RippleButton>-->
      <!--        <RippleButton-->
      <!--          v-ripple-->
      <!--          class-list="success-outlined-btn"-->
      <!--          :on-click="share.bind(null, blog)"-->
      <!--        >-->
      <!--          Share-->
      <!--        </RippleButton>-->
      <!--      </section>-->
    </article>
  </div>
</template>

<script>
// import RippleButton from '@/components/global/RippleButton'
export default {
  name: 'InfiniteScrollingBlogLists',
  // components: { RippleButton },
  data() {
    return {
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
  methods: {
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

<style lang="scss">
@import 'assets/all-variables';

.scrollable-blog-list {
  article {
    .author,
    .category {
      color: $secondary-highlight;
    }

    img {
      width: 100%;
      object-fit: cover;
      height: 155px;
      box-shadow: $default-box-shadow;
      border-radius: $double-space;
    }

    .blog-actions {
      font-family: $Nunito-Sans;
      color: $secondary;
      font-size: 1.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        * {
          display: block;
        }

        .value {
          height: 100%;
          color: $muted;
          font-size: 1rem;
        }
      }
    }

    &:nth-child(even) {
      background: $nav-bar-bg;
    }
  }
}
</style>
