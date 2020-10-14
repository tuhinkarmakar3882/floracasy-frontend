<template>
  <div class="text-center py-6 details-page">

    <section class="user-profile">

      <div class="basic-data dbx">
        <img alt="profile-picture dbx" class="picture" src="https://picsum.photos/200"/>
        <div class="basic-details dbx">
          <p class="name"> Travis Alice </p>
          <p class="designation"> Beauty Blogger </p>
        </div>
      </div>

      <section class="stats dbx">
        <div v-for="item in statisticsItem" :key="item.id" class="item dbx">
          <span class="number">{{ item.value }}</span>
          <p class="type"> {{ item.type }} </p>
        </div>
      </section>


      <section class="other-info">
        <h3>About</h3>
        <p class="about">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores assumenda blanditiis
        </p>
      </section>

      <section class="actions">
        <v-btn class="px-6" color="#3734E5" dark rounded>
          Follow
          <v-icon class="ml-2" dark>mdi-account-multiple-plus</v-icon>
        </v-btn>
        <v-btn class="px-6" color="#3734E5" dark rounded>
          Message
          <v-icon class="ml-2" dark>mdi-lock</v-icon>
        </v-btn>
      </section>
    </section>

    <!--    <section class="blogs">-->
    <!--      <p>New </p>-->
    <!--      <img alt="image" src="https://picsum.photos/250">-->
    <!--      <h3> It is blogs headline & readers love it </h3>-->
    <!--      <p> Sat Aug 19, 2020 11:34 A.M. </p>-->
    <!--      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, aperiam, praesentium. Adipisci commodi dolores-->
    <!--        ducimus in ipsum laboriosam molestias officia possimus quaerat quibusdam reiciendis sequi, temporibus velit.-->
    <!--        Laborum mollitia, quidem!</p>-->
    <!--      <button>Read more</button>-->

    <!--      <hr/>-->

    <!--      <h5>-->
    <!--        <u>1 week ago</u>-->
    <!--      </h5>-->
    <!--    </section>-->
  </div>
</template>

<script>
export default {
  name: "Details",
  // middleware: "authenticatedRequest",
  layout: "HomeAppLayout",
  data() {
    return {
      statisticsItem: [
        {
          id: 0,
          value: 22,
          type: "Blogs",
        },
        {
          id: 1,
          value: 560,
          type: "Engagements",
        },
        {
          id: 2,
          value: 100,
          type: "Followers",
        },
      ],
    }
  },
  mounted() {
    this.$store.commit('BottomNavigation/update', {linkPosition: 1})
  }
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.details-page {
  .user-profile {
    padding: 0 1rem;

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
          color: #00BCD4;
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
        color: #FFF;
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
}

</style>
