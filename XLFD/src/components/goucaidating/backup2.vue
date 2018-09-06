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
                            {{v.locktime}}-{{v.lottery_qh}}
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
                    this.lotteryList.map((v,k)=>{
                        v.trueSubList="",
                        v.intervlList=[]
                    })
                   
                    this.truetotalList=this.lotteryList.concat()
                    this.currentList=this.lotteryList[0].sub_lottery
                    this.trueCurrentSubList.index=0;
                    this.getSubLockTime(this.currentList,0)
                }
            });
        },
        getSingleLockTime(num,subnum){
            var id=this.truetotalList[num].trueSubList[subnum].lottery_id
            console.log(id)
            console.log(num,subnum)
            this.$axios.postRequest(httpUrl.bet.cpLocktime,{'lottery_id':id,'type':'2'})
            .then((res)=> {
                if(res.data && !res.data.errorCode){  
                    this.currentSubList[subnum]=res.data
                    this.currentSubList[subnum].locktime=countTime(res.data.lock_time.replace(/-/g,'/'));
                    this.currentSubList[subnum].index=num;
                    if(this.trueCurrentSubList[subnum].index==num){
                        this.trueCurrentSubList[subnum]=this.currentSubList[subnum]
                    }
                    this.createTruetotalList(num,this.currentSubList)                    
                    var sub=this.truetotalList[num].intervlList[subnum]
                    this.truetotalList[num].intervlList[subnum]= setInterval(() => {                
                        sub.locktime=countTime(sub.lock_time.replace(/-/g,'/'));
                        if(sub.locktime=="00:00:00"){
                            clearInterval(this.truetotalList[num].intervlList[subnum])
                            setTimeout(() => {                                               
                                console.log("该定时器已经清除")
                                this.getSingleLockTime(num,subnum)
                            },5000);
                        }
                    },1000);
                }
            })
        },
        getSubLockTime(ctList,num){
            let parmList=[]
            ctList.map((v,k)=>{
                parmList.push({'lottery_id':v.lottery_id,'type':'2'})
            })
            this.intervlPost(httpUrl.bet.cpLocktime,ctList.length,parmList,this.currentSubList,this.creatTrueSub,num)
        },
        intervlPost(url,n,parmList,tempList,callback,num){  
            if(n!=0){
                this.$axios.postRequest(url,parmList[n-1])
                .then((res)=> {
                    if(res.data && !res.data.errorCode){    
                       tempList[n-1]=res.data   
                        n--;                        
                        this.intervlPost(url,n,parmList,tempList,callback,num)                       
                    }
                }) 
            }
            else if(n==0){                       
                callback(num)        
            }            
        },
        creatTrueSub(num){
            console.log("子彩种倒计时加载完毕")                                                 
            this.currentSubList.map((v,k)=>{
                v.locktime=countTime(v.lock_time.replace(/-/g,'/'));
                v.index=num
            })
            this.trueCurrentSubList=this.currentSubList.concat() 
            this.createTruetotalList(num,this.trueCurrentSubList)
            console.log(this.trueCurrentSubList)
            this.trueCurrentSubList.map((v,k)=>{
                this.intervlRunCount(v,num,k)
            }) 
            console.log(this.truetotalList[num].intervlList)   
        },
        createTruetotalList(k,v){
           this.truetotalList[k].trueSubList=v     
        },
        intervlRunCount(sub,num,subnum){   
            console.log("看看总共有几个定时器")     
            this.truetotalList[num].intervlList[subnum]= setInterval(() => {                
                sub.locktime=countTime(sub.lock_time.replace(/-/g,'/'));
                if(sub.locktime=="00:00:00"){
                    clearInterval(this.truetotalList[num].intervlList[subnum])
                    setTimeout(() => {                                               
                        console.log("该定时器已经清除")
                        this.getSingleLockTime(num,subnum)
                    },5000);
                }
            },1000);

        },
        chooseSubLottery(k){
            this.currentSubList=this.lotteryList[k].sub_lottery
            if(this.truetotalList[k].trueSubList==""){
                this.getSubLockTime(this.currentSubList,k)
            }
            else{
                this.trueCurrentSubList=this.truetotalList[k].trueSubList
                console.log("已经有了")
                console.log(this.truetotalList[k].trueSubList)
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

