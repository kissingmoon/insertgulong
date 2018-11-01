<template>
  <transition name="botToTop">
    <slot></slot>
  </transition>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="scss">

  .botToTop-enter-active, .botToTop-leave-active{
    transition: all 0.3s;
  }

  .botToTop-enter,.botToTop-leave-to{
    transform: translate3d(0, -100%, 0);
  }
</style>