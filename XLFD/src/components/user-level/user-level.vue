<template>
    <div class="level-wapper">       
        <div class="half-circle-wapper">
            <div class="title flex">
                <div class="backBox" @click="goBack"><i class="icon-arrows-left"></i></div>
                <div class="flex-1" style="padding-right: 0.4rem;" >我的等级</div>
            </div>
        </div>
        <div class="iframeBox">
            <m-iframe :url="url"></m-iframe> 
        </div>
    </div>
</template>
<script>
import MIframe from 'base/m-iframe/m-iframe';
import {mapMutations,mapActions} from 'vuex';
 import {session} from 'common/js/param';
    export default {
        data(){
            return{
                // url:'https://www.fdppkk88900.xyz/youhui/userLevelHtml/userLevel/index.html?platform=3'
                url:'http://192.168.8.151:4000/?platform=3'
            }
        },
        components:{
            MIframe
        },
        created(){
            let token = session('user_token');
            let md5_salt = session('md5_salt');
            this.url = this.url + '&token=' + token + '&md5_salt=' + md5_salt;
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
