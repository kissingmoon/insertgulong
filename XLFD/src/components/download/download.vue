<!-- 下载页 -->
<template>
    <div class="wrap">
        <div class="logo"></div>
        <div class="btns flex flex-center flex-v">
            <!-- <a class="androidBtn flex flex-center" href="https://www.xlfd.com/public/soft/1120/android_xlfd.apk" download=""> -->
            <a v-if='getDownloadUrl.android_download_url' class="androidBtn flex flex-center" :href="getDownloadUrl.android_download_url" download="">
                <span class="icon androidIco"></span><em>Android下载</em>
            </a>
            <a v-if='getDownloadUrl.ios_download_url' class="iosBtn flex flex-center" @click="openIOS">
                <span class="icon iosIco"></span><em>iphone下载</em> 
            </a>
        </div>
        <div class="foot"></div>
    </div>
</template>

<script>
import {mapMutations,mapActions,mapGetters} from 'vuex';

 export default {
    name:'',
    data () {
        return {
            operateSys:""
        };
    },
    mounted(){
        this.setFootShow(false);
        this.judgeSys();
    },
    computed: {
        ...mapGetters([
            'getDownloadUrl',
        ])
    },
    methods: {
        openIOS(){
            // window.location.href='itms-services://?action=download-manifest&url=https://www.xlfd.com/static/xlfd/ios/manifest.plist'
            window.location.href=this.getDownloadUrl.ios_download_url
        },
        judgeSys(){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            this.operateSys = isAndroid?"android":"iphone";
            return this.operateSys;
        },
        ...mapMutations({
            setFootShow:'SET_FOOT_SHOW'
        })
    },
    components: {},
}
</script>

<style lang='scss' scoped>
    .wrap{
        overflow: hidden;
        font-size: .16rem;
        position: absolute;
        left: 0;
        right: 0;
        top: 1.2rem;
        bottom: 0;
        z-index: 105;
        height: 100%;
        overflow: hidden;
        background: #ffffff;
        .logo{
            width: 3rem;
            height: 3rem;
            margin: 1rem auto 1.32rem;
            background: url("logo.png") no-repeat;
            background-size: cover;
        }
        .btns >a{
            // display: block;
            width: 5rem;
            height: 1.2rem;
            border-radius: .1rem;
            border: 1px solid #979797;
            box-sizing: border-box;
            margin-top: 0.8rem;
            font-size:0.5rem;
        }
        .icon{
            display: inline-block;
            width: .7rem;
            height: .7rem;    
            margin-right: 0.5rem;
        }
        .iosIco{
            background: url("ios.png") no-repeat;
            background-size: cover;
        }
        .androidIco{
            background: url("android.png") no-repeat;
            background-size: cover;
        }
        .foot{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 5rem;
            background: url("foot.png") no-repeat;
            background-size: cover;
        }
    }
        
</style>