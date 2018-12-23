<template>
   <div class="level-wapper" >
       <div class="cav-wapper" v-if="!switchs.introShow">
           <div class="half-circle-wapper flex">
               <div class="title flex">
                   <div><i @click="goBack" class="icon-arrows-left"></i></div>
                   <div class="flex-1" style="padding-right: 0.4rem;" >我的等级</div>
                </div>
           </div>
           <div class="circle-wapper">
               <div class="circle-level">
                   <span class="font-bold">LV.{{userLevelInfo.upgrade_level}}</span>
               </div>
           </div>
       </div>
       <div class="equity-wapper" v-if="!switchs.introShow">
           <div class="equity-title flex flex-pack-justify" style="padding:0 0.4rem;">
               <div class="">当前打码量:<span class="light-red">{{userLevelInfo.count_dml}}</span></div>
               <div class="flex-1 flex flex-pack-end" >离升级还差：<span class="light-red">{{userLevelInfo.nest_level_code}}</span></div>
           </div>
           <div class="equity-body flex">
               <div v-for="(v,k) in equityList" :key="k" @click="getGift(k)"  class="equity-item flex flex-v flex-center">
                   <div class="flex flex-center flex-g-1">
                       <i class="equity-icon" :style="v.itemStyle"></i>
                   </div>
                   <div class="flex flex-center flex-g-1">{{v.name}}</div>
               </div>
           </div>
           <div class="libao-wapper">
                <div class="libao-title flex flex-align-center">
                    <span><b>升级礼包</b></span>
                    <span class="right" @click="showIntro"><b>查看更多升级奖励></b></span>
                </div>
                <div class="libao-body flex">
                    <div v-for="(v,k,indx) in giftObj" :key="indx" class="libao-item flex-1 flex flex-center">
                        <div class="libao-item-content flex">
                            <div class="libao-content-title flex-1 flex flex-center">
                                {{v.name}}
                            </div>
                            <div class="libao-content-body flex-4 flex flex-v flex-center">
                                <div class="flex flex-center flex-g-2 font-bold">￥{{v.count}}</div>
                                <div class="libao-content-tip flex flex-center flex-g-1">{{v.tip}}</div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
           <div class="reward-wapper">
               <div class="reward-title flex flex-align-center"><b>奖励明细</b></div>
               <div class="reward-body">
                   <div class="reward-content" v-if="haveData">
                       <div class="reward-item flex">
                           <div class="reward-cols flex-1 flex flex-center">类型</div>
                           <div class="reward-cols flex-1 flex flex-center">金额</div>
                           <div class="reward-cols flex-2 flex flex-center">日期</div>
                       </div>
                       <div v-for="(v,k) in rewardHistory" :key="k" class="reward-item flex">
                           <div class="reward-cols flex-1 flex flex-center">{{v.gift_type}}</div>
                           <div class="reward-cols flex-1 flex flex-center">{{v.amount_gift}}</div>
                           <div class="reward-cols flex-2 flex flex-center">{{v.receive_time}}</div>
                       </div>
                   </div>
                   <div class="reward-content" v-if="!haveData">
                       <div class="empty-img flex flex-center">
                           <img src="./empty.png" alt="暂无数据">
                       </div>
                   </div>
               </div>
               <div class="reward-foot">
                   <div class="more-btn flex flex-center" @click="showMore">
                       查看更多
                   </div>
               </div>
           </div>
       </div>
       <div class="more-info" v-if="switchs.moreShow">
               <div class="title flex">
                   <div><i @click="tabSwitch('moreShow',false)" class="icon-arrows-left"></i></div>
                   <div class="flex-1" style="padding-right: 0.4rem;" >奖励明细</div>
                </div>
           
               <div class="reward-body">
                   <div class="reward-title flex flex-align-center">奖励明细</div>
                        <scroll ref="scroll" class="scroll-content" 
                        :data="longRewardHistory" 
                        :pulldown="pulldown"
                        :pullup="pullup"
                        :isAllData="isAllData"
                        :refreshStatus="refreshStatus"
                        :loadStatus="loadStatus"
                        @pulldown="getDrawNubmer('down')"
                        @pullup="getDrawNubmer('up')"
                        >
                            <div class="reward-content">
                                <div class="reward-item flex">
                                    <div class="reward-cols flex-1 flex flex-center">类型</div>
                                    <div class="reward-cols flex-1 flex flex-center">金额</div>
                                    <div class="reward-cols flex-2 flex flex-center">日期</div>
                                </div>
                                    <div v-for="(v,k) in longRewardHistory" :key="k" class="reward-item flex">
                                        <div class="reward-cols flex-1 flex flex-center">{{v.gift_type}}</div>
                                        <div class="reward-cols flex-1 flex flex-center">{{v.amount_gift}}</div>
                                        <div class="reward-cols flex-2 flex flex-center">{{v.receive_time}}</div>
                                    </div>
                            </div>
                        </scroll>
               </div>
       </div>
       <level-intr @closeIntro="closeIntro" v-if="switchs.introShow" class="level-intr"></level-intr>
   </div>
</template>
<script>
import {headerConfig,httpUrl} from 'common/js/map';
import Scroll from 'base/scroll/scroll';
import levelIntr from './level-intr';
import {mapMutations,mapActions,mapGetters} from 'vuex';
export default {
    data(){
        return{
            pulldown: true,
            pullup: true,
            refreshStatus:false,
            loadStatus:false,
            isAllData:false,
            equityList:[
                {
                    name:"等级礼金",
                    itemStyle:{
                        backgroundImage:'url(' + require('./level-money.png') + ')'
                    },
                    getUrl:httpUrl.info.getGift.upgradeGift
                },
                {
                    name:"周俸禄",
                    itemStyle:{
                        backgroundImage:'url(' + require('./week-money.png') + ')'
                    },
                    getUrl:httpUrl.info.getGift.weeklyGift
                },
                {
                    name:"月俸禄",
                    itemStyle:{
                        backgroundImage:'url(' + require('./month-money.png') + ')'
                    },
                    getUrl:httpUrl.info.getGift.monthlyGift
                },
                {
                    name:"24小时客服",
                    itemStyle:{
                        backgroundImage:'url(' + require('./service.png') + ')'
                    }
                }
            ],
            userLevelInfo:{
                upgrade_level:"",
                count_dml:"",
                nest_level_code:"",
                original_level:""
            },
            giftObj:{
                level_gift:{
                    count:"",
                    name:"等级礼金",
                    tip:"升级领取"
                },
                weekly_gift:{
                    count:"",
                    name:"周俸禄",
                    tip:"升级领取"
                },
                monthly_gift:{
                    count:"",
                    name:"月俸禄",
                    tip:"升级领取"
                },
            },
            switchs:{
                moreShow:false,
                introShow:false
            },
            rewardHistory:[],
            longRewardHistory:[],
            param:{
                page_no:1,
                page_size:20
            },
            haveData:false
        }
    },
    components:{
        Scroll,
        levelIntr
    },
    created(){
        // this.setLoading(true)
            this.$axios.postRequest(httpUrl.info.levelInfo)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    for (var value in this.giftObj) {
                        this.giftObj[value].count = res.data[value]
                    }
                    for (var value in this.userLevelInfo) {
                        this.userLevelInfo[value] = res.data[value]
                    }
                };
            });
            this.$axios.postRequest(httpUrl.info.rewardHistory,{page_no:1,page_size:10})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.rewardHistory=this.cutHistoryData(res.data)
                    if(this.rewardHistory.length==0){
                        this.haveData=false
                    }else{
                        this.haveData=true
                    }
                };
            });
    },
    methods:{
         ...mapMutations({
            setTip:'SET_TIP',
            setLoading:'SET_LOADING_SHOW'
        }),
        cutHistoryData(list){
            
            list.map((v,k)=>{
                let flag=v.gift_type
                switch(flag){
                    case "1":v.gift_type = "等级礼金";break;
                    case "2":v.gift_type = "月俸禄";break;
                    case "3":v.gift_type = "周俸禄";break;
                }
            })
            return list
        },
        goBack(){   
            this.$router.back();
        },
        tabSwitch(key,val){
            this.switchs[key]=val;
            if(val==false){
                this.setHeader(headerConfig[this.$route.path]);

            }
        },
        getGift(key){
            
            if(key<3){
                let postUrl = this.equityList[key].getUrl;
                this.setLoading(true)
                this.$axios.postRequest(postUrl)
                .then((res)=> {
                    this.setLoading(false)
                    if(res.data && !res.data.errorCode){
                        this.setTip({message:"申请成功",flag:1});
                    };
                });
            }else{
                // this.setServerShow(true)
                this.setServerShow(true)
                this.$emit('serverShow',true) 
                this.setHeader({
                    title:'客服中心',
                    back:true
                })
            }
            
        },
        showMore(){
            if(this.haveData){
                this.tabSwitch('moreShow',true);
                this.$axios.postRequest(httpUrl.info.rewardHistory,this.param)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        // this.longRewardHistory=res.data
                        this.longRewardHistory=this.cutHistoryData(res.data)
                    };
                });
                this.setHeader({
                    hidden:true,
                })
            }
        },
        showIntro(){
            this.tabSwitch('introShow',true);
            this.setHeader({
                hidden:true,
            })
        },
        closeIntro(){
            this.tabSwitch('introShow',false);
        },
        getDrawNubmer(type){
                if(type == 'up'){
                    this.loadStatus=true;
                    ++this.param.page_no;
                }else if(type == 'down'){
                    this.refreshStatus=true;
                    this.param.page_no=1;
                }
                this.$axios.postRequest(httpUrl.info.rewardHistory,this.param)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.isAllData =res.data.length < 20 ? true : false;
                        if(type == 'up'){
                            this.loadStatus=false;
                            res.data=this.cutHistoryData(res.data)
                            this.longRewardHistory=this.longRewardHistory.concat(res.data)
                        }else if(type == 'down'){
                            this.refreshStatus=false;
                            res.data=this.cutHistoryData(res.data)
                            this.longRewardHistory=res.data;
                        }else{                           
                        }
                    };
                });
            },
        ...mapMutations({
            setServerShow:'SET_SERVER_SHOW'
        }),
        ...mapActions([
            'setHeader'
        ]),
    }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';

.level-wapper{
    position: fixed;
    top:0;
    bottom: 0;
    background-color: #ffffff;
    z-index: 99;
    width: 100%;
    -webkit-overflow-scrolling:touch;
    overflow:auto;
    .cav-wapper{
        position: relative;
        height: 4.7rem;
        .half-circle-wapper{
            height: 3.5rem;
            background-image: url("./top-bg.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            .title{
                padding: 0 0.2rem;
                width: 100%;
                height: 1.2rem;
                line-height: 1.2rem;
                font-size: $font-size-large;
                color: #ffffff;
                text-align: center;
            }
        }
        .circle-wapper{
            height: 2.6rem;
            width: 2.6rem;
            position:absolute;
            bottom: 0;
            left: 50%;
            margin-left: -1.3rem;
            background-image: url("./circle-crown.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            .circle-level{
                position:absolute;
                top: 60%;
                text-align: center;
                width: 100%;
            }
        }
    }
    .equity-wapper{
        .equity-title{
            font-size: $font-size-medium-x;
        }
        .equity-body{
            flex-wrap:wrap;
            .equity-item{
                flex: 0 0 25%;
                height: 2.5rem;
                padding: 0.3rem 0;
                box-sizing: border-box;
                .equity-icon{
                    display: block;
                    width: 0.9rem;
                    height: 0.9rem;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
        }
    }
    .libao-wapper{
        border-top: 5px solid #F2F2F2;
        border-bottom: 5px solid #F2F2F2;
        .libao-title{
            height: 1.2rem;
            padding: 0 0.5rem;
            font-size: $font-size-medium-x;
            border-bottom: 1px solid #E8E8E8 ;
            justify-content:space-between;
            .right{
                font-size: $font-size-medium;
            }
        }
        .libao-body{
             padding: 0.5rem 0.5rem 0.5rem 0.2rem;
            .libao-item{
                padding-left: 0.3rem;
                .libao-item-content{
                    width: 100%;
                    height: 1.3rem;
                    background-image: url("./bg-libao.png");
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    .libao-content-title{
                        font-size: $font-size-small;
                        color: #AA9372;
                        padding: 0 0.3rem;
                    }
                    .libao-content-body{
                        padding: 0.1rem 0;
                        .libao-content-tip{
                            background: #414141;
                            color: #ffffff;
                            font-size: $font-size-small;
                            border-radius: 0.2rem;
                            padding: 0 0.1rem;
                            box-sizing: border-box;
                        }
                    }
                }
            }
        }
    }
    .reward-wapper{
        .reward-title{
            height: 1.2rem;
            padding: 0 0.5rem;
            font-size: $font-size-medium-x;
        }
        .reward-body{
            .reward-content{
                padding: 0 0.5rem;
                .reward-item {
                    color: #979797;
                    border:1px solid #E8E8E8;
                    border-bottom:0;
                    height: 0.6rem;
                    &:last-child{
                        border-bottom:1px solid #E8E8E8;
                    }
                }
                .empty-img{
                    height: 3rem;
                }
            }
        }
        .reward-foot{
            padding: 0.5rem;
            .more-btn{
                background: #E8E8E8;
                height: 1.3rem;
                border-radius: 2px;
            }
        }
    }
    .more-info{
        position: fixed;
        top:0;
        bottom: 0;
        background-color: #ffffff;
        z-index: 102;
        width: 100%;
        .title{
            padding: 0 0.2rem;
            width: 100%;
            height: 1.2rem;
            line-height: 1.2rem;
            font-size: $font-size-large;
            color: #ffffff;
            text-align: center;
            background: #414141;
        }
        .reward-title{
            height: 1.2rem;
            padding: 0 0.5rem;
            font-size: $font-size-medium-x;
        }
        .reward-body{
            position:absolute;
            top:1.2rem;
            bottom: 0;
            width: 100%;
            .reward-content{
                padding: 0 0.5rem;
                position: relative;
                height: 90%;
                .reward-item {
                    color: #979797;
                    border:1px solid #E8E8E8;
                    border-bottom:0;
                    height: 0.6rem;
                    &:last-child{
                        border-bottom:1px solid #E8E8E8;
                    }
                }
            }
            .scroll-content{
                position:absolute;
                top:1.2rem;
                bottom: 0.9rem;
                width: 100%;
                -webkit-overflow-scrolling:touch;
                overflow:auto;
            }
        }
    }
    .level-intr{
        position: fixed;
        top:0;
        bottom: 0;
        background-color: #ffffff;
        z-index: 102;
        width: 100%;
    }
}
</style>
