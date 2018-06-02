<template>
    <div class="info">
        <scroll ref="scroll" class="info-content">
            <div>
                <div class="datum-wrapper">
                    <div class="datum-img">
                        <img src="" alt="">
                    </div>
                    <div class="datum-txt">
                        <p class="datum-login">
                            登陆/注册
                        </p>
                        <p class="datum-name">
                            <span>
                                小黑爷爷
                            </span>
                            <br>
                            <span class="money">
                                charlie
                            </span>
                        </p>
                        <p class="datum-arrows">
                            <i class="icon-arrows-right"></i>
                        </p>
                    </div>
                </div>
                <div class="func-wrapper">
                    <ul>
                        <li class="item-mode border-1px">
                            <p class="title icon-balance">余额</p>
                            <p class="remarks">
                                <span>254186.3元</span>
                            </p>
                        </li>
                        <li class="item-mode border-1px margin-bottom">
                            <p class="title icon-withdraw">提现</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li class="item-mode border-1px">
                            <p class="title icon-bill">账户明细</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li class="item-mode border-1px">
                            <p class="title icon-bet">投注记录</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li class="item-mode border-1px">
                            <p class="title icon-recharge">充值记录</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li class="item-mode border-1px">
                            <p class="title icon-deposit">提现记录</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li class="item-mode border-1px">
                            <p class="title icon-order">我的跟单</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li class="item-mode border-1px margin-bottom">
                            <p class="title icon-attention">我的关注</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li class="item-mode border-1px">
                            <p class="title icon-safety">安全中心</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                        <li class="item-mode border-1px">
                            <p class="title icon-more">更多</p>
                            <p class="remarks">
                                <span><i class="icon-arrows-right icon"></i></span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>

    </div>
</template>
<script>
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    import {reData,session,randomWord} from 'common/js/param';
    export default{
        data() {
            return{
                paramData:{},
                loginParam:{
                    code_id:'2154',
                    code:'',
                    user_id:'',
                    password:''
                },
                codeUrl:'http://www.xlfdapi.com/config/generator-code?code_id=2154'
            }
        },
        components: {
            Scroll
        },
        created() {
        },
        methods: {
        }
    }
    
</script>
<style lang="scss">
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
            height:1.78rem;
            background:$color-bg-theme;
            padding: 0.43rem 0.35rem;
            font-size: $font-size-large;
            color:#fff;
            .datum-img{
                float: left;
                height:1.76rem;
                width:1.76rem;
                border-radius: 50%;
                background:#fff;
            }
            .datum-txt{
                height: 1.76rem;
                line-height: 1.76rem;                
                padding-left:2rem;
                .datum-login{
                    display: none;
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
                        color:$color-text-yellow;
                    }
                }
                .datum-arrows{
                    float: right;
                    height:1.76rem;
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
                @include border-1px($color-border-gray);
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
                    @include border-1px($color-bg-white-a0);
                }
            }
        }
    }

}
</style>
