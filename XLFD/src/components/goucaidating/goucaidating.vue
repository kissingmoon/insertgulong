<template>
    <div class="flex mainwapper ">  
        <scroll class="flex-1  scroll-warpper" :data='lotteryList'>
            <ul class="leftcontainer">
                <li v-for="(v,k) in lotteryList" :key="k" @click="chooseMain&&chooseSubLottery(k)">
                    <img v-lazy="v.currentImage" alt="">
                </li>
            </ul>
        </scroll>
        <scroll class="flex-3 scroll-warpper" :data='trueCurrentSubList'>  
            <ul class="rightcontainer">
                <router-link v-for="(v,k) in trueCurrentSubList" v-if="v.click" :key="k" tag="li" :to="{path:'/draw/number',query:{id:v.lottery_id,name:v.subLotteryObj.lottery_name,type:v.lotteryType}}">   
                    <p class="flex nameText">
                        <span class="lnameText">{{v.subLotteryObj.lottery_name}}</span>
                        <span class="rnameText">第{{v.kjNewData.lotteryQh}}期</span>
                    </p>
                    <p class="flex kjhaoma flex-align-center">                                  
                        <span class="" v-for="(v1,k1) in v.kjNewData.truekjCode" :key="k1" :style="v1.bg" :class="v1.clas">{{v1.val}}
                        </span>
                        <!-- 开奖大小 -->
                        <span class="k3-kjCode" v-if="v.lotteryType=='9'">
                            <span class="k3-kjCode-Item"  v-for="(value, key) in judge( v.kjNewData.truekjCode)" :key="key">{{value}}</span>
                        </span>
                        
                        <!-- <span v-if="v.lotteryType=='9'">{{judge( v.kjNewData.truekjCode).total}}</span>
                        <span v-if="v.lotteryType=='9'">{{judge( v.kjNewData.truekjCode).daxiao}}</span>
                        <span v-if="v.lotteryType=='9'">{{judge( v.kjNewData.truekjCode).danshuang}}</span> -->
                    </p>
                    <p class="flex lockcount">
                        <span class="llockcount">距{{v.lottery_qh}}期截止{{v.locktime}}</span>
                        <router-link v-if="v.click" class="rlockcount" tag="span" :to="{path:'/lottery',query:{id:v.lottery_id,type:v.lotteryType}}">立即投注</router-link>
                    </p>
                </router-link> 
            </ul>
        </scroll>   
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import {httpUrl} from 'common/js/map';
import {countTime} from 'common/js/param';
import showKjCodeByType from 'common/js/showKjCodeByType.js'
import {mapActions,mapGetters,mapMutations} from 'vuex';
export default {
    data(){
        return {
             lotteryList:[],//所有的彩种列表
             truetotalList:[],//返回数据之后所有彩种总数据
             trueCurrentSubList:[],//当前要渲染的数组
             interval:'',
             returnObj:{},
             chooseMain:false
        }
    },
    computed:{
        ...mapGetters([
            'xglhc_color'
        ])
    },
    components:{
        Scroll
    },
    created() {   
        this.getLottery()
    },
    beforeDestroy(){
        clearInterval(this.interval)
    },
    mounted(){
    },
    methods:{
        judge(list){
            var returnObj={
                total:0,
                danshuang:"单",
                daxiao:"小"
            }
            list.map((v,k)=>{
                returnObj.total+=v.value
            })
            if(returnObj.total%2==0){
                returnObj.danshuang="双"
            }
            if(returnObj.total>=11){
                returnObj.daxiao="大"
            }
            return returnObj
        },
       getLottery(){
            this.$axios.postRequest(httpUrl.home.lottery)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.chooseMain=true;
                    this.lotteryList=res.data; 
                    var tempList = new Array(); //先声明一维 
                    this.lotteryList.map((v,k)=>{
                        v.currentImage=v.lottery_image_blue
                        this.$set(this.lotteryList,k,v) 
                        tempList[k] = new Array()
                        v.sub_lottery.map((v1,k1)=>{
                            tempList[k][k1]={}
                            tempList[k][k1].kjNewData={kjCode:"",lotteryQh:""}
                            tempList[k][k1].subLotteryObj=v1
                            tempList[k][k1].click=false
                        })
                    })   
                    this.truetotalList=tempList.concat()
                    this.trueCurrentSubList=this.truetotalList[0]  
                    this.lotteryList[0].currentImage=this.lotteryList[0].lottery_image
                    this.getSubLockTime(this.lotteryList,0)
                    
                }
            });
        },
        getSubLockTime(totalList,totalIndex){
            var subList=totalList[totalIndex].sub_lottery.concat();
            var parmList=[];
            var callbackArguments={totalIndex,subList};
            subList.map((v,k)=>{
                parmList.push({'lottery_id':v.lottery_id,'type':'2'})
            })
           this.mapPost(httpUrl.bet.cpLocktime,subList.length,parmList,callbackArguments)
        },
        mapPost(url,n,parmList,obj){
            for(let i=0;i<n;i++){
                this.$axios.postRequest(url,parmList[i])
                .then((res)=> {
                   if(res.data && !res.data.errorCode){  
                       this.computedTotalList(i,obj,res.data)
                       
                   }
                })
            }           
        },
        computedTotalList(subk,obj,resData){
            //subk是子彩种下标，obj.totalIndex是子彩种在父彩种的下标  obj.subList是子彩种信息数组
            this.returnObj=resData;         
            this.returnObj.subLotteryObj=obj.subList[subk]
            this.returnObj.lotteryType=this.lotteryList[obj.totalIndex].lottery_type
            this.returnObj.locktime=countTime(resData.lock_time.replace(/-/g,'/'));
            this.returnObj.running=true;
            this.returnObj.plantime=countTime(resData.plan_kj_time.replace(/-/g,'/'));
            this.returnObj.planrunning=true;
            this.returnObj.click=true;
            this.returnObj.kjNewData.truekjCode=showKjCodeByType(resData.kjNewData.kjCode,resData.lotteryType,this.xglhc_color)            
            this.$set(this.truetotalList[obj.totalIndex],subk,this.returnObj) 
            this.trueCurrentSubList=this.truetotalList[obj.totalIndex]  
             if(!this.interval)      {
                this.startIntervl()
            }  
        },
        startIntervl(){
            this.interval=setInterval(() => {                
                this.truetotalList.map((v,k)=>{
                    v.map((v1,k1)=>{
                        if(v1.locktime){
                            v1.locktime=countTime(v1.lock_time.replace(/-/g,'/'));   
                            //this
                            v1.plantime=countTime(v1.plan_kj_time.replace(/-/g,'/'));

                            if(v1.running==true&&v1.planrunning==true){                                
                                if(v1.locktime=="00:00:00"){
                                    v1.running=false;
                                    setTimeout(()=>{
                                        this.getSingleLockTime(v1,k,k1)
                                    },5000)
                                }
                                //this
                                else if(v1.plantime=="00:00:00"){
                                    v1.planrunning=false;
                                    setTimeout(()=>{
                                        this.getSingleLockTime(v1,k,k1)
                                    },40000)
                                }
                                
                                else{                                    
                                    this.$set(v,k1,v1)
                                }
                            }                            
                        }
                        
                    })
                })
            },1000);
        },
        getSingleLockTime(sub,num,subnum){
            var id=sub.lottery_id
            this.$axios.postRequest(httpUrl.bet.cpLocktime,{'lottery_id':id,'type':'2'})
            .then((res)=> {
                if(res.data && !res.data.errorCode){ 
                    //this
                    if(sub.plantime!="00:00:00"){
                        res.data.plan_kj_time=sub.plan_kj_time
                    }

                    var obj = Object.assign(sub,res.data);
                    obj.running=true;
                    obj.kjNewData.truekjCode=showKjCodeByType(obj.kjNewData.kjCode,obj.lotteryType,this.xglhc_color)
                    //this
                    obj.planrunning=true;   

                    this.$set(this.truetotalList[num],subnum,obj) 
                }
            })
        },
        chooseSubLottery(k){
            this.lotteryList.map((value,key)=>{
                value.currentImage=this.lotteryList[key].lottery_image_blue
                if(key==k){
                    this.lotteryList[k].currentImage=this.lotteryList[k].lottery_image
                }
            })   
            this.trueCurrentSubList=this.truetotalList[k]
            if(!this.truetotalList[k][0].lock_time){       
                this.getSubLockTime(this.lotteryList,k)
            }
        }
    }
}
</script>
<style lang="scss" scoped>       
    .mainwapper{
        position: fixed;
        width: 100%;
        top: 1.2rem;
        bottom: 1.44rem;
        .scroll-warpper{
            height: 100%;
            overflow: hidden;
            .leftcontainer{
                border-right: 1px solid #F2F2F2 ;
                li{
                    height: 2.52rem;
                    padding-top: 0.35rem;
                    box-sizing: border-box;
                }
            } 
            .rightcontainer{
                li{
                    height: 3rem;
                    padding: 0 0.3rem;
                    border-bottom:1px solid#F2F2F2 ;
                    .nameText{
                       height: 0.7rem;
                       justify-content:space-between;
                       line-height: 0.7rem;
                       .lnameText{
                           font-size: 0.4rem;
                       }
                       .rnameText{
                           font-size: 0.3rem;
                           color: #949494 ;
                       }
                    }
                    .kjhaoma{
                        height: 1.5rem;
                        .k3-kjCode{
                            position:absolute;
                            right: 0.3rem;
                            .k3-kjCode-Item{
                                margin-left: 0.72rem;
                                color: #949494;
                                font-size: 0.35rem;
                            }
                        }
                        .last-draw-ssc{
                            display: inline-block;
                            width: 0.8rem;
                            height: 0.8rem;
                            border-radius: 50%;
                            background: #DA1C36;
                            line-height: 0.8rem;
                            text-align: center;
                            margin-left: 0.3rem;
                            color: #F2F2F2;
                        }
                        .last-draw-k3{
                            display: inline-block;
                            width: 0.7rem;
                            height: 0.7rem;
                            margin: 0 0.1rem;
                        }
                        .last-draw-11x5{
                            display: inline-block;
                            width: 0.8rem;
                            height: 0.8rem;
                            border-radius: 50%;
                            background: #DA1C36;
                            line-height: 0.8rem;
                            text-align: center;
                            margin-left: 0.3rem;
                            color: #F2F2F2;
                        }
                        .last-draw-lhc{
                            display: inline-block;
                            width: 0.8rem;
                            height: 0.8rem;
                            border-radius: 50%;
                            line-height: 0.8rem;
                            text-align: center;
                            margin-left: 0.1rem;
                            color: #F2F2F2;
                        }
                        .last-draw-pk10{
                            display: inline-block;
                            width: 0.6rem;
                            height: 0.6rem;
                            border-radius: 50%;
                            line-height: 0.6rem;
                            text-align: center;
                            margin-left: 0.1rem;
                            color: #F2F2F2;
                        }
                        .last-draw-xy28{
                            display: inline-block;
                            width: 0.8rem;
                            height: 0.8rem;
                            border-radius: 50%;
                            background: #DA1C36;
                            line-height: 0.8rem;
                            text-align: center;
                            margin-left: 0.3rem;
                            color: #F2F2F2;
                        }
                    }
                    .lockcount{
                        height: 0.7rem;
                        justify-content:space-between;
                        .llockcount{
                           font-size: 0.3rem;
                           color: #949494 ;
                           line-height: 0.7rem;
                        }
                        .rlockcount{
                            background: #DA1C36;
                            display: inline-block;
                            color: #F2F2F2;
                            height: 0.6rem;
                            line-height: 0.6rem;
                            width: 2rem;
                            text-align: center;
                            font-size: 0.3rem;
                            border-radius: 0.1rem;
                        }
                    }
                }
            }             
         }   
    }
    img{
        display: block;
        width: 80%;
        margin: 0 auto;
    }
</style>

