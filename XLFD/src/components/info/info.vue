<template>
    <div class="info">
        <scroll ref="scroll" class="info-content">
            <div>
                <div class="datum-wrapper" >
                    
                    <div class="datum-img">
                        <img v-lazy="account.image_url">
                    </div>
                    <div class="datum-txt" @click="skipLink">
                        <p class="datum-login" v-show="!user_token">
                            登陆/注册
                        </p>
                        <p class="datum-name" v-show="user_token">
                            <span>{{account.nick_name}}</span>
                            <br>
                            <span class="money">{{account.user_id}}</span>
                        </p>
                        <p class="datum-arrows">
                            <i class="icon-arrows-right"></i>
                        </p>
                    </div>
                    <div class="chongzhi-txt flex flex-center">
                        <span @click="goto('/pay')" class="flex flex-center"  style="margin-right: 0.7rem;"><i class="chong"></i>充值</span>
                        <i class="v-line"></i>
                        <span @click="goto('/info/balance')" class="flex flex-center"  style="margin-left: 0.7rem;"><i class="tixian"></i>提现</span>
                    </div>
                </div>
                <div class="func-wrapper">
                    <ul>
                        <li @click="goto('/info/agency')" class="item-mode border-bottom-1px">
                            <p class="title icon-agency">我的代理</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li class="item-mode border-bottom-1px margin-bottom">
                            <p class="title icon-balance">余额</p>
                            <p class="remarks">
                                <span>{{account.balance || 0}}元</span>
                            </p>
                        </li>
                        <!-- <li @click="goto('/info/balance')" class="item-mode border-bottom-1px ">
                            <p class="title icon-withdraw">提现</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li> -->
                        <li @click="goto('/info/bill')" class="item-mode border-bottom-1px">
                            <p class="title icon-bill">账户明细</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li @click="goto('/bet')" class="item-mode border-bottom-1px">
                            <p class="title icon-bet">投注记录</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li @click="goto('/recharge')" class="item-mode border-bottom-1px">
                            <p class="title icon-recharge">充值记录</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li @click="goto('/info/cash')" class="item-mode border-bottom-1px margin-bottom">
                            <p class="title icon-deposit">提现记录</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <!-- <li @click="goto('/follow')" class="item-mode border-bottom-1px">
                            <p class="title icon-order">我的跟单</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li> -->
                        <!-- <li @click="goto('/attention')" class="item-mode border-bottom-1px margin-bottom">
                            <p class="title icon-attention">我的关注</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li> -->
                        <li @click="goto('/info/safety')" class="item-mode border-bottom-1px">
                            <p class="title icon-safety">安全中心</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <!-- <li @click=goto('/info/more') class="item-mode border-bottom-1px">
                            <p class="title icon-more">更多</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li> -->
                    </ul>
                </div>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>
<script>
    import {mapMutations,mapActions,mapGetters} from 'vuex';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
                uploadParam: {
                    uploadURL: httpUrl.info.userImg, // 上传地址
                }
            }
        },
        components: {
            Scroll
        },
        created() {
            this.getUser();
        },
        mounted(){
            // document.body.addEventListener('touchmove', function (e) {
            //     e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
            // }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
        },
        computed: {
            ...mapGetters([
                'account',
                'user_token',
                'hd_qiandao'
            ])
        },
        methods: {
            skipLink(){
                let url=this.user_token?'/info/information':"/login";
                this.$router.push({
                    path:url
                })
            },
            goto(infoUrl){
                const url = this.user_token ? infoUrl:'/login';
                this.$router.push({
                    path:url
                });
            },
            ...mapMutations({
                setAccount:'SET_ACCOUNT',
            }),
            ...mapActions([
                'getUser'
            ])
        }
    }
    
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.info{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 1.44rem;
    background:$color-bg-gray;
    .info-content{
        height: 100%;
        overflow: hidden;
        .datum-wrapper{
            height:3.5rem;
            background:$color-red;
            padding: 0.43rem 0.35rem;
            font-size: $font-size-large;
            color:#fff;
            .datum-img{
                float: left;
                height:1.76rem;
                width:1.76rem;
                border-radius: 50%;
                background:#fff;
                overflow: hidden;
                img{
                    display: block;
                    width:100%;
                }
            }
            .datum-txt{
                height: 1.76rem;
                line-height: 1.76rem;                
                padding-left:2rem;
                .datum-login{
                    float: left;
                    width:5rem;
                    @include no-wrap();
                }
                .datum-name{
                    float: left;
                    width:5rem;
                    height:1.2rem;
                    padding-top:0.3rem;
                    line-height: 0.6rem; 
                    @include no-wrap();
                    .money{
                        font-size: $font-size-medium-x;
                        color:$color-yellow;
                    }
                }
                .datum-arrows{
                    float: right;
                    height:1.76rem;
                }
            }
            .chongzhi-txt{
                height: 1rem;
                padding-top: 1rem;
                .v-line{
                    display: inline-block;
                        height: 0.8rem;
                        border-left: 1px solid #ffffff;
                        vertical-align: middle;
                }      
                span{
                   // display: inline-block;
                    width: 3.7rem;
                    border-radius: 0.1rem;
                    text-align: center;
                    background: #ffffff;
                    color: black;
                    height: 0.95rem;
                    i{
                        display: inline-block;
                        height: 0.7rem;
                        width: 0.7rem;
                        margin-right: 0.3rem;
                        background-position: left center;
                        background-size: 0.7rem;
                        background-repeat: no-repeat;
                        vertical-align: middle;
                    }
                    .chong{
                       @include bg-image('icon-chongzhi');                       
                    }
                    .tixian{
                        @include bg-image('icon-tixian');
                    }
                }
            }
            
        }
        .func-wrapper{
            height:auto;
            overflow: hidden;
            .item-mode{
                height:1.33rem;
                padding:0 0.4rem;
                background: $color-bg;
                @include border-bottom-1px(solid,$color-border-gray);
                .title{
                    float: left;
                    height: 1.33rem;
                    line-height: 1.33rem;
                    padding-left:0.92rem;
                    font-size: $font-size-medium-x;
                    background-position: left center;
                    background-size: 0.7rem;
                    background-repeat: no-repeat;
                }
                .icon-agency{
                    @include bg-image('icon-agency');
                }
                .icon-balance{
                    @include bg-image('icon-balance');
                }
                .icon-attention{
                    @include bg-image('icon-attention');
                }
                .icon-bet{
                    @include bg-image('icon-bet');
                }
                .icon-bill{
                    @include bg-image('icon-bill');
                }
                .icon-deposit{
                    @include bg-image('icon-deposit');
                }
                .icon-more{
                    @include bg-image('icon-more');
                }
                .icon-order{
                    @include bg-image('icon-order');
                }
                .icon-recharge{
                    @include bg-image('icon-recharge');
                }
                .icon-set{
                    @include bg-image('icon-set');
                }
                .icon-withdraw{
                    @include bg-image('icon-withdraw');
                }
                .icon-safety{
                    @include bg-image('icon-safety');
                }
                .remarks{
                    float:right;
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    height: 1.33rem;
                    line-height: 1.33rem;
                    color:$color-text-gray;
                    font-size: $font-size-medium-x;
                    .icon{
                        height: 1.33rem;
                        line-height: 1.33rem;
                        padding-left:0.2rem;
                    }
                }
                &.margin-bottom{
                    margin-bottom: 0.2rem;
                    @include border-bottom-1px(solid,$color-bg-white-a0);
                }
            }
        }
    }
}
</style>
