<template>
    <div class="flex mainwapper ">  
          <loading v-if="loading"></loading>
                 <scroll class="  flex-1  scroll-warpper" :data='lotteryList'>
                    <ul class="leftcontainer">
                        <li v-for="(v,k) in lotteryList" :key="k" @click="chooseMain&&chooseSubLottery(k)">
                            <img v-lazy="v.currentImage" alt="">
                        </li>
                    </ul>
                </scroll>
                <scroll class="flex-3 scroll-warpper" :data='trueCurrentSubList'>
                     
                    <ul class="rightcontainer">
                        <router-link v-for="(v,k) in trueCurrentSubList" v-if="v.click" :key="k" tag="li" :to="{path:'/draw/number',query:{id:v.lottery_id,name:v.subLotteryObj.lottery_name}}">
                            <!-- {{v.subLotteryObj.lottery_name}}-{{v.locktime}}-{{v.kjNewData.kjCode}}-{{v.kjNewData.lotteryQh}}-{{v.kjNewData.realKjTime}}-{{v.plantime}} -->
                                <p class="flex nameText">
                                    <span class="lnameText">{{v.subLotteryObj.lottery_name}}</span>
                                    <span class="rnameText">第{{v.kjNewData.lotteryQh}}期</span>
                                </p>
                                <!-- <p v-if="v.lottery_id.indexOf('ssc')!=-1||v.lottery_id.indexOf('11x5')!=-1||v.lottery_id.indexOf('28')!=-1" class="flex kjhaoma flex-align-center">                                  
                                    <span class="kjball" v-for="(v1,k1) in v.kjNewData.truekjCode" :key="k1" :style="v1.bg">{{v1.val}}</span>
                                </p>
                                <p v-if="v.lottery_id.indexOf('k3')!=-1" class="flex kjhaoma flex-align-center">                                  
                                    <span  v-for="(v1,k1) in v.kjNewData.truekjCode" :key="k1" :style="v1.bg" :class="v1.clas">
                                    </span>
                                </p>
                                <p v-if="v.lottery_id.indexOf('pk10')!=-1" class="flex kjhaoma flex-align-center">                                  
                                    <span  v-for="(v1,k1) in v.kjNewData.truekjCode" :key="k1" :style="v1.bg" :class="v1.clas">{{v1.val}}
                                    </span>
                                </p>
                                <p v-if="v.lottery_id.indexOf('lhc')!=-1" class="flex kjhaoma flex-align-center">                                  
                                    <span  v-for="(v1,k1) in v.kjNewData.truekjCode" :key="k1" :style="v1.bg" :class="v1.clas">{{v1.val}}
                                    </span>
                                </p> -->
                                <p class="flex kjhaoma flex-align-center">                                  
                                    <span class="" v-for="(v1,k1) in v.kjNewData.truekjCode" :key="k1" :style="v1.bg" :class="v1.clas">{{v1.val}}
                                    </span>
                                </p>
                                <p class="flex lockcount">
                                    <span class="llockcount">距{{v.lottery_qh}}期截至{{v.locktime}}</span>
                                    <!-- <span class="rlockcount" @click="enterBet(v,k)">立即投注</span> -->
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
import {regroupLotteryData,countTime} from 'common/js/param';
import showKjCodeByType from 'common/js/showKjCodeByType.js'
import {mapActions,mapGetters,mapMutations} from 'vuex';
import loading from 'base/loading/loading';
export default {
    data(){
        return {
             lotteryList:[],//所有的彩种列表
             returnSubList:[],//用来存放返回的子彩种数组
             truetotalList:[],//返回数据之后所有彩种总数据
             trueCurrentSubList:[],//当前要渲染的数组
             interval:'',
             loading:false,
             returnObj:{},
             chooseMain:false,
             touzhu:false
        }
    },
    computed:{
        ...mapGetters([
            'xglhc_color'
        ])
    },
    components:{
        Scroll,
        loading
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
            this.returnSubList=[];
            subList.map((v,k)=>{
                parmList.push({'lottery_id':v.lottery_id,'type':'2'})
            })
           // this.intervlPost(httpUrl.bet.cpLocktime,subList.length,parmList,this.returnSubList,this.makeTrueSub,callbackArguments)
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
            this.returnObj.kjNewData.truekjCode=showKjCodeByType(resData.kjNewData.kjCode,resData.lottery_id,this.xglhc_color)            
            this.$set(this.truetotalList[obj.totalIndex],subk,this.returnObj) 
            this.trueCurrentSubList=this.truetotalList[obj.totalIndex]  
            if(this.trueCurrentSubList[subk].lock_time){
                this.touzhu=true;
            }
             if(!this.interval)      {
                this.startIntervl()
            }  
        },
        makeTrueSub(obj){//obj:{totalIndex,subList}
            this.returnSubList.map((v,k)=>{
                v.subLotteryObj=obj.subList[k]
                v.lotteryType=this.lotteryList[obj.totalIndex].lottery_type
                v.locktime=countTime(v.lock_time.replace(/-/g,'/'));
                v.running=true;
                v.plantime=countTime(v.plan_kj_time.replace(/-/g,'/'));
                v.planrunning=true;
                //v.kjNewData.kjCodeList=v.kjNewData.kjCode.split(",");
                v.kjNewData.truekjCode=showKjCodeByType(v.kjNewData.kjCode,v.lottery_id,this.xglhc_color)
            })            
            
            this.$set(this.truetotalList,obj.totalIndex,this.returnSubList) 
            this.trueCurrentSubList=this.truetotalList[obj.totalIndex]   
                      
            if(!this.interval){
                this.startIntervl()
            }                            
        },
        startIntervl(){
            this.interval=setInterval(() => {                
                this.truetotalList.map((v,k)=>{
                    v.map((v1,k1)=>{
                        if(v1.locktime){
                            v1.locktime=countTime(v1.lock_time.replace(/-/g,'/'));                       
                            //v1.plantime=countTime(v1.plan_kj_time.replace(/-/g,'/'));
                            if(v1.running==true&&v1.planrunning==true){                                
                                if(v1.locktime=="00:00:00"){
                                    v1.running=false;
                                    setTimeout(()=>{
                                        this.getSingleLockTime(v1,k,k1)
                                    },5000)
                                }
                                // else if(v1.plantime=="00:00:00"){
                                //     console.log("开奖时间到了")
                                //     v1.planrunning=false;
                                //     setTimeout(()=>{
                                //         this.getSingleLockTime(v1,k,k1)
                                //     },35000)
                                // }
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
                    // if(sub.plantime!="00:00:00"){
                    //     res.data.plan_kj_time=sub.plan_kj_time
                    // }
                    var obj = Object.assign(sub,res.data);
                    obj.running=true;
                    //obj.kjNewData.kjCodeList=obj.kjNewData.kjCode.split(",");
                    obj.kjNewData.truekjCode=showKjCodeByType(obj.kjNewData.kjCode,obj.lottery_id)
                    //obj.planrunning=true;   
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
                    height: 2.5rem;
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

