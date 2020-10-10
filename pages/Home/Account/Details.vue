<template>
  <div class="text-center my-6 py-6 px-4">
    <v-icon color="gold-tone" size="100">mdi-account-circle</v-icon>
    <h1 class="my-4">This is my super duper Account Details Page</h1>
    <p class="my-4">And I love it</p>

    <v-btn class="button px-4 my-4" color="primary" to="/Home/Dashboard" width="250">
      <span>View Dashboard</span>
    </v-btn>
    <br/>
    <v-btn class="button px-4 my-4" color="primary" to="/Home/Messages" width="250">
      <span>View Messages</span>
    </v-btn>

    <a href="/Home/Account/Details">
      <span>REFRESH</span>
    </a>

    <main class="container">
      <div class="user-profile">

        <img alt="profile picture" class="picture" src="https://picsum.photos/200"/>

        <p class="name"> Swagata Biswas Karmakar </p>

        <p class="designation"> Beauty Blogger </p>

        <ul class="stats">
          <li> 22 blogs</li>
          <li> 230 follower</li>
          <li> 2k engagement</li>
        </ul>

        <p class="about">
          Here some one or liner about by blogger; this about is a good hint for readers
        </p>

        <a href="#"> Swagata_Biswas </a>

        <a href="#"> @swagataB </a>

        <button>Follow</button>
        <button>Message</button>

        <hr/>
      </div>

      <div class="blogs">
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
      </div>


    </main>

  </div>
</template>

<script>
export default {
  name: "Details",
  // middleware: "authenticatedRequest",
  layout: "HomeAppLayout",
  mounted() {
    this.$store.commit('BottomNavigation/update', {linkPosition: 1})
  }
}
</script>

<style scoped>

</style>
