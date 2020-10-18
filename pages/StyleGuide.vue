<template>
  <div class="style-guide-page">
    <h1 class="text-center" style="font-size: 32px">Style Guide</h1>
    <hr />
    <h3>Would you like to join us?</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad cum
      enim eveniet, expedita fuga illum laborum natus non omnis pariatur
      provident quaerat qui quidem quos tempora ullam vitae voluptatem!
    </p>
    <br />
    <div class="buttons">
      <div class="normal text-center">
        <RippleButton button-text="Primary Button" class-list="primary-btn" />
        <RippleButton
          button-text="Secondary Button"
          class-list="secondary-btn"
        />
        <RippleButton button-text="Success Button" class-list="success-btn" />
        <RippleButton button-text="Danger Button" class-list="danger-btn" />
        <RippleButton button-text="Info Button" class-list="info-btn" />
        <RippleButton button-text="Muted Button" class-list="muted-btn" />
        <RippleButton
          button-text="Disabled Button"
          class-list="disabled-btn"
          :disabled="true"
        />
      </div>
      <div class="outlined text-center">
        <RippleButton
          button-text="Primary Button"
          class-list="primary-outlined-btn"
        />
        <RippleButton
          button-text="Secondary Button"
          class-list="secondary-outlined-btn"
        />
        <RippleButton
          button-text="Success Button"
          class-list="success-outlined-btn"
        />
        <RippleButton
          button-text="Danger Button"
          class-list="danger-outlined-btn"
        />
        <RippleButton
          button-text="Info Button"
          class-list="info-outlined-btn"
        />
        <RippleButton
          button-text="Muted Button"
          class-list="muted-outlined-btn"
        />
        <RippleButton
          button-text="Disabled Button"
          class-list="disabled-btn"
          :disabled="true"
        />
      </div>
    </div>

    <hr />

    <br /><br /><br /><br />

    <h1>This is a sample heading H1</h1>
    <h2>This is a sample heading H2</h2>
    <h3>This is a sample heading H3</h3>
    <h4>This is a sample heading H4</h4>
    <h5>This is a sample heading H5</h5>
    <h6>This is a sample heading H6</h6>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the
      majority have suffered alteration in some form, by injected humour, or
      randomised words which don't look even slightly believable. If you are
      going to use a passage of Lorem Ipsum, you need to be sure there isn't
      anything embarrassing hidden in the middle of text. All the Lorem Ipsum
      generators on the Internet tend to repeat predefined chunks as necessary,
      making this the first true generator on the Internet. It uses a dictionary
      of over 200 Latin words, combined with a handful of model sentence
      structures, to generate Lorem Ipsum which looks reasonable. The generated
      Lorem Ipsum is therefore always free from repetition, injected humour, or
      non-characteristic words etc. There are many variations of passages of
      Lorem Ipsum available, but the majority have suffered alteration in some
      form, by injected humour, or randomised words which don't look even
      slightly believable. If you are going to use a passage of Lorem Ipsum, you
      need to be sure there isn't anything embarrassing hidden in the middle of
      text. All the Lorem Ipsum generators on the Internet tend to repeat
      predefined chunks as necessary, making this the first true generator on
      the Internet. It uses a dictionary of over 200 Latin words, combined with
      a handful of model sentence structures, to generate Lorem Ipsum which
      looks reasonable. The generated Lorem Ipsum is therefore always free from
      repetition, injected humour, or non-characteristic words etc. There are
      many variations of passages of Lorem Ipsum available, but the majority
      have suffered alteration in some form, by injected humour, or randomised
      words which don't look even slightly believable. If you are going to use a
      passage of Lorem Ipsum, you need to be sure there isn't anything
      embarrassing hidden in the middle of text. All the Lorem Ipsum generators
      on the Internet tend to repeat predefined chunks as necessary, making this
      the first true generator on the Internet. It uses a dictionary of over 200
      Latin words, combined with a handful of model sentence structures, to
      generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
      therefore always free from repetition, injected humour, or
      non-characteristic words etc.
    </p>
  </div>
</template>

<script>
import RippleButton from '~/components/global/RippleButton'

export default {
  name: 'StyleGuide',
  components: { RippleButton },
}
</script>
