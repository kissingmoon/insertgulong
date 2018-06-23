<template>
    <parcel>
        <div class="lottery">
            <div class="lottery-content">
                <div class="lottery-title-content">
                    <div class="back" @click="goBack"><i class="icon-arrows-left"></i></div>
                    <div class="time-money-wrapper">
                        <div class="money"><i class="icon-money"></i></div>
                        <div class="time"><i class="icon-clock-02"></i></div>
                    </div>
                    <h1 class="title">时时彩</h1>
                </div>
                <div class="lottery-nav border-bottom-1px">
                    <div class="nav-left border-right-1px">
                        <div class="rock-follow">
                            <p class="follow">大神跟单<i class="icon-triangle-below"></i></p>
                        </div>
                        <div class="count-down">
                            距0254185期截止:00:04:26
                        </div>
                    </div>
                    <div class="nav-right">
                        <div class="lottery-wf">
                            当前玩法:五星定位胆
                        </div>
                        <div class="draw-history">
                             <p class="history">历史开奖记录<i class="icon-triangle-below"></i></p>
                        </div>
                    </div>
                </div>
                <scroll ref="scroll" class="scroll-content">
                    <bet-number></bet-number>
                </scroll>
                <div class="lottery-set">
                    <div class="multiple">
                        <p>投注</p>
                        <p class="number"><input type="text" value="1"></p>
                        <p>倍</p>
                    </div>
                    <div class="unit">
                        <p>模式</p>
                        <p class="type">元</p>
                    </div>  
                    <div class="bonus">
                        <p>单注奖金192568.36元</p>
                    </div>
                </div>
                <div class="lottery-bottom">
                    <div class="clear-all">
                        <p>清空</p>
                    </div>
                    <div class="bet-collect">
                        <p class="bet-count">1365注54863.36元</p>
                        <p class="balance">余额:3251445.35元</p>
                    </div>
                    <div class="brokerage">
                        <p class="check-box"><i class="icon-right"></i></p>
                        <p>赚佣金</p>
                    </div>
                    <div class="follow-num">
                        <p>追号</p>
                    </div>
                    <div class="bet-btn">
                        <p>投注</p>
                    </div>
                </div>
            </div>
            
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import BetNumber from 'base/bet-number/bet-number';
    import {httpUrl,betType} from 'common/js/map';
    export default {
        data() {
            return{
            }
        },
        components:{
            Parcel,
            Scroll,
            BetNumber
        },
        created() {
            //this.getBetList();
        },
        computed: {
        },
        methods: {
            goBack(){
                this.$router.back();
            },
            getBetList(type){
                this.$axios.postRequest(httpUrl.info.bet,this.betParam)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.betList=res.data;
                    };
                });
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.lottery{
    position: fixed;
    width: 100%;
    top: 0rem;
    bottom: 0rem;
    z-index: 103;
    @include bg-image('bg-lottery-shallow');
    background-size: 0.6rem;
    .lottery-content{
        position: relative;
        width: 100%;
        height:100%;
        overflow: hidden;
        .lottery-title-content{
            position:relative;
            height:1.2rem;
            line-height: 1.2rem;
            text-align: center;
            color:#fff;
            @include bg-image('bg-lottery-title');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            
            .back{
                position:absolute;
                height:1.2rem;
                line-height: 1.4rem;
                padding: 0 0.5rem 0 0.3rem;
                font-size: 0.52rem;
                font-size: $font-size-large-x;
            }
            .time-money-wrapper{
                position:absolute;
                height:1.2rem;
                line-height: 1.35rem;
                right:0;
                font-size:$font-size-large-xx;
                padding-right: 0.2rem;
                color:$color-text-yellow;
                .time{
                    float:right;
                    height:1.2rem;
                    padding:0 0.2rem;
                }
                .money{
                    float:right;
                    width:0.8rem;
                    height:1.2rem;
                    padding-right: 0.2rem;
                }
            }
            .title{
                display: block;
                height:1.2rem;
                line-height: 1.2rem;
                vertical-align: top;
                padding: 0 2.4rem;
                font-size: $font-size-large-m;
                @include no-wrap();
            }
        }
        .lottery-nav{
            height:1.63rem;
            background-size: 0.6rem;
            @include bg-image('bg-lottery-deep');
            @include border-bottom-1px(solid,#053105);
            color:#fff;
            .nav-left{
                float: left;
                height:1.53rem;
                width:5rem;
                @include border-right-1px(solid,#053105);
                padding-top: 0.1rem;
                overflow: hidden;
                .rock-follow{
                    height:0.7rem;
                    padding-top: 0.1rem;
                    .follow{
                        border:0.026rem solid #24754b;
                        width:2rem;
                        height:0.6rem;
                        line-height: 0.6rem;
                        border-radius: 0.1rem;
                        text-align: center;
                        margin-left: 0.15rem;
                        vertical-align:text-bottom;
                    }
                }
                .count-down{
                    height:0.7rem;
                    line-height: 0.7rem;
                    padding-left:0.15rem;
                    @include no-wrap();
                }

            }
            .nav-right{
                height:1.63rem;
                width:5rem;
                float: left;
                text-align: center;
                .lottery-wf{
                    height:0.7rem;
                    padding-top: 0.1rem;
                    line-height: 0.7rem;
                    padding-left:0.15rem;
                    @include no-wrap();
                }
                .draw-history{
                    height:0.7rem;
                    .history{
                        display: inline-block;
                        border:0.026rem solid #24754b;
                        width:3rem;
                        height:0.6rem;
                        line-height: 0.6rem;
                        border-radius: 0.1rem;
                        margin-left: 0.15rem;
                        vertical-align:text-bottom;
                    }
                }
            }
        }
        .lottery-set{
            position: absolute;
            height:1rem;
            width:100%;
            bottom:1.15rem;
            line-height: 1rem;
            color:#fff;
            background:#13432A;
            .multiple{
                height:1rem;
                width:2.6rem;
                float: left;
                padding-left:0.2rem;
                p{
                    display: inline-block;
                    height:0.6rem;
                    line-height: 0.6rem;
                    text-align: center;
                    &.number{
                        width:1rem;
                        height:0.6rem;
                        border-radius: 0.1rem;
                        background:#64A387;
                        input{
                            width:1rem;
                            height:0.6rem;
                            background: none;
                            border:0;
                            padding:0;
                            margin: 0;
                            line-height: 0.6rem;
                            color:$color-text-yellow;
                            text-align: center;
                        }
                    }
                }
            }
            .unit{
                float: left;
                width:3rem;
                height:1rem;
                text-align: center;
                p{
                    display:inline-block;
                    height:0.6rem;
                    line-height: 0.6rem;
                    text-align: center;
                    &.type{
                        width:1rem;
                        height:0.6rem;
                        border-radius: 0.1rem;
                        background:#64A387;
                        text-align: center;
                    }
                }
            }
            .bonus{
                float: left;
                height:1rem;
                width:4.2rem;
                text-align: right;
                p{
                    padding-right: 0.2rem;
                    padding-top: 0.2rem;
                    height:0.6rem;
                    line-height: 0.6rem;
                    @include no-wrap();
                }
            }

        }
        .lottery-bottom{
            position: absolute;
            height:1.15rem;
            width:100%;
            bottom:0;
            line-height: 1.15rem;
            @include bg-image('bg-lottery-bottom');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center top;
            color:rgb(230, 230, 230);
            .clear-all{
                height:1.15rem;
                width:1rem;
                float: left;
                padding:0.25rem 0.2rem;
                p{
                    width:1rem;
                    height:0.67rem;
                    line-height: 0.67rem;
                    text-align: center;
                    background:$color-bg-deep-gray;
                    border-radius: 0.1rem;
                }
            }
            .bet-collect{
                height:1.15rem;
                width:3.4rem;
                float: left;
                padding-top:0.14rem;
                p{
                    height:0.45rem;
                    line-height: 0.45rem;
                    @include no-wrap();
                }
            }
            .brokerage{
                float: left;
                width:1.9rem;
                height:0.67rem;
                line-height: 0.67rem;
                text-align: center;
                background:$color-bg-deep-gray;
                border-radius: 0.1rem;
                margin-top:0.25rem;
                p{
                    display: inline-block;
                    &.check-box{
                        width:0.4rem;
                        height:0.4rem;
                        background: #fff;
                        color:$color-text;
                        border-radius: 0.07rem;
                        line-height: 0.45rem;
                    }
                }
            }
            .follow-num{
                height:1.15rem;
                width:1.1rem;
                float: left;
                padding:0.25rem 0.2rem;
                p{
                    width:1.1rem;
                    height:0.67rem;
                    line-height: 0.67rem;
                    text-align: center;
                    background:$color-bg-deep-gray;
                    border-radius: 0.1rem;
                }
            }
            .bet-btn{
                height:1.15rem;
                width:1.6rem;
                float: left;
                padding-top:0.25rem;
                p{
                    width:1.6rem;
                    height:0.67rem;
                    line-height: 0.67rem;
                    text-align: center;
                    background:$color-text-yellow;
                    border-radius: 0.1rem;
                    color:$color-text;
                    font-size: $font-size-medium-x;
                }
            }

        }
        .scroll-content{
            height: calc(100% - 4.98rem);
            overflow: hidden;
            
            
        }
    }
    
}
</style>
