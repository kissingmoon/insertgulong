<template>
    <div class="order-list">
        <ul>
            <router-link tag="li" class="item-mode border-bottom-1px" v-for="(item,index) in data" :key="index" :to="{path:url,query:{id:item.gd_number,flag:item.user_flag}}">
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
                            <div class="status" v-show="item.finish_status == 1">

                            </div>
                        </div>
                        <div class="type-tip">
                            <div class="type">
                                <span>{{item.lottery_name}}</span>
                                <span>{{item.wf_name}}</span>
                                <span>{{item.plan_kj_time}}</span>
                            </div>
                            <div class="tip">
                                {{item.content}}
                            </div>
                        </div>
                    </div>
                    <div class="imp-right">
                        <div class="rate">回报率:{{item.back_rate}}倍</div>
                        <div class="least">{{item.bet_min_money}}元起投</div>
                        <div class="order-status-ing" v-show="item.order_status == 0">
                            <span>正在跟单</span>
                        </div>
                        <div class="order-status-end" v-show="item.order_status == 1">
                            <span>胜利</span><br>
                            <span>￥{{item.create_value}}</span>
                        </div>
                        <div class="order-status-loser" v-show="item.order_status == 2">
                            <span>未中奖</span>
                        </div>
                        <div class="order-status-repeal" v-show="item.order_status == 3">
                            <span>撤销</span>
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
            </router-link >
        </ul>
        <loading v-show="data && !data.length"></loading>
    </div>
</template>
<script type="text/ecmascript-6">
    import Loading from 'base/loading/loading';
    export default {
        data() {
            return{
            }
        },
        props:{
            data: {
                type: [Array,Object,String],
                default: null
            },
            url:{
                type: String,
                default: '/follow/detail'
            }
        },
        components:{
            Loading
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
        @include border-bottom-1px(solid,$color-border-gray);
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
                        line-height: 0.5rem;
                        @include no-wrap();
                        color:$color-text-gray;
                        font-size: $font-size-small;
                        span{
                            margin-right: 0.1rem;
                        }
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
                .order-status-loser{
                    height:0.92rem;
                    margin-top: 0.1rem;
                    padding: 0.1rem 0;
                    border-radius: 0.1rem;
                    background:#E8E8E8;
                    text-align: center;
                    line-height: 0.92rem;
                    color:rgb(5, 121, 40);
                }
                .order-status-repeal{
                    height:0.92rem;
                    margin-top: 0.1rem;
                    padding: 0.1rem 0;
                    border-radius: 0.1rem;
                    background:#E8E8E8;
                    text-align: center;
                    line-height: 0.92rem;
                    color:$color-red;
                }
                .order-status-ing{
                    height:0.7rem;
                    margin-top: 0.5rem;
                    border-radius: 0.1rem;
                    background:$color-red;
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

