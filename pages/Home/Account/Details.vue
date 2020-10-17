<template>
  <div class="text-center py-6 details-page">
    <section class="user-profile">
      <div class="basic-data">
        <img
          alt="profile-picture"
          class="picture"
          src="https://picsum.photos/200"
        />
        <div class="basic-details">
          <p class="name">Travis Alice</p>
          <p class="designation">Beauty Blogger</p>
        </div>
      </div>

      <section class="stats">
        <div v-for="item in statisticsItem" :key="item.id" class="item">
          <span class="number">{{ item.value }}</span>
          <p class="type">
            {{ item.type }}
          </p>
        </div>
      </section>

      <section class="other-info">
        <h3>About</h3>
        <p class="about">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
          asperiores assumenda blanditiis
        </p>
      </section>

      <section class="actions">
        <button class="px-6">
          Follow
          <span class="ml-2"> mdi-account-multiple-plus </span>
        </button>
        <button class="px-6">
          Message
          <span class="ml-2"> mdi-lock </span>
        </button>
      </section>
    </section>

    <section class="recent-activity">
      <h3 class="heading">Recent Activities</h3>

      <div v-for="blog in blogs" :key="blog.id" class="blog my-8">
        <div class="content">
          <img :alt="blog.title" :src="blog.image"/>
          <div class="data">
            <h3>{{ blog.title }}</h3>
            <small> {{ blog.time }}</small>
          </div>
        </div>

        <hr class="mt-8"/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Details',
  layout: 'HomeAppLayout',
  middleware: 'authenticatedRequest',
  data() {
    return {
      statisticsItem: [
        {
          id: 0,
          value: 22,
          type: 'Blogs',
        },
        {
          id: 1,
          value: 560,
          type: 'Engagements',
        },
        {
          id: 2,
          value: 100,
          type: 'Followers',
        },
      ],
      blogs: [
        {
          id: 0,
          title: 'Now its easy to take care your underarms at home.',
          image: 'https://picsum.photos/200',
          time: 'Sat Aug 19, 2020 11:34 A.M.',
        },
        {
          id: 1,
          title: 'Love your hair but suffering from Hair fall or hair damage?',
          image: 'https://picsum.photos/200',
          time: 'Sat Aug 19, 2020 11:34 A.M.',
        },
        {
          id: 2,
          title: "Bath - Hot water or Cold water? Let's see!",
          image: 'https://picsum.photos/200',
          time: 'Sat Aug 19, 2020 11:34 A.M.',
        },
        {
          id: 3,
          title: 'What should be your diet schedule?',
          image: 'https://picsum.photos/200',
          time: 'Sat Aug 19, 2020 11:34 A.M.',
        },
        {
          id: 4,
          title: 'Now you can get salon like pedicure for free at home',
          image: 'https://picsum.photos/200',
          time: 'Fri Aug 18, 2020 01:34 A.M.',
        },
        {
          id: 5,
          title: 'Miracle Face Mask According To Your Skin Type',
          image: 'https://picsum.photos/200',
          time: 'Sat Aug 19, 2020 11:34 A.M.',
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', {linkPosition: 4})
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/variables';

.details-page {
  padding: 0 1rem;

  .user-profile {
    .basic-data {
      display: grid;
      grid-template-columns: 1fr 2fr;
      place-items: center;
      position: relative;
      z-index: 2;

      .picture {
        width: clamp(100px, 10vw, 150px);
        border-radius: 50%;
      }

      .basic-details {
        .name {
          font-size: 24px;
          font-family: $Prata;
          color: white;
          margin-bottom: 12px;
          margin-top: 0;
        }

        .designation {
          margin: 0 0 9px;
          color: #00bcd4;
        }
      }
    }

    .stats {
      margin: 2rem 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      justify-content: space-around;
      align-items: center;

      .item {
        p {
          margin: 0;
        }
      }
    }

    .actions {
      display: grid;
      margin: 1rem 0;
      place-items: center;
      padding: 1rem;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 1rem;
    }

    .other-info {
      text-align: left;

      h3 {
        font-weight: 400;
        color: #fff;
        font-size: 20px;
        margin-top: 2rem;
        font-family: $Prata;
        margin-bottom: 1rem;
      }

      .about {
        //line-height: 1.5;
        font-weight: 300;
        color: #9a9a9a;
        letter-spacing: 0;
      }
    }
  }

  .recent-activity {
    .heading {
      text-align: left;
      font-weight: 400;
      color: #fff;
      font-size: 20px;
      margin-top: 2rem;
      font-family: $Prata;
      margin-bottom: 1rem;
    }

    .content {
      display: grid;
      grid-template-columns: 1fr 3fr;
      grid-column-gap: 1rem;
      place-items: center;

      img {
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      .data {
        text-align: left;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        * {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
}
</style>
