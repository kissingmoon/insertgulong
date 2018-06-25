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
                             <p class="history" @click="showDrawHistory">历史开奖记录<i class="icon-triangle-below"></i></p>
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
            <div v-show="wfDetailShow" class="wf-content">
                <div class="background" @click="closeWfDetail"></div>
                <div class="detail">
                    <div class="wf-detail-wrapper clearfix">
                        <div class="detail-title">玩法提示</div>
                        <div class="wf-detail-main">
                            <ul>
                                <li class="item-wrapper">
                                    <p class="title">当前玩法</p>
                                    <p class="txt">五星定位法</p>
                                </li>
                                <li class="item-wrapper">
                                    <p class="title">选号规则</p>
                                    <p class="txt">讲明解；说明原因。也指解释的话；说明的文字；证明。</p>
                                </li>
                                <li class="item-wrapper">
                                    <p class="title">中奖说明</p>
                                    <p class="txt">说明是一个汉语词汇，读音为shuō míng，属于动词，意思是解释清楚，讲明解；说明原因。也指解释的话；说明原因。也指解释的话。</p>
                                </li>
                            </ul>
                        </div>
                        <div class="wf-detail-close">
                            <button @click="closeWfDetail"><i class="icon-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="gdSetShow" class="gd-content">
                <div class="background" @click="closeGdSet"></div>
                <div class="detail">
                    <div class="gd-detail-wrapper clearfix">
                        <div class="detail-title">
                            <div class="gd-rule">
                                <span></span>
                                <i class=""></i>
                            </div>
                            <span>发起跟单</span>
                        </div>
                        <div class="gd-detail-main">
                            <ul>
                                <li class="item-wrapper">
                                    <div class="title">方案公开:</div>
                                    <div class="txt">
                                        <p class="open-type on">
                                            <span>结束后</span>
                                            <i class="icon-right-ak right-ak"></i>
                                        </p>
                                        <p class="open-type">
                                            <span>跟单后</span>
                                            <i class="icon-right-ak right-ak"></i>
                                        </p>
                                    </div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">薪酬设置:</div>
                                    <div class="set-num">
                                        <input type="text">%
                                    </div>
                                    <div class="title">预计收益:</div>
                                    <div class="set-num">
                                        <input type="text">倍
                                    </div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">
                                        <p>跟单说明:</p>
                                        <p class="gd-length">0/100</p>
                                    </div>
                                    <div class="txt">
                                        <textarea class="gd-instructions" maxlength="100">说明是一个汉语词汇，读音为shuō míng，属于动词，意思是解释清楚，讲明解；说明原因。说明是一个汉语词汇，读音为shuō míng，属于动词，意思是解释清楚，讲明解；说明原因。</textarea>
                                        <p class="gd-instructions-tip">跟单说明很重要，玩家将从您的描述中来决定是否购买，请您认真填写！</p>
                                    </div>
                                </li>
                            </ul>
                            <div class="btn-wrapper">
                                <button class="cancel">放弃发起</button>
                                <button class="affirm">确认</button>
                            </div>
                            <div class="gd-tip">
                                <p>温馨提示:您可以在我的-跟单列表界面查看跟单明细<br>发起跟单将会在您成功付款后展示</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="betAffirmShow" class="bet-affirm-content">
                <div class="background" @click="closeBetAffirm"></div>
                <div class="detail">
                    <div class="bet-detail-wrapper clearfix">
                        <div class="detail-title">确认投注</div>
                        <div class="bet-detail-main">
                            <ul>
                                <li class="item-wrapper">
                                    <div class="title">投注号码：<span class="txt">3 5 9 8 93 5 9 8 93 5 </span></div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">玩法：<span class="txt">五星定位胆</span></div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">投注金额：<span class="txt">625410元（一注12元）</span></div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">当前余额：<span class="txt">19992159.69元</span></div>
                                </li>
                            </ul>
                            <div class="btn-wrapper">
                                <button class="cancel">取消</button>
                                <button class="affirm">确认</button>
                            </div>
                            <div class="gd-tip">
                                <p>温馨提示:您可以在我的-跟单列表界面查看跟单明细<br>发起跟单将会在您成功付款后展示</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="betSuccessShow" class="wf--success-content">
                <div class="background" @click="closeBetSuccess"></div>
                <div class="bet-success-detail">
                    <div class="bet-success-wrapper clearfix">
                        <div class="detail-title">投注成功</div>
                        <div class="bet-success-main">
                            <div class="success-tip">
                                投注成功，好运即将到来！
                            </div>
                            <div class="btn-wrapper">
                                <button class="cancel">投注记录</button>
                                <button class="affirm" @click="closeBetSuccess">继续投注</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <draw-history v-show="drawHistoryShow" @closeDrawHistory="closeDrawHistory"></draw-history>
            <wf-kind v-show="wfKindShow"></wf-kind>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import BetNumber from 'base/bet-number/bet-number';
    import DrawHistory from 'components/draw-history/draw-history';
    import WfKind from 'components/wf-kind/wf-kind';
    import {httpUrl,betType} from 'common/js/map';
    export default {
        data() {
            return{
                wfDetailShow:false,
                gdSetShow:false,
                betAffirmShow:false,
                betSuccessShow:false,
                drawHistoryShow:false,
                wfKindShow:false,
            }
        },
        components:{
            Parcel,
            Scroll,
            BetNumber,
            DrawHistory,
            WfKind
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
            closeWfDetail(){
                this.wfDetailShow=false;
            },
            closeGdSet(){
                this.gdSetShow=false;
            },
            closeBetAffirm(){
                this.betAffirmShow=false;
            },
            closeBetSuccess(){
                this.betSuccessShow=false;
            },
            closeDrawHistory(){
                this.drawHistoryShow=false;
            },
            showDrawHistory(){
                this.drawHistoryShow=true;
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
    .background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 110;
        background:$color-bg-shade-a5;
    }
    .detail{
        position:fixed;
        top:calc((100% - 9rem) / 2);
        left:1.2rem;
        z-index:120;
        width:7.6rem;
        height:9rem;
        overflow: hidden;
        @include bg-image('bg-lottery-shallow');
        background-size: 0.6rem;
        border-radius: 0.2rem;
        border:1px solid #7B6503;
        .detail-title{
            height:1.2rem;
            @include bg-image('bg-lottery-title');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            color:#fff;
            line-height: 1.2rem;
            text-align: center;
            font-size: $font-size-large;
        }
        .wf-detail-wrapper{
            min-height:100%;
            .wf-detail-main{
                padding:0rem 0.4rem 0.2rem;
                overflow:auto;
                height:6.2rem;
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
                            color:$color-text-yellow;
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
                width:1rem;
                text-align: center;
                clear:both;
                button{
                    height:0.96rem;
                    width:0.96rem;
                    border-radius: 0.48rem;
                    border:1px solid $color-border-num;
                    text-align: center;
                    background:none;
                    color: $color-text-yellow;
                    font-size: $font-size-large-x;
                }
            }
        }
        .gd-detail-wrapper{
            min-height:100%;
            .gd-detail-main{
                padding:0.3rem 0 0 0.15rem;
                overflow:auto;
                height:7.5rem;
                .item-wrapper{
                    height:auto;
                    overflow: hidden;
                    padding-bottom: 0.2rem;
                    line-height: 0.64rem;
                    div{
                        float: left;
                        height:auto;
                        overflow: hidden;
                        line-height: 0.64rem;
                        &.title{
                            color:#fff;
                            width:1.8rem;
                        }
                        &.txt{
                            color:#fff;
                            width:5.4rem;
                        }
                        &.set-num{
                            width:1.5rem;
                            color:#fff;
                            padding-right: 0.2rem;
                            height: auto;
                            overflow: hidden;
                            input{
                                width:1rem;
                                height:0.64rem;
                                border-radius: 0.1rem;
                                line-height: 0.64rem;
                                border:0;
                                text-align: center;
                            }
                        }
                        
                        .open-type{
                            float: left;
                            position: relative;
                            width:1.92rem;
                            height:0.64rem;
                            border:1px solid $color-border-num;
                            line-height: 0.64rem;
                            text-align: center;
                            border-radius: 0.1rem;
                            overflow: hidden;
                            margin-right: 0.4rem;
                            .right-ak{
                                position: absolute;
                                width:0.57rem;
                                height:0.57rem;
                                bottom:0;
                                right:0;
                                font-size: $font-size-large-x;
                                color:$color-border-num;
                            }
                            &.on{
                                border:1px solid $color-border-yellow;
                                color:$color-text-yellow;
                                .right-ak{
                                    color:$color-text-yellow;
                                }
                            }
                        }
                        .gd-instructions{
                            width:5.2rem;
                            border:0;
                            border-radius: 0.1rem;
                            padding:0.1rem;
                            height:1.94rem;
                            line-height: 0.4rem;
                            font-size: $font-size-small;
                        }
                        .gd-instructions-tip{
                            line-height: 0.32rem;
                            font-size: $font-size-small;
                            color:#86BFA5;
                        }
                        .gd-length{
                            padding-top:1.2rem;
                            text-align: right;
                            line-height: 0.3rem;
                            font-size: $font-size-small;
                            color: #86BFA5;
                            padding-right:0.2rem;
                        }
                        
                    }
                    

                }
                .btn-wrapper{
                    height: 0.8rem;
                    padding-top: 0.2rem;
                    text-align: center;
                    width:100%;
                    .cancel{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:#38BB80;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                        margin-right: 0.8rem;
                    }
                    .affirm{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:$color-border-yellow;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                    }
                }
                .gd-tip{
                    width:100%;
                    color: #fff;
                    font-size: $font-size-small-x;
                    line-height: 0.4rem;
                    padding-top:0.3rem;
                }
            }
        }
        .bet-detail-wrapper{
            min-height:100%;
            .bet-detail-main{
                padding:0.5rem 0 0 0.15rem;
                overflow:auto;
                height:7.5rem;
                ul{
                    height:4.6rem;
                    overflow-y: auto;
                    .item-wrapper{
                        height:auto;
                        overflow: hidden;
                        padding-bottom: 0.2rem;
                        line-height: 0.5rem;
                        div{
                            height:auto;
                            overflow: hidden;
                            line-height: 0.5rem;

                            &.title{
                                color:#fff;
                                padding:0 0.5rem;
                                .txt{
                                    color:$color-text-yellow;
                                }
                            }
                            &.set-num{
                                width:1.5rem;
                                color:#fff;
                                padding-right: 0.2rem;
                                height: auto;
                                overflow: hidden;
                                input{
                                    width:1rem;
                                    height:0.5rem;
                                    border-radius: 0.1rem;
                                    line-height: 0.5rem;
                                    border:0;
                                    text-align: center;
                                }
                            }
                            .gd-instructions{
                                width:5.2rem;
                                border:0;
                                border-radius: 0.1rem;
                                padding:0.1rem;
                                height:1.94rem;
                                line-height: 0.4rem;
                                font-size: $font-size-small;
                            }
                            .gd-instructions-tip{
                                line-height: 0.32rem;
                                font-size: $font-size-small;
                                color:#86BFA5;
                            }
                            .gd-length{
                                padding-top:1.2rem;
                                text-align: right;
                                line-height: 0.3rem;
                                font-size: $font-size-small;
                                color: #86BFA5;
                                padding-right:0.2rem;
                            }
                            
                            
                        }
                    }
                }
                
                .btn-wrapper{
                    height: 0.8rem;
                    padding-top: 0.2rem;
                    text-align: center;
                    width:100%;
                    .cancel{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:#38BB80;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                        margin-right: 0.8rem;
                    }
                    .affirm{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:$color-border-yellow;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                    }
                }
                .gd-tip{
                    width:100%;
                    color: #fff;
                    font-size: $font-size-small-x;
                    line-height: 0.4rem;
                    padding-top:0.5rem;
                }
            }
        }
    }
    .bet-success-detail{
        position:fixed;
        top:calc((100% - 5.6rem) / 2);
        left:1.2rem;
        z-index:120;
        width:7.6rem;
        height:5.6rem;
        overflow: hidden;
        @include bg-image('bg-lottery-shallow');
        background-size: 0.6rem;
        border-radius: 0.2rem;
        border:1px solid #7B6503;
        .detail-title{
            height:1.2rem;
            @include bg-image('bg-lottery-title');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            color:#fff;
            line-height: 1.2rem;
            text-align: center;
            font-size: $font-size-large;
        }
        .bet-success-wrapper{
            min-height:100%;
            .bet-success-main{
                overflow:hidden;
                height:auto;
                .success-tip{
                    height:2.6rem;
                    line-height: 2.6rem;
                    text-align: center;
                    font-size: $font-size-medium-x;
                    color: #fff;
                }
                
                .btn-wrapper{
                    height: 0.8rem;
                    padding-top: 0.2rem;
                    text-align: center;
                    width:100%;
                    .cancel{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:#38BB80;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                        margin-right: 0.8rem;
                    }
                    .affirm{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:$color-border-yellow;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                    }
                }
            }
        }
    }
}
</style>
