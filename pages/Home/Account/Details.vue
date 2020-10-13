<template>
  <div class="text-center my-4 details-page">
    <section class="user-profile">
      <div class="segment">
        <img alt="profile picture" class="picture" src="https://picsum.photos/200"/>
        <div class="basic-details">
          <p class="name"> Swagata Biswas </p>
          <p class="designation"> Beauty Blogger </p>
        </div>
      </div>

      <section class="stats">
        <div v-for="item in statisticsItem" :key="item.id" class="item">
          <span class="number">{{ item.value }}</span>
          <p class="type"> {{ item.type }} </p>
        </div>
      </section>

      <section class="other-info">
        <h3>About</h3>
        <p class="about">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores assumenda blanditiis
          eaque error eveniet explicabo illum iure minus odit officia quia repellendus reprehenderit saepe
          similique sint ut, voluptas. Qui.
        </p>

        <a href="#"> Swagata_Biswas </a>

        <a href="#"> @swagataB </a>

        <div class="actions">
          <v-btn class="px-6" color="#3734E5" dark rounded>
            Follow
            <v-icon class="ml-2" dark>mdi-account-multiple-plus</v-icon>
          </v-btn>
          <v-btn class="px-6" color="secondary" dark outlined rounded>
            Message
            <v-icon class="ml-2" dark>mdi-lock</v-icon>
          </v-btn>
        </div>
      </section>
    </section>
    <section class="blogs">
      <p>New </p>
      <img alt="image" src="https://picsum.photos/250">
      <h3> It is blogs headline & readers love it </h3>
      <p> Sat Aug 19, 2020 11:34 A.M. </p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, aperiam, praesentium. Adipisci commodi dolores
        ducimus in ipsum laboriosam molestias officia possimus quaerat quibusdam reiciendis sequi, temporibus velit.
        Laborum mollitia, quidem!</p>
      <button>Read more</button>

      <hr/>

      <h5>
        <u>1 week ago</u>
      </h5>
    </section>
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
          id: 2,
          value: 100,
          type: "Followers",
        },
        {
          id: 1,
          value: 560,
          type: "Following",
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
    .segment {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: center;
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

    .other-info {
      h3 {
        line-height: 1.8;
        font-weight: 400;
        color: #FFF;
        font-size: 24px;
        margin-top: 2rem;
        font-family: $Prata;
        margin-bottom: 1rem;
      }

      .about {
        padding: 0 1rem;
        text-align: center;
        line-height: 1.5;
        font-weight: 300;
        color: #9a9a9a;
        letter-spacing: 0;
      }

      .actions {
        display: grid;
        margin: 1rem 0;
        place-items: center;
        padding: 1rem;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 1rem;
      }
    }
  }
}

</style>
