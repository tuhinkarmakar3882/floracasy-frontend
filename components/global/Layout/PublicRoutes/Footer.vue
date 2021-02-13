<template>
  <footer class="full-width">
    <section class="py-8"></section>

    <section class="text-center">
      <a href="#">Back to Top</a>
    </section>
  </footer>
</template>

<script lang="js">

export default {
  name: 'Footer',
  data: () => {
    return {
      points: [
        'Enjoy Affordable Pro Perks1',
        'Enjoy Affordable Pro Perks2',
        'Enjoy Affordable Pro Perks3',
        'Enjoy Affordable Pro Perks4',
      ],
      joinUsButtonLoading: false,
    }
  },
  methods: {
    changeIt() {
      this.joinUsButtonLoading = true
      setTimeout(() => {
        this.thisjoinUsButtonLoading = false
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

footer {
  background-color: $footer-background;
  width: 100%;

  .contact-us {
    ul {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-column-gap: $nano-unit;
    }
  }
}
</style>
