<template>
  <div class="style-guide-page">
    <h1 class="text-center" style="font-size: 32px">Style Guide</h1>
    <hr />

    <Dropdown class="mx-8">
      <template v-slot:dropdown-text> Options</template>
      <template v-slot:options>
        <li v-ripple>Hello</li>
        <li v-ripple>Hey</li>
        <li v-ripple>Yo!</li>
        <li class="list-divider" />
        <li v-ripple>Hello</li>
        <li v-ripple>Hey</li>
        <li v-ripple>Yo!</li>
      </template>
    </Dropdown>

    <h3>Would you like to join us?</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad cum
      enim eveniet, expedita fuga illum laborum natus non omnis pariatur
      provident quaerat qui quidem quos tempora ullam vitae voluptatem!
    </p>
    <br />
    <div class="buttons">
      <RippleButton class-list="my-4 mx-4 primary-btn">Primary</RippleButton>
      <RippleButton class-list="my-4 mx-4 secondary-btn" color="primary">
        Secondary
      </RippleButton>
      <RippleButton class-list="my-4 mx-4 success-btn"> Success</RippleButton>
      <RippleButton class-list="my-4 mx-4 danger-btn"> Danger</RippleButton>
      <RippleButton class-list="my-4 mx-4 info-btn"> Info</RippleButton>
      <RippleButton class-list="my-4 mx-4 muted-btn"> Muted</RippleButton>
      <RippleButton class-list="my-4 mx-4 disabled-btn" :disabled="true">
        Disabled
      </RippleButton>
      <RippleButton class-list="my-4 mx-4 primary-outlined-btn"
        >Primary
      </RippleButton>
      <RippleButton class-list="my-4 mx-4 secondary-outlined-btn">
        Secondary
      </RippleButton>
      <RippleButton class-list="my-4 mx-4 success-outlined-btn"
        >Success
      </RippleButton>
      <RippleButton class-list="my-4 mx-4 danger-outlined-btn"
        >Danger
      </RippleButton>
      <RippleButton class-list="my-4 mx-4 info-outlined-btn">Info</RippleButton>
      <RippleButton class-list="my-4 mx-4 muted-outlined-btn"
        >Muted
      </RippleButton>
      <RippleButton
        class-list="my-4 mx-4 primary-btn"
        :loading="loadingBtn"
        :on-click="sampleLoading"
      >
        Loading
      </RippleButton>
    </div>

    <hr class="my-8" />

    <section>
      <h1 class="my-4">This is a sample heading H1</h1>
      <h2 class="my-4">This is a sample heading H2</h2>
      <h3 class="my-4">This is a sample heading H3</h3>
      <h4 class="my-4">This is a sample heading H4</h4>
      <h5 class="my-4">This is a sample heading H5</h5>
      <h6 class="my-4">This is a sample heading H6</h6>
      <small class="my-4">
        This is a small Text, that can be used for adding times
      </small>
      <p class="my-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
        laudantium magnam magni natus omnis. Esse in odit praesentium quod
        ratione saepe sit suscipit vitae. Autem ipsam necessitatibus porro sint
        temporibus?
      </p>
    </section>
  </div>
</template>

<script>
import Dropdown from '@/components/global/Dropdown'
import RippleButton from '~/components/global/RippleButton'

export default {
  name: 'StyleGuide',
  components: { Dropdown, RippleButton },
  data() {
    return {
      loadingBtn: false,
    }
  },
  methods: {
    sampleLoading() {
      // eslint-disable-next-line no-console
      console.log('toggling')
      this.loadingBtn = true
      setTimeout(() => {
        this.loadingBtn = false
      }, 5000)
    },
  },
}
</script>
