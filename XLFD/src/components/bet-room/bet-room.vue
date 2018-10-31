<template>
   <div class="flex flex-v wapper">
       <loading v-show="loadingShow" :loadingTip="loadingTip"></loading>
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
        <div class="kj-wapper" :class="{'showAll':isHistoryShow}" ref="kjWapper">
            <div class="history_item flex flex-pack-center"  @click="showHistory" v-for="(item,index) in isHistoryShow ? drawHistoryList : firstHistory" :key="index">
                <div class="flex flex-center">{{item.lottery_qh}}期开奖</div>
                
                
                <div class="flex flex-1 flex-center lottery-wf" >
                    <span :class=v.clas v-for="(v,k) in item.resultList" :key="k" :style="v.bg">{{v.val}}</span>                    
                </div>
            </div>
            <span class="icon-triangle-below" :class="isHistoryShow ? 'show': ''"  @click="showHistory"></span>
        </div>
       <div class="flex-1 main-wapper" ref='mainWrap'>
           <div v-for="(v,k) in socketList" :key="k" class="flex flex-center message-wapper">
               <div v-if="v.msgType=='0'" :class="v.class">{{v.neirong}}</div>
               <div v-if="v.msgType=='1'" :class="v.class" class="flex flex-center flex-v">
                   <div v-if="v.neirong.inRoomTime" class="u-intime">{{v.neirong.inRoomTime}}</div>
                   <div v-if="v.neirong.userId" class="u-name">欢迎<span style="color:#CD9E62">{{v.neirong.userId}}</span>进入房间</div>
                   <div v-if="v.neirong.lottery_qh" class="u-name">
                       <span style="color:#CD9E62" class="u-intime">{{v.neirong.lottery_qh}}</span>
                       <span class="u-intime">{{v.neirong.bet_msg}}</span>
                    </div>
                </div>
               <div :class="v.class" class="flex flex-1" v-if="v.msgType=='2'">
                   <div class="user-img">
                       <img :src="v.neirong.image_url" alt="">
                    </div>
                   <div class="user-betMsg" @click="!v.isSelf&&isFollowBet(v.neirong)">
                       <div class="flex flex-align-center betMsg-title">
                           {{v.neirong.user_id}}
                        </div>
                       <div class="betMsg-content flex flex-v"> 
                            <div class="flex flex-1 flex-align-center flex-pack-justify">
                                <span class="flex flex-1  flex-align-center">
                                    <span class="icon-before qihao-before"></span>
                                    <!-- 第{{v.neirong.lottery_qh}}期 -->
                                     第{{v.neirong.lottery_shortqh}}期 
                                </span>
                                <span> {{v.neirong.wfDetail.title}} </span>
                            </div>
                            <div class="flex flex-1  flex-align-center flex-pack-justify">
                                
                                <span class="flex flex-1  flex-align-center"><span class="icon-before money-before"></span>{{v.neirong.bet_money}}元</span>
                                <span>{{v.neirong.remark}}</span>
                            </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <div class="flex flex-align-center footer">
            <input v-model="textMsg" class="flex-1" style="height:0.87rem;"  type="text" readonly v-on:click.stop="showBet">
            <!-- <button style="background:lightblue;" class="flex flex-center footer-btn" v-on:click.stop="sendMsg"> 发消息</button> -->
            <span class="flex flex-center footer-btn"  v-on:click.stop="showBet">投注</span>
       </div>
        <bet-board class="bet-board"  v-if="betKeyboard" 
                  @wfExplain = "wfExplain"
                  @showWf = "showWf"
                  @closeBoard="hideBet" 
                  @sendSocketMsg="sendSocketMsg" 
                  @moneyLackShow='moneyLackShowFun'
                  :lotteryType="lotteryType"
                  :lotteryInfo="lotteryInfo"
                  :fengdan="fengdan">
        </bet-board>
        <!-- 跟投弹窗 -->
        <div class="followCase" v-if="isFollow">
            <p class="title">是否跟投？</p>
            <div class="content">
                <p class="clearFloat"><span class="text">玩家</span><span class="name">{{followInfo.user_id}}</span></p>
                <p class="clearFloat"><span class="text">期数</span><span class="name">{{followInfo.lottery_qh}}</span></p>
                <p class="clearFloat"><span class="text">玩法</span><span class="name">{{followInfo.wfDetail.title}}</span></p>
                <p class="clearFloat"><span class="text">内容</span><span class="name con">{{followInfo.wfDetail.title}}:{{followInfo.bet_number}}</span></p>
                <p class="clearFloat noborder"><span class="text">金额</span><span class="name">{{followInfo.bet_money}}元</span></p>
            </div>
            <div class="handle">
                <div class="cancel" @click="cancel">取消</div>
                <div class="confirm" @click="confirmFollow">确认</div>
            </div>
        </div>
        <!-- 金额不足提示 -->
        <div v-if="moneyLackShow">
            <!-- <div class="background" @click="hide('moneyLackShow')"></div> -->
            <div class="bet-success-detail">
                <div class="bet-success-wrapper clearfix">
                    <div class="detail-title">投注失败</div>
                    <div class="bet-success-main">
                        <div class="success-tip">
                            余额不足，把握机会！
                        </div>
                        <div class="btn-wrapper">
                            <button class="cancel" @click="cancel()">取消</button>
                            <button class="affirm"  @click="gotoPage('/pay')">立即充值</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        <!-- 玩法规则 -->
        <div v-if="wfRuleShow" class="wfRule"> 
            <!-- <div class="background" @click="hide('wfRuleShow')"></div> -->
            <div class="detail">
                <div class="wf-detail-wrapper clearfix">
                    <div class="detail-title">玩法提示</div>
                    <div class="wf-detail-main">
                        <ul>
                            <li class="item-wrapper">
                                <p class="title">当前玩法</p>
                                <p class="txt">{{wfDetail.name}}</p>
                            </li>
                            <li class="item-wrapper">
                                <p class="title">选号规则</p>
                                <p class="txt">{{wfDetail.explain}}</p>
                            </li>
                            <li class="item-wrapper">
                                <p class="title">中奖说明</p>
                                <p class="txt">{{wfDetail.help}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 6和28玩法规则 -->
        <rule-pare v-if="ruleShow"
            :ruleUrl="ruleUrl"
            :ruleTitle="ruleTitle"
            @close="hide"
        ></rule-pare>
        <!-- betKeyboard ||  -->
        <div class="grayBg" ref="grayBg" :class="{'marginTop':isHistoryShow}" v-if="isBG_show || isHistoryShow" @click="closeAll"></div>   
        <Bet v-if="betShow" ></Bet>
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
import WebsocketHeartbeatJs from 'websocket-heartbeat-js';
import RulePare from 'components/lottery/rule-page';
import Loading from 'base/loading/loading';
import Bet from 'components/bet/bet';

export default {
    data(){
        return {
            header:{
                title:'房间列表',
                back:true,
                betHistory:true
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
            isHistoryShow:false,  // 是否显示全部历史记录
            firstHistory:[],      // 历史开奖记录默认显示第一条数据
            isBG_show:false,        //  灰色背景是否显示
            isFollow:false,         //  是否跟投
            socketMsg:{},
            followInfo:{},          //  跟投信息
            is28OrLhc:false,
            moneyLackShow:false,
            canSend:true,
            lockReconnect:false,
            wfRuleShow:false,
            wfDetail:{},
            ruleShow:false,  //是否显示规则页面
            loadingTip:"当前期已封单,请在下一期投注!",
            loadingShow:false,
            fengdan:false,
            betShow:false
        }
    },
    components:{
        BetBoard,
        WfKind,
        RulePare,
        Loading,
        Bet
    },
    created(){
        this.lotteryId=this.$route.query.id;
        this.lotteryType=this.$route.query.type;
        this.header.title =this.$route.query.name;
        this.is28OrLhc =this.lotteryType == '6' || this.lotteryType == '11'? true:false ;
        this.setHeader(this.header);
        this.getDrawHis();
        if(this.user_token){
            
            this.openWebsocket()
            this.getLockTime()
            this.getUser()
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
            'xglhc_color',
            'api_base'
        ])
    },
    watch: {
        socketList: {
    　　　　handler(newValue, oldValue) {
    　　　　　　if(newValue.length>100){
                    this.socketList=[]
                    var obj={}
                    obj.class="msgType0"
                    obj.msgType="0"
                    obj.neirong="欢迎进入游戏大厅！"
                    this.socketList.unshift(obj)
                }
    　　　　},
    　　　　deep: true
    　　}
    },
    beforeDestroy(){
        this.webSocket.close()
    },
     methods:{
         ...mapActions([
            'getUser'
        ]),
         ...mapMutations({
            setTip:'SET_TIP',
        }),
        show(key){
            this[key]=true;
        },
        showBet(){
            this.betShow=true
        },
        //  显示玩法说明
        wfExplain(data){
            if(this.lotteryType == '6' || this.lotteryType == '11'){
                this.setRuleParam();
                return;
            }  
            this.wfDetail = data;
            this.$refs.grayBg.style.zIndex = 998;
            this.wfRuleShow = true;
        },
        //设置王法规则显示
        setRuleParam(){
            switch(this.lotteryType){
                case '6':
                    this.ruleTitle="香港六合彩玩法规则";
                    this.ruleUrl=`${this.api_base}/wf-explain/lhc-wf`;
                    break;
                case '11':
                    this.ruleTitle="28玩法规则";
                    this.ruleUrl=`${this.api_base}/wf-explain/xy28-wf`;
                    break;
                default:
                    this.ruleTitle="跟单说明"
                    this.$axios.postRequest(httpUrl.config.urlList,{flag:'gd_helper_url'})
                    .then((res)=> {
                        if(res.data && !res.data.errorCode){
                            this.ruleUrl=res.data[0].url;
                        }
                    });
                    break;
            }
            this.show('ruleShow');
            return;
        },
        moneyLackShowFun(status){
            this.moneyLackShow = status;
            this.betKeyboard = false;
        },
        confirmFollow(){            
            this.isBG_show = false;
            this.cancel();
            this.followBet(this.followInfo)
        },
        cancel(){
            this.isBG_show= false;
            this.isFollow = false;
            this.moneyLackShow = false;
        },
        showHistory(){
            this.isHistoryShow = !this.isHistoryShow;
        },   
        showWf(wf){
            this[wf] = true;
        },
        //页面跳转
        gotoPage(url){
            this.$router.push({
                path:url
            });
        },
        //获取玩法封单时间
        getLockTime(){
            this.$axios.postRequest(httpUrl.bet.lockTime,{lottery_id:this.lotteryId})
            .then((res)=> {
                if(res.data && !res.data.errorCode){
                    this.lotteryInfo=res.data;
                    this.setCountTime(res.data.lock_time.replace(/-/g,'/'));
                    this.fengdan=false
                    let obj={}
                    obj.class="msgType1"
                    obj.msgType="1"
                    obj.neirong={}
                    obj.neirong.lottery_qh=this.lotteryInfo.lottery_qh
                    obj.neirong.bet_msg="期,单注一元起,现在开始可以下注"
                    this.socketList.push(obj)
                    this.canSend=true
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
                    for(let item of this.drawHistoryList){
                        item.resultList = showKjCodeByType(item.kj_code,this.lotteryType,this.xglhc_color)
                    }
                    this.firstHistory[0] =  this.drawHistoryList[0];      //  默认显示第一条记录
                    //根据最近一期的开奖号码显示不同的颜色
                    this.newDraw.resultList=showKjCodeByType(res.data[0].kj_code,this.lotteryType,this.xglhc_color)
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
            if (this.drawCountTime == "00:00:00" && urlHash == "/betroom" && this.canSend) {
                // this.setTip(`${this.lotteryInfo.lottery_qh}期已封单,<br/>请在${this.lotteryInfo.next_qh}期继续投注`);
                let obj={}
                obj.class="msgType1"
                obj.msgType="1"
                obj.neirong={}
                obj.neirong.lottery_qh=this.lotteryInfo.lottery_qh
                obj.neirong.bet_msg="期已封单,请在下一期继续投注"
                this.fengdan=true
                this.socketList.push(obj)
                clearTimeout(this.getLockTimes);
                this.getLockTimes = setTimeout(() => {
                    this.canSend=false
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
            this.socketList=[]
            this.webSocket=''
            if ('WebSocket' in window) {    
                const options = {
                    url: `${httpUrl.config.webSocket}/${this.$route.query.roomId}/${this.user_token}`,
                    pingTimeout: 15000, 
                    pongTimeout: 10000, 
                    reconnectTimeout: 5000,
                    pingMsg: "heartbeat"
                }
                this.webSocket = new WebsocketHeartbeatJs(options);      
                // this.webSocket = new WebSocket(`${httpUrl.config.webSocket}/${this.$route.query.roomId}/${this.user_token}`);
            }
            else {
                alert('当前浏览器 Not support websocket')
                return
            }
            this.webSocket.onopen =  ()=> {
                this.socketList=[]
                var obj={}
                obj.class="msgType0"
                obj.msgType="0"
                obj.neirong="欢迎进入游戏大厅！"
                this.socketList.unshift(obj)
            }
            this.webSocket.onclose = () => {
                var obj={}
                obj.class="msgType0"
                obj.msgType="0"
                obj.neirong="连接失败！尝试重新连接中。。。"
                this.socketList=[obj]
            }
            this.webSocket.onerror = () => {
                // var obj={}
                // obj.class="msgType0"
                // obj.msgType="0"
                // obj.neirong="连接失败！尝试重新连接中。。。"
                // this.socketList=[obj]
                // this.reconnect()
            }
            //接收到消息的回调方法
            this.webSocket.onmessage = event=> {
                var resData=JSON.parse(event.data)
                if(resData==1){
                    return
                }
                var obj={}
                obj.msgType=resData.msgType
                obj.class="msgType"+resData.msgType                
                if(resData.msgType=='2'){
                    obj.neirong=JSON.parse(resData.message)
                    obj.neirong.remark=obj.neirong.bet_number
                    
                    
                    if(obj.neirong.lottery_qh.length>8){
                        obj.neirong.lottery_shortqh=obj.neirong.lottery_qh.slice(8) 
                    }
                    
                    if(obj.neirong.bet_number.length>10){
                        obj.neirong.remark="多项投注"
                    }
                    if(obj.neirong.wfDetail){
                        obj.neirong.wfDetail=JSON.parse(obj.neirong.wfDetail)
                        obj.neirong.wfDetail.name=obj.neirong.wfDetail.title
                    }
                    const lottery=obj.neirong.wf_flag.split('_')[0];
                    obj.isSelf=false;
                    if(!this.is28OrLhc&&!obj.neirong.wfDetail){
                        obj.neirong.wfDetail=LotteryWfDetail[lottery].wf_class[obj.neirong.wf_flag];
                    }
                    if(obj.neirong.user_token==this.user_token){
                        obj.class="msgType"+resData.msgType+"-self"
                        obj.isSelf=true;
                    }else{
                        let len=obj.neirong.user_id.length
                        obj.neirong.user_id=obj.neirong.user_id.substring(0,2)+"***"+obj.neirong.user_id.substring(len-2,len)
                    }
                }else if(resData.msgType=='1'){
                    obj.neirong=JSON.parse(resData.message)
                    if(obj.neirong.user_token!=this.user_token){
                        let len=obj.neirong.userId.length
                        obj.neirong.userId=obj.neirong.userId.substring(0,2)+"***"+obj.neirong.userId.substring(len-2,len)
                    }
                }
                this.socketList.push(obj)
                this.$nextTick(()=>{
                    this.$refs.mainWrap.scrollTop = this.$refs.mainWrap.scrollHeight
                })
            }
        },
        reconnect() {
            if(this.lockReconnect) return;
            this.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout( () =>{
                this.openWebsocket();
                this.lockReconnect = false;
            }, 3000);
        },
        sendSocketMsg(message){
            message.user_token=this.user_token
            this.webSocket.send(JSON.stringify(message));  
            this.isBG_show = false;
        },
        sendMsg(){
            var textObj={}
            textObj.textMsg=this.textMsg
            this.sendSocketMsg(textObj)
        },
        isFollowBet(followInfo){
            this.isFollow = true;
            this.isBG_show = true;
            this.followInfo = followInfo;
        },
        followBet(followInfo){
            if(followInfo.lottery_qh!=this.lotteryInfo.lottery_qh){
                this.setTip(`${followInfo.lottery_qh}期已封单,<br/>请在${this.lotteryInfo.lottery_qh}期继续跟单`);
                return;
            }
            if(!this.is28OrLhc){
                let param=this.followInfo
                this.$axios.postRequest(httpUrl.bet.betOrder,param)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.setTip('跟单成功')
                        //少了一个lottery_type
                        this.sendSocketMsg(param)                    
                    };
                })
                .catch((err) => {
                    this.hide('loadingShow');
                });
            }
            else{
                let param=this.followInfo
                this.$axios.postRequest(httpUrl.bet.betLHC28,param)
                .then((res)=> {
                    if(res.data && !res.data.errorCode){
                        this.setTip('跟单成功')
                        this.sendSocketMsg(param)  
                    };
                })
                .catch((err) => {
                    this.loadingShow=false;
                });
            }
        },
        showBet(){
            this.betKeyboard=true;
            this.isBG_show = true;
        },
        hideBet(){
            this.betKeyboard=false;
            this.isHistoryShow = false;
        },
        hide(type){
            this[type] = false
        },
        closeAll(){
            if(this.wfRuleShow){
                this.wfRuleShow = false;
                this.$refs.grayBg.style.zIndex = 10;
                return;
            }
            this.hideBet();
            this.cancel();
        },
        ...mapMutations({
            setHeader:'SET_HEADER',
            setTip:'SET_TIP',
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
        z-index: 10;
        width: 100%;
        background-color: #000;
        opacity: .7;
        overflow: hidden;
        &.marginTop{
            top: 1.2rem;
            z-index: 1;
        }
    }
    .bet-board,.wfkind{
        position: fixed;
        width: 100%;
        top: initial;
        bottom: 0;
        z-index: 104;
        height: 80%;
        background: #ffffff;
        // overflow: auto;
    }
    .top-wapper{
        z-index: 9;
        background: #ffffff;
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
        overflow-y: auto;
        overflow-x: hidden;
        z-index: 9;
        background: #ffffff;
        transition: all .3s ease-in-out;
        @include border-bottom-1px(solid,#f2f2f2);
        position: absolute;
        width: 100%;
        top: 1.65rem;
        &.showAll{
            height: 5.3rem;
        }
        .icon-triangle-below{
            position: absolute;
            top: 0;
            right: .2rem;
            line-height: 1.06rem;
            transition: all .3s ease-in-out;
        }
        .show{
            transform: rotate(180deg)
        }
        .history_item{
            line-height: 1.06rem;
        }
        .lottery-wf{
            float: right;
            font-size: $font-size-medium;
            line-height: 0.8rem;
            color:$color-yellow;
            @include no-wrap();            
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
                     top: .02rem;
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
        padding-top: 1.06rem;
        .message-wapper{
            padding: 0.3rem 0 0 0;
            .msgType0{
                color: #DA1C36;
                width: 7rem;
                background: #E2E2E2;
                line-height: 0.5rem;
                text-align: center;
                padding: 0.1rem .14rem;
                border-radius: 5px;
            }
            .msgType1{
                // height: 2rem;
                line-height: 0.8rem;
                color: #969696 ;
                .u-intime{
                    font-size: $font-size-small;
                }
                .u-name{
                    border-radius: 5px;
                    background: #E2E2E2;
                    padding:0 0.2rem;
                }
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
                    .icon-before{
                        display: inline-block;
                        width: 0.6rem;
                        height: 0.5rem;
                        background-size: 80%;
                        background-repeat: no-repeat;
                    }
                    .money-before{
                        height: 0.4rem;
                        @include bg-image('jinbi');
                    }
                    .qihao-before{
                        @include bg-image('clock');
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
                        .icon-before{
                        display: inline-block;
                        width: 0.6rem;
                        height: 0.5rem;
                        background-size: 80%;
                        background-repeat: no-repeat;
                        }
                        .money-before{
                            height: 0.4rem;
                            @include bg-image('jinbi');
                        }
                        .qihao-before{
                            @include bg-image('clock');
                        }
                    }
                }
            }
        }
    }
    .followCase{
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 11;
        background-color: #fff;
        width:7rem;
        -webkit-transform: translateX(-50%) translateY(-50%);
        .title{
            font-size: .5rem;
            font-weight: 700;
            line-height: 1.6rem;
            text-align: center;
            color: #000;
        }
        .content{
            padding: 0 .5rem;
            .clearFloat{
                margin-bottom: .2rem;
                display: flex;
                padding: .3rem 0;
                line-height: .6rem;
                @include border-bottom-1px(solid,#F2F2F2);
                &.noborder{
                    margin: 0;
                    &:after{
                        border: none
                    }
                }
                .text{
                    width: 2rem;
                    color: #949494;
                }
                .name{
                    width: 3rem;
                    flex: auto;
                    text-align: right;                        
                    word-wrap: break-word;
                    word-break: break-all;
                    &.con{
                        text-align: left;  
                    }
                }
            }
        }
        
        .handle{
            font-size: 0;
            >div{
                width: 50%;
                font-size: .5rem;
                color: #949494;
                text-align: center;
                line-height: 1.4rem;
                display: inline-block;                
            }
            .confirm{
                background-color: #DA1C36;
                color: #fff;
            }
        }
    }
    .bet-success-detail{
        position:fixed;
        top:calc((100% - 5.6rem) / 2);
        left:1.2rem;
        z-index:320;
        width:7.6rem;
        height:5.6rem;
        overflow: hidden;
        background: #F4EBE6;
        background-size: 0.6rem;
        border-radius: 0.2rem;
        border:1px solid #7B6503;
        .detail-title{
            height:1.2rem;
            background: #474643;
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            border-top-left-radius: 0.2rem;
            border-top-right-radius: 0.2rem;
            color:#fff;
            line-height: 1.2rem;
            text-align: center;
            font-size: $font-size-large;
        }
        .bet-success-wrapper{
            min-height:100%;
            .bet-success-main{
                overflow:hidden;
                height:auto;
                .success-tip{
                    height:2.6rem;
                    line-height: 2.6rem;
                    text-align: center;
                    font-size: $font-size-medium-x;
                    color: #403F3D;
                }                
                .btn-wrapper{
                    height: 0.8rem;
                    padding-top: 0.2rem;
                    text-align: center;
                    width:100%;
                    .cancel{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:#38BB80;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                        margin-right: 0.8rem;
                    }
                    .affirm{
                        height:0.8rem;
                        width:2.5rem;
                        line-height: 0.8rem;
                        text-align: center;
                        background:$color-yellow;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                    }
                }
            }
        }
    }
    .wfRule{
        position: fixed;
        top: 50%;
        left: 50%;        
        width: 70%;
        z-index: 999;
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
        .detail{
            border-radius: .2rem;
            border: 1px solid #7b6503;
        }
        .wf-detail-wrapper{
            min-height:100%;            
            .detail-title{
                height:1.2rem;
                background: #474643;
                border-top-left-radius: 0.2rem;
                border-top-right-radius: 0.2rem;
                color:#fff;
                line-height: 1.2rem;
                text-align: center;                
                font-size: $font-size-large;
                .title-tip{
                    font-size: $font-size-small;
                }
            }
            .wf-detail-main{
                padding:0rem 0.4rem 0.2rem;
                overflow:auto;
                height:6.2rem;
                background-color: #fff;
                .win-money{
                    line-height: 0.5rem;
                    color: #403F3D;
                    padding-top:0.2rem;
                }
                .item-wrapper{
                    height:auto;
                    overflow: hidden;
                    padding-top: 0.4rem;
                    line-height: 0.5rem;
                    p{
                        height:auto;
                        overflow: hidden;
                        line-height: 0.5rem;
                        &.title{
                            color:$color-red;
                        }
                        &.txt{
                            color: #727272;
                        }
                    }
                }
            }
            .wf-detail-close{
                position:relative;
                margin:0 auto;
                height:1rem;
                width:1rem;
                padding-top:0.1rem;
                text-align: center;
                clear:both;
                background-color: #fff;
                button{
                    height:0.96rem;
                    width:0.96rem;
                    line-height: 1rem;
                    border-radius: 50%;
                    border:1px solid $color-red;
                    text-align: center;
                    background:none;
                    color: $color-red;
                    font-size: $font-size-large-x;
                    padding:0;
                    margin: 0;
                }
            }
        }
    }
    
    .footer{
        height: 1.4rem;
        justify-content:space-around;
        padding: 0 0.3rem;
        input{
            background: #F2F2F2;
            margin-right: 0.2rem;
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


