<template>
    <div id="app" class="app" >
        <botToTop>
        <url-content v-show="showService"></url-content>
        </botToTop>
        <div class="headBox"><m-header  @showServEvent="showServEvent"></m-header></div>
        <div class="navBox" v-if="getFootShow">
            <m-nav></m-nav>
        </div>
        <tip></tip>        
        <!-- <router-view></router-view> -->
        <Fade>
            <keep-alive>            
                <router-view v-if="$route.meta.keepAlive"></router-view>                       
            </keep-alive>
        </Fade>
        <Fade>
            <router-view v-if="!$route.meta.keepAlive"></router-view>   
        </Fade>
            
        <activity-xrkh v-if="hd_xrkh == 0"></activity-xrkh>
        <activity-qiandao v-if="hd_xrkh == 1 && hd_qiandao == 0"></activity-qiandao>
    </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import MHeader from 'components/header/m-header.vue';
import MNav from 'components/nav/m-nav.vue';
import ActivityQiandao from 'components/activity/activity-qiandao.vue';
import ActivityXrkh from 'components/activity/activity-xrkh.vue';
import Parcel from 'base/parcel/parcel';
import Fade from 'base/fade/fade';
import botToTop from 'base/top-to-bot/top-to-bot';
import Tip from 'base/tip/tip';
import {session} from 'common/js/param';
import {headerConfig,footConfig} from 'common/js/map';
import remoteJs from 'base/remote-js/remote-js';
import UrlContent from 'components/url-content/url-content';
export default {
    name: 'App',
    data(){
        return {
            showService:false
        }
    },
    components:{
        Fade,
        Parcel,
        MHeader,
        MNav,
        Tip,
        ActivityQiandao,
        ActivityXrkh,
        remoteJs,
        UrlContent,
        botToTop
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
            'account',
            "header",
            'getFootShow'
        ])
    },
    methods:{
        showServEvent(isShow){
            this.showService=isShow;
            if(!isShow){
               
                this.setHeader(headerConfig[this.$route.path]);
                
            }
        },
        init(){
            let user_token = session('user_token') || '';
            let md5_salt = session('md5_salt') || '';
            let path=this.$router.history.current.path;
            if(path == '/betroom'){
                this.setFoot(false)
                document.body.style.backgroundColor = '#f2f2f2'
            }else{
                this.setFoot(true)
                document.body.style.backgroundColor = '#fff'
            } 
            this.resetUser({
                account:'',
                token:user_token,
                md5:md5_salt
            });
            if( this.$route.query.type == 'addType' ){
                this.setNavActive(true)
            }
            this.setHeader(headerConfig[path]);
            this.getUserData();
            this.getXglhcColor();
        },
        getUrl(){
            this.sethreftype(this.$route.query.type)    //  这个type用来识别苹果内嵌浏览器和web浏览器
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
            sethreftype:'SET_HREF_TYPE',
            setNavActive:'SET_NAV_ACTIVE',
            setFoot:'SET_FOOT_SHOW'
        })
    },
    watch:{
        $route(to) {            
            let path=to.path;
            if( to.query.type == 'addType' ){
                this.setNavActive(true)
                this.setHeader(headerConfig['/addType']);
            }else{
                console.log("path")
                this.setNavActive(false)
                this.setHeader(headerConfig[path]);
                if(path == '/betroom'){
                    this.setFoot(false)
                    document.body.style.backgroundColor = '#f2f2f2'
                }else{
                    this.setFoot(true)
                    document.body.style.backgroundColor = '#fff'
                }                
            }
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
    -webkit-overflow-scrolling: touch;    
    .headBox{
        position: fixed;
        top: 0;
        width: 100%;
        height: 1.2rem;
        z-index: 9;
    }
    .navBox{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.44rem;
        z-index: 99;
    }
}
</style>
