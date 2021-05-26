<template>
  <section class="user-results-skeleton">
    <ImageSkeleton height="80px" radius="50%" width="80px" />

    <main>
      <LineSkeleton />
      <LineSkeleton class="my-2" />
      <LineSkeleton width="40%" />
    </main>
  </section>
</template>

<script>
import ImageSkeleton from '~/components/Common/SkeletonLoader/ImageSkeleton'
import LineSkeleton from '~/components/Common/SkeletonLoader/LineSkeleton'
export default {
  name: 'UserResultSkeleton',
  components: { LineSkeleton, ImageSkeleton },
}
</script>

<style lang="scss" scoped>
@import 'assets/all-variables';

.user-results-skeleton {
  display: grid;
  grid-template-columns: 80px 1fr;
  grid-gap: $milli-unit;
  align-items: center;
}
</style>
