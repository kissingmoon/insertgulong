<template>
    <div class="home" ref="home">
        <scroll ref="scroll" class="home-content">
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
            </div>
            
            <!-- <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div> -->
        </scroll>
    </div>
</template>
<script>
    import Slider from 'base/slider/slider';
    import Loading from 'base/loading/loading';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    import {reData} from 'common/js/param'

    export default {
        data() {
            return {
                paramData:{},
                activitys: [],
                notice:[],
                gift:[],
                lotteryList:[]
            }
        },
        created() {
            this.paramData=reData()
            this._getActivitys();
            this._getNotice();
            this._getGift();
            this._getLottery();
        },
        methods: {
            handlePlaylist(playlist) {
                const bottom = playlist.length > 0 ? '60px' : ''
                this.$refs.recommend.style.bottom = bottom
                this.$refs.scroll.refresh()
            },
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
            }
        },
        components: {
            Slider,
            Loading,
            Scroll
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
        bottom: 1.44rem;
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
                    font-size: $font-size-small;
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
                                margin-bottom: 0.1rem;
                                font-size: $font-size-large;
                            }
                            .desc{
                                color: $color-text-gray;
                                font-size: $font-size-medium;
                            }
                        }
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
 
</style>
