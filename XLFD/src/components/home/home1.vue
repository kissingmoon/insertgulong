/*
 * @Author: lava
 * @Date: 2018-09-21 20:15:01 
 */
<template>
    <div class="home">
        <!-- 广告轮播图 -->
        <div class="slider-content">
            <swiper v-if="activitys.length > 1 && isKeep" :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item,index) in activitys" :key="index">
                    <img :src="item.image_url" class="swiper-lazy" :alt="item.title">
                </swiper-slide>
            </swiper>
        </div>
        <!-- 跑马灯 -->
        <div class="marquee-wrapper" @click="showNotice">
            <marquee class="txt">
                {{notice.content}}
            </marquee>
        </div>
        <!-- 活动大图 -->
        <div class="new-gift-wrapper">
            <router-link tag="a" :to="{path:'/home/activity',query:{title:gift.title,url:gift.turn_url}}">
                <img :src="gift.image_url">
            </router-link>
        </div> 
        <loading v-if="loading"></loading> 
        <div class="recomandWapper">
            <div class="recomandTitle flex flex-align-center flex-pack-justify">
                <span><b style="border:2px solid #DA1C36;padding:0.1rem 0;"></b>&nbsp;推荐彩种</span>
                <router-link :to="{path:'/goucaidating'}" class="reTitle-more">更多彩种>></router-link>
            </div>
            <div class="recomandType flex" v-for="(v,k) in trueRecomandList" :key="k"  @click="v.click&&enterLottery(v)">
                <!-- {{v.reserved}}-{{v.recomandObj.lotteryName}}-{{v.recomandObj.lotteryImage}}-{{v.locktime}} -->
                
                <div class="recomandImg flex flex-center">
                    <img v-lazy="v.recomandObj.lotteryImage" alt="">
                </div>
                <div class="recomandName flex flex-pack-center flex-v">
                    <div  class="reName-title">
                        <!-- {{v.recomandObj.lotteryName}} -->
                        <em>{{v.recomandObj.lotteryName}}</em>
                        <span class="kaijiang" v-if="v.recomandObj.isPrivate == 1"></span>
                    </div>
                    <div class="reName-time">距截止:{{v.locktime}}</div>
                </div>
                <div class="recomandEnter flex flex-center flex-v">
                    <div class="reEnter-onlinenum" v-if="!v.recomandObj.isSelf">当前在线:{{v.reserved}}</div>
                    <div class="reEnter-enter">点击进入</div>
                </div>
            </div>
        </div>
        <div class="moreLottery">
            <div class="border-1px" @click="goGoucai">
                <div class="addSign"></div>
                <div>添加彩种</div>
            </div>
        </div>
        <!-- 排名 -->
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
            <!-- <div class="rank">
                <p class="title">您的排名</p>
                <p class="num">{{rank.user_ranking}}</p>
            </div> -->
            <div class="rank-receive-money">
                <router-link tag="a" :to="{path:'/home/activity',query:{title:'补助金领取',url:bzjlq_url}}">
                    <p class="icon"></p>
                    <p class="title">补助金领取</p>
                </router-link>
            </div>
        </div>
        <div class="betwin-wrapper" v-if="betWin.length">
            <p class="tit">中奖快讯</p>
            <div class="topShadow shadowBox" @click='goNoticePage'></div>
            <div class="botShadow shadowBox" @click='goNoticePage'></div>
            <div class="list" ref="list">
                <div :class="{'inner-container':animate == true}" ref="betWin1">
                    <div class="betwin-txt" @click='goNoticePage' v-for='(item,i) in betWin' :key="i">
                        <em class="ico"></em><span>{{item.content[0]}}</span><span class="yellow">{{item.content[1]}}</span><span>{{item.content[2]}}</span>
                    </div>
                </div>
                <!-- 下面重复的数据是为了实现无缝滚动而添加   并非多余 -->
                <div :class="{'inner-container':animate == true}" ref="betWin2">
                    <div class="betwin-txt" @click='goNoticePage' v-for='(item,i) in betWin' :key="i">
                        <em class="ico"></em><span>{{item.content[0]}}</span><span class="yellow">{{item.content[1]}}</span><span>{{item.content[2]}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 跑马灯详情 -->
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
        <keep-alive>            
            <router-view v-if="$route.meta.keepAlive"></router-view>                       
        </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>   
    </div>
</template>

<script>
import Loading from 'base/loading/loading';
import {httpUrl} from 'common/js/map';
import {regroupLotteryData,countTime} from 'common/js/param';
import {mapMutations,mapActions,mapGetters} from 'vuex';
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import loading from 'base/loading/loading';
let vm = null;
 export default {
    name:'',
    data () {
        return {
            noticeShow:false,
            activitys: [],
            notice:{},
            gift:[],
            lotteryList:[],
            oldLotteryList:[],
            showSub:'',
            rank:{
                today_flow_money:0,
                today_profit_loss:0,
                user_ranking:0
            },
            betWin:[],
            bzjlq_url:'',
            //  轮播图配置
            swiperOption:{
                direction:'horizontal',
                slidesPerView:1,
                observer:true,                      //  修改swiper自己或子元素时，自动初始化swiper 
                observeParents:true,                //  修改swiper的父元素时，自动初始化swiper 
                loop:true,
                loopAdditionalSlides : 1,           //  复制第一个img到最后
                touchRatio : 0.8,                   //  手指滑动的距离与图片移动的距离比例
                preloadImages:false,                //  禁止加载所有图片
                slideToClickedSlide: true,
                autoplay:
                {
                    delay:5000,
                    disableOnInteraction:false
                },
                longSwipesRatio : 0.3,              //   滑动超过40%才能触发滚动
                spaceBetween: 15,                   //   bannar图片之间的距离
                autoplayStopOnLast:false,
                effect:"scroll",                    //  轮播效果类型  
                on:{
                    click:function(){
                        vm.bannarClick(this.realIndex)
                    }
                }
            },
            //  底部tips配置
            betWinOption:{                          //  页面底部swiper配置
                direction:'vertical',
                slidesPerView: 9,                   //显示几个slide
                spaceBetween: 9,                    //slide间距
                loop: true,                         //连续播放
                autoplay:
                {
                    delay:0,
                    disableOnInteraction:false
                },
                speed:1000,                         //根据自己所需速度调整
                freeMode:true,
            },
            trueRecomandList:[],
            returnSubList:[],
            recomandList:[],
            interval:"",
            loading:false,
            animate:true,
            isKeep:false,                           // 控制页面在keep-alive后轮播不播放的问题
            isRequested:false,                      // 请求自选彩种时，防止created钩子种请求过后activated重复请求
        }
    },

    computed: {
        ...mapGetters([
            'user_token',
            'hd_qiandao',
        ]),
    },
    created(){
        vm = this;
        this.isRequested = true;
        this.init();
    },
    watch:{
        $route(to,from){
            if( to.path == '/home' && from.path == '/home/addCaiType'){
                this.getRecomandType();
            }
        }
    },
    beforeDestroy(){
        // this.oldLotteryList.forEach((item,i) => {
        //     item.sub_lottery.forEach((sub,s) => {
        //         const id=sub.lottery_id;
        //         clearTimeout(this[id]);
        //     });
        // });
        clearInterval(this.interval)
    },
    activated(){
        this.isKeep = true;
        if(this.isRequested){
            this.isRequested = false;
            return;
        }
        this.getRecomandType();        
    },
    deactivated(){
        this.isKeep = false;         
    },
    methods: {
        init(){
            this.getActivitys();
            this.getNotice();
            this.getGift();
            this.getRank();
            this.getBetWin();
            this.getBzjlq();
            this.getRecomandType();
        },

        //  设置进入添加彩种页面时，底部nav导航首页高亮
        ...mapMutations({
            setNavActive:'SET_NAV_ACTIVE',
            setTip:'SET_TIP',
        }),
        goGoucai(){
            if(!this.user_token){
                this.setTip('您还未登入，请先登入')
                setTimeout(()=>{
                    this.$router.push({ path:'/login'})
                },1000)                 
                return
            }
            this.setNavActive(true)
            this.$router.push({ path:'/home/addCaiType',query:{type:'addType'}})
        },
        getRecomandType(){               
            this.$axios.postRequest(httpUrl.config.getRecomemendCpType)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.recomandList=res.data.list;   
                    if(this.user_token){
                        this.getChooseSelfType((ret)=>{
                            this.recomandList= this.recomandList.concat(ret)
                            var parmList=[];
                            this.returnSubList=[];
                            this.recomandList.map((v,k)=>{
                                parmList.push({'lottery_id':v.flag,'type':'1'})
                            })                             
                            //新添加   
                            var tempList = new Array();                                              
                            this.recomandList.map((v,k)=>{
                                tempList[k]={}
                                tempList[k].recomandObj=this.recomandList[k]
                                tempList[k].running=true;
                                tempList[k].locktime="";
                                tempList[k].click=false;
                            })                                          
                            this.trueRecomandList=tempList.concat() 
                            this.mapPost(httpUrl.bet.lockTime,this.recomandList.length,parmList)
                            //this.intervlPost(httpUrl.bet.lockTime,this.recomandList.length,parmList,this.returnSubList,this.makeTrueList)
                        });
                        return;
                    }
                                
                    var parmList=[];
                    this.returnSubList=[];
                    this.recomandList.map((v,k)=>{
                        parmList.push({'lottery_id':v.flag,'type':'1'})
                    })                     
                    //新添加   
                    var tempList = new Array();                                              
                    this.recomandList.map((v,k)=>{
                        tempList[k]={}
                        tempList[k].recomandObj=this.recomandList[k]
                        tempList[k].running=true;
                        tempList[k].locktime="";
                        tempList[k].click=false;
                    })                                           
                    this.trueRecomandList=tempList.concat() 
                    this.mapPost(httpUrl.bet.lockTime,this.recomandList.length,parmList)
                    //this.intervlPost(httpUrl.bet.lockTime,this.recomandList.length,parmList,this.returnSubList,this.makeTrueList)
                }
            });
        },
        getChooseSelfType(callback){            
            this.$axios.postRequest(httpUrl.lottery.getType)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    var choosedTypes = res.data;
                    choosedTypes.map((v,k)=>{
                        v.isSelf = true;                    
                    })  
                }   
                callback(choosedTypes)           
            })
        },
        mapPost(url,n,parmList){
            for(let i=0;i<n;i++){
                this.$axios.postRequest(url,parmList[i])
                .then((res)=> {
                    if(res.data && !res.data.errorCode){  
                        this.makeTrueList(i,res.data)
                    }
                })
            }           
        },
        makeTrueList(k,resData){ 
            var tempObj=resData;
            this.trueRecomandList[k] = Object.assign(this.trueRecomandList[k],tempObj);            
            this.trueRecomandList[k].locktime=countTime(tempObj.lock_time.replace(/-/g,'/')); 
            this.trueRecomandList[k].click=true;   
            var lockInt=parseInt(this.trueRecomandList[k].locktime.split(':')[1])
            var baseMinNum=300,baseMaxNum=480;
            switch(this.trueRecomandList[k].lottery_id){
                case "cqssc":
                    baseMinNum=600;baseMaxNum=800;
                break;
                case "pk10":
                    baseMinNum=500;baseMaxNum=600;
                break;
                case "xssc":
                    baseMinNum=300;baseMaxNum=500;
                break;
                case "xglhc":
                    baseMinNum=150;baseMaxNum=350;
                break;
            }
            if(lockInt<=15){
                this.trueRecomandList[k].reserved=this.randomNum(baseMinNum,baseMaxNum); 
            }
            else{
                this.trueRecomandList[k].reserved=this.randomNum(baseMinNum-100,baseMaxNum-100);
            }
            if(!this.interval){
                this.startIntervl()
            }                
        },
        startIntervl(){
            var count=0;
            this.interval=setInterval(() => {//reserved                     
                if(count==30){
                    count=0;
                }//时时彩600-800   北京500-700 五分才300-500   六合彩150-350      
                this.trueRecomandList.map((v,k)=>{ 
                    var baseMinNum=300,baseMaxNum=480;
                    switch(v.lottery_id){
                        case "cqssc":
                            baseMinNum=600;baseMaxNum=800;
                        break;
                        case "pk10":
                            baseMinNum=500;baseMaxNum=600;
                        break;
                        case "xssc":
                            baseMinNum=300;baseMaxNum=500;
                        break;
                        case "xglhc":
                            baseMinNum=150;baseMaxNum=350;
                        break;
                    }
                    if(count%10==0){
                        if(v.reserved>baseMinNum&&v.reserved<baseMaxNum){
                            var flag=this.randomNum(0,2);
                            if(flag==0){
                                v.reserved-=this.randomNum(1,5);
                            }
                            else{
                                v.reserved+=this.randomNum(1,5);
                            }
                        }
                        else{
                            v.reserved=this.randomNum(baseMinNum,baseMaxNum); 
                        } 
                    }                      
                    if(v.locktime){
                        v.locktime=countTime(v.lock_time.replace(/-/g,'/'));                          
                        if(v.running==true){
                            if(v.locktime=="00:00:00"){
                                v.running=false;
                                setTimeout(()=>{
                                    this.getSingleLockTime(v,k)
                                },5000)
                            }
                        }  
                    }         
                })
                count++; 
            },1000);
        },
        getSingleLockTime(sub,num){
            var id=sub.lottery_id
            this.$axios.postRequest(httpUrl.bet.cpLocktime,{'lottery_id':id,'type':'1'})
            .then((res)=> {
                if(res.data && !res.data.errorCode){ 
                    let locktime =countTime(res.data.lock_time.replace(/-/g,'/'));   
                    let lockInt=parseInt(locktime.split(':')[1])
                    
                    if(lockInt<=15){
                        res.data.reserved=sub.reserved; 
                    }                             
                    var obj = Object.assign(sub,res.data);
                    obj.running=true;
                }
            })
        },
        enterLottery(v){
            this.$router.push({
                path: '/lottery',
                query: {id:v.lottery_id,type:v.recomandObj.lotteryType}
            });
        },
        randomNum(minNum,maxNum){ 
            switch(arguments.length){ 
                case 1: 
                    return parseInt(Math.random()*minNum+1,10); 
                break; 
                case 2: 
                    return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
                break; 
                    default: 
                        return 0; 
                    break; 
            } 
        },
        bannarClick(i){
            this.$router.push({path:'/home/activity',query:{title:this.activitys[i].title,url:this.activitys[i].target_url}})
        },
        showNotice(){
            this.noticeShow = true;
        },
        hideNotice(){
            this.noticeShow = false;
        },
        getActivitys() { 
            this.$axios.postRequest(httpUrl.home.sliderImg)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.activitys=res.data;
                }
            });
        },
        getNotice(){
            this.$axios.postRequest(httpUrl.home.notice)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.notice=res.data;
                }
            });
        },
        getBzjlq(){
            this.$axios.postRequest(httpUrl.config.urlList,{flag:'sy_bzjlq_url'})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.bzjlq_url=res.data[0].url;
                }
            });
        },
        getGift(){
            this.$axios.postRequest(httpUrl.home.gift,{'type':'01'})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.gift=res.data;
                }
            });
        },
        getLottery(){
            this.$axios.postRequest(httpUrl.home.lottery)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.oldLotteryList = res.data;
                    this.lotteryList=regroupLotteryData(res.data);
                    this.forEachLottery(res.data);
                }
            });
        },
        forEachLottery(lottery){
            this.oldLotteryList.forEach((item,i) => {
                item.sub_lottery.forEach((sub,s) => {
                    this.getSubLotteryLocktime(sub.lottery_id);
                });
            });
            
        },
        //获取子彩种开奖时间
        getSubLotteryLocktime(id){
            this.$axios.postRequest(httpUrl.bet.cpLocktime,{'lottery_id':id})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.subLotteryCountTime(res.data)
                }
            });
        },
        //子彩种倒计时
        subLotteryCountTime(sub){
            if(sub.lottery_id == 'xglhc'){
                if(this.$refs[sub.lottery_id] && this.$refs[sub.lottery_id][0]){
                    this.$refs[sub.lottery_id][0].innerHTML=sub.lock_time;
                }
                return;
            }
            const drawCountTime=countTime(sub.lock_time.replace(/-/g,'/'));
            if(this.$refs[sub.lottery_id] && this.$refs[sub.lottery_id][0]){
                this.$refs[sub.lottery_id][0].innerHTML=drawCountTime;
            }
            if (drawCountTime == "00:00:00") {
                setTimeout(() => {
                    this.getSubLotteryLocktime(sub.lottery_id);
                },6000);
            }else{
                clearTimeout(this[sub.lottery_id]);
                this[sub.lottery_id]=setTimeout(() => {
                    this.subLotteryCountTime(sub);
                },1000);
            }
        },
        goNoticePage(){
            this.$router.push({path:'/home/betwin'})
        },
        getRank(){
            this.$axios.postRequest(httpUrl.home.rank)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.rank=res.data;
                }
            });
        },
        getBetWin(){
            this.$axios.postRequest(httpUrl.home.betWin)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    let arr = res.data;
                    for(let i = 0; i < arr.length; i ++){
                        arr[i].content = arr[i].content.split(' ');
                    }
                    this.betWin = arr;
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
    },
    components: {
        Loading,
        swiper,
        swiperSlide,
        loading
    },
}
</script>

<style lang='scss' scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.home{
    padding: 1.2rem 0 1.44rem;
    .slider-content{
        padding:0 0.2rem;
        height:4.4rem;
        overflow: hidden;
        background-color: #eee;
        .slider-wrapper{
            position: relative;
            width: 100%;
            height:3.86rem;
            overflow: hidden;
            border-top-left-radius: 0.12rem;
            border-top-right-radius: 0.12rem;
        }
        .swiper-container {
            width: 8.7rem!important;
            height: 4rem;
            overflow: visible!important;
        }
        .swiper-container .swiper-wrapper .swiper-slide-active{ text-align: center;width: 8.7rem!important}
        .swiper-container .swiper-wrapper .swiper-slide-active img{ width: 8.7rem!important;margin: 0 auto;}
        .swiper-container .swiper-wrapper .swiper-slide{background: url('./loading.png') no-repeat center center;background-size: 100% 90%;}
        .swiper-container .swiper-wrapper .swiper-slide img{width: 100%; height: 4rem; border-radius: .2rem;margin-top: .2rem}
        .swiper-container .swiper-wrapper .swiper-slide-prev{ margin-top: .2rem; height: 3.6rem!important;}
        .swiper-container .swiper-wrapper .swiper-slide-prev img{ height: 3.6rem!important;}
        .swiper-container .swiper-wrapper .swiper-slide-next{ margin-top: .2rem; height: 3.6rem!important;}
        .swiper-container .swiper-wrapper .swiper-slide-next img{ height: 3.6rem!important;}
    }
    .marquee-wrapper{
        padding:0.15rem;
        padding-left: 0;
        height:0.58rem;
        line-height: 0.64rem;
        .txt{
            border-left:1vw solid #FED931;
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
    .recomandscroll{
        height: 5.5rem;
        overflow: hidden;
    }
    .moreLottery{
        padding: 0.3rem 0;
        text-align: center;
        >div{
            display: inline-block;
            width: 4rem;
            color: #949494;
            font-size: 0.35rem;
            padding: .26rem 0;
            border: 1px solid #949494;
            border-radius: .5rem;
            >div{
                display: inline-block;
                vertical-align: middle;                
            }
            .addSign{
                width: .36rem;
                height: .36rem;
                @include bg-image('./addSign');
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    .recomandWapper{
        height:auto;
        overflow: auto;
        .recomandTitle{
            height: 0.7rem;
            border-bottom:1px solid #F2F2F2;
            .reTitle-more{
                color:#949494;
                padding-right:0.3rem;
                font-size: 0.35rem;
            }
        }
        .recomandType{
            height: 1.8rem;
            border-bottom:1px solid #F2F2F2;
            .recomandImg{
                width: 2rem;
                img{
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }
            .recomandName{
                width: 5rem;
                .reName-title{
                    font-size:0.4rem;
                    em{
                        font-style: normal;
                        vertical-align: middle;
                    }
                    .kaijiang{
                        vertical-align: middle;
                        display: inline-block;
                        width: 1.4rem;
                        height: .4rem;
                        margin-left: .1rem;
                        margin-bottom: .02rem;
                        @include bg-image('./allday');
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                }
                .reName-time{
                    margin-top:0.15rem;
                    color:#949494
                }
            }
            .recomandEnter{
                width: 3rem;
                .reEnter-onlinenum{
                    color:red;
                    font-size:0.3rem
                }
                .reEnter-enter{
                    margin-top:0.15rem;
                    color: #17CA97;
                    padding: 0.08rem 0.15rem;
                    border:1px solid #17CA97;
                    border-radius: 0.1rem;
                }
                
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
            @include border-bottom-1px(solid,$color-border-gray);
            &.sub-wrapper{
                width:100%;
                background: #F6F4E6;
                overflow: hidden;
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
                    &.text-border-right-1px{
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
                width:0.5rem;
                color:#F6F4E6;
                bottom:-0.1rem;
                font-size: $font-size-large;
                transform:rotate(180deg);
                left:calc((100% - 0.5rem)/2);
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
            margin-left: 0.7rem;
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
    .betwin-wrapper{
        height:7rem;
        line-height: 0.8rem;
        width:100%;
        box-shadow: 0 -2px 8px #e6e6e6;
        overflow: hidden;
        position: relative;
        .tit{
            text-align: center;
            color: #fff;
            background-color: #FD3C57;
        }
        .shadowBox{
            position: absolute;
            left: 0;
            z-index: 9;
            height: .5rem;
            width: 100%;
            box-sizing: border-box;
        }
        .topShadow{
            top: .8rem;
            border-top:.1rem solid #fff;
            box-shadow: 0 .2rem .2rem #fff inset;
        }
        .botShadow{
            bottom: 0;
            border-bottom:.1rem solid #fff;
            box-shadow: 0 -.2rem .2rem #fff inset;
        }
        .list{
            height: calc(100% - 0.8rem);
            overflow: hidden;
            position: relative;
            .inner-container {
                animation: myMove 10s linear infinite;
                -o-animation: myMove 10s linear infinite;
                -webkit-animation: myMove 10s linear infinite;
                -moz-animation: myMove 10s linear infinite;
                animation-fill-mode: forwards;
            }
            @keyframes myMove {
                0% {
                    transform: translateY(0);
                    -moz-transform: translateY(0);
                    -webkit-transform: translateY(0);
                    -o-transform: translateY(0);                    
                }
                100% {
                    transform: translateY(-16rem);
                    -o-transform: translateY(-16rem);
                    -webkit-transform: translateY(-16rem);
                    -moz-transform: translateY(-16rem);
                }
            } 
            .betwin-txt{
                height:.8rem;
                color: #949494;
                padding-left: .4rem;
                padding-right: 0.4rem;
                line-height: .8rem;
                @include no-wrap();
                font-size: $font-size-small-x;
                display: flex;
                span{
                    flex: 1;
                    color: #CA9450;
                    &:last-child{
                        text-align: right;
                    }
                }
                .yellow{
                    color: #E5CBA9;
                }
                .ico{
                    display: inline-block;
                    width: .5rem;
                    height: .5rem;
                    margin-top: .2rem;
                    margin-right: .2rem;
                    @include bg-image('betwin-icon');
                    background-repeat: no-repeat;
                    background-size: cover;
                }
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
}
</style>
<style>
body{
    -webkit-overflow-scrolling: touch;
}
.betwin-wrapper .swiper-container .swiper-wrapper{
    transition-timing-function:linear;
}
</style>