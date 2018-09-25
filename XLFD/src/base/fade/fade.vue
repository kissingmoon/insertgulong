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
    .fade-enter-active,.parcel-leave-active{
        transition: all 0.5s ease-in;
    }

    .fade-enter,.fade-leave-to{
        opacity: 0.5;
        background-color: #fff;
        //transform: translate3d(0, 100%, 0);
        //transform: scale(0);
        //transform-origin: 50vw 100vh;
    }
</style>