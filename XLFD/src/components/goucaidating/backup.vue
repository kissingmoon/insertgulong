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
                        <li v-for="(v,k) in trueCurrentSubList" :key="k">
                            <p class="timeCountText" :ref="v.lottery_id"></p>{{v.kjNewData.lotteryId}}{{v.kjNewData.kjCode}}{{v.locktime}}{{v.kjNewData.realKjTime}}
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
             trueLotteryList:[],
             currentList:[],//当前子彩种
             currentSubList:[],//当前子彩种请求locktime后的返回
             trueCurrentSubList:[],//请求locktime后的返回的处理数组
             truetotalList:[],//请求locktime后的返回的处理数组总数组
             setTimeCount:''
        }
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
       getLottery(){
            this.$axios.postRequest(httpUrl.home.lottery)
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.lotteryList=res.data;
                    this.currentList=this.lotteryList[0].sub_lottery
                    this.getSubLockTime(this.currentList)
                }
            });
        },
        getSubLockTime(ctList){
            let parmList=[]
            ctList.map((v,k)=>{
                parmList.push({'lottery_id':v.lottery_id,'type':'2'})
            })
            this.intervlPost(httpUrl.bet.cpLocktime,ctList.length,parmList,this.currentSubList,this.creatTrueSub)
        },
        intervlPost(url,n,parmList,tempList,callback){  
            if(n!=0){
                this.$axios.postRequest(url,parmList[n-1])
                .then((res)=> {
                    if(res.data && !res.data.errorCode){    
                       tempList[n-1]=res.data   
                        n--;                        
                        this.intervlPost(url,n,parmList,this.currentSubList,callback)                       
                    }
                }) 
            }
            else if(n==0){                       
                callback()        
            }            
        },
        creatTrueSub(){                                              
            this.currentSubList.map((v,k)=>{
                v.locktime=countTime(v.lock_time.replace(/-/g,'/'));
            })
            this.trueCurrentSubList=this.currentSubList.concat() 
            this.trueCurrentSubList.map((v,k)=>{
                this.intervlRunCount(v)
            }) 
        },
        intervlRunCount(sub){        
            this.setTimeCount= setInterval(() => {                
                sub.locktime=countTime(sub.lock_time.replace(/-/g,'/'));
            },1000);
        },
        chooseSubLottery(k){
            this.currentSubList=this.lotteryList[k].sub_lottery
            this.getSubLockTime(this.currentSubList)
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

