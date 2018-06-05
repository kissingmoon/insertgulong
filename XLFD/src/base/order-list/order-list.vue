<template>
    <div class="order-list">
        <ul>
            <li class="item-mode">
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
                                跟投必中，跟投必中，跟投必中，跟投必中
                            </div>
                        </div>
                    </div>
                    <div class="imp-right">
                        <div class="rate">回报率:85%</div>
                        <div class="least">2元起投</div>
                        <div class="order-status">
                            <span>胜利</span>
                            <span>￥132654.32</span>
                        </div>
                    </div>
                </div>
                <div class="minor">
                    <div class="minor-left">
                        <p class="own">自购215454.21元</p>
                        <p class="people-num">跟单64人</p>
                    </div>
                    <div class="minor-right">
                        <span>当前跟单金额21548.32元</span>
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
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.order-list{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0rem;
    z-index: 103;
    background: $color-bg;
    .item-mode{
        position: relative;
        height:3.39rem;
        padding:0.3rem;
        background: $color-bg;
        margin-bottom: 0.16rem;
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
                        width:3.7rem;
                        .brokerage{
                            height:0.5rem;
                        }
                        .surplus{
                            height:0.5rem;
                        }
                    }
                    .status{
                        float:right;
                        height:1.47rem;
                        width:1.44rem;
                    }

                }
                .type-tip{
                    height:1rem;
                    width:100%;
                    .type{
                        height:0.5rem;
                    }
                    .tip{
                        height:0.5rem;
                    }
                }
            }
            .imp-right{
                float:right;
                width:2.2rem;
                height:auto;
                text-align: right;
            }
        }
        .minor{
            .minor-left{
                float: left;
                width:4.4rem;
                .own{
                    float: left;
                }
                .people-num{
                    float:right;
                }
            }
            .minor-right{
                float: right;
                width:4rem;
            }
        }
    }
}
</style>

