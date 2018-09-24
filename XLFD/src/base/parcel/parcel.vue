<template>
  <transition name="parcel">
    <slot></slot>
  </transition>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="scss">

  .parcel-enter-active, .parcel-leave-active{
    transition: all 0.3s;
  }

  .parcel-enter,.parcel-leave-to{
    transform: translate3d(100%, 0, 0);
  }
</style>
