<template>
    <div>
        <div class="home" ref="home">
            <scroll ref="scroll" class="home-content" :data='lotteryList'>
                <div>
                    <div class="slider-content">
                        <div v-if="activitys.length" class="slider-wrapper" ref="sliderWrapper">
                            <slider>
                                <div v-for="item in activitys">
                                    <a :href="item.target_url">
                                        <img class="needsclick" @load="loadImage" :src="item.image_url" :alt="item.title">
                                    </a>
                                </div>
                            </slider>
                        </div>
                    </div>
                    <div class="marquee-wrapper">
                        <marquee class="txt">
                            {{notice.content}}
                        </marquee>
                    </div>
                    <div class="new-gift-wrapper">
                        <a :href="gift.turn_url">
                            <img :src="gift.image_url" alt="">
                        </a>
                    </div>
                    <div class="lottery-wrapper">
                        <ul>
                            <li class="item" v-for="item in lotteryList">
                                <div class="item-main">
                                    <div class="icon">
                                        <img width="60" height="60" v-lazy="item.lottery_image">
                                    </div>
                                    <div class="text">
                                        <h2 class="name" v-html="item.lottery_label"></h2>
                                        <p class="desc" v-html="item.remarks"></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="rank-wrapper">
                        <div class="rank-img"></div>
                        <div class="rank-flow-money">
                            <p class="title">您的今日流水</p>
                            <p class="num">{{rank.today_flow_money}}</p>
                        </div>
                        <div class="rank-profit-loss">
                            <p class="title">今日盈亏</p>
                            <p class="num">{{rank.today_profit_loss}}</p>
                        </div>
                        <div class="rank">
                            <p class="title">您的排名</p>
                            <p class="num">{{rank.user_ranking}}</p>
                        </div>
                        <div class="rank-receive-money">
                            <a href="">
                                <p class="icon"></p>
                                <p class="title">补助金领取</p>
                            </a>
                        </div>
                    </div>
                </div>
                
                <!-- <div class="loading-container" v-show="!discList.length">
                    <loading></loading>
                </div> -->
            </scroll>
        </div>

        <div class="border-1px betwin-wrapper" v-if="betWin.length">
            <slider-y class="betwin-main">
                <div class="betwin-txt" v-for='item in betWin'>
                    {{item.content}}
                </div>
            </slider-y>
        </div>
    </div>

</template>
<script>
    import Slider from 'base/slider/slider';
    import SliderY from 'base/slider-y/slider-y';
    import Loading from 'base/loading/loading';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    import {reData} from 'common/js/param';

    export default {
        data() {
            return {
                paramData:{},
                activitys: [],
                notice:[],
                gift:[],
                lotteryList:[],
                rank:{},
                betWin:{}
            }
        },
        components: {
            Slider,
            Loading,
            Scroll,
            SliderY
        },
        created() {
            this.paramData=reData()
            this._getActivitys();
            this._getNotice();
            this._getGift();
            this._getLottery();
            this._getRank();
            this._getBetWin();
        },
        methods: {
            loadImage() {
                if (!this.checkloaded) {
                this.checkloaded = true
                this.$refs.scroll.refresh()
                }
            },
            _getActivitys() {
                this.$axios.post(httpUrl.home.sliderImg,this.paramData)
                .then((res) => {
                    this.activitys=res.data;
                });
            },
            _getNotice(){
                this.$axios.post(httpUrl.home.notice,this.paramData)
                .then((res) => {
                    this.notice=res.data;
                });
            },
            _getGift(){
                let giftParam=reData({'type':'01'})
                this.$axios.post(httpUrl.home.gift,giftParam)
                .then((res) => {
                    this.gift=res.data;
                });
            },
            _getLottery(){
                this.$axios.post(httpUrl.home.lottery,this.paramData)
                .then((res) => {
                    this.lotteryList=res.data;
                });
            },
            _getRank(){
                this.$axios.post(httpUrl.home.rank,this.paramData)
                .then((res) => {
                    this.rank=res.data;
                });
            },
            _getBetWin(){
                this.$axios.post(httpUrl.home.betWin,this.paramData)
                .then((res) => {
                    this.betWin=res.data;
                });
            }
        }
    }
    
</script>
<style lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';

.home{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 2.34rem;
    .home-content{
        height: 100%;
        overflow: hidden;
        .slider-content{
            padding:0 0.2rem;
            height:auto;
            overflow: hidden;
            @include bg-image('slider-bg');
            background-size: 100% 100%;
            .slider-wrapper{
                position: relative;
                width: 100%;
                overflow: hidden;
                border-top-left-radius: 0.12rem;
                border-top-right-radius: 0.12rem;
            }
        }
        .marquee-wrapper{
            padding:0.15rem;
            height:0.58rem;
            line-height: 0.64rem;
            .txt{
                border-left:0.08rem solid #FED931;
                font-size: $font-size-small-x;
            }
        }
        .new-gift-wrapper{
            height:auto;
            overflow: hidden;
            img{
                display: block;
                width: 100%;
            }
        }
        .lottery-wrapper{
            height:auto;
            overflow: hidden;
            .item{
                float: left;
                width:50%;
                height: auto;
                overflow: hidden;
                .item-main{
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    padding: 0.4rem 0 0.4rem 0.54rem;
                    .icon{
                        flex: 0 0 1.47rem;
                        width: 1.47rem;
                        height:1.47rem;
                        padding-right: 0.2rem;
                        img{
                            display: block;
                            width:100%;
                            height:100%;
                        }
                    }
                    .text{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        flex: 1;
                        line-height: 20px;
                        overflow: hidden;
                        .name{
                            height:0.67rem;
                            line-height: 0.67rem;
                            font-size: $font-size-large;
                        }
                        .desc{
                            height:0.53rem;
                            line-height: 0.53rem;
                            color: $color-text-gray;
                            font-size: $font-size-medium;
                        }
                    }
                }
            }
            
        }
        .rank-wrapper{
            height: 1.56rem;
            border-top:0.1rem solid $color-bg-gray;
            border-bottom:0.1rem solid $color-bg-gray;
            padding:0.23rem 0 0 0.4rem;
            .rank-img{
                float: left;
                height:1.33rem;
                width:1.31rem;
                @include bg-image('ranking');
                background-size: 100%;
                margin-right: 0.25rem;
            }
            .rank-flow-money,
            .rank-profit-loss,
            .rank{
                float: left;
                height:1.33rem;
                width:2.1rem;
                text-align: center;
                color:#9F7B02;
                .title{
                    height:0.73rem;
                    line-height: 0.73rem;
                    font-size: $font-size-small-x;
                }
                .num{
                    height: 0.6rem;
                    line-height: 0.6rem;
                    font-size: $font-size-small;
                    @include no-wrap();
                }
            }
            .rank {
                width:1.8rem;
                .num{
                    font-size: $font-size-medium-x;
                }
            }
            .rank-receive-money{
                width:1.7rem;
                height:1.33rem;
                float: right;
                padding-right: 0.2rem;
                .icon{
                    width:0.75rem;
                    height:0.83rem;
                    margin: 0 auto;
                    @include bg-image('receive-icon');
                    background-size: 100%;
                }
                .title{
                    height:0.5rem;
                    line-height: 0.5rem;
                    text-align: center;
                    font-size: $font-size-small-x;
                    color:#9F7B02;
                }
            }
        }

        .loading-container{
            position: absolute;
            width: 100%;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}

.betwin-wrapper{
    position: fixed;
    height:0.9rem;
    line-height: 0.9rem;
    width:100%;
    bottom: 1.44rem;
    //border-top:0.01rem solid $color-border;
    overflow: hidden;
    .betwin-main{
        height: 100%;
        overflow: hidden;
        .betwin-txt{
            height:0.9rem;
            padding-left: 1.2rem;
            padding-right: 0.4rem;
            @include no-wrap();
            @include bg-image('betwin-icon');
            background-repeat: no-repeat;
            background-position: 0.4rem center;
            background-size: 0.69rem;
            font-size: $font-size-small-x;
        }
    }
    
}
 
</style>
