<template>
    <div class="level-wapper">       
        <div class="half-circle-wapper">
            <div class="title flex">
                <div class="backBox" @click="goBack"><i class="icon-arrows-left"></i></div>
                <div class="flex-1" style="padding-right: 0.4rem;" >我的等级</div>
            </div>
        </div>
        <div class="iframeBox">
            <m-iframe :url="url" ></m-iframe> 
        </div>
    </div>
</template>
<script>
import MIframe from 'base/m-iframe/m-iframe';
import {mapMutations,mapActions} from 'vuex';
 import {session} from 'common/js/param';
 import {httpUrl} from 'common/js/map';
    export default {
        data(){
            return{
                url:''
                // url:'https://www.fdppkk88900.xyz/youhui/userLevelHtml/userLevel/index.html?platform=3'     //  生产环境
                // url:'http://192.168.8.151:4000/?platform=3'   //  本地环境
            }
        },
        components:{
            MIframe
        },
        created(){
            let token = session('user_token');
            let md5_salt = session('md5_salt'); 
            let currentUrl = location.origin;  //  当前项目的地址   传送给iframe页面，以供iframe页面传送数据回来
            this.$axios.postRequest(httpUrl.config.urlList,{flag:'user_level'})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.url=res.data[0].url + '?platform=3&token=' + token + '&md5_salt=' + md5_salt + '&host=' + currentUrl;;
                }
            });
            //  监听iframe页面传送回来的数据 ， 显示客服中心页面
            window.addEventListener('message',(event) =>{                
                if( event.data == true ){
                    this.setServerShow(true)
                    this.$emit('serverShow',true) 
                    this.setHeader({
                        title:'客服中心',
                        back:true
                    })
                }
            })
        },
        methods:{
            goBack(){   
                this.$router.back();
            },
            ...mapMutations({
                setServerShow:'SET_SERVER_SHOW'
            }),
            ...mapActions([
                'setHeader'
            ]),
        }
    }
</script>
<style lang="scss" scoped>
    @import 'common/scss/variable.scss';
    @import 'common/scss/mixin.scss';
    .level-wapper{
        position: fixed;
        top:0;
        bottom: 0;
        background-color: #ffffff;
        z-index: 99;
        width: 100%;
        -webkit-overflow-scrolling:touch;
        overflow:auto;
        display: flex;
        flex-direction: column;
        .half-circle-wapper{
            height: 1.2rem;
            .title{
                width: 100%;
                height: 1.2rem;
                line-height: 1.2rem;
                font-size: $font-size-large;
                color: #ffffff;
                text-align: center;
                background-color: #43413F;
                .backBox{
                    padding: 0 .3rem;
                }
            }    
        }
        .iframeBox{
            flex:1;
            height:100%;
            overflow:hidden;
            // padding-top:.6rem;
        }
    }
    
</style>
