<template>
    <div class="pay">
        <m-iframe :url="url"></m-iframe>
        <!-- <m-object :data="url"></m-object> -->
        <!-- <div id='payiframe'></div> -->
        <!-- <m-embed :data="url"  class="iframe"></m-embed> -->
        <div v-show="!user_token.length" class="login-tip-wrapper">
            <div class="login-tip">
                <div class="img">

                </div>
                <router-link tag="div" to="/login" class="btn">
                    请登录后进行充值
                </router-link>
            </div>
        </div>
        <router-view></router-view>
        <bottom-tip v-if="showbtip" @closebtip='closebtip'></bottom-tip>
    </div>
</template>
<script>
    import {httpUrl} from 'common/js/map';
    import {mapGetters} from 'vuex';
    import MIframe from 'base/m-iframe/m-iframe';
    import MObject  from 'base/m-object/m-object';
    import MEmbed  from 'base/m-embed/m-embed';
    import bottomTip  from 'base/bottom-tip/bottom-tip';
    
    export default {
        data(){
            return{
                url:'',
                showbtip:false
            }
        },
        created(){
            
            this.getPayUrl();
            document.body.addEventListener('touchmove', function (e) {
                e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
            }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
        },
        mounted(){
            // document.body.addEventListener('touchmove', function (e) {
            //     e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
            // }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
            
        },
        components:{
            MIframe,
            MObject,
            MEmbed,
            bottomTip
        },
        computed: {
            ...mapGetters([
                'user_token',
                'href_type'
            ])
        },
        methods:{
            getPayUrl(){
                // this.$axios.postRequest(httpUrl.config.urlList,{flag:'recharge_url'})
                //注释掉苹果浏览器显示底部温馨提示的代码
                // if(this.user_token){
                //     this.judgeType();
                // }            
                this.$axios.postRequest(httpUrl.pay.chargeUrl)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        //this.url=`${res.data[0].url}?user_token=${this.user_token}`   
                        var str=this.href_type?("&type="+this.href_type):""    
                        this.url=`${res.data.url}?user_token=${this.user_token}${str}`
                        // console.log(this.url)
                        //         this.$axios.testget(`/payment/youhui/0427/index.html?user_token=${this.user_token}`).then((res)=>{
                        //             document.getElementById('payiframe').innerHTML=res.data
                        //             console.log(res.data)
                        //         })
                        // if(this.user_token){
                        //     window.open(this.url); 
                        // }
                    }
                });
            },
            judgeType(){            
                if(this.href_type){
                    var userAgent = navigator.userAgent;                                   
                    if (userAgent.indexOf("Safari") == -1) {//如果不是safari浏览器
                        this.showbtip=true; 
                    } 
                }
            },
            closebtip(){
                this.showbtip=false;


                
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.pay{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 1.44rem;
    z-index: 101;
    background: #fff;
    .login-tip-wrapper{
        position: fixed;
        top: 1.2rem;
        bottom: 1.44rem;
        width: 100%;
        background: #fff;
        z-index: 102;
        .login-tip{
            width:5rem;
            height:auto;
            overflow: hidden;
            margin: 0 auto;
            margin-top:calc((100% - 5rem)/2);
            .img{
                width:5rem;
                height:5rem;
                @include bg-image('icon-em');
                background-position: center bottom;
                background-size: 5rem;
                background-repeat: no-repeat;
            }
            .btn{
                height:1rem;
                width:86%;
                border:1px solid $color-red;
                line-height: 1rem;
                text-align: center;
                font-size: $font-size-medium-x;
                margin: 0 auto;
            }
        }
    }
    
}
</style>
