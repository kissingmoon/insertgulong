<template>
    <div>
        <div class="home" ref="home">
            <scroll ref="scroll" class="home-content" :data='lotteryList'>
                <div>
                    <div class="slider-content">
                        <div v-if="activitys.length" class="slider-wrapper" ref="sliderWrapper">
                            <slider>
                                <div v-for="item in activitys">
                                    <router-link tag="a" :to="{path:'/home/activity',query:{title:item.title,url:item.target_url}}">
                                        <img class="needsclick" @load="loadImage" :src="item.image_url" :alt="item.title">
                                    </router-link>
                                </div>
                            </slider>
                        </div>
                    </div>
                    <div class="marquee-wrapper" @click="showNotice">
                        <marquee class="txt">
                            {{notice.content}}
                        </marquee>
                    </div>
                    <div class="new-gift-wrapper">
                        <router-link tag="a" :to="{path:'/home/activity',query:{title:gift.title,url:gift.turn_url}}">
                            <img :src="gift.image_url">
                        </router-link>
                    </div>
                    <div class="lottery-wrapper">
                        <div class="lottery-main border-bottom-1px" v-for="(item,i) in lotteryList" :class="{'sub-wrapper':(i % 4 > 1)}">
                            <div class="item" v-if="i % 4 < 2 && item.lottery_type != 6 && item.lottery_type != 10" @click="subtag(i)" :ref="'sub'+i">
                                <div class="item-main">
                                    <div class="icon">
                                        <img width="60" height="60" v-lazy="item.lottery_image">
                                    </div>
                                    <div class="text" :class="{'border-right-1xp':i % 2 != 1}">
                                        <h2 class="name" v-html="item.lottery_label"></h2>
                                        <p class="desc" v-html="item.remarks"></p>
                                    </div>
                                </div>
                                <i class="icon-triangle-below triangle-below" v-show="(showSub-2) == i" v-if="i % 4 < 2"></i>
                            </div>
                            <router-link tag="div" class="item" 
                                v-if="i % 4 < 2 && (item.lottery_type == 6 || item.lottery_type == 10)"
                                :to="{path:'/home/lottery',query:{id:item.sub_lottery[0].lottery_id,type:item.lottery_type}}"
                                >
                                <div class="item-main">
                                    <div class="icon">
                                        <img width="60" height="60" v-lazy="item.lottery_image">
                                    </div>
                                    <div class="text" :class="{'border-right-1xp':i % 2 != 1}">
                                        <h2 class="name" v-html="item.lottery_label"></h2>
                                        <p class="desc" :ref="item.sub_lottery[0].lottery_id"></p>
                                    </div>
                                </div>
                                <i class="icon-triangle-below triangle-below" v-show="(showSub-2) == i" v-if="i % 4 < 2"></i>
                            </router-link>
                            <router-link tag="div" :to="{path:'/home/lottery',query:{id:sub.lottery_id,type:sub.lottery_type}}" 
                                class="item sub-item"  
                                v-if="i % 4 > 1 && item.lottery_type != 6 && item.lottery_type != 10" 
                                v-for="(sub,s) in item" 
                                :key="s" 
                                v-show="showSub == i" 
                                :ref="'sub'+(i*2+((i+1)%2+1))">
                                <div class="item-main">
                                    <div class="icon">
                                        <img width="60" height="60" v-lazy="sub.lottery_image">
                                    </div>
                                    <div class="text">
                                        <h2 class="name" v-html="sub.lottery_name"></h2>
                                        <p class="desc" :ref="sub.lottery_id"></p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        
                    </div>
                    <div class="rank-wrapper" v-if="user_token">
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
                            <router-link tag="a" :to="{path:'/home/activity',query:{title:'补助金领取',url:bzjlq_url}}">
                                <p class="icon"></p>
                                <p class="title">补助金领取</p>
                            </router-link>
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
        <div v-show="noticeShow">
            <div class="background" @click="hideNotice">
            </div>
            <div class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                       <div class="title border-bottom-1px">
                           公告详情
                       </div>
                       <div class="info">
                           <div class="txt">
                               {{notice.content}}
                           </div>
                       </div>
                    </div>
                </div>
                <div class="detail-close">
                    <button @click="hideNotice">确定</button>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import Slider from 'base/slider/slider';
    import SliderY from 'base/slider-y/slider-y';
    import Loading from 'base/loading/loading';
    import Scroll from 'base/scroll/scroll';
    import {httpUrl} from 'common/js/map';
    import {regroupLotteryData,countTime} from 'common/js/param';
    import {mapMutations,mapActions,mapGetters} from 'vuex';

    export default {
        data() {
            return {
                noticeShow:false,
                activitys: [],
                notice:{},
                gift:[],
                lotteryList:[],
                showSub:'',
                rank:{
                    today_flow_money:0,
                    today_profit_loss:0,
                    user_ranking:0
                },
                betWin:{},
                bzjlq_url:''
            }
        },
        components: {
            Slider,
            Loading,
            Scroll,
            SliderY
        },
        created() {
            this.getActivitys();
            this.getNotice();
            this.getGift();
            this.getLottery();
            this.getRank();
            this.getBetWin();
            this.getBzjlq();
        },
        mounted(){
            // document.body.addEventListener('touchmove', function (e) {
            //     e.preventDefault() // 阻止默认的处理方式(阻止下拉滑动的效果)
            // }, {passive: false}) // passive 参数不能省略，用来兼容ios和android
        },
        computed: {
            ...mapGetters([
                'user_token'
            ])
        },
        methods: {
            showNotice(){
                this.noticeShow = true;
            },
            hideNotice(){
                this.noticeShow = false;
            },
            loadImage() {
                if (!this.checkloaded) {
                    this.checkloaded = true
                    this.$refs.scroll.refresh()
                }
            },
            getActivitys() {
                this.$axios.postRequest(httpUrl.home.sliderImg)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.activitys=res.data;
                    }
                });
            },
            getNotice(){
                this.$axios.postRequest(httpUrl.home.notice)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.notice=res.data;
                    }
                });
            },
            getBzjlq(){
                this.$axios.postRequest(httpUrl.config.urlList,{flag:'sy_bzjlq_url'})
                .then((res)=> {
                    if(!res.data.errorCode){
                        console.log(res.data);
                        this.bzjlq_url=res.data[0].url;
                    }
                });
            },
            getGift(){
                this.$axios.postRequest(httpUrl.home.gift,{'type':'01'})
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.gift=res.data;
                    }
                });
            },
            getLottery(){
                this.$axios.postRequest(httpUrl.home.lottery)
                .then((res)=> {
                    if(!res.data.errorCode){
                        console.log(res.data);
                        this.lotteryList=regroupLotteryData(res.data);
                        console.log(this.lotteryList);
                        this.forEachLottery(res.data);
                    }
                });
            },
            forEachLottery(lottery){
                lottery.forEach((item,i) => {
                    this.getSubLotteryLocktime(item.lottery_type,i);
                });
                
            },
            //获取子彩种开奖时间
            getSubLotteryLocktime(type,i){
                this.$axios.postRequest(httpUrl.bet.subLotteryLocktime,{lottery_type:type})
                .then((res)=> {
                    if(!res.data.errorCode){
                        res.data.forEach((sub,s) => {
                            this.subLotteryCountTime(sub,type,i)
                        });
                    }
                });
            },
            //子彩种倒计时
            subLotteryCountTime(sub,type,i){
                if(type == 6){
                    this.$refs[sub.lottery_id][0].innerHTML=sub.lock_time;
                    return;
                }
                const drawCountTime=countTime(sub.lock_time.replace(/-/g,'/'));
                if(this.$refs[sub.lottery_id] && this.$refs[sub.lottery_id][0]){
                    this.$refs[sub.lottery_id][0].innerHTML=drawCountTime;
                }
                if (drawCountTime == "00:00:00") {
                    setTimeout(() => {
                        this.getSubLotteryLocktime(type,i);
                    },2000);
                }else{
                    clearTimeout(this[sub.lottery_id]);
                    this[sub.lottery_id]=setTimeout(() => {
                        this.subLotteryCountTime(sub,type,i);
                    },1000);
                }
            },
            getRank(){
                this.$axios.postRequest(httpUrl.home.rank)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.rank=res.data;
                    }
                });
            },
            getBetWin(){
                this.$axios.postRequest(httpUrl.home.betWin)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.betWin=res.data;
                    }
                });
            },
            subtag(i){
                this.showSub = this.showSub == (i+2) ? '': (i+2);
                setTimeout(() => {
                    this.$refs.scroll.refresh();
                    this.$refs.scroll.scrollToElement(this.$refs['sub'+i][0]);
                },100);
            },
            

        }
    }
    
</script>
<style scoped lang="scss">
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
            height:3.9rem;
            overflow: hidden;
            @include bg-image('slider-bg');
            background-size: 100% 100%;
            
            .slider-wrapper{
                position: relative;
                width: 100%;
                height:3.86rem;
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
            height:2.4rem;
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
                    //@include border-bottom-1px(solid,$color-bg-white-a0);
                }
            }
            .item{
                float: left;
                width:100%;
                height: auto;
                overflow: hidden;
                position: relative;
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
                            @include border-right-1px(solid,$color-border-gray);
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
                .triangle-below{
                    position: absolute;
                    width:0.6rem;
                    color:#F6F4E6;
                    bottom:-0.1rem;
                    font-size: $font-size-large;
                    transform:rotate(180deg);
                    left:calc((100% - 0.6rem)/2);
                    z-index: 100;
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
    .background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background:$color-bg-shade-a5;
    }
    .detail{
        position:fixed;
        top:calc((100% - 8rem) / 2);
        left:1.5rem;
        z-index:1200;
        width:7rem;
        height:7.8rem;
        overflow:auto;
        background:$color-bg;
        border-radius: 0.2rem;
        .detail-wrapper{
            min-height:100%;
            .detail-main{
                padding-bottom:1.4rem;
                .title{
                    height:1rem;
                    padding:0.2rem 0.4rem;
                    line-height: 1rem;
                    text-align: center;
                    font-size: $font-size-large;
                    color:$color-red;
                    @include border-bottom-1px(solid,$color-border-gray);
                    @include no-wrap();
                }
                .info{
                    margin:0.3rem;
                    background:$color-bg-gray;
                    border-radius: 0.1rem;
                    height:4rem;
                    padding:0.3rem 0.2rem 0;
                    
                    .txt{
                        height:3.5rem;
                        overflow-y: auto;
                        line-height: 0.5rem;
                    }
                    .time{
                        height: 0.5rem;
                        text-align: right;
                        font-size: $font-size-small;
                        color:$color-text-gray;
                    }
                }
            }
        }
        .detail-close{
            position:relative;
            margin:-1.4rem auto 0 auto;
            clear:both;
            text-align: center;
            button{
                height:0.8rem;
                width:2.5rem;
                text-align: center;
                background:$color-red;
                color: #fff;
                font-size: $font-size-medium-x;
                border-radius: 0.1rem;
                border:0;
                &.m-r{
                    margin-right: 0.3rem;
                    background:$color-btn-gray;
                }
            }
        }
    }
 
</style>
