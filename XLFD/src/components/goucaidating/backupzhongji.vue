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
                            {{v.lotteryname}}-{{v.locktime}}-{{v.kjNewData.kjCode}}-{{v.kjNewData.lotteryQh}}-{{v.kjNewData.realKjTime}}
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
             lotteryList:[],//所有的彩种列表
             returnSubList:[],//用来存放返回的子彩种数组
             truetotalList:[],//返回数据之后所有彩种总数据
             trueSubList:[],//返回后修改的子彩种
             trueCurrentSubList:[],//当前要渲染的数组
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
        // truetotalList: {
        //     handler (cval, oval) {
        //         console.log('--------')
        //         console.log(cval, oval)
        //     },
        //     deep: true
        // }
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
            var callbackArguments={totalIndex}
            this.returnSubList=[]
            subList.map((v,k)=>{
                parmList.push({'lottery_id':v.lottery_id,'type':'2'})
            })
            this.intervlPost(httpUrl.bet.cpLocktime,subList.length,parmList,this.returnSubList,this.makeTrueSub,callbackArguments)
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
        makeTrueSub(obj){//obj:{resultList,totalIndex}
            this.trueSubList=this.makeNewList(this.returnSubList,['locktime','lotteryname','index'])
            this.trueSubList.map((v,k)=>{
                v.locktime=countTime(v.lock_time.replace(/-/g,'/'));
                v.lotteryname=this.truetotalList[obj.totalIndex]['sub_lottery'][k]['lottery_name']
                v.index=obj.totalIndex
            })        
            this.updateTruetotalList(obj.totalIndex,"trueSubList",this.trueSubList) 
            this.trueCurrentSubList=this.truetotalList[obj.totalIndex].trueSubList  
            if(this.truetotalList[obj.totalIndex].intervlList==""&&this.truetotalList[obj.totalIndex].trueSubList!=""){
                this.truetotalList[obj.totalIndex].intervlList=[]
                this.truetotalList[obj.totalIndex].trueSubList.map((v,k)=>{                   
                    this.intervlRunCount(v,obj.totalIndex,k)
                })
            }
        },
        updateTruetotalList(index,key,newvalue){
            var tempTotalList=this.truetotalList.concat()
            tempTotalList[index][key]=newvalue
            this.truetotalList=tempTotalList
        },
        intervlRunCount(sub,num,subnum){       
            this.truetotalList[num].intervlList[subnum]= setInterval(() => {                
                sub.locktime=countTime(sub.lock_time.replace(/-/g,'/'));
                if(sub.locktime=="00:00:00"){
                    clearInterval(this.truetotalList[num].intervlList[subnum])
                    setTimeout(() => {                  
                        this.getSingleLockTime(sub,num,subnum)
                    },5000);
                }
            },1000);

        },
        getSingleLockTime(sub,num,subnum){
            var id=sub.lottery_id
            this.$axios.postRequest(httpUrl.bet.cpLocktime,{'lottery_id':id,'type':'2'})
            .then((res)=> {
                if(res.data && !res.data.errorCode){ 
                   var obj=res.data;
                   obj.locktime=countTime(res.data.lock_time.replace(/-/g,'/'));
                   obj.index=num;
                   obj.lotteryname=this.truetotalList[num]['sub_lottery'][subnum]['lottery_name']
                   //这里更新检测不到
                   //this.truetotalList[num].trueSubList[subnum]=obj;
                   //this.set(this.truetotalList[num].trueSubList, subnum, obj)
                   this.truetotalList[num].trueSubList.splice(subnum, 1, obj)
                   this.intervlRunCount(this.truetotalList[num].trueSubList[subnum],num,subnum)
                }
            })
        },
        chooseSubLottery(k){
            if(this.truetotalList[k].trueSubList==""){               
                this.getSubLockTime(this.truetotalList,k)
            }
            else{
                this.trueCurrentSubList=this.truetotalList[k].trueSubList
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

