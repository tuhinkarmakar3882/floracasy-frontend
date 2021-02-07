<template>
  <div class="hear-the-experiences-component my-4 py-6">
    <LazySegmentTitle
      leading-paragraph="Explore hundreds of integrations for Ghost to speed up your workflow, or build your own custom integrations with our open source developer SDK"
      title="Hear From the Community"
      topic="Experiences"
    />

    <section class="quote-container">
      <blockquote>
        <img
          alt=""
          height="84"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          width="84"
        />
        <h6 class="mb-0">Arisa Landerson</h6>
        <p class="vibrant">Student</p>
        <section class="quote">
          <span class="mdi mdi-format-quote-open mdi-48px text-left my-0" />
          <p class="my-0 text-left px-1">
            <em>
              I made decisions that I regret, and I took them as learning
              experiences... I'm human, not perfect, like anybody else.
            </em>
          </p>
          <span class="mdi mdi-format-quote-close mdi-48px text-right my-0" />
        </section>
      </blockquote>
      <blockquote>
        <img
          alt=""
          height="84"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          width="84"
        />
        <h6 class="mb-0">Arisa Landerson</h6>
        <p class="vibrant">Student</p>
        <section class="quote">
          <span class="mdi mdi-format-quote-open mdi-48px text-left my-0" />
          <p class="my-0 text-left px-1">
            <em>
              I made decisions that I regret, and I took them as learning
              experiences... I'm human, not perfect, like anybody else.
            </em>
          </p>
          <span class="mdi mdi-format-quote-close mdi-48px text-right my-0" />
        </section>
      </blockquote>
      <blockquote>
        <img
          alt=""
          height="84"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          width="84"
        />
        <h6 class="mb-0">Arisa Landerson</h6>
        <p class="vibrant">Student</p>
        <section class="quote">
          <span class="mdi mdi-format-quote-open mdi-48px text-left my-0" />
          <p class="my-0 text-left px-1">
            <em>
              I made decisions that I regret, and I took them as learning
              experiences... I'm human, not perfect, like anybody else.
            </em>
          </p>
          <span class="mdi mdi-format-quote-close mdi-48px text-right my-0" />
        </section>
      </blockquote>
      <blockquote>
        <img
          alt=""
          height="84"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          width="84"
        />
        <h6 class="mb-0">Arisa Landerson</h6>
        <p class="vibrant">Student</p>
        <section class="quote">
          <span class="mdi mdi-format-quote-open mdi-48px text-left my-0" />
          <p class="my-0 text-left px-1">
            <em>
              I made decisions that I regret, and I took them as learning
              experiences... I'm human, not perfect, like anybody else.
            </em>
          </p>
          <span class="mdi mdi-format-quote-close mdi-48px text-right my-0" />
        </section>
      </blockquote>
      <blockquote>
        <img
          alt=""
          height="84"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
          width="84"
        />
        <h6 class="mb-0">Arisa Landerson</h6>
        <p class="vibrant">Student</p>
        <section class="quote">
          <span class="mdi mdi-format-quote-open mdi-48px text-left my-0" />
          <p class="my-0 text-left px-1">
            <em>
              I made decisions that I regret, and I took them as learning
              experiences... I'm human, not perfect, like anybody else.
            </em>
          </p>
          <span class="mdi mdi-format-quote-close mdi-48px text-right my-0" />
        </section>
      </blockquote>
    </section>

    <aside class="quotes-counter">
      <span class="dot active" />
      <span class="dot" />
      <span class="dot" />
      <span class="dot" />
      <span class="dot" />
    </aside>
  </div>
</template>

<script>
export default {
  name: 'HearTheExperiences',
  data() {
    return {
      points: [],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.hear-the-experiences-component {
  text-align: center;

  .quotes-counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $micro-unit;

    .dot {
      display: block;
      height: $milli-unit;
      width: $milli-unit;
      border-radius: 50%;
      background: $muted;

      &.active {
        background: $vibrant;
      }
    }
  }

  .quote-container {
    display: grid;
    grid-auto-flow: column;
    overflow: scroll;
    width: 100%;
    gap: $medium-unit;

    blockquote {
      border: none;
      border-radius: $xx-large-unit;
      width: 80vw;

      img {
        border-radius: 50%;
        box-shadow: $default-box-shadow;
        height: 2 * $xxx-large-unit;
        min-height: 2 * $xxx-large-unit;
        width: 2 * $xxx-large-unit;
        min-width: 2 * $xxx-large-unit;
        aspect-ratio: 1;
        object-fit: cover;
        margin: auto;
      }

      span {
        margin: -$standard-unit;
      }

      * {
        display: block;
      }
    }
  }
}
</style>
