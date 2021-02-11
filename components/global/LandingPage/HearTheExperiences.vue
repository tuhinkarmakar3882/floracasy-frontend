<template>
  <div class="hear-the-experiences-component">
    <LazySegmentTitle
      leading-paragraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own custom integrations with our open source developer SDK"
      title="Hear From the Community"
      topic="Experiences"
    />

    <LazyCarousel
      :carousel-items="quotes"
      quote-carousel
      show-navigation-dots
      show-navigation-arrows
    />
  </div>
</template>

<script>
export default {
  name: 'HearTheExperiences',
  data() {
    return {
      quotes: [
        {
          id: 0,
          name: 'Mr. Tony Stark',
          designation: 'Iron Man',
          quote:
            "I made decisions that I regret, and I took them as learning experiences... I'm human, not perfect, like anybody else.",
          photoURL: 'https://picsum.photos/250',
        },
        {
          id: 1,
          name: 'Ms. Black Widow',
          designation: 'Shield Agent',
          quote:
            "I made decisions that I regret, and I took them as learning experiences... I'm human, not perfect, like anybody else.",
          photoURL: 'https://picsum.photos/251',
        },
        {
          id: 2,
          name: 'Mr. Steve Rogers',
          designation: 'First Avenger',
          quote:
            "I made decisions that I regret, and I took them as learning experiences... I'm human, not perfect, like anybody else.",
          photoURL: 'https://picsum.photos/252',
        },
      ],
    }
  },
}
</script>
