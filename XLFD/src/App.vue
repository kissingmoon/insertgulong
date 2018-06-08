<template>
  <div id="app" class="app">
    <m-header></m-header> 
    <m-nav></m-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import MHeader from 'components/header/m-header.vue';
import MNav from 'components/nav/m-nav.vue';
import Parcel from 'base/parcel/parcel';
import {session} from 'common/js/param';
import {headerConfig} from 'common/js/map'
export default {
    name: 'App',
    components:{
        Parcel,
        MHeader,
        MNav
    },
    created() {
        this.init();
        console.log(this.$router);
    },
    methods:{
        init(){
            let user_token = session('user_token') || '';
            let md5_salt = session('md5_salt') || '';
            let path=this.$router.history.current.path;
            this.resetUser({
                account:'',
                token:user_token,
                md5:md5_salt
            });
            this.setHeader(headerConfig[path]);

        },
        ...mapActions([
            'setHeader',
            'resetUser'
        ])
    },
    watch:{
        $route(to) {
            let path=to.path;
            this.setHeader(headerConfig[path]);
        }
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
