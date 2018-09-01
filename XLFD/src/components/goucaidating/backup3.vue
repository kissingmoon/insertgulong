<template>
    <div class="flex mainwapper ">      
                 <scroll class="  flex-1  scroll-warpper" >
                    <ul class=" leftcontainer">
                        <li v-for="(v,k) in lotteryList" :key="k" @click="chooseSubLottery(k)">
                            {{v.lottery_label}}
                        </li>
                    </ul>
                </scroll>
                <scroll class="  flex-3 scroll-warpper" >
                    <ul class=" rightcontainer">
                        <li v-for="(v,k) in truetotalList" :key="k">
                            {{v.lottery_label}}
                            <p v-for="(v1,k1) in v.trueSubList" :key="k1">{{v1.locktime}}</p>
                        </li> 
                    </ul>
                </scroll>   
    </div>
</template>
<script>
import Scroll from 'base/scroll/scroll';
import {httpUrl} from 'common/js/map';
import {regroupLotteryData,countTime} from 'common/js/param';

export default {
    data(){
        return {
             lotteryList:[],
             subList:[],//返回后的子彩种
             truetotalList:[],
             trueSubList:[],
             setTimeCount:''
        }
    },
    computed:{
    },
    components:{
        Scroll
    },
    created() {       
        this.getLottery()
    },
    beforeDestroy(){
        
    },
    mounted(){
    },
    watch:{
    },
    methods:{
        makeNewList(oldList,objList){
            var newList=oldList.concat();
            newList.map((v,k)=>{
                objList.map((v1,k1)=>{
                    v[v1]=""
                })
            })
            return  newList;
        },
        makeTrueSubList(){},
       getLottery(){
            this.$axios.postRequest(httpUrl.home.lottery)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.lotteryList=res.data;                     
                    this.truetotalList=this.makeNewList(this.lotteryList,['trueSubList','intervlList'])
                    var totalIndex=0;
                    this.getSubLockTime(this.truetotalList,totalIndex)
                }
            });
        },
        getSubLockTime(totalList,totalIndex){
            var subList=totalList[totalIndex].sub_lottery
            var parmList=[]
            var resultList=[]
            var callbackArguments={resultList,totalIndex}
            subList.map((v,k)=>{
                parmList.push({'lottery_id':v.lottery_id,'type':'2'})
            })
            this.intervlPost(httpUrl.bet.cpLocktime,subList.length,parmList,resultList,this.testTrueSub,callbackArguments)
        },
        intervlPost(url,n,parmList,tempList,callback,callbackArguments){  
            if(n!=0){
                this.$axios.postRequest(url,parmList[n-1])
                .then((res)=> {
                    if(res.data && !res.data.errorCode){    
                       tempList[n-1]=res.data   
                        n--;                        
                        this.intervlPost(url,n,parmList,tempList,callback,callbackArguments)                       
                    }
                }) 
            }
            else if(n==0){                       
               callback(callbackArguments)       
            }            
        },
        testTrueSub(obj){
            this.subList=obj.resultList;    
            this.trueSubList=this.makeNewList(this.subList,['locktime'])
            this.trueSubList.map((v,k)=>{
                v.locktime=countTime(v.lock_time.replace(/-/g,'/'));
            })
            console.log(this.trueSubList)
            this.updateTruetotalList(obj.totalIndex,"trueSubList",this.trueSubList)
        },
        updateTruetotalList(index,key,newvalue){
            var tempTotalList=this.truetotalList.concat()
            //tempTotalList[obj.totalIndex].trueSubList=this.subList;
            tempTotalList[index][key]=newvalue
            this.truetotalList=tempTotalList
            console.log(this.truetotalList)
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
                border-right: 1px solid grey;
                li{
                    height: 2.5rem;
                }
            } 
            .rightcontainer{
                li{
                    height: 1rem;
                    .timeCountText{
                        width: 1rem;
                    }
                }
            }             
         }   
    }
    img{
        display: block;
        width: 100%;
    }
</style>

