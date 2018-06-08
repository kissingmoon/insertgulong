<template>
    <div class="order-list">
        <ul>
            <li class="item-mode border-1px" v-for="item in data">
                <div class="importance">
                    <div class="imp-left">
                        <div class="brokerage-surplus-wrapper">
                            <div class="brokerage-surplus">
                                <p class="brokerage">佣金:{{item.commission}}%</p>
                                <p class="surplus">
                                    <span>追号{{item.zhuih_count_qs}}期</span>
                                    <span>剩{{item.left_qh_count}}期</span>
                                    <span v-show="item.zhuih_win_stop == 1">中奖即停</span>
                                </p>
                            </div>
                            <div class="status" v-show="item.finish_status">

                            </div>
                        </div>
                        <div class="type-tip">
                            <div class="type">
                                <span>{{item.lottery_name}}</span>
                                <span>{{item.wf_name}}</span>
                            </div>
                            <div class="tip">
                                {{item.content}}
                            </div>
                        </div>
                    </div>
                    <div class="imp-right">
                        <div class="rate">回报率:{{item.back_rate}}%</div>
                        <div class="least">{{item.bet_min_money}}元起投</div>
                        <div class="order-status-ing" v-show="item.finish_status == 0">
                            <span>正在跟单</span>
                        </div>
                        <div class="order-status-end" v-show="item.finish_status == 1">
                            <span>胜利</span><br>
                            <span>￥{{item.create_value}}</span>
                        </div>
                    </div>
                </div>
                <div class="minor">
                    <div class="minor-left">
                        <p class="own">自购{{item.user_pay_money}}元</p>
                        <p class="people-num">跟单{{item.gd_total_people}}人</p>
                    </div>
                    <div class="minor-right">
                        <span>当前跟单金额{{item.gd_total_money}}元</span>
                    </div>
                </div>
            </li>
        </ul>
        <loading v-show="!data.length"></loading>
    </div>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Loading from 'base/loading/loading';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    export default {
        data() {
            return{
            }
        },
        props:{
            data: {
                type: [Array,Object,String],
                default: null
            }
        },
        components:{
            Loading,
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

