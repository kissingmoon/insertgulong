<template>
    <div id="app" class="app" >
        <remote-js :src='cnzzurl'></remote-js>
        <m-header></m-header> 
        <m-nav></m-nav>
        <tip></tip>        
        <router-view></router-view>
            <!-- <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view> -->
            
        <activity-xrkh v-show="hd_xrkh == 0"></activity-xrkh>
        <activity-qiandao v-show="hd_xrkh == 1 && hd_qiandao == 0"></activity-qiandao>
    </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import MHeader from 'components/header/m-header.vue';
import MNav from 'components/nav/m-nav.vue';
import ActivityQiandao from 'components/activity/activity-qiandao.vue';
import ActivityXrkh from 'components/activity/activity-xrkh.vue';
import Parcel from 'base/parcel/parcel';
import Tip from 'base/tip/tip';
import {session} from 'common/js/param';
import {headerConfig} from 'common/js/map';
import remoteJs from 'base/remote-js/remote-js';

export default {
    name: 'App',
    data(){
        return {
            cnzzurl: "https://s19.cnzz.com/z_stat.php?id=1274469020&web_id=1274469020"
        }
    },
    components:{
        Parcel,
        MHeader,
        MNav,
        Tip,
        ActivityQiandao,
        ActivityXrkh,
        remoteJs
    },
    created() {
        this.init();
        
    },
    mounted(){
        this.getUrl();
    },
    computed: {
        ...mapGetters([
            'user_token',
            'hd_qiandao',
            'hd_xrkh',
            'href_type',
            'account'
        ])
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
            this.getUserData();
           this.getXglhcColor();
        },
        getUrl(){
            this.sethreftype(this.$route.query.type)
        },
        getUserData(){
            if(this.dataTimes){
                clearTimeout(this.dataTimes);
            }
            this.dataTimes=setTimeout(()=>{
                if(this.user_token){
                    this.getUser();
                    this.getMessageCount();
                }
                this.getUserData();
            },20000);
        },
        ...mapActions([
            'setHeader',
            'resetUser',
            'getUser',
            'getMessageCount',
            'getXglhcColor'
        ]),
        ...mapMutations({
            sethreftype:'SET_HREF_TYPE'
        })
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
