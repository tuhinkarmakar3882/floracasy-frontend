<template>
  <div>
    <ins :data-ad-slot=adSlotNumber
         class="adsbygoogle"
         data-ad-client="ca-pub-3869785327224690"
         data-ad-format="auto"
         data-full-width-responsive="true"
         style="display:block">

    </ins>
  </div>
</template>

<script>
export default {
  name: "AdvertisementUnit",
  props: ['adSlotNumber'],

}
</script>

<style scoped>

</style>
