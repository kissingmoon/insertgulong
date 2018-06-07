<template>
  <div id="app" class="app">
    <m-header></m-header> 
    <m-nav></m-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
import MHeader from 'components/header/m-header.vue';
import MNav from 'components/nav/m-nav.vue';
import Parcel from 'base/parcel/parcel';
import {session} from 'common/js/param';
export default {
    name: 'App',
    components:{
        Parcel,
        MHeader,
        MNav
    },
    created() {
        this.init();
    },
    methods:{
        init(){
            let user_token = session('user_token') || '';
            let md5_salt = session('md5_salt') || '';
            this.setUserToken(user_token);
            this.setMd5Salt(md5_salt);
        },
        ...mapMutations({
            setUserToken: 'SET_USER_TOKEN',
            setMd5Salt: 'SET_MD5_SALT'
        })
    }
}
</script>

<style lang="scss">
@import 'common/scss/index.scss';
@import "common/scss/icon.css";
.app{
    height:auto;
    overflow: hidden;
    min-height: 100%;
}
</style>
