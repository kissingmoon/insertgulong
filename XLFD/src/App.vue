<template>
  <div id="app" class="app">
    <m-header></m-header> 
    <m-nav></m-nav>
    <tip></tip>
    <!-- <keep-alive>
        <router-view></router-view>
    </keep-alive> -->
    <router-view></router-view>
    <div>
        <activity-qiandao></activity-qiandao>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import MHeader from 'components/header/m-header.vue';
import MNav from 'components/nav/m-nav.vue';
import ActivityQiandao from 'components/activity-qiandao/activity-qiandao.vue';
import Parcel from 'base/parcel/parcel';
import Tip from 'base/tip/tip';
import {session} from 'common/js/param';
import {headerConfig} from 'common/js/map'
export default {
    name: 'App',
    components:{
        Parcel,
        MHeader,
        MNav,
        Tip,
        ActivityQiandao
    },
    created() {
        this.init();
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
    position: relative;
    height:auto;
    overflow: hidden;
    min-height: 100%;
}
</style>
