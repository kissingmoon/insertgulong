<template>
    <parcel>
        <div class="lottery">
            <div class="lottery-content">
                <div class="lottery-title-content">
                    <div class="back" @click="goBack"><i class="icon-arrows-left"></i></div>
                    <div class="time-money-wrapper">
                        <div class="kind" @click="show('wfKindShow')">玩<br>法</div>
                        <div class="rule" @click="show('wfRuleShow')" v-if="!is28OrLhc">说<br>明</div>
                        <div class="rule" @click="setRuleParam" v-if="is28OrLhc">说<br>明</div>
                    </div>
                    <h1 class="title">{{lotteryName[lotteryId]}}</h1>
                </div>
                <div class="lottery-nav border-bottom-1px">
                    <div class="nav-left border-right-1px">
                        <div class="rock-follow">
                            <p class="follow" @click="gotoPage('/descover')">大神跟单<i class="icon-triangle-below"></i></p>
                        </div>
                        <div class="count-down">
                            距{{lotteryInfo.show_qh}}期截止:{{drawCountTime}}
                        </div>
                    </div>
                    <div class="nav-right">
                        <div class="lottery-wf">
                            当前玩法:{{currentWf.name}}
                        </div>
                        <div class="draw-history">
                             <p class="history" @click="getDrawHis">历史开奖记录<i class="icon-triangle-below"></i></p>
                        </div>
                    </div>
                </div>
                <div class="lottery-odds border-bottom-1px" v-if="!isShowOdds">
                    <div class="wf-name">{{currentWf.name}}</div>
                    <div class="odds">赔率:{{totalOdds}}</div>
                </div>
                <scroll ref="scroll" class="scroll-content" :class="{'lhc-scroll':is28OrLhc, 'odds-scroll': !isShowOdds}" :data="numberList">
                    <bet-number 
                        ref="betnumberlist"
                        :numList="numberList"
                        :selectNumList="selectNumList"
                        :selectPosition="selectPosition"
                        @selectNum="selectNum"
                        @selectPosi="selectPosi"
                        @selectKind="selectKind"
                        >
                    </bet-number>
                </scroll>
                <div v-if="!is28OrLhc" class="lottery-set">
                    <div class="multiple">
                        <p>投注</p>
                        <p class="number"><input type="text" v-model.number="betTimes"></p>
                        <p>倍</p>
                    </div>
                    <div class="unit">
                        <p>模式</p>
                        <p class="type" @click="show('modesShow')">{{betUnit[lotteryModes]}}</p>
                    </div>  
                    <div class="bonus">
                        <p>单注奖金12548.36元</p>
                    </div>
                </div>
                <div v-if="!is28OrLhc" class="lottery-bottom">
                    <div class="clear-all" @click="allClear">
                        <p>清空</p>
                    </div>
                    <div class="bet-collect">
                        <p class="bet-count">{{betCount}}注{{calculateBetMoney}}元</p>
                        <p class="balance">余额:{{account.balance || 0}}元</p>
                    </div>
                    <div class="brokerage" @click="betExamine('gdSetShow')">
                        <p class="check-box"><i class="icon-right" v-show="earnCommission"></i></p>
                        <p>赚佣金</p>
                    </div>
                    <div class="follow-num" @click="betExamine('followNumberShow')">
                        <p>追号</p>
                    </div>
                    <div class="bet-btn" @click="betExamine('betAffirmShow')">
                        <p>投注</p>
                    </div>
                </div>
                <div v-if="is28OrLhc" class="lottery-bottom">
                    <div class="clear-all" @click="allClear">
                        <p>清空</p>
                    </div>
                    <div class="bet-btn" @click="makeBetOrder">
                        <p>投注</p>
                    </div>
                    <div class="lhc-bet-count">
                        {{betCount}}注
                    </div>
                </div>
            </div>
            <div v-if="modesShow">
                <div class="background" @click="hide('modesShow')"></div>
                <div class="modes-main">
                    <div class="modes-wrapper clearfix">
                        <ul>
                            <li class="item-wrapper border-bottom-1px" @click="selectMode(0)">
                                元
                            </li>
                            <li class="item-wrapper border-bottom-1px" @click="selectMode(1)">
                                角
                            </li>
                            <li class="item-wrapper border-bottom-1px" @click="selectMode(2)">
                                分
                            </li>
                        </ul>
                    </div>
                    <div class="modes-close" @click="hide('modesShow')">
                        取消
                    </div>
                </div>
            </div>
            <div v-if="wfRuleShow" class="wf-content">
                <div class="background" @click="hide('wfRuleShow')"></div>
                <div class="detail">
                    <div class="wf-detail-wrapper clearfix">
                        <div class="detail-title">玩法提示</div>
                        <div class="wf-detail-main">
                            <ul>
                                <li class="item-wrapper">
                                    <p class="title">当前玩法</p>
                                    <p class="txt">{{currentWf.name}}</p>
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
                        <div class="wf-detail-close">
                            <button @click="hide('wfRuleShow')"><i class="icon-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="gdSetShow" class="gd-content">
                <div class="background"  @click="hide('gdSetShow')"></div>
                <div class="detail">
                    <div class="gd-detail-wrapper clearfix">
                        <div class="detail-title">
                            <div class="gd-rule" @click="setRuleParam">说<br>明</div>
                            <div class="gd-title">发起跟单</div>
                        </div>
                        <div class="gd-detail-main">
                            <ul>
                                <li class="item-wrapper">
                                    <div class="title">方案公开:</div>
                                    <div class="txt">
                                        <p class="open-type" :class="{'on': gdParam.kj_show_hm == 1}" @click="setKjShow(1)">
                                            <span>结束后</span>
                                            <i class="icon-right-ak right-ak"></i>
                                        </p>
                                        <p class="open-type" :class="{'on': gdParam.kj_show_hm == 0}" @click="setKjShow(0)">
                                            <span>跟单后</span>
                                            <i class="icon-right-ak right-ak"></i>
                                        </p>
                                    </div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">薪酬设置:</div>
                                    <div class="set-num">
                                        <input type="text" v-model.numbe="gdParam.commission" >%
                                    </div>
                                    <div class="title">预计收益:</div>
                                    <div class="set-num">
                                        <input type="text" v-model.number="gdParam.back_rate" >倍
                                    </div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">
                                        <p>跟单说明:</p>
                                        <p class="gd-length">0/100</p>
                                    </div>
                                    <div class="txt">
                                        <textarea class="gd-instructions" maxlength="100" v-model="gdParam.content" placeholder="潜心研究了这组跟单，跟我必胜！" ></textarea>
                                        <p class="gd-instructions-tip">跟单说明很重要，玩家将从您的描述中来决定是否购买，请您认真填写！</p>
                                    </div>
                                </li>
                            </ul>
                            <div class="btn-wrapper">
                                <button class="cancel" @click="setEarnCommission(false)">放弃发起</button>
                                <button class="affirm"  @click="setEarnCommission(true)">确认</button>
                            </div>
                            <div class="gd-tip">
                                <p>温馨提示:您可以在我的-跟单列表界面查看跟单明细<br>发起跟单将会在您成功付款后展示</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="gdTipShow" class="wf--success-content">
                <div class="background" @click="gdAffirm"></div>
                <div class="bet-success-detail">
                    <div class="bet-success-wrapper clearfix">
                        <div class="detail-title">提示</div>
                        <div class="bet-success-main">
                            <div class="success-tip">
                               您的跟单将在您成功投注后生效
                            </div>
                            <div class="btn-wrapper">
                                <button class="affirm" @click="gdAffirm">确认</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="betAffirmShow" class="bet-affirm-content">
                <div class="background"  @click="hide('betAffirmShow')"></div>
                <div class="detail">
                    <div class="bet-detail-wrapper clearfix">
                        <div class="detail-title">确认投注</div>
                        <div class="bet-detail-main">
                            <ul>
                                <li class="item-wrapper">
                                    <div class="title">投注号码：<span class="txt">{{betNumber}}</span></div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">玩法：<span class="txt">{{currentWf.name}}</span></div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">投注金额：<span class="txt">{{calculateBetMoney}}元（一注{{betTimes*2}}{{betUnit[lotteryModes]}}）</span></div>
                                </li>
                                <li class="item-wrapper">
                                    <div class="title">当前余额：<span class="txt">{{account.balance || 0}}元</span></div>
                                </li>
                            </ul>
                            <div class="btn-wrapper">
                                <button class="cancel"  @click="hide('betAffirmShow')">取消</button>
                                <button class="affirm" @click="betOrder">确认</button>
                            </div>
                            <div class="gd-tip">
                                <p>温馨提示:您可以在我的-跟单列表界面查看跟单明细<br>发起跟单将会在您成功付款后展示</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="betSuccessShow" class="wf--success-content">
                <div class="background" @click="hide('betSuccessShow')"></div>
                <div class="bet-success-detail">
                    <div class="bet-success-wrapper clearfix">
                        <div class="detail-title">投注成功</div>
                        <div class="bet-success-main">
                            <div class="success-tip">
                                投注成功，好运即将到来！
                            </div>
                            <div class="btn-wrapper">
                                <button class="cancel" @click="gotoPage('/bet')">投注记录</button>
                                <button class="affirm"  @click="hide('betSuccessShow')">继续投注</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <draw-history v-if="drawHistoryShow" @close="hide" :data="drawHistoryList"></draw-history>
            <wf-kind v-if="wfKindShow" :data="wfList" @close="hide" @selectWf="changeWf"></wf-kind>
            <follow-number 
                v-if="followNumberShow" 
                :gdParam="gdParam" 
                :lotteryId="lotteryId"
                :betNumber="betNumber"
                :betCount="betCount"
                :lotteryModes="lotteryModes"
                :lotteryInfo="lotteryInfo"
                :earnCommission="earnCommission"
                :wfFlag="wfFlag"
                @close="hide"
                @changeNumber="changeNumber"
                @earnMoney="show"
                @betSuccess="betSuccess"
                >

            </follow-number>
            <bet-order-list 
                v-if="betOrderListShow" 
                :lotteryId="lotteryId"
                :lotteryInfo="lotteryInfo"
                :wfFlag="wfFlag"
                :updataNumberList="updataNumberList"
                @close="hide"
                @clearBetOrderList="clearBetOrderList"
                @betSuccess="betSuccess"
                @deleteOrder="deleteOrder"
                >

            </bet-order-list >
            <rule-pare v-if="ruleShow"
                :ruleUrl="ruleUrl"
                :ruleTitle="ruleTitle"
                @close="hide"
            >

            </rule-pare>
        </div>
    </parcel>
</template>
<script type="text/ecmascript-6">
    import {mapMutations,mapActions,mapGetters} from 'vuex';
    import Parcel from 'base/parcel/parcel';
    import Scroll from 'base/scroll/scroll';
    import BetNumber from 'base/bet-number/bet-number';
    import DrawHistory from 'components/lottery/draw-history';
    import WfKind from 'components/lottery/wf-kind';
    import FollowNumber from 'components/lottery/follow-number';
    import BetOrderList from 'components/lottery/bet-order-list';
    import RulePare from 'components/lottery/rule-page';
    import {httpUrl,lotteryName,betUnit} from 'common/js/map';
    import {BaseVM} from 'common/js/BuyCM';
    import LotteryWfDetail from 'common/js/Lottery_wf_detail';
    import * as CalcBetCount from 'common/js/CalcBetCountUtil.js';
    import {getBetNumberByBetGroupList} from 'common/js/BetNumber.js';
    import {slicer,add0} from 'common/js/param.js';
    export default {
        data() {
            return{
                isReady:false, //加载完成
                wfRuleShow:false, //玩法规则
                gdSetShow:false,  //跟单设置
                gdTipShow:false,  //跟单提示
                betAffirmShow:false,  //下注确认
                betSuccessShow:false,  //下注成功
                drawHistoryShow:false,  //开奖历史
                wfKindShow:false,  //玩法种类
                modesShow:false,  //模式选择
                followNumberShow:false,  //追号页面
                betOrderListShow:false,  //六合彩下注页面
                earnCommission:false,  //是否赚佣
                isShowOdds:true,
                ruleShow:false,  //是否显示规则页面
                ruleTitle:'',
                ruleUrl:'',
                betUnit,
                lotteryInfo:{},
                drawCountTime:'',
                wfList:[],
                zodiac:[],
                currentWf:{},
                wfFlag:'',
                wfDetail:{},
                numberList:[],
                selectNumList:[],
                selectPosition:[],
                selectObj:{},
                updataNumberList:[],
                drawHistoryList:[],
                betCount:0,
                betNumber:'',
                betTimes:1,
                lotteryModes:0,
                totalOdds:'',
                totalPlFlag:'',
                gdParam:{
                    commission:'',
                    back_rate:'',
                    content:'',
                    kj_show_hm:1,  //号码是否开奖展示， 1：是，0：否
                }
            }
        },
        components:{
            Parcel,
            Scroll,
            BetNumber,
            DrawHistory,
            WfKind,
            FollowNumber,
            BetOrderList,
            RulePare
        },
        created() {
            this.init();
        },
        mounted(){
        },
        beforeDestroy(){
            if(this.lockTimes){
                clearTimeout(this.lockTimes);
            }
        },
        computed: {
            //计算下注金额
            calculateBetMoney(){
                var mode=1/Math.pow(10,this.lotteryModes);
                return this.betTimes*mode*this.betCount*2;
            },
            ...mapGetters([
                'account',
                'user_token'
            ])
        },
        methods: {
            init(){
                this.lotteryName=lotteryName;
                this.lotteryId =this.$router.history.current.query.id;
                this.lotteryType =this.$router.history.current.query.type;
                this.is28OrLhc =this.lotteryType == '6' || this.lotteryType == '11'? true:false ;
                this.getUser();
                this._getBetWF();
                this._getZodiac();
                this._getLockTime();

            },
            watchInit(){
                const _this=this;
                this.$watch('selectNumList',() => {
                    this.recount();
                });
                this.$watch('selectPosition',() => {
                    this.recount();
                });
            },
            ...mapActions([
                'getUser'
            ]),
            ...mapMutations({
                setTip:'SET_TIP',
            }),
            goBack(){
                this.$router.back();
            },
            show(key){
                this[key]=true;
            },
            hide(key){
                this[key]=false;
            },
            _getBetWF(){
                const api=this.is28OrLhc ? httpUrl.bet.lotteryWfLHC:httpUrl.bet.lotteryWf;
                this.$axios.postRequest(api,{lottery_id:this.lotteryId})
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.wfList=res.data;
                        this.currentWf=res.data[0].wf[0];
                        this.wfFlag=res.data[0].wf[0].wf_flag;
                        this.makeWfParam();
                        console.log(this.wfList);
                    };
                });
            },
            _getZodiac(){
                this.$axios.postRequest(httpUrl.bet.zodiac)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.zodiac=res.data;
                        console.log(this.zodiac);
                    };
                });
            },
            _getLockTime(){
                this.$axios.postRequest(httpUrl.bet.lockTime,{lottery_id:this.lotteryId})
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.lotteryInfo=res.data;
                        this.countTime(res.data.lock_time.replace(/-/g,'/'));
                    };
                });
            },
            //倒计时功能
            countTime(dateStr) {
                //获取当前时间
                const date = new Date();
                const now = date.getTime();
                const endDate = new Date(dateStr);
                const end = endDate.getTime();
                const leftTime = end-now;
                //定义变量 d,h,m,s保存倒计时的时间
                var h,m,s;
                if (leftTime > 0) {
                    h = Math.floor(leftTime/1000/60/60);
                    m = Math.floor(leftTime/1000/60%60);
                    s = Math.floor(leftTime/1000%60);  
                    this.drawCountTime=add0(h)+":"+add0(m)+":"+add0(s);
                    //递归每秒调用countTime方法，显示动态时间效果
                    clearTimeout(this.lockTimes);
                    this.lockTimes=setTimeout(() => {
                        this.countTime(dateStr)
                    },1000);
                }else{
                    this.setTip("本期已封单");
                    this.drawCountTime= "00:00:00"; 
                    this._getLockTime();
                }
            },
            //修改玩法
            changeWf(i,s){
                this.currentWf=this.wfList[i].wf[s];
                this.wfFlag=this.wfList[i].wf[s].wf_flag;
                this.makeWfParam();
                this.hide('wfKindShow');
            },
            makeWfParam(){
                const lottery=this.wfFlag.split('_')[0];
                this.selectNumList=[];
                this.selectPosition=[];
                this.selectObj={};
                if(!this.is28OrLhc){
                    this.wfDetail=LotteryWfDetail[lottery].wf_class[this.wfFlag];
                }
                this.wfDetail=Object.assign({},this.wfDetail,this.currentWf);
                this.numberList=[];
                if(this.is28OrLhc){
                    const detail=BaseVM(this.wfDetail,0,true,this.zodiac);
                    this.numberList.push(detail);
                    this.selectNumList.push([]);
                }else{
                    this.wfDetail.param.titles.forEach((item,i) => {
                        const detail=BaseVM(this.wfDetail,i);
                        detail.title=item;
                        this.numberList.push(detail);
                        this.selectNumList.push([]);
                    });
                }
                this.isShowOdds=this.numberList[0].isShowOdds;
                console.log(this.numberList);
                this.setTotal();
                this.watchInit();
            },
            setTotal(){
                switch(this.wfFlag){
                    case "xglhc_lm_3z2":case "xglhc_lm_2zt":
                        this.totalOdds=this.currentWf.wf_pl[0].award_money+','+this.currentWf.wf_pl[1].award_money;
                        this.totalPlFlag=this.currentWf.wf_pl[0].pl_flag;
                        break;
                    case "xglhc_lm_3qz":case "xglhc_lm_2qz":case "xglhc_lm_tc":case "xglhc_lm_4qz":case "xy28_tmb3_b3":
                        this.totalOdds=this.currentWf.wf_pl[0].award_money;
                        this.totalPlFlag=this.currentWf.wf_pl[0].pl_flag
                        break;
                    default:
                        this.totalOdds='';
                        this.totalPlFlag='';
                    break;
                };
            },
            selectNum(p,i,num){
                const index=this.selectNumList[p].indexOf(num);
                if(index != -1){
                    this.selectNumList[p].splice(index,1);
                    if(this.is28OrLhc){
                        delete this.selectObj[num];
                    }
                }else{
                    this.selectNumList[p].push(num);
                    if(this.is28OrLhc){
                        this.selectObj[num]=this.numberList[0].buyNumberBeanList[i];
                    }
                }
                this.changeTotal();

            },
            changeTotal(){
                switch(this.wfFlag){
                    case "xglhc_zxbz_zxbz":
                        const n=this.selectNumList[0].length-6;
                        if(n >= 0 && n <= 5){
                            this.totalOdds=this.currentWf.wf_pl[n].award_money;
                            this.totalPlFlag=this.currentWf.wf_pl[n].pl_flag;
                        }else{
                            this.totalOdds='';
                            this.totalPlFlag='';
                        }
                        break;
                    case "xglhc_hexiao_hx":
                        const m=this.selectNumList[0].length-2;
                        if(m >= 0 && m <= 9){
                            this.totalOdds=this.currentWf.wf_pl[m].award_money;
                            this.totalPlFlag=this.currentWf.wf_pl[m].pl_flag;
                        }else{
                            this.totalOdds='';
                            this.totalPlFlag='';
                        }
                        break;
                }
            },
            selectPosi(num){
                const index=this.selectPosition.indexOf(num);
                if(index != -1){
                    this.selectPosition.splice(index,1);
                }else{
                    this.selectPosition.push(num);
                }
            },
            selectKind(p,arr){
                this.selectNumList.splice(p,1,arr);
            },
            selectMode(mode){
                this.lotteryModes = mode;
                this.hide('modesShow');
            },
            allClear(){
                //this.makeWfParam();
                this.selectNumList=[];
                this.selectPosition=[];
                this.earnCommission=false;
                this.selectObj={};
                this.totalOdds='';
                this.totalPlFlag='';
                if(!this.is28OrLhc){
                    this.wfDetail.param.titles.forEach((item,i) => {
                        this.selectNumList.push([]);
                    });
                }else{
                    this.selectNumList.push([]);
                }
                this.$refs.betnumberlist.clearKind();
            },
            betOrder(){
                const url = httpUrl.bet.betOrder;
                const param={
                    lottery_id:this.lotteryId,
                    lottery_qh:this.lotteryInfo.lottery_qh,
                    wf_flag:this.wfFlag,
                    bet_number:this.betNumber,
                    bet_times:this.betTimes,
                    bet_count:this.betCount,
                    lottery_modes:this.lotteryModes
                }
                this.$axios.postRequest(url,param)
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.allClear();
                        this.getUser()
                        this.hide('betAffirmShow');
                        this.show('betSuccessShow');
                    };
                });
            },
            //页面跳转
            gotoPage(url){
                this.$router.push({
                    path:url
                });
            },
            getDrawHis(){
                this.show('drawHistoryShow');
                this.$axios.postRequest(httpUrl.descover.drawNumber,{lottery_id:this.lotteryId,page_size:20,page_no:1})
                .then((res)=> {
                    if(!res.data.errorCode){
                        this.drawHistoryList=slicer(res.data,"kj_code",",");
                    };
                });
            },
            setEarnCommission(b){
                this.earnCommission=b;
                this.hide('gdSetShow');
                if(b){
                    this.show('gdTipShow');
                }
            },
            setKjShow(type){
                this.gdParam.kj_show_hm=type;
            },
            //跟单确认
            gdAffirm(){
                this.hide('gdTipShow');
                this.show('followNumberShow');
            },
            changeNumber(){
                this.hide('followNumberShow');
                this.allClear();
            },
            betExamine(showElm){
                if(!this.user_token){
                    this.$router.push({
                        path:'/login'
                    });
                    return;
                }
                if(this.betCount > 0){
                    this.show(showElm);
                }else{
                    this.setTip("请选择一组号码")
                }
            },
            betSuccess(){
                if(this.is28OrLhc){
                    this.hide('betOrderListShow');
                    this.updataNumberList=[];
                }else{
                    this.hide('followNumberShow');
                }
                this.show('betSuccessShow');
                this.allClear();
            },
            //组合下注号码和计算注数
            recount(){
                this.betNumber=getBetNumberByBetGroupList(this.selectNumList,this.wfFlag,this.selectPosition);
                if(this.is28OrLhc){
                    this.betCount=this.selectNumList[0].length;
                }else{
                    const funName= this.lotteryType == 3 ? "m"+this.wfFlag : this.wfFlag;
                    console.log(this.betNumber);
                    this.betCount=CalcBetCount[funName](this.betNumber);

                }
            },
            makeBetOrder(){
                if(!this.user_token){
                    this.$router.push({
                        path:'/login'
                    });
                    return;
                }
                switch(this.wfFlag){
                    case "xglhc_lm_3z2":case "xglhc_lm_2zt":case "xglhc_lm_3qz":case "xglhc_lm_2qz":
                    case "xglhc_lm_tc":case "xglhc_lm_4qz":case "xglhc_zxbz_zxbz":case "xglhc_hexiao_hx":case "xy28_tmb3_b3":
                        const obj={
                            wf_flag:this.currentWf.wf_flag,
                            wf_name:this.currentWf.name,
                            bet_money:'',
                            number_str:'',
                            pl_flag:''
                        }
                        const arr = [];
                        for ( var key in this.selectObj){
                            obj.pl_flag=this.totalPlFlag;
                            arr.push(this.selectObj[key].number_str);
                        };
                        obj.number_str= this.wfFlag == "xglhc_hexiao_hx"? arr.sort().join(''):arr.sort().join(',')
                        obj.pl=this.totalOdds;
                        this.updataNumberList.push(obj);
                        break;
                    default:
                        for ( var key in this.selectObj){
                            this.updataNumberList.push(this.selectObj[key]);
                        };
                        break;
                };
                this.show('betOrderListShow');
                this.allClear();
            },
            //清空六或28的下注列表
            clearBetOrderList(){
                this.updataNumberList=[];
            },
            //删除六|28的下注号码
            deleteOrder(i){
                this.updataNumberList.splice(i,1);
            },
            setRuleParam(){
                console.log(this.lotteryType);
                switch(this.lotteryType){
                    case '6':
                        this.ruleTitle="香港六合彩玩法规则";
                        this.ruleUrl=location.host+'/wf-explain/lhc-wf';
                        break;
                    case '11':
                        this.ruleTitle="28玩法规则";
                        this.ruleUrl=location.host+'/wf-explain/xy28-wf';
                        break;
                    default:
                        this.ruleTitle="跟单说明"
                        this.$axios.postRequest(httpUrl.config.urlList,{flag:'gd_helper_url'})
                        .then((res)=> {
                            if(!res.data.errorCode){
                                this.ruleUrl=res.data[0].url;
                            }
                        });
                        break;
                }
                console.log(location.host)
                this.show('ruleShow');
            }

        },
        watch:{
            betTimes(newVal,oldVal){
                const regex = /^\d*$/;
                if(!regex.test(newVal)) {
                    this.betTimes = oldVal ;
                }
            }
        }
    }
</script>
<style scoped lang="scss">
@import 'common/scss/variable.scss';
@import 'common/scss/mixin.scss';
.lottery{
    position: fixed;
    width: 100%;
    top: 0rem;
    bottom: 0rem;
    z-index: 103;
    @include bg-image('bg-lottery-shallow');
    background-size: 0.6rem;
    .lottery-content{
        position: relative;
        width: 100%;
        height:100%;
        overflow: hidden;
        .lottery-title-content{
            position:relative;
            height:1.2rem;
            line-height: 1.2rem;
            text-align: center;
            color:#fff;
            @include bg-image('bg-lottery-title');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center bottom;
            
            .back{
                position:absolute;
                height:1.2rem;
                line-height: 1.4rem;
                padding: 0 0.5rem 0 0.3rem;
                font-size: 0.52rem;
                font-size: $font-size-large-x;
            }
            .time-money-wrapper{
                position:absolute;
                height:1.2rem;
                line-height: 1.35rem;
                right:0;
                font-size:$font-size-small;
                padding-right: 0.2rem;
                color:#fff;
                .rule{
                    float:right;
                    height:0.9rem;
                    padding-top:0.3rem;
                    padding-right: 0.39rem;
                    padding-left: 0.2rem;
                    width:0.5rem;
                    line-height: 0.32rem;
                    @include bg-image('icon-wf-rule');
                    background-repeat: no-repeat;
                    background-size:0.4rem;
                    background-position: right center;
                }
                .kind{
                    float:right;
                    width:0.5rem;
                    height:0.9rem;
                    padding-top:0.3rem;
                    padding-right: 0.47rem;
                    padding-left: 0.2rem;
                    line-height: 0.32rem;
                    @include bg-image('icon-wf-kind');
                    background-repeat: no-repeat;
                    background-size: 0.5rem;
                    background-position: right center;
                }
            }
            .title{
                display: block;
                height:1.2rem;
                line-height: 1.2rem;
                vertical-align: top;
                padding: 0 2.4rem;
                font-size: $font-size-large-m;
                @include no-wrap();
            }
        }
        .lottery-nav{
            height:1.63rem;
            background-size: 0.6rem;
            @include bg-image('bg-lottery-deep');
            @include border-bottom-1px(solid,#053105);
            color:#fff;
            .nav-left{
                float: left;
                height:1.53rem;
                width:5rem;
                @include border-right-1px(solid,#053105);
                padding-top: 0.1rem;
                overflow: hidden;
                .rock-follow{
                    height:0.7rem;
                    padding-top: 0.1rem;
                    .follow{
                        border:0.026rem solid #24754b;
                        width:2rem;
                        height:0.6rem;
                        line-height: 0.6rem;
                        border-radius: 0.1rem;
                        text-align: center;
                        margin-left: 0.15rem;
                        vertical-align:text-bottom;
                    }
                }
                .count-down{
                    height:0.7rem;
                    line-height: 0.7rem;
                    padding-left:0.15rem;
                    @include no-wrap();
                }

            }
            .nav-right{
                height:1.63rem;
                width:4.8rem;
                float: left;
                text-align: right;
                padding-right: 0.2rem;
                .lottery-wf{
                    height:0.7rem;
                    padding-top: 0.1rem;
                    line-height: 0.7rem;
                    padding-left:0.15rem;
                    @include no-wrap();
                }
                .draw-history{
                    height:0.7rem;
                    .history{
                        display: inline-block;
                        border:0.026rem solid #24754b;
                        width:3rem;
                        height:0.6rem;
                        line-height: 0.6rem;
                        border-radius: 0.1rem;
                        margin-left: 0.15rem;
                        vertical-align:text-bottom;
                        text-align: center;
                    }
                }
            }
        }
        .lottery-odds{
            height:0.8rem;
            line-height: 0.8rem;
            padding:0 0.4rem;
            color:#fff;
            @include border-bottom-1px(solid,#163316);
            .wf-name{
                float: left;
            }
            .odds{
                float: right;
            }
        }
        .lottery-set{
            position: absolute;
            height:1rem;
            width:100%;
            bottom:1.15rem;
            line-height: 1rem;
            color:#fff;
            background:#13432A;
            .multiple{
                height:1rem;
                width:2.6rem;
                float: left;
                padding-left:0.2rem;
                p{
                    display: inline-block;
                    height:0.6rem;
                    line-height: 0.6rem;
                    text-align: center;
                    &.number{
                        width:1rem;
                        height:0.6rem;
                        border-radius: 0.1rem;
                        background:#64A387;
                        input{
                            width:1rem;
                            height:0.6rem;
                            background: none;
                            border:0;
                            padding:0;
                            margin: 0;
                            line-height: 0.6rem;
                            color:$color-text-yellow;
                            text-align: center;
                        }
                    }
                }
            }
            .unit{
                float: left;
                width:3rem;
                height:1rem;
                text-align: center;
                p{
                    display:inline-block;
                    height:0.6rem;
                    line-height: 0.6rem;
                    text-align: center;
                    &.type{
                        width:1rem;
                        height:0.6rem;
                        border-radius: 0.1rem;
                        background:#64A387;
                        text-align: center;
                    }
                }
            }
            .bonus{
                float: left;
                height:1rem;
                width:4.2rem;
                text-align: right;
                p{
                    padding-right: 0.2rem;
                    padding-top: 0.2rem;
                    height:0.6rem;
                    line-height: 0.6rem;
                    @include no-wrap();
                }
            }

        }
        .lottery-bottom{
            position: absolute;
            height:1.15rem;
            width:100%;
            bottom:0;
            line-height: 1.15rem;
            text-align: center;
            @include bg-image('bg-lottery-bottom');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: center top;
            color:rgb(230, 230, 230);
            .clear-all{
                height:1.15rem;
                width:1rem;
                float: left;
                padding:0.25rem 0.2rem;
                p{
                    width:1rem;
                    height:0.67rem;
                    line-height: 0.67rem;
                    text-align: center;
                    background:$color-bg-deep-gray;
                    border-radius: 0.1rem;
                }
            }
            .bet-collect{
                height:1.15rem;
                width:3.4rem;
                float: left;
                padding-top:0.14rem;
                p{
                    height:0.45rem;
                    line-height: 0.45rem;
                    text-align: left;
                    @include no-wrap();
                }
            }
            .brokerage{
                float: left;
                width:1.7rem;
                height:0.52rem;
                text-align: center;
                background:$color-bg-deep-gray;
                border-radius: 0.1rem;
                margin-top:0.25rem;
                padding-top:0.15rem;
                padding-left:0.2rem;
                p{
                    float: left;
                    line-height: 0.45rem;
                    &.check-box{
                        width:0.4rem;
                        height:0.4rem;
                        background: #fff;
                        color:$color-text;
                        border-radius: 0.07rem;
                        line-height: 0.45rem;
                    }
                }
            }
            .follow-num{
                height:1.15rem;
                width:1.1rem;
                float: left;
                padding:0.25rem 0.2rem;
                p{
                    width:1.1rem;
                    height:0.67rem;
                    line-height: 0.67rem;
                    text-align: center;
                    background:$color-bg-deep-gray;
                    border-radius: 0.1rem;
                }
            }
            .bet-btn{
                height:1.15rem;
                width:1.6rem;
                float: right;
                padding-top:0.25rem;
                margin-right:0.2rem;
                p{
                    width:1.6rem;
                    height:0.67rem;
                    line-height: 0.67rem;
                    text-align: center;
                    background:$color-text-yellow;
                    border-radius: 0.1rem;
                    color:$color-text;
                    font-size: $font-size-medium-x;
                }
            }
            .lhc-bet-count{
                display: inline-block;
                padding:0.15rem 0.3rem;
                color:#fff;
                background: rgb(13, 85, 48);
                border-radius: 0.1rem;
                line-height: 0.4rem;
            }
        }
        .scroll-content{
            height: calc(100% - 4.98rem);
            overflow: hidden;
            &.lhc-scroll{
                height: calc(100% - 3.98rem);
            }
            &.odds-scroll{
                height: calc(100% - 4.78rem);
            }
        }
    }
    .background {
        position:fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 300;
        background:$color-bg-shade-a5;
    }
    .detail{
        position:fixed;
        top:calc((100% - 9rem) / 2);
        left:1.2rem;
        z-index:310;
        width:7.6rem;
        height:9rem;
        overflow: hidden;
        @include bg-image('bg-lottery-shallow');
        background-size: 0.6rem;
        border-radius: 0.2rem;
        border:1px solid #7B6503;
        .detail-title{
            height:1.2rem;
            @include bg-image('bg-lottery-title');
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
        .gd-title{
            width:4rem;
            margin: 0 auto;
        }
        .gd-rule{
            font-size: $font-size-small;
            float:right;
            height:0.9rem;
            margin-right: 0.3rem;
            padding-top:0.3rem;
            padding-right: 0.39rem;
            padding-left: 0.2rem;
            width:0.5rem;
            line-height: 0.32rem;
            @include bg-image('icon-wf-rule');
            background-repeat: no-repeat;
            background-size:0.4rem;
            background-position: right center;
        }
        .wf-detail-wrapper{
            min-height:100%;
            .wf-detail-main{
                padding:0rem 0.4rem 0.2rem;
                overflow:auto;
                height:6.2rem;
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
                            color:$color-text-yellow;
                        }
                        &.txt{
                            color:#fff;
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
                button{
                    height:0.96rem;
                    width:0.96rem;
                    border-radius: 50%;
                    border:1px solid $color-border-num;
                    text-align: center;
                    background:none;
                    color: $color-text-yellow;
                    font-size: $font-size-large-x;
                    padding:0;
                    margin: 0;
                }
            }
        }
        .gd-detail-wrapper{
            min-height:100%;
            .gd-detail-main{
                padding:0.3rem 0 0 0.15rem;
                overflow:auto;
                height:7.5rem;
                .item-wrapper{
                    height:auto;
                    overflow: hidden;
                    padding-bottom: 0.2rem;
                    line-height: 0.64rem;
                    div{
                        float: left;
                        height:auto;
                        overflow: hidden;
                        line-height: 0.64rem;
                        &.title{
                            color:#fff;
                            width:1.8rem;
                        }
                        &.txt{
                            color:#fff;
                            width:5.4rem;
                        }
                        &.set-num{
                            width:1.5rem;
                            color:#fff;
                            padding-right: 0.2rem;
                            height: auto;
                            overflow: hidden;
                            input{
                                width:1rem;
                                height:0.64rem;
                                border-radius: 0.1rem;
                                line-height: 0.64rem;
                                border:0;
                                text-align: center;
                            }
                        }
                        
                        .open-type{
                            float: left;
                            position: relative;
                            width:1.92rem;
                            height:0.64rem;
                            border:1px solid $color-border-num;
                            line-height: 0.64rem;
                            text-align: center;
                            border-radius: 0.1rem;
                            overflow: hidden;
                            margin-right: 0.4rem;
                            .right-ak{
                                position: absolute;
                                width:0.57rem;
                                height:0.57rem;
                                bottom:0;
                                right:0;
                                font-size: $font-size-large-x;
                                color:$color-border-num;
                            }
                            &.on{
                                border:1px solid $color-border-yellow;
                                color:$color-text-yellow;
                                .right-ak{
                                    color:$color-text-yellow;
                                }
                            }
                        }
                        .gd-instructions{
                            width:5.2rem;
                            border:0;
                            border-radius: 0.1rem;
                            padding:0.1rem;
                            height:1.94rem;
                            line-height: 0.4rem;
                            font-size: $font-size-small;
                        }
                        .gd-instructions-tip{
                            line-height: 0.32rem;
                            font-size: $font-size-small;
                            color:#86BFA5;
                        }
                        .gd-length{
                            padding-top:1.2rem;
                            text-align: right;
                            line-height: 0.3rem;
                            font-size: $font-size-small;
                            color: #86BFA5;
                            padding-right:0.2rem;
                        }
                        
                    }
                    

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
                        background:$color-border-yellow;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                    }
                }
                .gd-tip{
                    width:100%;
                    color: #fff;
                    font-size: $font-size-small-x;
                    line-height: 0.4rem;
                    padding-top:0.3rem;
                }
            }
        }
        .bet-detail-wrapper{
            min-height:100%;
            .bet-detail-main{
                padding:0.5rem 0 0 0.15rem;
                overflow:auto;
                height:7.5rem;
                ul{
                    height:4.6rem;
                    overflow-y: auto;
                    .item-wrapper{
                        height:auto;
                        overflow: hidden;
                        padding-bottom: 0.2rem;
                        line-height: 0.5rem;
                        div{
                            height:auto;
                            overflow: hidden;
                            line-height: 0.5rem;

                            &.title{
                                color:#fff;
                                padding:0 0.5rem;
                                word-wrap: break-word; 
                                .txt{
                                    color:$color-text-yellow;
                                }
                            }
                            &.set-num{
                                width:1.5rem;
                                color:#fff;
                                padding-right: 0.2rem;
                                height: auto;
                                overflow: hidden;
                                input{
                                    width:1rem;
                                    height:0.5rem;
                                    border-radius: 0.1rem;
                                    line-height: 0.5rem;
                                    border:0;
                                    text-align: center;
                                }
                            }
                            .gd-instructions{
                                width:5.2rem;
                                border:0;
                                border-radius: 0.1rem;
                                padding:0.1rem;
                                height:1.94rem;
                                line-height: 0.4rem;
                                font-size: $font-size-small;
                            }
                            .gd-instructions-tip{
                                line-height: 0.32rem;
                                font-size: $font-size-small;
                                color:#86BFA5;
                            }
                            .gd-length{
                                padding-top:1.2rem;
                                text-align: right;
                                line-height: 0.3rem;
                                font-size: $font-size-small;
                                color: #86BFA5;
                                padding-right:0.2rem;
                            }
                            
                            
                        }
                    }
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
                        background:$color-border-yellow;
                        color: #fff;
                        font-size: $font-size-medium-x;
                        border-radius: 0.1rem;
                        border:0;
                        padding:0;
                    }
                }
                .gd-tip{
                    width:100%;
                    color: #fff;
                    font-size: $font-size-small-x;
                    line-height: 0.4rem;
                    padding-top:0.5rem;
                }
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
        @include bg-image('bg-lottery-shallow');
        background-size: 0.6rem;
        border-radius: 0.2rem;
        border:1px solid #7B6503;
        .detail-title{
            height:1.2rem;
            @include bg-image('bg-lottery-title');
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
                    color: #fff;
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
                        background:$color-border-yellow;
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
    .modes-main{
        position:fixed;
        z-index:440;
        width:100%;
        height:auto;
        overflow: hidden;
        bottom:0;
        background:#fff;
        .modes-wrapper{
            height:auto;
            overflow: hidden;
            .item-wrapper{
                height:1.3rem;
                line-height: 1.3rem;
                overflow: hidden;
                padding: 0 0.3rem;
                text-align: center;
                @include border-bottom-1px(solid,$color-border-gray);
                font-size: $font-size-medium-x;
            }
        }
        .modes-close{
            position:relative;
            height:1.2rem;
            text-align: center;
            line-height: 1.2rem;
            font-size: $font-size-medium;
            color:$color-text-gray;
        }
    }
    
}
</style>
