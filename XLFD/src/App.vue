<template>
  <div id="app">
    <m-header></m-header> 
    <m-nav></m-nav>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/header/m-header.vue';
import MNav from 'components/nav/m-nav.vue'
export default {
  name: 'App',
  components:{
      MHeader,
      MNav
  }
}
</script>

<style lang="scss">
@import 'common/scss/index.scss';
@import "common/scss/icon.css";
</style>
