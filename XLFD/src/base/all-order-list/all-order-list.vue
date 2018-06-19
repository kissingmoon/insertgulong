<template>
    <div class="order-list">
        <ul>
            <router-link tag="li" class="item-mode border-1px" v-for="(item,index) in data" :key="index" :to="{path:url,query:{id:item.gd_number,flag:item.user_flag}}">
                <div class="importance">
                    <div class="imp-left">
                        <div class="brokerage-surplus-wrapper">
                            <div class="status">
                                <img v-lazy="item.image_url" alt="">
                            </div>
                            <div class="brokerage-surplus">
                                <p class="brokerage">
                                    <span>{{item.nick_name}}</span>
                                    <span>胜率:<b>{{item.win_rate}}%</b></span>
                                    <span>佣金:<b>{{item.commission}}%</b></span>
                                </p>
                                <p class="surplus">
                                    <span>追号<b>{{item.zhuih_count_qs}}</b>期</span>
                                    <span>剩<b>{{item.left_qh_count}}</b>期</span>
                                    <span v-show="item.zhuih_win_stop == 1">中奖即停</span>
                                </p>
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
                        <div class="rate">回报率:<b>{{item.back_rate}}倍</b></div>
                        <div class="least">{{item.bet_min_money}}元起投</div>
                        <div class="order-status-ing">
                            <span>立即跟单</span>
                        </div>
                        <!-- <div class="order-status-end" v-show="item.finish_status == 1">
                            <span>胜利</span><br>
                            <span>￥{{item.create_value}}</span>
                        </div> -->
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
        <loading v-show="!data"></loading>
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
            url: {
                type: String,
                default: ''
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
        @include border-1px($color-border-gray);
        font-size:$font-size-small-x;
        .importance{
            height:auto;
            overflow: hidden;
            .imp-left{
                float: left;
                width:7.2rem;
                height:auto;
                .brokerage-surplus-wrapper{
                    height:1.47rem;
                    padding-bottom: 0.1rem;
                    .brokerage-surplus{
                        float: left;
                        width:5rem;
                        margin-left: 0.2rem;
                        padding-top:0.1rem;
                        .brokerage,.surplus{
                            height:0.5rem;
                            line-height: 0.5rem;
                            @include no-wrap();
                            span{
                                margin-right: 0.3rem;
                                b{
                                    color:$color-text-red;
                                }
                            }
                        }
                        .brokerage{
                            height:0.6rem;
                            line-height: 0.6rem;
                        }
                        .surplus{
                            color:$color-text-gray;
                        }
                    }
                    .status{
                        float:left;
                        height:1.41rem;
                        width:1.41rem;
                        border-radius: 50%;
                        overflow: hidden;
                        background: $color-bg-gray;
                        img{
                            display: block;
                            width:100%;
                        }
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
                            margin-right:0.1rem;
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
                width:2rem;
                height:auto;
                text-align: right;
                padding-top:0.1rem;
                .rate,.least{
                    height:0.6rem;
                    line-height: 0.6rem;
                    b{
                        color:$color-text-red;
                    }
                }
                .least{
                    color:$color-text-gray;
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

