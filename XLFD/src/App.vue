<template>
    <div id="app" class="app" >
        
        <botToTop>
        <url-content v-show="showService" ref="serviceComp" v-if="isServerShow"></url-content>
        </botToTop>
        <div class="headBox">
            <div v-show="showDownload&&$route.path=='/home'" v-if="isHave" class="download-content flex flex-align-center flex-pack-justify"> 
                <i @click="close('isHave')" class="home-close"></i>
                <i class="home-logo"></i>
                <span>下载app 更多惊喜活动等您来拿</span>
                <router-link class="download-btn" to="/download"  @click="close('isHave')">APP下载</router-link>
            </div>
            <m-header  @showServEvent="showServEvent" @serverShow="serverShow"></m-header>
        </div>
        <div class="navBox" v-if="getFootShow">
            <m-nav></m-nav>
        </div>
        <tip></tip> 
        <loading v-if="getLoadingShow"></loading>         
        <!-- <router-view></router-view> -->
        <Fade>
            <keep-alive>            
                <router-view :showDownload="showDownload" v-if="$route.meta.keepAlive"></router-view>                       
            </keep-alive>
        </Fade>
        <Fade>
            <router-view v-if="!$route.meta.keepAlive"></router-view>   
        </Fade>
        <activity-xrkh v-if="hd_xrkh == 0"></activity-xrkh>
        <activity-qiandao v-if="hd_xrkh == 1 && hd_qiandao == 0"></activity-qiandao>
        <bg-model v-if="getModelShow" :close="getClose"></bg-model>
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
import {session,local} from 'common/js/param';
import {headerConfig,footConfig} from 'common/js/map';
import remoteJs from 'base/remote-js/remote-js';
import UrlContent from 'components/url-content/url-content';
import Loading from 'base/loading/loading';
import BgModel from 'base/bg-model/bg-model';
import {httpUrl} from 'common/js/map';

export default {
    name: 'App',
    data(){
        return {
            showService:false,
            isServerShow:true,
            getClose:["SET_HEARDERADD_SHOW","SET_MODEL_SHOW"],
            showDownload:true,
            docScroll:0,
            isHave:true,
            fromUrl:""
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
        botToTop,
        Loading,
        BgModel
    },
    created() {   
        this.init();
        this.initScrollFun();
        this.getDownloadUrl();
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
            'getFootShow',
            'getLoadingShow',
            'getHeaderAdd',
            'getModelShow'
        ])
    },
    methods:{
        serverShow(bool){
            this.isServerShow = bool
        },
        showServEvent(isShow){
            this.showService=isShow;
            let obj = {}
            obj.title = this.$route.query.name;
            obj.back = true;
            obj.record = true;
            obj.add = true;
            let headObj = Object.assign({},headerConfig[this.$route.path],obj) ;
            if(!isShow){
                if(this.$route.path == '/betroom'){
                    this.setHeader(headObj);
                    this.setHeader(headObj);
                    return;
                }
               
                this.setHeader(headerConfig[this.$route.path]);
                
            }
        },
        init(){
            let user_token = session('user_token') || '';
            let md5_salt = session('md5_salt') || '';
            let path=this.$router.history.current.path;
            let goBack=this.$route.query.goBack;
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
            this.setIOSGoBack(goBack);
            session('goBack',goBack);
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
        initScrollFun(){
            window.onscroll= ()=>{
                this.docScroll = document.documentElement.scrollTop||document.body.scrollTop;
                if(this.isHave){
                    if(this.docScroll>50){
                        this. close("showDownload")
                    }else{
                        this. open("showDownload")
                    }
                }
            }
        },
        getDownloadUrl(){
             this.$axios.postRequest(httpUrl.config.urlList)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    let downloadUrl = {};
                    res.data.map((v,k)=>{
                        if(v.flag == "android_download_url"){
                            downloadUrl["android_download_url"]=v.url;
                        }
                        if(v.flag == "ios_download_url"){
                            downloadUrl["ios_download_url"]=v.url;
                        }
                    });
                    this.setDownloadUrl(downloadUrl);
                }
            });
        },
        close(key){
            this[key] = false;
            if(key=="isHave"){
                this.showDownload=false;
            }
        },
        open(key){
            this[key] = true;
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
            setFoot:'SET_FOOT_SHOW',
            setIOSGoBack:'SET_IOS_GOBACK',
            setDownloadUrl:'SET_DOWNLOAD_URL'
        })
    },
    watch:{
        $route(to) {            
            let path=to.path;
            if( to.query.type == 'addType' ){
                this.setNavActive(true)
                this.setHeader(headerConfig['/addType']);
            }else{
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
        z-index: 101;
        .download-content{
            background-color: #eaeaea;
            padding: 0.2rem 0.5rem 0.2rem 0.1rem;
            i{
                background-size: cover;
                background-repeat: no-repeat;
                display: inline-block;
            }
            .home-close{
            
                width: 0.5rem;
                height: 0.5rem;
                background-image: url("./common/img/home-close.png")
            }
            .home-logo{
                
                width: .8rem;
                height: 0.8rem;
                background-image: url("./common/img/home-logo.png")
            }
            .download-btn{
                background: #DA1C36;
                border-radius: 0.1rem;
                color: #ffffff;
                padding: 0.15rem 0.1rem;
            }
        }
        
    }
    .navBox{
        // position: fixed;
        // bottom: 0;
        // width: 100%;
        // height: 1.44rem;
        // z-index: 99;
        // padding-bottom: .34rem;
    }
}
</style>
