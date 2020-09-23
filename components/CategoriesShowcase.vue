<template>
  <div class="showcase my-4 py-4">
    <v-container>
      <div class="top-header">
        <p class="topic">Categories</p>
        <h2 class="mt-0 mb-6 pb-4">Experience Floracasy</h2>
        <p>Explore hundreds of integrations for Ghost to speed up your workflow, or build your own
          custom integrations with our open source developer SDK</p>
      </div>
      <div class="show-reel row justify-center">
        <div v-for="item in items" :key="item.name" class="col-4">
          <v-avatar color="primary" size="84">
            <img :alt="item.name" :src="item.image" loading="lazy">
          </v-avatar>
          <p class="my-4">{{ item.name }}</p>
        </div>
      </div>


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
          image: "https://picsum.photos/200",
        },
        {
          name: "Technology",
          image: "https://picsum.photos/200",
        },
        {
          name: "Music",
          image: "https://picsum.photos/200",
        },
        {
          name: "Arts",
          image: "https://picsum.photos/200",
        },
        {
          name: "Pets",
          image: "https://picsum.photos/200",
        },
        {
          name: "UI/UX",
          image: "https://picsum.photos/200",
        },
        {
          name: "Skincare",
          image: "https://picsum.photos/200",
        },
        {
          name: "Plants",
          image: "https://picsum.photos/200",
        },
        {
          name: "Fitness",
          image: "https://picsum.photos/200",
        },
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
@import "assets/variables";

.showcase {
  text-align: center;
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

  .show-reel {
    p {
      font-weight: 400;
      color: $muted;
    }
  }
}
</style>
