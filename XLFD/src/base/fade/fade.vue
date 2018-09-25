/*
 * @Author: lava 
 * @Date: 2018-09-25 14:50:51 
 * @Last Modified by: lava
 * @Last Modified time: 2018-09-25 15:48:15
 */
<template>
    <transition name="fade">
        <slot></slot>
    </transition>
</template>

<script>

</script>

<style lang='scss' scoped>
    .fade-enter-active{
        transition: all 0.3s ease-in-out;
    }

    .fade-enter,.fade-leave-to{
        //opacity: 0;
        //transform: translate3d(0, 100%, 0);
        transform: translateY(100%);
        transform: scale(0);
        transform-origin: 50% 100%;
    }
</style>