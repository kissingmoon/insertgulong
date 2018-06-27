<template>
    <div>
        <div class="home" ref="home">
            <scroll ref="scroll" class="home-content" :data='lotteryList'>
                <div>
                    <div class="slider-content">
                        <div v-if="activitys.length" class="slider-wrapper" ref="sliderWrapper">
                            <slider>
                                <div v-for="item in activitys">
                                    <router-link tag="a" :to="{path:'/activity',query:{title:item.title,url:item.target_url}}">
                                        <img class="needsclick" @load="loadImage" :src="item.image_url" :alt="item.title">
                                    </router-link>
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
                        <router-link tag="a" :to="{path:'/activity',query:{title:gift.title,url:gift.turn_url}}">
                            <img :src="gift.image_url">
                        </router-link>
                    </div>
                    <div class="lottery-wrapper">
                        <div class="lottery-main border-bottom-1px" v-for="(item,i) in lotteryList" 
                        :class="{'sub-wrapper':(i % 4 > 1)}">
                            <div class="item" v-if="i % 4 < 2" @click="subtag(i)">
                                <div class="item-main">
                                    <div class="icon">
                                        <img width="60" height="60" v-lazy="item.lottery_image">
                                    </div>
                                    <div class="text" :class="{'border-right-1xp':i % 2 != 1}">
                                        <h2 class="name" v-html="item.lottery_label"></h2>
                                        <p class="desc" v-html="item.remarks"></p>
                                    </div>
                                </div>
                            </div>
                            <router-link tag="div" :to="{path:'/lottery',query:{id:sub.lottery_id}}" class="item sub-item"  v-if="i % 4 > 1" v-for="(sub,s) in item" v-show="showSub == i" :ref="'sub'+(i*2+((i+1)%2+1))">
                                <div class="item-main">
                                    <div class="icon">
                                        <img width="60" height="60" v-lazy="sub.lottery_image">
                                    </div>
                                    <div class="text">
                                        <h2 class="name" v-html="sub.lottery_name"></h2>
                                        <p class="desc" v-html="sub.remarks"></p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        
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

        <div class="border-bottom-1px betwin-wrapper" v-if="betWin.length">
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
    import {regroupLotteryData} from 'common/js/param';

    export default {
        data() {
            return {
                activitys: [],
                notice:[],
                gift:[],
                lotteryList:[],
                showSub:'',
                rank:{
                    today_flow_money:0,
                    today_profit_loss:0,
                    user_ranking:0
                },
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
                this.$axios.postRequest(httpUrl.home.sliderImg)
                .then((res)=> {
                    this.activitys=res.data;
                });
            },
            _getNotice(){
                this.$axios.postRequest(httpUrl.home.notice)
                .then((res)=> {
                    this.notice=res.data;
                });
            },
            _getGift(){
                this.$axios.postRequest(httpUrl.home.gift,{'type':'01'})
                .then((res)=> {
                    this.gift=res.data;
                });
            },
            _getLottery(){
                this.$axios.postRequest(httpUrl.home.lottery)
                .then((res)=> {
                    this.lotteryList=regroupLotteryData(res.data);
                });
            },
            _getRank(){
                this.$axios.postRequest(httpUrl.home.rank)
                .then((res)=> {
                    if(res){
                        this.rank=res.data;
                    }
                });
            },
            _getBetWin(){
                this.$axios.postRequest(httpUrl.home.betWin)
                .then((res)=> {
                    this.betWin=res.data;
                });
            },
            subtag(i){
                this.showSub = this.showSub == (i+2) ? '': (i+2);
                setTimeout(() => {
                    this.$refs.scroll.refresh();
                },50);
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
                .slider-item{
                    float: left;
                    box-sizing: border-box;
                    overflow: hidden;
                    text-align: center;
                    a{
                        display: block;
                        width: 100%;
                        overflow: hidden;
                        text-decoration: none;
                        img{
                            display: block;
                            width: 100%;
                        }
                    }
                    
                }
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
            a{
                display: block;
                height: auto;
                overflow: hidden;
                img{
                    display: block;
                    width: 100%;
                }
            }
        }
        .lottery-wrapper{
            height:auto;
            overflow: hidden;
            .lottery-main{
                float: left;
                width:50%;
                height: auto;
                overflow: hidden;
                @include border-bottom-1px(solid,$color-border-gray);
                &.none-1px{
                    @include border-bottom-1px(solid,$color-bg-white-a0);
                }
                &.sub-wrapper{
                    width:100%;
                    background: #F6F4E6;
                    @include border-bottom-1px(solid,$color-bg-white-a0);
                }
            }
            .item{
                float: left;
                width:100%;
                height: auto;
                overflow: hidden;
                &.sub-item{
                    width:50%;
                }
                .item-main{
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    padding: 0.3rem 0 0.3rem 0.54rem;
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
                        &.border-right-1xp{
                            border-right:1px solid $color-border-gray;
                        }
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
