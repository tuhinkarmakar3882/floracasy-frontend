<template>
  <div class="showcase my-4 py-6 text-center">
    <v-container>
      <div class="top-header">
        <p class="topic">Categories</p>
        <h2 class="mt-0 mb-6 pb-4">Experience Floracasy</h2>
        <p>Explore hundreds of integrations for Ghost to speed up your workflow, or build your own
          custom integrations with our open source developer SDK</p>
      </div>

      <div class="grid-container">

        <div v-for="item in items" :key="item.name" class="grid-col">
          <img :alt="item.name" :src="item.image"/>
          <p class="my-4">{{ item.name }}</p>
        </div>

        <div class="grid-col">
          <img alt="item.name" src="https://picsum.photos/151?random"
               style="width: 100%; object-fit: cover; border-radius: 50%"/>
          <p class="my-4">More</p>
        </div>

      </div>

      <v-btn class="my-6 btn" color="primary">
        Start Reading
      </v-btn>


    </v-container>
  </div>
</template>

<script>
export default {
  name: "CategoriesShowcase",
  data() {
    return {
      items: [
        {
          name: "Cooking",
          image: "https://picsum.photos/150?random",
        },
        {
          name: "Technology",
          image: "https://picsum.photos/151?random",
        },
        {
          name: "Music",
          image: "https://picsum.photos/152?random",
        },
        {
          name: "Arts",
          image: "https://picsum.photos/153?random",
        },
        {
          name: "Pets",
          image: "https://picsum.photos/154?random",
        },
        {
          name: "UI/UX",
          image: "https://picsum.photos/155?random",
        },
        {
          name: "Skincare",
          image: "https://picsum.photos/156?random",
        },
        {
          name: "Plants",
          image: "https://picsum.photos/157?random",
        },
        {
          name: "Fitness",
          image: "https://picsum.photos/158?random",
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.showcase {
  background-color: $segment-background;

  .top-header {
    .topic {
      color: $secondary-highlight;
      font-weight: 700;
    }

    h2 {
      font-family: $Prata;
      font-weight: 400;
      font-size: clamp(24px, 4vw, 40px);
      color: $white;
    }

    p {
      font-weight: 300;
    }
  }

  .grid-container {
    display: grid;
    text-align: center;
    justify-content: center;
    place-items: center;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 36px;
    grid-row-gap: 28px;

    .grid-col {
      border: 1px solid yellow;

      img {
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }

  .show-reel {
    p {
      font-weight: 400;
      color: $muted;
    }
  }
}
</style>
