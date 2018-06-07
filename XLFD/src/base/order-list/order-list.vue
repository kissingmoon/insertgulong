<template>
    <div class="order-list">
        <ul>
            <li class="item-mode border-1px">
                <div class="importance">
                    <div class="imp-left">
                        <div class="brokerage-surplus-wrapper">
                            <div class="brokerage-surplus">
                                <p class="brokerage">佣金:10%</p>
                                <p class="surplus">
                                    <span>追号12期</span>
                                    <span>剩42期</span>
                                    <span>中奖即停</span>
                                </p>
                            </div>
                            <div class="status">

                            </div>
                        </div>
                        <div class="type-tip">
                            <div class="type">
                                <span>重庆时时彩</span>
                                <span>五星定位胆</span>
                            </div>
                            <div class="tip">
                                跟投必中，跟投必中，跟投必中，跟投必中,跟投必中，跟投必中
                            </div>
                        </div>
                    </div>
                    <div class="imp-right">
                        <div class="rate">回报率:85%</div>
                        <div class="least">2元起投</div>
                        <div class="order-status-ing">
                            <span>正在跟单</span>
                        </div>
                    </div>
                </div>
                <div class="minor">
                    <div class="minor-left">
                        <p class="own">自购215454.21元</p>
                        <p class="people-num">跟单64人</p>
                    </div>
                    <div class="minor-right">
                        <span>当前跟单金额878454.32元</span>
                    </div>
                </div>
            </li>
            <li class="item-mode border-1px">
                <div class="importance">
                    <div class="imp-left">
                        <div class="brokerage-surplus-wrapper">
                            <div class="brokerage-surplus">
                                <p class="brokerage">佣金:10%</p>
                                <p class="surplus">
                                    <span>追号10期</span>
                                    <span>剩4期</span>
                                    <span>中奖即停</span>
                                </p>
                            </div>
                            <div class="status">

                            </div>
                        </div>
                        <div class="type-tip">
                            <div class="type">
                                <span>重庆时时彩</span>
                                <span>五星定位胆</span>
                            </div>
                            <div class="tip">
                                跟投必中，跟投必中，跟投必中，跟投必中,跟投必中，跟投必中
                            </div>
                        </div>
                    </div>
                    <div class="imp-right">
                        <div class="rate">回报率:85%</div>
                        <div class="least">2元起投</div>
                        <div class="order-status-end">
                            <span>胜利</span><br>
                            <span>￥132624.32</span>
                        </div>
                    </div>
                </div>
                <div class="minor">
                    <div class="minor-left">
                        <p class="own">自购215454.21元</p>
                        <p class="people-num">跟单64人</p>
                    </div>
                    <div class="minor-right">
                        <span>当前跟单金额878454.32元</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    export default{
        data() {
            return{
            }
        },
        components:{
            Parcel,
            Scroll
        },
        created() {
        },
        methods: {
        
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.order-list{
    height: auto;
    overflow: hidden;
    .item-mode{
        position: relative;
        height:auto;
        overflow: hidden;
        padding:0.3rem;
        background: $color-bg;
        @include border-1px($color-border-gray);
        font-size:$font-size-small-x;
        .importance{
            height:auto;
            overflow: hidden;
            .imp-left{
                float: left;
                width:6.8rem;
                height:auto;
                .brokerage-surplus-wrapper{
                    height:1.47rem;
                    .brokerage-surplus{
                        float: left;
                        width:4rem;
                        .brokerage,.surplus{
                            height:0.5rem;
                            line-height: 0.5rem;
                            color:$color-text-gray;
                            @include no-wrap();
                        }
                    }
                    .status{
                        float:right;
                        height:1.47rem;
                        width:1.44rem;
                        background-repeat: no-repeat;
                        background-size: 100%;
                        margin-right: 0.5rem;
                        @include bg-image('icon-finish');
                    }

                }
                .type-tip{
                    height:1rem;
                    width:100%;
                    .type{
                        height:0.5rem;
                        @include no-wrap();
                        color:$color-text-gray;
                    }
                    .tip{
                        height:0.5rem;
                        @include no-wrap();
                    }
                }
            }
            .imp-right{
                float:right;
                width:2.2rem;
                height:auto;
                text-align: right;
                .rate,.least{
                    height:0.5rem;
                    line-height: 0.5rem;
                }
                .order-status-end{
                    height:0.92rem;
                    margin-top: 0.1rem;
                    padding: 0.1rem 0;
                    border-radius: 0.1rem;
                    background:#E8E8E8;
                    text-align: center;
                    line-height: 0.46rem;
                }
                .order-status-ing{
                    height:0.7rem;
                    margin-top: 0.5rem;
                    border-radius: 0.1rem;
                    background:$color-bg-theme;
                    text-align: center;
                    line-height: 0.7rem;
                    color:#fff;
                }
            }
        }
        .minor{
            height:auto;
            overflow: hidden;
            .minor-left{
                float: left;
                width:4.8rem;
                .own{
                    float: left;
                }
                .people-num{
                    float:right;
                }
            }
            .minor-right{
                float: right;
                width:4.2rem;
                text-align: right;
                @include no-wrap();
            }
        }
    }
}
</style>

