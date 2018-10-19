<template>
   <div class="flex flex-v wapper">
       <div class="flex top-wapper">
           <div class="flex-1 flex flex-v top-content">
               <div class="flex-1 flex flex-center right-border">距{{lotteryInfo.show_qh}}期截止:</div> 
               <div class="flex-1 flex flex-center count right-border">{{drawCountTime}}</div>
           </div>
           <div class="flex-1 flex flex-v top-content">
               <div class="flex-1 flex flex-center">余额</div> 
               <div class="flex-1 flex flex-center count">{{account.balance}}</div>
           </div>
       </div>
        <div class="flex kj-wapper flex-pack-center">
            <div class="flex flex-center">{{newDraw.lottery_qh}}期开奖</div>
            <div class="flex flex-1 flex-center lottery-wf" @click="showHistory" v-for="(item,index) in isAll?newDraw:[]">
                <span :class=v.clas v-for="(v,k) in newDraw.resultList" :key="k" :style="v.bg">
                    {{v.val}}
                </span>
                <span class="icon-triangle-below" :class="isHistoryShow ? 'show': ''"></span>
            </div>
        </div>
       <div class="flex-1 main-wapper">
           <div v-for="(v,k) in socketList" :key="k" class="flex flex-center message-wapper">
               <div v-if="v.msgType!='2'" :class="v.class">{{v.neirong}}</div>
               <div :class="v.class" class="flex flex-1" v-if="v.msgType=='2'">
                   <div class="user-img">
                       <img :src="v.neirong.image_url" alt="">
                    </div>
                   <div class="user-betMsg" @click="!v.isSelf&&followBet(v.neirong)">
                       <div class="flex flex-align-center betMsg-title">{{v.neirong.user_id}}</div>
                       <div class="betMsg-content flex flex-v"> 
                            <div class="flex flex-1 flex-align-center flex-pack-justify">
                                <span>第{{v.neirong.lottery_qh}}期</span>
                                <span> {{v.neirong.wfDetail.title}} </span>
                            </div>
                            <div class="flex flex-1  flex-align-center flex-pack-justify">
                                <span>{{v.neirong.bet_money}}元</span>
                                <span>{{v.neirong.bet_number}}</span>
                            </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <div class="flex flex-align-center footer">
            <input v-model="textMsg" class="flex-1" style="height:0.87rem;"  type="text">
            <button style="background:lightblue;" class="flex flex-center footer-btn" v-on:click.stop="sendMsg"> 发消息</button>
            <span class="flex flex-center footer-btn"  v-on:click.stop="showBet">投注</span>
       </div>
       <bet-board v-if="betKeyboard" 
                @showWf="showWf"
                  @closeBoard="hideBet" 
                  @sendSocketMsg="sendSocketMsg" 
                  class="bet-board"
                  :lotteryInfo="lotteryInfo">
        </bet-board>

        <div class="followCase">
            
        </div>
        <div class="grayBg" v-if="betKeyboard" @click="hideBet"></div>
   </div>
</template>
<script>
import {httpUrl} from 'common/js/map';
import {mapMutations,mapActions,mapGetters} from 'vuex';
import {slicer,countTime} from 'common/js/param.js';
import BetBoard from 'components/bet-room/bet-board';
import showKjCodeByType from 'common/js/showKjCodeByType.js'
import WfKind from 'components/lottery/wf-kind-room';
import LotteryWfDetail from 'common/js/Lottery_wf_detail';

export default {
    data(){
        return {
            header:{
                title:'房间列表',
                back:true
            },
            lotteryInfo:{},
            lotteryId:"",
            drawCountTime:'',
            lockTimes:'',
            socketList:[],
            drawHistoryList:[],
            betKeyboard:false,
            newDraw:{},
            lotteryType:"",
            webSocket:"",
            textMsg:"",
            isHistoryShow:false,
        }
    },
    components:{
        BetBoard,
        WfKind,
    },
    created(){
        this.lotteryId=this.$route.query.id;
        this.lotteryType=this.$route.query.type;
        this.header.title =this.$route.query.name;
        this.setHeader(this.header);
        this.getDrawHis();
        if(this.user_token){
            this.openWebsocket()
            this.getLockTime()
        }
        else{
            this.$router.push({
                path:'/login'
            });
        }
    },
    computed:{
        ...mapGetters([
            'user_token',
            'account',
            'xglhc_color'
        ])
    },
    beforeDestroy(){
        console.log("这里会关闭一次web socket")
        this.webSocket.close()
    },
     methods:{
        ...mapMutations({
            setTip:'SET_TIP',
        }),
        showHistory(){
            this.isHistoryShow = !this.isHistoryShow;
        },   
        showWf(wf){
            this[wf] = true;
        },
        //获取玩法封单时间
        getLockTime(){
            this.$axios.postRequest(httpUrl.bet.lockTime,{lottery_id:this.lotteryId})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.lotteryInfo=res.data;
                    this.setCountTime(res.data.lock_time.replace(/-/g,'/'));
                };
            });
        },
        //获取开奖历史
        getDrawHis(){
            this.$axios.postRequest(httpUrl.descover.drawNumber,{lottery_id:this.lotteryId,page_size:20,page_no:1})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.newDraw=res.data[0];
                    this.drawHistoryList=slicer(res.data,"kj_code",",");
                    console.log(this.drawHistoryList)
                    debugger
                    //根据最近一期的开奖号码显示不同的颜色
                    this.newDraw.resultList=showKjCodeByType(res.data[0].kj_code,this.lotteryType,this.xglhc_color)
                    console.log(this.newDraw)
                };
            });            
        },
        //倒计时功能
        setCountTime(dateStr) {
            const urlHash =this.$route.path;
            this.drawCountTime=countTime(dateStr);
            if(this.drawCountTime == "00:03:00"){
                this.getDrawHis();
            }
            if (this.drawCountTime == "00:00:00" && urlHash == "/betroom") {
                this.setTip(`${this.lotteryInfo.lottery_qh}期已封单,<br/>请在${this.lotteryInfo.next_qh}期继续投注`);
                clearTimeout(this.getLockTimes);
                this.getLockTimes = setTimeout(() => {
                    this.getLockTime();
                    this.getDrawHis();
                },2000);
            }
            else if(urlHash == "/betroom"){
                clearTimeout(this.lockTimes);
                this.lockTimes=setTimeout(() => {
                    this.setCountTime(dateStr);
                },1000);
            }
        },
        openWebsocket(){
            if ('WebSocket' in window) {
               
                    this.webSocket = new WebSocket(`${httpUrl.config.webSocket}/${this.$route.query.roomId}/${this.user_token}`);
                }
            else {
                    alert('当前浏览器 Not support websocket')
                }
            this.webSocket.onopen =  ()=> {
                console.log("WebSocket连接成功");
            }
            //接收到消息的回调方法
            this.webSocket.onmessage = event=> {
                console.log("收到服务器消息了")
                // this.socketMessage=event.data;
                var resData=JSON.parse(event.data)
                console.log(event.data)
                console.log(JSON.parse(event.data))
                var obj={}
                obj.msgType=resData.msgType
                obj.class="msgType"+resData.msgType
                if(resData.msgType=='2'){
                    obj.neirong=JSON.parse(resData.message)
                    const lottery=obj.neirong.wf_flag.split('_')[0];
                    obj.isSelf=false;
                    obj.neirong.wfDetail=LotteryWfDetail[lottery].wf_class[obj.neirong.wf_flag];
                    console.log(this.user_token)
                    if(obj.neirong.user_token==this.user_token){
                        obj.class="msgType"+resData.msgType+"-self"
                        obj.isSelf=true;
                    }
                }else{
                    obj.neirong=resData.message
                }
                this.socketList.push(obj)
            }
        },
        sendSocketMsg(message){
            console.log("出发了")
            // this.webSocket.send("如果你能收到我的消息");
            // this.webSocket.send(message);
            message.user_token=this.user_token
            console.log(JSON.stringify(message))
            this.webSocket.send(JSON.stringify(message));
        },
        sendMsg(){
            var textObj={}
            textObj.textMsg=this.textMsg
            this.sendSocketMsg(textObj)
        },
        followBet(followInfo){
            console.log("followInfo")
            if(followInfo.lottery_qh!=this.lotteryInfo.lottery_qh){
                this.setTip(`${followInfo.lottery_qh}期已封单,<br/>请在${this.lotteryInfo.lottery_qh}期继续跟单`);
            }
            var param={
                bet_count: followInfo.bet_count,
                bet_number:followInfo.bet_number,
                by_money:followInfo.by_money,
                lottery_id:followInfo.lottery_id,
                lottery_modes:followInfo.lottery_modes,
                lottery_qh:followInfo.lottery_qh,
                wf_flag:followInfo.wf_flag
            }
            this.$axios.postRequest(httpUrl.bet.betOrder,param)
            .then((res)=> {
                //this.hide('loadingShow');
                if(res.data && !res.data.errorCode){
                    // this.allClear();
                    // this.getUser()
                    //this.hide('betAffirmShow');
                    //this.show('betSuccessShow');
                    alert("跟单成功")
                    this.sendSocketMsg(param)
                };
            })
            .catch((err) => {
                this.hide('loadingShow');
            });
        },
        showBet(){
            this.betKeyboard=true;
        },
        hideBet(){
            this.betKeyboard=false;
        },
        ...mapMutations({
            setHeader:'SET_HEADER',
        })
     }
}
</script>
<style lang="scss" scoped>
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.right-border{
    @include border-right-1px(solid,#f2f2f2);
}
.wapper{
    position: fixed;
    width: 100%;
    top: 1.2rem;
    bottom: 0;
    z-index: 103;
    background: #ffffff;
    .grayBg{
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        background-color: #000;
        opacity: .7;
        overflow: hidden;
    }
    .bet-board,.wfkind{
        position: fixed;
        width: 100%;
        top: initial;
        bottom: 0;
        z-index: 104;
        height: 80vh;
        background: #ffffff;
        overflow: auto;
    }
    .top-wapper{
        @include border-bottom-1px(solid,#f2f2f2);
        .top-content{
            height: 1.65rem;
            box-sizing: border-box;
            padding: 0.25rem 0;
            .count{
                color: #CD9E62;
                font-size: $font-size-large;
            }
        }
    }
    .kj-wapper{
        height: 1.06rem;
        box-sizing: border-box;
        padding: 0 0.3rem;
        position: relative;
        @include border-bottom-1px(solid,#f2f2f2);
        .lottery-wf{
            float: right;
            font-size: $font-size-medium;
            line-height: 0.8rem;
            color:$color-yellow;
            @include no-wrap();
            .icon-triangle-below{
                position: absolute;
                right: .2rem;
                transition: all .3s ease-in-out;
            }
            .show{
                    transform: rotate(180deg)
                }
            .last-draw-ssc{
                display: inline-block;
                width: 0.7rem;
                height: 0.7rem;
                margin: 0 0.1rem;
                border-radius: 50%;
                font-size: 0.45rem;
                color: #ffffff;
                line-height: 0.7rem;
                text-align: center;
                background: $color-red;
            }
            .last-draw-k3{
                display: inline-block;
                width: 0.6rem;
                height: 0.6rem;
                margin: 0.1rem 0.2rem;
            }
            .last-draw-11x5{
                display: inline-block;
                width: 0.7rem;
                height: 0.7rem;
                margin: 0 0.2rem;
                font-size: 0.4rem;
                border-radius: 50%;
                color: #ffffff;
                line-height: 0.7rem;
                background: $color-red;
                text-align: center;
            }
            .last-draw-xy28{
                display: inline-block;
                width: 0.7rem;
                height: 0.7rem;
                margin: 0 0.2rem;
                line-height: 0.7rem;
                margin-left: 0.3rem;
                font-size: 0.4rem;
                border-radius: 50%;
                color: #ffffff;
                    background: $color-red;
                text-align: center;
            }
            .last-draw-lhc{
                display: inline-block;
                width: 0.6rem;
                height: 0.6rem;
                margin: 0 0.1rem;
                border-radius: 50%;
                line-height: 0.6rem;
                text-align: center;
                margin-left: 0.05rem;
                color: #F2F2F2;
                font-size: .4rem;
                &:nth-child(7){
                    position: relative;
                    top: .12rem;
                }
            }
            .last-draw-pk10{
                display: inline-block;
                width: 0.54rem;
                height: 0.54rem;
                border-radius: 50%;
                line-height: 0.54rem;
                text-align: center;
                color: #F2F2F2;
                font-size: 0.38rem;
                margin-left: 0.05rem;
            }
        }
    }
    .main-wapper{
        background: #F2F2F2;
        overflow: auto;
        .message-wapper{
            padding: 0.3rem 0;
            .msgType0{
                color: #DA1C36;
                width: 7rem;
                background: #E2E2E2;
                line-height: 0.5rem;
                text-align: center;
                padding: 0.1rem 0;
                border-radius: 5px;
            }
            .msgType1{
                padding:0 0.2rem;
                background: #E2E2E2;
                height: 1rem;
                line-height: 1rem;
                color: #969696 ;
                border-radius: 5px;
            }
            .msgType2{
                height: 2.2rem;
                padding:0 0.3rem;
                .user-img{
                    height: 1.1rem;
                    width: 1.1rem;
                    border-radius: 50%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .user-betMsg{
                    margin-left: 0.3rem;
                    width: 6rem;    
                    .betMsg-title{
                        color: #969696;
                        font-size: $font-size-small;
                        height: 0.5rem;
                    }
                    .betMsg-content{
                        padding: 0 0.3rem;
                        height: 1.7rem;
                        opacity: 0.69;
                        background: #DA1C36;
                        border-radius: 0 10px 10px 10px;
                        color: #FFFFFF;
                    }
                }
            }
            .msgType2-self{
                height: 2.2rem;
                padding:0 0.3rem;
                flex-direction:row-reverse;
                .user-img{
                    height: 1.1rem;
                    width: 1.1rem;
                    border-radius: 50%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .user-betMsg{
                    margin-right: 0.3rem;
                    width: 6rem; 
                    .betMsg-title{
                        color: #969696;
                        font-size: $font-size-small;
                        height: 0.5rem;
                        flex-direction:row-reverse;
                    }
                    .betMsg-content{
                        padding: 0 0.3rem;
                        height: 1.7rem;
                        opacity: 0.69;
                        background:#CD9E62;
                        border-radius: 10px 0px 10px 10px;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }
    .footer{
        height: 1.4rem;
        justify-content:space-around;
        input{
            background: #F2F2F2;
        }
        .footer-btn{
            width:2.1rem;
            height:0.87rem;
            color:#ffffff;
            background:#DA1C36;
            border-radius: 4px;
        }
        
    }
}
</style>


