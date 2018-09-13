<template>
<div>
    <div v-show="qiandaoShow">
        <div class="background" ></div>
        <!-- <div class="detail">
            <div class="wf-detail-wrapper clearfix">
                <div class="detail-title">
                     <i @click="closeHd" class="icon-close-circle close-circle"></i> 
                </div>
                <div class="wf-detail-main">
                </div>
                <div class="wf-detail-close">
                    <button @click="setQiandao" v-show="btnType"></button>
                </div>
            </div>
        </div> -->
    </div>
    <div v-show="successShow">
        <div class="background" ></div>
        <div class="qiandao-suc">
            <div class="wf-detail-wrapper clearfix">
                <div class="detail-title">签到成功!</div>
                <div class="wf-detail-main">
                    恭喜您！获得<span class="yellow">{{receive_money}}</span>元
                </div>
                <div class="wf-detail-close">
                    <button @click="closeHdSuc"></button>
                </div>
            </div>
        </div>
    </div>
    <div v-show="failShow">
        <div class="background" ></div>
        <div class="qiandao-sb">
            <div class="wf-detail-wrapper clearfix">
                <!-- <div class="detail-title">签到失败!</div> -->
                <div class="wf-detail-main">
                    <div class="wf-detail-close">
                        <button @click="closeHdSuc"></button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</div>
</template>
<script type="text/ecmascript-6">
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    import Parcel from 'base/parcel/parcel';
    import {httpUrl} from 'common/js/map';
    import Scroll from 'base/scroll/scroll';
    import {session,randomWord,removeSession} from 'common/js/param';
    export default {
        data() {
            return{
                qiandaoShow:false,
                successShow:false,
                btnType:true,
                receive_money:0,
                failShow:false
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
            //this.failShow=false;
            this.btnType=true;
            
        },
        mounted(){
           this.setQiandao()
        },
        computed: {
            ...mapGetters([
                'hd_qiandao'
            ])
        },
        methods: {
            closeHd(){
                this.setHdQiandao('1')
            },
            setQiandao(){
                //this.btnType = false;
                this.$axios.postRequest(httpUrl.home.qiandao)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.qiandaoShow=false;
                        this.btnType=true;
                        this.getUser();
                        this.successShow = true;
                        this.receive_money=res.data.receive_money;
                    }else if(res.data.errorCode){
                        this.failShow=true;
                        this.qiandaoShow=false;
                    }
                })
                .catch((err) => {
                     this.btnType=true;
                });
            },
            ...mapMutations({
                setHdQiandao:'SET_HD_QIANDAO',
            }),
            ...mapActions([
                'getUser'
            ]),
            closeHdSuc(){
                this.successShow=false;
                this.failShow=false;
                this.setHdQiandao('1');
            }
        },
        watch:{
            hd_qiandao(){
                this.qiandaoShow = this.hd_qiandao == 1 ? false : true;
            }
        }
    }
</script>
<style scoped lang="scss">
    @import 'common/scss/variable.scss';
    @import 'common/scss/mixin.scss';
    .background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 400;
        background:$color-bg-shade-a5;
    }
    .detail{
        position:fixed;
        top:calc((100% - 9rem) / 2);
        left:1.2rem;
        z-index:310;
        width:7.6rem;
        height:9rem;
        overflow: hidden;
        z-index: 410;
        @include bg-image('bg-qiandao');
        background-size: 100%;
        background-position: center bottom;
        .detail-title{
            height:1.2rem;
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            color:#fff;
            line-height: 1.2rem;
            text-align: right;
            font-size: $font-size-large;
            .close-circle{
                font-size: 0.8rem;
            }
        }
        .wf-detail-wrapper{
            min-height:100%;
            .wf-detail-main{
                padding:0rem 0.4rem 0.2rem;
                overflow:auto;
                height:6.2rem;
                .win-money{
                    line-height: 0.5rem;
                    color:#fff;
                    padding-top:0.2rem;
                }
                .item-wrapper{
                    height:auto;
                    overflow: hidden;
                    padding-top: 0.4rem;
                    line-height: 0.5rem;
                    p{
                        height:auto;
                        overflow: hidden;
                        line-height: 0.5rem;
                        &.title{
                            color:$color-yellow;
                        }
                        &.txt{
                            color:#fff;
                        }
                    }

                }
            }
            .wf-detail-close{
                position:relative;
                margin:0 auto;
                height:1rem;
                width:100%;
                padding-top:0.1rem;
                text-align: center;
                clear:both;
                button{
                    height:0.96rem;
                    width:4rem;
                    border:0;
                    text-align: center;
                    background:none;
                    color: $color-yellow;
                    font-size: $font-size-large-x;
                    padding:0;
                    margin: 0;
                    //@include bg-image('btn-qiandao');
                    background-size: 100%;
                    background-position: center bottom;
                }
            }
        }
    }
    .qiandao-suc{
        position:fixed;
        top:calc((100% - 9rem) / 2);
        left:1.2rem;
        z-index:410;
        width:7.6rem;
        height:9rem;
        overflow: hidden;
        @include bg-image('bg-qiandao-cg');
        background-size: 100%;
        background-position: center bottom;
        .detail-title{
            height:1.2rem;
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            color:#fff;
            line-height: 1.2rem;
            text-align: center;
            font-size: $font-size-large-xx;
        }
        .wf-detail-wrapper{
            min-height:100%;
            .wf-detail-main{
                padding:0rem 0.4rem 0.2rem;
                overflow:auto;
                height:5rem;
                color:#fff;
                text-align: center;
                font-size: $font-size-large;
                .yellow{
                    color:$color-yellow;
                }
            }
            .wf-detail-close{
                position:relative;
                margin:0 auto;
                height:1rem;
                width:100%;
                padding-top:0.1rem;
                text-align: center;
                clear:both;
                button{
                    height:0.96rem;
                    width:4rem;
                    border:0;
                    text-align: center;
                    background:none;
                    color: $color-yellow;
                    font-size: $font-size-large-x;
                    padding:0;
                    margin: 0;
                    @include bg-image('btn-qiandao-suc');
                    background-size: 100%;
                    background-position: center bottom;
                }
            }
        }
        
        
    }
    .qiandao-sb{
        position:fixed;
        top:calc((100% - 9rem) / 2);
        left:1.2rem;
        z-index:410;
        width:7.6rem;
        height:9rem;
        overflow: hidden;
        .detail-title{
            height:1.2rem;
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            color:#fff;
            line-height: 1.2rem;
            text-align: center;
            font-size: $font-size-large-xx;
        }
        .wf-detail-wrapper{
            min-height:100%;
            .wf-detail-main{
                padding:0.9rem 0.4rem 0.2rem;
                overflow:auto;
                height:5rem;
                color:#fff;
                text-align: center;
                font-size: $font-size-large;                
                @include bg-image('bg-qiandao-sb');
                background-size: 100%;
                background-position: center bottom;
                background-repeat: no-repeat;
                .yellow{
                    color:$color-yellow;
                }
                .wf-detail-close{
                    position: absolute;;
                    height:1.2rem;
                    width:90%;
                    margin: 0 auto;
                    padding-top:0.1rem;
                    text-align: center;
                    top:4.7rem;
                    //top:3.9rem;
                    button{
                        height:1.1rem;
                        width:4rem;
                        border:0;
                        text-align: center;
                        background:none;
                        color: $color-yellow;
                        font-size: $font-size-large-x;
                        padding:0;
                        margin: 0;
                        background-size: 100%;
                        background-position: center bottom;
                    }
                }
            }
        }
        
        
    }
</style>
